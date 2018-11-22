import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Layout from 'components/Layout';
import Home from 'containers/Home';
import Settings from 'containers/Settings';
import NotFound from 'containers/NotFound';

const App = () => (
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

export default App;
