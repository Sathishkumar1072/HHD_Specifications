// import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LandingPage from './LandingPage';
import TabsComponent from './TabsComponent';
const MobRouter = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={LandingPage}
          options={{headerShown: false, swipeEnabled: false}}
        />
        <Stack.Screen
          name="TabsComponent"
          component={TabsComponent}
          options={{headerShown: false, swipeEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MobRouter;
