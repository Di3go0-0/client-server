import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  Divider,
  Avatar,
  Typography,
  ListItemAvatar,
  Button,

} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import type { Room, Message, RoomUser } from "../../types/api.types";
import { RoomService } from "../../services/roomService";
import { useWebSocket } from "../../context/WSContext";
import { useAuth } from "../../context/AuthContext";
import { WS_EVENTS } from "../../config/constants";
import SimpleFormDialog from "./RoomForm";
import UpdateRoomDialog from "./RoomUpdateForm";
import { ThemeToggle } from "../components/ThemeToogle";
import { UserAvatar } from "../components/userAvatar";

export default function ChatApp() {
  const roomService = new RoomService();

  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { isConnected, emit, on, off } = useWebSocket();

  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const [input, setInput] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [users, setUsers] = useState<Record<number, RoomUser[]>>({});
  const [subscribedRooms, setSubscribedRooms] = useState<Room[]>([]);

  const joinRoom = async () => {
    try {
      emit(WS_EVENTS.JOIN_ROOM, selectedRoom);
      emit(WS_EVENTS.MESSAGE_SUBSCRIBE, { id: selectedRoom });
      emit(WS_EVENTS.USERS_ROOM_SUBSCRIBE, selectedRoom);
      
      const newRoom = rooms.find((r) => r.id === selectedRoom);
      if (!newRoom) return;
      setSubscribedRooms((prev) => [...prev, newRoom]);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const exitRoom = async () => {
    try {
      emit(WS_EVENTS.LEAVE_ROOM, selectedRoom);
      await roomService.exitRoom(selectedRoom);
      setSubscribedRooms(prev => prev.filter(r => r.id !== selectedRoom));
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const handleCreateRoom = async (name: string, description: string) => {
    try {
      await roomService.createRoom({ name, description });
      emit(WS_EVENTS.GET_ROOMS);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleUpdateRoom = async (name: string, description: string) => {
    try {
      const toBeUpdatedRoom = rooms.find((r) => r.id === selectedRoom);
      if (!toBeUpdatedRoom) return;
      await roomService.updateRoom({ 
        roomId: toBeUpdatedRoom.id, 
        name, 
        description 
      });
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const getUsersFromRoom = (roomId: number, data: any[]) => {
    const roomUsers: RoomUser[] = data.map((u) => ({
      id: u.id,
      username: u.userName,
      email: u.email,
      online: u.online,
    }));
    setUsers((prev) => ({
      ...prev,
      [roomId]: roomUsers,
    }));
  };

  const getNewMessage = (message: Message | Message[]) => {
    if (Array.isArray(message)) {
      if (message.length === 0) return;
      setMessages((prev) => ({
        ...prev,
        [message[0].roomId]: [
          ...(prev[message[0].roomId] ?? []),
          ...message,
        ],
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        [message.roomId]: [...(prev[message.roomId] ?? []), message],
      }));
    }
  };

  const getUserInfo = (userId: number): RoomUser | undefined => {
    return currentUsers.find((u) => u.id === userId);
  };

  useEffect(() => {
    const init = async () => {
      if (!isConnected) return;
      
      const userRooms = await roomService.getUserRooms();
      setSubscribedRooms(userRooms);
      emit(WS_EVENTS.GET_ROOMS);

      userRooms.forEach((r) => {
        emit(WS_EVENTS.USERS_ROOM_SUBSCRIBE, r.id);
        emit(WS_EVENTS.MESSAGE_SUBSCRIBE, { id: r.id });
        on(WS_EVENTS.USERS_ROOM_UPDATED(r.id), (users) =>
          getUsersFromRoom(r.id, users),
        );
      });
      
      on(WS_EVENTS.ROOMS_LIST, getInitialRooms);
      on(WS_EVENTS.ROOM_CREATED, getNewRoom);
      on(WS_EVENTS.ROOM_UPDATED, updateRoom);
      on(WS_EVENTS.MESSAGE_SUBSCRIPTION, getNewMessage);
    };
    
    init();

    return () => {
      off(WS_EVENTS.ROOMS_LIST);
      off(WS_EVENTS.ROOM_CREATED);
      off(WS_EVENTS.ROOM_UPDATED);
      off(WS_EVENTS.MESSAGE_SUBSCRIPTION);
    };
  }, [isConnected, on, off, emit]);

  const handleSendMessage = () => {
    if (input.trim()) {
      emit(WS_EVENTS.MESSAGE_SEND, {
        roomId: selectedRoom,
        message: input,
      });
      setInput("");
    }
  };

  const getInitialRooms = (data: Room[]) => {
    setRooms(data);
  };

  const getNewRoom = (room: Room) => {
    setRooms((prev) => [...prev, room]);
  };

  const updateRoom = (room: Room) => {
    setRooms((prev) => {
      const newArr = [...prev];
      const toBeUpdatedRoom = prev.find((r) => r.id === room.id);
      if (!toBeUpdatedRoom) return prev;
      const toBeUpdatedRoomIndex = prev.indexOf(toBeUpdatedRoom);
      if (toBeUpdatedRoomIndex < 0) return prev;
      newArr[toBeUpdatedRoomIndex] = room;
      return newArr;
    });
  };

  const currentRoom = rooms.find((r) => r.id === selectedRoom);
  const currentUsers = users[selectedRoom] || [];
  const currentMessages = messages[selectedRoom] || [];

  const sidebarWidth = 280;
  const membersSidebarWidth = 280;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Left Sidebar - Channels */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: { xs: "0px", sm: sidebarWidth, md: sidebarWidth },
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Canales
          </Typography>
          <ThemeToggle />
        </Box>
        <Divider />

        <List sx={{ p: 0, flex: 1, overflowY: "auto" }}>
          {rooms.map((room) => {
            const isSubscribed = subscribedRooms.some((r) => r.id == room.id);
            return (
              <ListItemButton
                key={room.id}
                selected={selectedRoom === room.id}
                onClick={() => setSelectedRoom(room.id)}
                sx={{
                  borderLeft: "3px solid",
                  borderColor:
                    selectedRoom === room.id ? "primary.main" : "transparent",
                  bgcolor:
                    selectedRoom === room.id
                      ? "action.selected"
                      : "transparent",
                  py: 1.5,
                  px: 2,
                  mb: 0.5,
                  mx: 1,
                  borderRadius: "0 8px 8px 0",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={`# ${room.name}`}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: {
                      fontWeight: selectedRoom === room.id ? 600 : 500,
                      color: isSubscribed ? "text.primary" : "text.secondary",
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider />
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Nuevo Canal
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "error.main",
              borderColor: "error.main",
              "&:hover": {
                bgcolor: "error.light",
                borderColor: "error.main",
                color: "error.contrastText",
              },
            }}
          >
            Salir
          </Button>
        </Box>
      </Drawer>

      {/* Main Chat Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 3 },
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
            # {currentRoom?.name}
          </Typography>

          <Box display="flex" gap={1}>
            {rooms.find((r) => r.id === selectedRoom)?.ownerId ===
              user?.id && (
              <Button
                onClick={() => setEditOpen(true)}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Editar
              </Button>
            )}
            {subscribedRooms.some((r) => r.id == selectedRoom) && (
              <Button
                onClick={exitRoom}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Salir
              </Button>
            )}
          </Box>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "divider",
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "action.disabled",
              },
            },
          }}
        >
          {subscribedRooms.some((r) => r.id == selectedRoom) ? (
            currentMessages.length > 0 ? (
              currentMessages.map((msg) => {
                const userInfo = getUserInfo(msg.userId);
                const username = userInfo?.username || `User #${msg.userId}`;

                return (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      gap: 2,
                      animation: "slideIn 0.3s ease",
                      "@keyframes slideIn": {
                        "0%": { opacity: 0, transform: "translateY(8px)" },
                        "100%": { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <UserAvatar
                      userId={msg.userId}
                      username={username}
                      size={40}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {username}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {msg.timestamp 
                            ? new Date(msg.timestamp).toLocaleTimeString()
                            : ''
                          }
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          mt: 0.5,
                          lineHeight: 1.6,
                        }}
                      >
                        {msg.message}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Sin mensajes aún. ¡Sé el primero en escribir!
                </Typography>
              </Box>
            )
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Únete a este canal para ver los mensajes
              </Typography>
              <Button
                onClick={joinRoom}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Unirse al Canal
              </Button>
            </Box>
          )}
        </Box>

        {/* Message Input */}
        {subscribedRooms.some((r) => r.id == selectedRoom) && (
          <Box
            sx={{
              p: { xs: 1.5, md: 2 },
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder={`Escribe un mensaje en #${currentRoom?.name}...`}
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{
                  color: "primary.main",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Right Sidebar - Members */}
      <Drawer
        variant="permanent"
        anchor="right"
        open
        sx={{
          width: { xs: "0px", md: membersSidebarWidth },
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: membersSidebarWidth,
            bgcolor: "background.paper",
            borderLeft: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Miembros
          </Typography>
        </Box>
        <Divider />

        <List sx={{ p: 0 }}>
          {currentUsers.map((user) => (
               <ListItem
                 key={user.id}
                 sx={{
                   px: 2,
                   py: 1.5,
                   borderLeft: "3px solid",
                   borderColor: user.online ? "success.main" : "transparent",
                   bgcolor: "transparent",
                   transition: "all 0.2s ease",
                   "&:hover": {
                     bgcolor: "action.hover",
                   },
                 }}
               >
                 <ListItemAvatar>
                   <Avatar
                     sx={{
                       width: 36,
                       height: 36,
                       bgcolor: user.online ? "success.main" : "action.disabled",
                       fontWeight: 600,
                       fontSize: "0.9rem",
                     }}
                   >
                     {user.username[0].toUpperCase()}
                   </Avatar>
                 </ListItemAvatar>
                 <ListItemText
                   primary={user.username}
                   primaryTypographyProps={{
                     variant: "body2",
                     sx: {
                       fontWeight: 500,
                     },
                   }}
                   secondary={user.online ? "En línea" : "Desconectado"}
                   secondaryTypographyProps={{
                     variant: "caption",
                     sx: {
                       color: user.online ? "success.main" : "text.secondary",
                     },
                   }}
                 />
               </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Dialogs */}
      <SimpleFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateRoom}
      />
      <UpdateRoomDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdateRoom}
      />
    </Box>
  );
}
