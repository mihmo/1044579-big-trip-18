import { getTripInfo } from '../utils.js';
import { TRIP_LENGTH_SEPARATOR } from './setup.js';

export const generateTripInfo = (points) => {
  const tripInfo = getTripInfo(points);
  const mockTripInfo = {};

  if (tripInfo.pointsSequence.length > TRIP_LENGTH_SEPARATOR){
    mockTripInfo['tripTitle'] = `
    ${tripInfo.pointsSequence[0].destination}&nbsp...&nbsp
    ${tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].destination}`;
  } else {
    const tripTitle = tripInfo.pointsSequence.map((point) => point.destination);
    mockTripInfo['tripTitle'] = tripTitle.join(' — ');
  }

  mockTripInfo['tripDateFrom'] = tripInfo.pointsSequence[0].dateFrom;
  mockTripInfo['tripDateTo'] = tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].dateTo;
  mockTripInfo['tripCost'] = tripInfo.tripCost;
  return mockTripInfo;
};
