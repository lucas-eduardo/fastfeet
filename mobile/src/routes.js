// import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import Detail from './pages/Delivery/Detail';
import SendProblem from './pages/Delivery/SendProblem';
import Problems from './pages/Delivery/Problems';
import Confirm from './pages/Delivery/Confirm';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
                height: 70,
                paddingHorizontal: 76,
                paddingVertical: 11,
              },
            },
          }
        ),
        Delivery: createStackNavigator(
          {
            Detail,
            SendProblem,
            Problems,
            Confirm,
          },
          {
            defaultNavigationOptions: {
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTransparent: true,
              headerTintColor: '#fff',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
