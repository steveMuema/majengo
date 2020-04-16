/* eslint-disable react-hooks/rules-of-hooks */
import { getFirebase } from 'react-redux-firebase';

export default function loginUser(username, password) {
  // return Api(
  //   ApiConstants.LOGIN + '?username=' + username + '&password=' + password,
  //   null,
  //   'post',
  //   null,
  // );
  const firebase = getFirebase();

  // function loginWithEmail() {
  return firebase.login({ email: username, password: password });
  // }
}
