export interface TokenRequest {
  user_id: string;
  password: string;
}

export interface TokenResponse {
  access: string;
}

export interface User {
  user_id: string;
  name: string;
  password?: string;
}

export interface UserUpdate {
  name: string;
  password: string;
  user_id?: string;
}

export interface UserResponse {
  user_id: string;
  name: string;
  password?: string;
}

export interface SignInRequest {
  user_id: string;
  password: string;
}

export interface SignInSuccess {
  user_id: string;
  token?: string;
}
