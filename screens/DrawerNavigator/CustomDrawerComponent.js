import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

import { DrawerItems } from "react-navigation-drawer";
import { Platform } from "@unimodules/core";

class CustomDrawerComponent extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
        <View
          style={{
            height: 150,
            backgroundColor: colors.bgMain,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 32
          }}
        >
          <Ionicons name="ios-school" size={120} color={colors.logoColor} />
          <Text style={{ fontSize: 24, color: "white", fontWeight: "100" }}>
            LilCode
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}
export default CustomDrawerComponent;

const styles = StyleSheet.create({
  container: {}
});
