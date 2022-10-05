import { getTripInfo } from '../utils.js';
import { maxCitiesTitles } from './setup.js';

export const generateTripInfo = (pointsModel) => {
  const tripInfo = getTripInfo(pointsModel);
  const mockTripInfo = {};
  if (tripInfo.pointsSequence.length > maxCitiesTitles) {
    const startPoint = pointsModel.destinations.find((dest) => tripInfo.pointsSequence[0].destination === dest.id).name;
    const endPoint = pointsModel.destinations.find((dest) => tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].destination === dest.id).name;
    mockTripInfo['tripTitle'] = `${startPoint} ... ${endPoint}`;
  } else {
    const tripTitle = tripInfo.pointsSequence.map((point) => pointsModel.destinations.find((dest) => point.destination === dest.id).name);
    mockTripInfo['tripTitle'] = tripTitle.join(' — ');
  }

  mockTripInfo['tripDateFrom'] = tripInfo.pointsSequence[0].dateFrom;
  mockTripInfo['tripDateTo'] = tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].dateTo;
  mockTripInfo['tripCost'] = tripInfo.tripCost;
  return mockTripInfo;
};
