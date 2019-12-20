import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";
import colors from "../assets/colors";

import CustomActionButton from "../components/CustomActionButton";
import * as firebase from "firebase/app";
import "firebase/auth";
import { HitTestResultTypes } from "expo/build/AR";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }
  onSignIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        var signin = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (signin) {
          this.props.navigation.navigate("LoadingScreen");
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          case "auth/user-not-found":
            alert("A user with that email/password does not exist.");
            break;
          case "auth/invalid-email":
            alert("Please enter a valid email address");
            break;
          case "auth/wrong-password":
            alert("A user with that email/password does not exist.");
            break;
          default:
            alert(error.code);
        }
      }
    } else {
      alert("Please enter email and password.");
    }
  };

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        if (response) {
          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });
          if (user) {
            this.props.navigation.navigate("LoadingScreen");
          }
        }
      } catch (error) {
        this.setState({ isLoading: false });
        if (error.code == "auth/email-already-in-use") {
          alert("User already Exists. Try logging in");
        } else {
          alert(error.code);
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000
              }
            ]}
          >
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        ) : null}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="example@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButtons, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Sign Up</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200
  }
});
