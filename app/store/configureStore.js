import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import FSStorage from 'redux-persist-fs-storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as firebase from 'firebase/app';
import { reduxFirestore } from 'redux-firestore';
import 'firebase/auth';
// import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducers from 'app/reducers'; // where reducers is a object of reducers
import sagas from 'app/sagas';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  key: 'root',
  storage: FSStorage(),
  blacklist: ['loadingReducer'],
  debug: true, //to get useful logging
};
const firebaseConfig = {
  apiKey: 'AIzaSyB0xJRuVBIBYVoDq7UYfwATcRdJb2Us9aE',
  authDomain: 'carbon-minutia-235708.firebaseapp.com',
  databaseURL: 'https://carbon-minutia-235708.firebaseio.com',
  projectId: 'carbon-minutia-235708',
  storageBucket: 'carbon-minutia-235708.appspot.com',
  messagingSenderId: '11838430108',
  appId: '1:11838430108:android:66445e91e416a407190659',
  // enable persistence by adding the below flag
  // persistence: true,
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  enableLogging: true,
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};
const rfConfig = {};

// Initialize firebase instance
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // Initialize Cloud Firestore through Firebase
  firebase.firestore();
}

const middleware = [thunk.withExtraArgument(getFirebase)];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [
  applyMiddleware(...middleware),
  reduxFirestore(firebase, rfConfig),
];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return { persistor, store };
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

sagaMiddleware.run(sagas);

export default configureStore;
