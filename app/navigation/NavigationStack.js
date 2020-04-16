// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import React, { useEffect } from 'react';
import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import * as loginActions from 'app/actions/loginActions';
import Splash from 'app/screens/Splash';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

function AuthIsLoaded({ children }) {
  // const email = useSelector(state => state.loginReducer.username);
  // const pswd = useSelector(state => state.loginReducer.password);
  const dispatch = useDispatch();
  // dispatch(loginActions.requestLogin(email, pswd));
  const isLoading = useSelector(state => state.loadingReducer.isLoginLoading);
  useEffect(() => {
    dispatch(loginActions.enableLoader());
    const bootstrapAsync = async () => {
      let userToken;
      try {
        await setTimeout(() => {
          userToken = AsyncStorage.getItem('userToken');
        }, 200);
      } catch (e) {
        console.log(e);
        setTimeout(() => {
          Alert.alert('BoilerPlate', e.toString());
        }, 200);
      }
      dispatch(loginActions.onLoginResponse(userToken));
      dispatch(loginActions.disableLoader());
    };
    bootstrapAsync();
  }, [dispatch]);

  if (isLoading === true) {
    return <Splash />;
  }
  return children;
}

const Stack = createNativeStackNavigator();

export default function RNApp() {
  // get the token in asyncstorage once usertoken is not null load auth screens and home screens otherwise
  // const dispatch = useDispatch();
  const userToken = useSelector(state => state.loginReducer.id);

  return (
    <AuthIsLoaded>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </AuthIsLoaded>
  );
}
