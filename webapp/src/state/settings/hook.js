import { useReducer, useContext } from 'react';

import { StoreContext } from 'containers/App/Store';

import reducer, { initialState } from './reducer';
import Api from '../api';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAIL,
} from './constants';

export const useSettingsStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = async () => {
    try {
      await dispatch({ type: LOAD });
      const { data } = await Api.req.get('/settings');
      await dispatch({ type: LOAD_SUCCESS, data });
    } catch (error) {
      await dispatch({ type: LOAD_FAIL, error });
    }
  };

  const save = async (config) => {
    try {
      await dispatch({ type: SAVE });
      const { data } = await Api.req.post('/settings', config);
      await dispatch({ type: SAVE_SUCCESS, data });
    } catch (error) {
      await dispatch({ type: SAVE_FAIL, error });
    }
  };

  return [
    state,
    {
      load,
      save,
    },
  ];
};

const useSettings = () => {
  const { settings } = useContext(StoreContext);
  return settings;
};

export default useSettings;
