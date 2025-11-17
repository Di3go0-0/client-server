export enum MessagesSql {
  SendMensaje = ` CALL PKG_MESSAGES_SEND(?, ?, ?, @message_id)`,

  GetIdSendMensaje = `SELECT @message_id AS message_id`,

  GetMessage = `
    SELECT
      m.id,
      m.room_id,
      m.user_id,
      m.message,
      m.sent_at
    FROM messages m
    WHERE m.active = 1
    AND m.id = ?`,

  GetMessageByRoom = `
    SELECT 
      m.id,
      m.room_id,
      m.user_id,
      m.message,
      m.sent_at
    FROM messages m
    WHERE m.active = 1
    AND m.room_id = 1
    LIMIT 30`,
}
