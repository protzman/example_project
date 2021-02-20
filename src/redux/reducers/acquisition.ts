import { Reducer } from 'redux';
import {
  AcquisitionActionTypes,
  AcquisitionActions,
  AcquisitionResponse,
  NormalizedAcquisition,
  DailyAcquisition,
  PerDayAcquisition,
} from '../../types';

export interface AcquisitionState {
  acquisitions: AcquisitionResponse[];
  normalizedAcquisitions: NormalizedAcquisition[];
  groupedAcquisitions: DailyAcquisition[];
  perDayAcquisitions: PerDayAcquisition[];
  total: number;
  averagePerDay: number;
  minMax: string;
}

const initialAcquisitionState: AcquisitionState = {
  acquisitions: [],
  normalizedAcquisitions: [],
  groupedAcquisitions: [],
  perDayAcquisitions: [],
  total: 0,
  averagePerDay: 0,
  minMax: '',
};

export const acquisitionReducer: Reducer<
  AcquisitionState,
  AcquisitionActions
> = (state = initialAcquisitionState, action) => {
  switch (action.type) {
    case AcquisitionActionTypes.FETCH_ACQUISITIONS_REQUEST:
      return {
        ...state,
      };
    case AcquisitionActionTypes.FETCH_ACQUISITIONS_SUCCESS:
      return {
        ...state,
        acquisitions: action.acquisitions,
      };
    case AcquisitionActionTypes.FETCH_ACQUISITIONS_FAILURE:
      return {
        ...state,
      };
    // TODO GO BACK AND ADD REQ/SUC/FAL HERE
    case AcquisitionActionTypes.SET_NORMALIZED_ACQUISITIONS:
      return {
        ...state,
        normalizedAcquisitions: action.normalizedAcquisitions,
        groupedAcquisitions: action.groupedAcquisitions,
        perDayAcquisitions: action.perDayAcquisitions,
        total: action.total,
        averagePerDay: action.averagePerDay,
        minMax: action.minMax,
      };
    default:
      return state;
  }
};
