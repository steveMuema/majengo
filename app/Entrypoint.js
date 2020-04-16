/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigator from 'app/navigation';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import configureStore, { rrfProps } from './store/configureStore';
import { enableScreens } from 'react-native-screens';

const { persistor, store } = configureStore();
enableScreens();

export default function Entrypoint() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          {/* <Stack.Navigator intialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Settings" component={Settings}
          </Stack.Navigator> */}
          <Navigator />
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
