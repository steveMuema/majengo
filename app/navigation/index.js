import React from 'react';
import NavigationStack from './NavigationStack';
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './NavigationService';

// class AppNavigator extends Component {
//   render() {
//     return <NavigationStack />;
//   }
// }
function AppNavigator() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <NavigationStack />
    </NavigationContainer>
  );
}

export default AppNavigator;
