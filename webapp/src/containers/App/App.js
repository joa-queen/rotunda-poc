import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { useOnMount } from 'hooks';
import useMembers from 'state/members/hook';
import useIssues from 'state/issues/hook';

import Layout from 'components/Layout';
import Home from 'containers/Home';
import Settings from 'containers/Settings';
import NotFound from 'containers/NotFound';

const App = () => {
  const [members, membersActions] = useMembers();
  const [issues, issuesActions] = useIssues();

  useOnMount(() => {
    membersActions.load();
    issuesActions.load();
  });

  if (members.loading || issues.loading) return <div>Loading...</div>;

  if (members.loadError) return <div>{`${members.loadError}`}</div>;
  if (issues.loadError) return <div>{`${issues.loadError}`}</div>;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
