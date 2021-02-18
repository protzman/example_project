export interface FetchAcquisitionsSuccess {
  acquisitions: AcquisitionResponse[];
}

export interface FetchAcquisitionsFailure {
  error: string;
}

export interface AcquisitionResponse {
  sites: number;
  timestamp: number;
}

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
