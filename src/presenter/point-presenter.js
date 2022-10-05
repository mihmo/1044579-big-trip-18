import {render, replace, remove } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../mock/setup.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';

export default class PointPresenter {
  #contentList = null;
  #point = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor(contentList, changeData, changeMode) {
    this.#contentList = contentList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  // const pointComponent = new PointListView(point);
  // const pointEditComponent = new PointEditView(point);

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointListView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditClickFormSubmit);
    this.#pointEditComponent.setEditClickHandler(this.#handleEditCloseClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#contentList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }
    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleEditClickFormSubmit = (point) => {
    const updatePoint = {};
    Object.assign(updatePoint, point);
    delete updatePoint.type;
    const currentPoint = {};
    Object.assign(currentPoint, this.#point);
    delete currentPoint.type;

    const isMinorUpdate = JSON.stringify(updatePoint) !== JSON.stringify(currentPoint);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
    );
    this.#replaceFormToPoint();
  };

  #handleEditCloseClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
