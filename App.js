import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Lista de Pessoas' }} 
        />
        <Stack.Screen 
          name="AddEdit" 
          component={AddEditScreen} 
          options={{ title: 'Cadastrar / Editar' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

