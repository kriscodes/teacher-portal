import React from "react";
import { View, Text, Button } from "react-native";

export default class StudentProfile extends React.Component {
  rener() {
    return (
      <View>
        <View>
          <Text>{this.props.student.name}</Text>
        </View>
      </View>
    );
  }
}
