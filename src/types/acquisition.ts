export interface FetchAcquisitionsSuccess {
  acquisitions: AcquisitionResponse[];
}

export interface AcquisitionResponse {
  sites: number;
  timestamp: number;
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

export interface DailyAcquisition {
  date: string;
  total: number;
  sites: number;
}

export interface PerDayAcquisition {
  date: string;
  acquisitions: NormalizedAcquisition[];
}

export enum AcquisitionActionTypes {
  FETCH_ACQUISITIONS_REQUEST = 'FETCH_ACQUISITIONS_REQUEST',
  FETCH_ACQUISITIONS_SUCCESS = 'FETCH_ACQUISITIONS_SUCCESS',
  SET_NORMALIZED_ACQUISITIONS = 'SET_NORMALIZED_ACQUISITIONS',
}

export interface AcquisitionAction {
  type: AcquisitionActionTypes;
  acquisitions: AcquisitionResponse[];
  normalizedAcquisitions: NormalizedAcquisition[];
  groupedAcquisitions: DailyAcquisition[];
  perDayAcquisitions: PerDayAcquisition[];
  total: number;
  averagePerDay: number;
  minMax: string;
}

export type AcquisitionActions = AcquisitionAction;
