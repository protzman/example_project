export interface SignInRequest {
  user_id: string;
  password: string;
}

export interface SignInSuccess {
  user_id: string;
  token?: string;
}

export interface ChartCardProps {
  title: string;
  data: DailyAcquisition[];
}

export interface TokenRequest {
  user_id: string;
  password: string;
}

export interface TokenResponse {
  access: string;
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

// Acquisition types ---

export interface DailyAcquisition {
  date: string;
  total: number;
  sites: number;
}

export interface NormalizedAcqusitionData {
  allEntries: NormalizedAcquisition[];
  groupedEntries: DailyAcquisition[];
  averagePerDay: number;
  minMax: string;
  total: number;
}

export interface NormalizedAcquisition {
  date: string;
  groupedDate: string;
  sites: number;
}

export interface AcquisitionResponse {
  sites: number;
  timestamp: number;
}
