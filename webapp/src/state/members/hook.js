import { useReducer, useContext } from 'react';

import { StoreContext } from 'containers/App/Store';

import reducer, { initialState } from './reducer';
import Api from '../api';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from './constants';

export const useMembersStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = async () => {
    try {
      await dispatch({ type: LOAD });
      const { data } = await Api.req.get('/members');
      await dispatch({ type: LOAD_SUCCESS, data });
    } catch (error) {
      await dispatch({ type: LOAD_FAIL, error });
    }
  };

  return [
    state,
    {
      load,
    },
  ];
};

const useMembers = () => {
  const { members } = useContext(StoreContext);
  return members;
};

export default useMembers;
