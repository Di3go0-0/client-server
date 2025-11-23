export enum RoomsSql {

  CreateRoom = ` CALL PKG_ROOMS_CREATE(?, ?, ?, @room_id)`,

  GetIdCreatedRoom = `SELECT @room_id AS room_id`,

  updateRoom = ` CALL PKG_ROOMS_UPDATE(?,?,?,?) `,

  ExitRoom = ` CALL PKG_ROOMS_EXIST(?, ?)`,

  JoinRoom = ` CALL PKG_ROOMS_ADD_USER(?, ?)`,

  GetRoomById = `
  SELECT 
      r.id,
      r.name,
      r.description,
      r.owner_id 
    FROM rooms r
    WHERE r.id = ?
    AND r.active = 1
  `,

  GetRoomByUser = ` 
    SELECT 
      r.id,
      r.name,
      r.description,
      r.owner_id 
    FROM rooms r
    LEFT JOIN user_rooms ur
      ON r.id = ur.room_id
      AND ur.active = 1
    WHERE ur.user_id = ?
    AND r.active = 1
  `,

  getRoomsActives = `
  SELECT 
    vw.room_id as id,
    vw.name,
    vw.description,
    vw.owner_id,
    vw.active_users
  FROM vw_active_rooms vw;
  `,

  getUsersIdInRoom = `
    SELECT
      ur.user_id,
      u.username,
      u.email,
      false AS "online"
    FROM user_rooms ur
    INNER JOIN users u ON u.id = ur.user_id
    WHERE ur.room_id = ?
    AND ur.active = 1
`,

  ExistRoom = `
    SELECT
      count(*) AS "totalCount"
    FROM rooms r
    where r.id = ?
`,
}
