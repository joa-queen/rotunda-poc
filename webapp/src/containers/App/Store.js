import React, { createContext } from 'react';

import { useMembersStore } from 'state/members/hook';
import { useIssuesStore } from 'state/issues/hook';
import { useSettingsStore } from 'state/settings/hook';

import App from './App';

export const StoreContext = createContext({});

const Store = () => {
  const members = useMembersStore();
  const issues = useIssuesStore();
  const settings = useSettingsStore();

  return (
    <StoreContext.Provider
      value={{
        members,
        issues,
        settings,
      }}
    >
      <App />
    </StoreContext.Provider>
  );
};

export default Store;
