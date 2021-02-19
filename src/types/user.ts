export interface UserResponse {
  user_id: string;
  name: string;
}

export interface User {
  user_id: string;
  name: string;
  password?: string;
}
