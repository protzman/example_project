import { Dispatch } from 'redux';
import {
  AcquisitionActionTypes,
  AcquisitionResponse,
  NormalizedAcqusitionData,
} from '../../types';

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

export const setNormalizedAcquisitionData = (
  normalizedAcquisitionData: NormalizedAcqusitionData
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: AcquisitionActionTypes.SET_NORMALIZED_ACQUISITIONS,
      normalizedAcquisitions: normalizedAcquisitionData.normalizedEntries,
      groupedAcquisitions: normalizedAcquisitionData.groupedEntries,
      perDayAcquisitions: normalizedAcquisitionData.perDayEntries,
      total: normalizedAcquisitionData.total,
      averagePerDay: normalizedAcquisitionData.averagePerDay,
      minMax: normalizedAcquisitionData.minMax,
    });
  };
};
