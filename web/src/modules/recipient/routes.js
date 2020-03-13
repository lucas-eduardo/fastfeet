import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import List from './pages/list';
import Form from './pages/form';

export default function Router({ path }) {
  return (
    <Switch>
      <Route path={`${path}/lista`} component={List} />
      <Route path={`${path}/cadastrar`} component={Form} />
      <Route path={`${path}/editar/:id`} component={Form} />

      <Route path={`${path}*`}>
        <Redirect to={`${path}/lista`} />
      </Route>
    </Switch>
  );
}

Router.propTypes = {
  path: PropTypes.string.isRequired,
};
