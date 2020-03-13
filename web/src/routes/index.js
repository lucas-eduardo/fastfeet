import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';

import SignIn from '../modules/signIn';
import Package from '../modules/package';
import DeliveryMan from '../modules/deliveryMan';
import Recipient from '../modules/recipient';
import Problem from '../modules/problem';

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/encomendas" component={Package} isPrivate />
      <Route path="/entregadores" component={DeliveryMan} isPrivate />
      <Route path="/destinatarios" component={Recipient} isPrivate />
      <Route path="/problemas" component={Problem} isPrivate />
    </Switch>
  );
}
