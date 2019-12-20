import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../assets/colors";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // navigate to the home screen
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        // navigate the user to the login screen
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.logoColor}
        ></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  }
});
