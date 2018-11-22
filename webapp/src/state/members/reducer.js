import produce from 'immer';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from './constants';

export const initialState = {
  data: [],
  loaded: false,
  loading: false,
  loadError: null,
};

const reducer = (state, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD:
      draft.loaded = false;
      draft.loading = true;
      draft.loadError = null;
      break;

    case LOAD_SUCCESS:
      draft.data = action.data;
      draft.loaded = true;
      draft.loading = false;
      break;

    case LOAD_FAIL:
      draft.data = null;
      draft.loaded = false;
      draft.loading = false;
      draft.loadError = action.error;
      break;

    default:
  }
});

export default reducer;
