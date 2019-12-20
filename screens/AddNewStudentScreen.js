import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  Keyboard
} from "react-native";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import * as firebase from "firebase/app";
import "firebase/auth";

export default class AddNewStudentScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      amount: null,
      selectedFirstClassDate: "",
      selectedPayDate: "",
      timestamp: null
    };
  }
  onFirstNameChange = e => {
    return this.setState({ firstName: e });
  };
  onLastNameChange = e => this.setState({ lastName: e });
  onAmountChange = e => this.setState({ amount: e });
  onClassDateChange = e =>
    this.setState({ selectedFirstClassDate: moment(e).format("MM/DD/YYYY") });
  onPayDateChange = e =>
    this.setState({ electedPayDate: moment(e).format("MM/DD/YYYY") });

  onSubmit = async () => {
    if (this.state.firstName && this.state.lastName) {
      this.setState({ isLoading: true });
      try {
        var newStudent = await firebase.database.ref("users/students").set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          amount: this.state.amount,
          firstClassDate: this.state.selectedFirstClassDate,
          firstPayDate: this.state.selectedPayDate
        });
        if (newStudent) {
          this.props.navigation.navigate("HomeScreen");
        }
      } catch (error) {
        this.setState({ isLoading: false });
        switch (error.code) {
          default:
            alert(error.code);
        }
      }
    } else {
      alert("Please enter all fields.");
    }
  };

  render() {
    const { selectedFirstClassDate, selectedPayDate } = this.state;
    const startDate = selectedFirstClassDate
      ? selectedFirstClassDate.toString()
      : "";
    const payDate = selectedPayDate ? selectedPayDate.toString() : "";

    return (
      <View style={styles.container}>
        <View
          style={{ backgroundColor: colors.bgMain, paddingBottom: 28, flex: 1 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <CustomActionButton
                position="left"
                style={{ backgroundColor: colors.bgMain }}
                onPress={() => this.props.navigation.navigate("HomeScreen")}
              >
                <AntDesign
                  name="left"
                  size={20}
                  style={{ color: colors.txtWhite }}
                />
              </CustomActionButton>
            </View>
            <View style={styles.profileTitleView}>
              <Text style={styles.profileTitleText}>New Student Profile</Text>
            </View>
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              style={styles.backgroundImage}
              source={require("../assets/coder-icon.png")}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "steelblue", flex: 3 }}>
          <View style={styles.contentContainer}>
            <View style={styles.studentInfoLabelView}>
              <Text style={{ padding: 6, fontWeight: "700", fontSize: 20 }}>
                New Student Information
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>First Name</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Last Name</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="First Name"
                  style={styles.textInput}
                  value={this.state.firstName}
                  name="firstName"
                  onChange={this.onFirstNameChange}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Last Name"
                  style={styles.textInput}
                  value={this.state.lastName}
                  name="lastName"
                  onChange={this.onLastNameChange}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Amount</Text>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Amount"
                  style={styles.textInput}
                  value={this.state.amount}
                  name="amount"
                  onChange={this.onAmountChange}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View
              style={{
                flex: 6,
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <View style={styles.calendarContainer}>
                <View>
                  <Text>First Class:{startDate}</Text>
                </View>
                <CalendarPicker
                  style={{ alignItems: "left" }}
                  name="selectedFirstClassDate"
                  onDateChange={this.onClassDateChange}
                  scaleFactor={1000}
                />
              </View>
              <View style={styles.calendarContainer}>
                <View>
                  <Text>Pay Date:{payDate}</Text>
                </View>
                <CalendarPicker
                  style={{ alignItems: "left" }}
                  name="selectedPayDate"
                  onDateChange={this.onPayDateChange}
                  scaleFactor={1000}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                style={{
                  marginLeft: 25,
                  marginRight: 25
                }}
                onPress={this.onSubmit}
                title="Add New Student"
              />
            </View>
          </View>
          <SafeAreaView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  calendarContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginRight: 20
  },
  profileTitleView: {
    flex: 5,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  profileTitleText: {
    color: colors.txtWhite,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginLeft: -32
  },
  backgroundImage: {
    width: 120,
    height: 120
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  },
  studentInfoLabelView: {
    flex: 0.75,
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: -15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  },
  textInput: {
    backgroundColor: "lightgray",
    borderRadius: 3,
    height: 36,
    textAlignVertical: "top",
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8
  },
  label: {
    flex: 1,
    marginLeft: 25,
    fontSize: 16
  }
});
