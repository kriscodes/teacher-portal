import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import * as firebase from "firebase";
import "firebase/auth";

class SettingsScreen extends Component {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("WelcomeScreen");
      })
      .catch(() => {
        alert(error.message);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: colors.bgPrimary
            }}
            title="Sign Up"
            onPress={this.signOut}
          >
            <Text>Sign Out</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bottom: {
    flex: 1,
    alignItems: "center"
  }
});
