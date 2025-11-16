export enum RoomsSql {

  CreateRoom = ` CALL PKG_ROOMS_CREATE(?, ?, ?)`,

  ExitRoom = ` CALL PKG_ROOMS_EXIST(?, ?)`,

  JoinRoom = ` CALL PKG_ROOMS_ADD_USER(?, ?)`,

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
    vw.active_users
  FROM vw_active_rooms vw;
  `,
}
