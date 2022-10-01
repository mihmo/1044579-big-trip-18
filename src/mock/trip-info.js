import { getTripInfo } from '../utils.js';

export const generateTripInfo = (points) => {
  const tripInfo = getTripInfo(points);
  const mockTripInfo = {};

  if (tripInfo.pointsSequence.length > 3){
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
