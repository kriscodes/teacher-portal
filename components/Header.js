import React from "react";
import { View, Text } from "react-native";

class Header extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 70,
          borderBottomWidth: 0.5,
          borderBottomColor: "#E9E9E",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 18 }}>Teacher Portal</Text>
      </View>
    );
  }
}

export default Header;
