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

export interface User {
  name: string;
  user_id: string;
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
  max: number;
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
