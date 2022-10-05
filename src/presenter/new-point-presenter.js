import { render, remove, RenderPosition } from '../framework/render.js';
import {nanoid} from 'nanoid';
import EditPointView from '../view/point-edit-view';
import { UserAction, UpdateType, NewPoint } from '../mock/setup.js';

export default class NewPointPresenter {
  #contentList = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #offers = null;
  #destinations = null;

  constructor(contentList, changeData) {
    this.#contentList = contentList;
    this.#changeData = changeData;
  }

  init = (callback, offers, destinations) => {
    this.#destroyCallback = callback;
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView(NewPoint, this.#offers, this.#destinations);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleEditClickFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleEditCloseClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleEditCloseClick);

    render(this.#pointEditComponent, this.#contentList.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleEditClickFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
  };

  #handleEditCloseClick = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}


