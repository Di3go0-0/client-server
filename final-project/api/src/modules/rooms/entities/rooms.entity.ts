export type RoomEntity = {
  id: number;
  name: string;
  description: string;
  owner_id: string;
}


export type RoomsActivesEntity = {
  id: number;
  name: string;
  description: string;
  active_users: string;
  owner_id: number;
}

