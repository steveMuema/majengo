/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
export default Object.assign(
  loginReducer,
  loadingReducer,
  {
    firebase: firebaseReducer,
  },
  {
    firestore: firestoreReducer,
  },
);
