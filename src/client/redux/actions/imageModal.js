export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const NEXT_IMAGE = 'NEXT_IMAGE';
export const PREV_IMAGE = 'PREV_IMAGE';

export const openModal = (collection, index) => ({
  type: OPEN_MODAL,
  collection,
  index
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const next = () => ({
  type: NEXT_IMAGE
});

export const prev = () => ({
  type: PREV_IMAGE
});
