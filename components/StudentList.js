import React from "react";
import { View, Text, Button } from "react-native";

import CustomActionButton from "./CustomActionButton";

export default class StudentList extends React.Component {
  renderStudents() {
    return this.props.students.map(student => (
      <React.Fragment key={student.id}>
        <View
          style={{
            height: 40,
            borderBottomWidth: 0.75,
            borderBottomColor: "#E9E9E9",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 1.5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <CustomActionButton
              style={{
                width: 200,
                backgroundColor: "transparent"
              }}
              onPress={() =>
                this.props.navigation.navigate("StudentProfile", {
                  name: student.name,
                  amount: student.amount,
                  nextPayDate: student.nextPayDate,
                  nextClass: student.nextClass,
                  notes: student.notes
                })
              }
            >
              <Text>{student.name}</Text>
            </CustomActionButton>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>{student.amount}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>{student.nextClass}</Text>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text>{student.notes[0].content}</Text>
          </View>
        </View>
      </React.Fragment>
    ));
  }

  render() {
    return this.renderStudents();
  }
}
