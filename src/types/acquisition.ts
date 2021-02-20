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
  normalizedEntries: NormalizedAcquisition[];
  groupedEntries: DailyAcquisition[];
  perDayEntries: PerDayAcquisition[];
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

export interface DailyAcquisition {
  date: string;
  total: number;
  sites: number;
}

/**
 * PerDayAcquisition are a group of the acquisitions that occur on the same day and the date they occur
 */
export interface PerDayAcquisition {
  date: string;
  acquisitions: NormalizedAcquisition[];
}
