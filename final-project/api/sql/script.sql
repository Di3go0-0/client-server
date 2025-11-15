

CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


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



