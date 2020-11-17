
import 'react-native-gesture-handler';

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/login";
import UserData from "./screens/user_data";
import ListKuliah from "./screens/list_kuliah";
import Daftar from "./screens/daftar_kuliah";
import History from "./screens/history";
import Register from "./screens/registrasi";
import { Provider } from "react-redux";
import store from "./store";
const Stack = createStackNavigator();

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
    <Provider store={store}>
  <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown :false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown :false}}/>
       <Stack.Screen name="Home" component={UserData} options={({ navigation, route }) => ({
          headerLeft: props => null,
          headerRight: () => (
           <View style={{marginRight: 10}}>
              <Button
              onPress={() => navigation.navigate("Login")}
              title="logout"
              color="red"
            />
             </View>
          ),
        })}/>
         <Stack.Screen name="List Kuliah" component={ListKuliah} options={({ navigation, route }) => ({
          headerLeft: props => null,
        })}/>
          <Stack.Screen name="Daftar Kuliah" component={Daftar} options={({ navigation, route }) => ({
          headerLeft: props => null,
        })}/>
         <Stack.Screen name="Histori Pembayaran" component={History} options={({ navigation, route }) => ({
          headerLeft: props => null,
        })}/>
  </Stack.Navigator>
    </Provider>
</NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
