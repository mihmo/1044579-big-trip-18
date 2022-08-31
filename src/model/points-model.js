import { generatePoint } from '../mock/point';
import { POINTLIST_ITEMS_NUMBER } from '../setup';

export default class PointsModel {
  points = Array.from({length: POINTLIST_ITEMS_NUMBER}, generatePoint);

  getPoints = () => this.points;
}
