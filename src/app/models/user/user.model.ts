export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  inRoom: string;
  room_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface loginRegResponse {
  isExist: boolean;
  credential: boolean;
}
