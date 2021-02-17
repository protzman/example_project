import { Dispatch } from 'redux';
import {
  AcquisitionResponse,
  NormalizedAcquisition,
  NormalizedAcqusitionData,
  DailyAcquisition,
} from '../../types/acquisition';

export enum AcquisitionActionTypes {
  FETCH_ACQUISITIONS_REQUEST = 'FETCH_ACQUISITIONS_REQUEST',
  FETCH_ACQUISITIONS_SUCCESS = 'FETCH_ACQUISITIONS_SUCCESS',
  FETCH_ACQUISITIONS_FAILURE = 'FETCH_ACQUISITIONS_FAILURE',
  SET_NORMALIZED_ACQUISITIONS = 'SET_NORMALIZED_ACQUISITIONS',
}

interface AcquisitionAction {
  type: AcquisitionActionTypes;
  acquisitions: AcquisitionResponse[];
  normalizedAcquisitions: NormalizedAcquisition[];
  groupedAcquisitions: DailyAcquisition[];
  total: number;
  averagePerDay: number;
  minMax: string;
}

export const fetchAcquisitionsRequest = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AcquisitionActionTypes.FETCH_ACQUISITIONS_REQUEST,
    });
  };
};

export const fetchAcquisitionsSuccess = (
  acquisitions: AcquisitionResponse[]
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AcquisitionActionTypes.FETCH_ACQUISITIONS_SUCCESS,
      acquisitions,
    });
  };
};

export const fetchAcquisitionsFailure = (error: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AcquisitionActionTypes.FETCH_ACQUISITIONS_FAILURE,
      error,
    });
  };
};

export const setNormalizedAcquisitionData = (
  normalizedAcquisitionData: NormalizedAcqusitionData
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AcquisitionActionTypes.SET_NORMALIZED_ACQUISITIONS,
      normalizedAcquisitions: normalizedAcquisitionData.allEntries,
      groupedAcquisitions: normalizedAcquisitionData.groupedEntries,
      total: normalizedAcquisitionData.total,
      averagePerDay: normalizedAcquisitionData.averagePerDay,
      minMax: normalizedAcquisitionData.minMax,
    });
  };
};

export type AcquisitionActions = AcquisitionAction;
