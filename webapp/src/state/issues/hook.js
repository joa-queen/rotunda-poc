import { useReducer, useContext } from 'react';

import { StoreContext } from 'containers/App/Store';

import reducer, { initialState } from './reducer';
import Api from '../api';
import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
} from './constants';

export const useIssuesStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = async () => {
    try {
      await dispatch({ type: LOAD });
      const { data } = await Api.req.get('/issues');
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

const useIssues = () => {
  const { issues } = useContext(StoreContext);
  return issues;
};

export default useIssues;
