CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    owner_id INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE user_rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    joined_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    left_at DATETIME NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    connected_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    disconnected_at DATETIME NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE OR REPLACE VIEW vw_active_users_in_rooms AS
SELECT 
    ur.room_id,
    u.id AS user_id,
    u.userName,
    u.email,
    ur.joined_at
FROM user_rooms ur
JOIN users u ON u.id = ur.user_id
WHERE ur.active = 1
  AND u.active = 1;



CREATE OR REPLACE VIEW vw_active_rooms AS
SELECT 
    r.id AS room_id,
    r.name,
    r.description,
    r.owner_id,
    u.userName AS owner_name,
    (
        SELECT COUNT(*) 
        FROM user_rooms ur
        WHERE ur.room_id = r.id
          AND ur.active = 1
    ) AS active_users
FROM rooms r
JOIN users u ON u.id = r.owner_id
WHERE r.active = 1;


CREATE FUNCTION PKG_USERS_EmailExists(p_email VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM users
    WHERE email = p_email;

    IF v_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END


CREATE FUNCTION PKG_USERS_UserNameExists(p_username VARCHAR(50))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM users
    WHERE userName = p_username;

    IF v_count > 0 THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END


CREATE PROCEDURE PKG_USERS_CreateUser(
    IN p_userName VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255)
)
BEGIN
    -- Validar si ya existe el email o el username
    IF PKG_USERS_EmailExists(p_email) = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo ya está registrado';
    ELSEIF PKG_USERS_UserNameExists(p_userName) = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El username ya está registrado';
    ELSE
        INSERT INTO users (userName, email, password)
        VALUES (p_userName, p_email, p_password);
    END IF;
END


--- Rooms

CREATE PROCEDURE PKG_ROOMS_DELETE(IN p_room_id INT)
BEGIN
    UPDATE rooms
    SET active = 0
    WHERE id = p_room_id;
END 

CREATE PROCEDURE PKG_ROOMS_EXIST_ADMIN(
    IN p_room_id INT,
    IN p_admin_id INT
)
BEGIN
    DECLARE v_new_owner INT;
    -- Buscar el usuario más antiguo en la sala EXCEPTO el admin
    SELECT user_id INTO v_new_owner
    FROM user_rooms
    WHERE room_id = p_room_id
      AND user_id <> p_admin_id
      AND active = 1
    ORDER BY joined_at ASC
    LIMIT 1;
    -- Si NO existe otro usuario → eliminar sala
    IF v_new_owner IS NULL THEN
        CALL PKG_ROOMS_DELETE(p_room_id);
    ELSE
        -- 1. Nuevo propietario
        UPDATE rooms
        SET owner_id = v_new_owner
        WHERE id = p_room_id;
        -- 2. Sacar al propietario anterior
        UPDATE user_rooms
        SET left_at = NOW(),
            active = 0
        WHERE room_id = p_room_id
          AND user_id = p_admin_id
          AND active = 1;
    END IF;
END

CREATE PROCEDURE PKG_ROOMS_EXIST(
    IN p_user_id INT,
    IN p_room_id INT
)
BEGIN
    DECLARE v_owner INT;
    -- Obtener el propietario de la sala
    SELECT owner_id INTO v_owner
    FROM rooms
    WHERE id = p_room_id;
    -- Si el usuario ES el propietario
    IF v_owner = p_user_id THEN
        CALL PKG_ROOMS_EXIST_ADMIN(p_room_id, p_user_id);
    ELSE
        -- Si NO es propietario → solo salir de la sala
        UPDATE user_rooms
        SET left_at = NOW(),
            active = 0
        WHERE user_id = p_user_id
          AND room_id = p_room_id
          AND active = 1;
    END IF;
END 



CREATE PROCEDURE PKG_ROOMS_ADD_USER(
    IN p_user_id INT,
    IN p_room_id INT
)
BEGIN
    DECLARE v_room_exists INT;
    DECLARE v_user_exists INT;
    DECLARE v_membership_exists INT;
    DECLARE v_is_active INT;
    -- Validar que la sala exista y esté activa
    SELECT COUNT(*) INTO v_room_exists
    FROM rooms
    WHERE id = p_room_id AND active = 1;
    IF v_room_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La sala no existe o está inactiva.';
    END IF;
    -- Validar que el usuario exista y esté activo
    SELECT COUNT(*) INTO v_user_exists
    FROM users
    WHERE id = p_user_id AND active = 1;

    IF v_user_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El usuario no existe o está inactivo.';
    END IF;
    -- Ver si el usuario ya tiene registro previo en la sala
    SELECT COUNT(*)
    INTO v_membership_exists
    FROM user_rooms
    WHERE user_id = p_user_id
      AND room_id = p_room_id;
    -- Si tiene registro previo, ver si está activo
    IF v_membership_exists > 0 THEN
        SELECT active
        INTO v_is_active
        FROM user_rooms
        WHERE user_id = p_user_id
          AND room_id = p_room_id
        LIMIT 1;
        -- Si ya está activo, no hacer nada
        IF v_is_active = 1 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'El usuario ya está dentro de la sala.';
        END IF;
        -- Si estuvo antes pero salió → reactivarlo
        UPDATE user_rooms
        SET active = 1,
            joined_at = NOW(),
            left_at = NULL
        WHERE user_id = p_user_id
          AND room_id = p_room_id;
    ELSE
        -- Insertar nuevo registro
        INSERT INTO user_rooms (user_id, room_id)
        VALUES (p_user_id, p_room_id);
    END IF;
END 


CREATE PROCEDURE PKG_ROOMS_CREATE(
    IN p_owner_id INT,
    IN p_room_name VARCHAR(100),
    IN p_description TEXT
)
BEGIN
    DECLARE v_user_exists INT;
    DECLARE v_room_exists INT;
    DECLARE v_new_room_id INT;
    -- 1. Validar que el usuario exista y esté activo
    SELECT COUNT(*) INTO v_user_exists
    FROM users
    WHERE id = p_owner_id AND active = 1;
    IF v_user_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El usuario no existe o está inactivo.';
    END IF;
    -- 2. Validar que no exista otra sala con el mismo nombre
    SELECT COUNT(*) INTO v_room_exists
    FROM rooms
    WHERE name = p_room_name AND active = 1;
    IF v_room_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Ya existe una sala activa con ese nombre.';
    END IF;
    -- 3. Crear la sala
    INSERT INTO rooms (name, description, owner_id)
    VALUES (p_room_name, p_description, p_owner_id);
    -- Obtener ID de la sala recién creada
    SET v_new_room_id = LAST_INSERT_ID();
    -- 4. Insertar al owner dentro de user_rooms como miembro activo
    INSERT INTO user_rooms (user_id, room_id)
    VALUES (p_owner_id, v_new_room_id);
    -- 5. Retornar el id de la sala creada
    SELECT v_new_room_id AS room_id;
END

