import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import StudentProfileScreen from "./screens/StudentProfileScreen";
import AddNewStudentScreen from "./screens/AddNewStudentScreen";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
import colors from "./assets/colors";

import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

/**
 * AppSwitchNavigator
 *  - WelcomeScreen
 *      - SignUpScreen
 *  - HomeScreen
 */
export default class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return <AppContainer />;
  }
}

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: LoginScreen
    },
    StudentProfile: {
      screen: StudentProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    AddNewStudent: {
      screen: AddNewStudentScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <AntDesign name="home" size={24} />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <AntDesign name="setting" size={24} />
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);
