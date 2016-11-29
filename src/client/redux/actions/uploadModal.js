export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (onComplete, options) => ({
  type: OPEN_MODAL,
  onComplete,
  options
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
