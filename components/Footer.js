import React from "react";
import { View, Text } from "react-native";

class Footer extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: "#E9E9E9",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 16 }}>LilCode</Text>
        </View>
      </View>
    );
  }
}

export default Footer;
