import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentList from "../components/StudentList";
import CustomActionButton from "../components/CustomActionButton";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [
        {
          id: 1,
          name: "Matt Chang",
          amount: 10,
          nextClass: "12/7/19",
          nextPayDate: "12/15/19",
          lastPayDate: "11/17/19",
          notes: [
            {
              date: "11/23/19",
              content: "Worked on minion behaviour, needs polish."
            },
            {
              date: "11/30/19",
              content: "Worked on ranged minion."
            },
            {
              date: "12/1/19",
              content:
                "Pushed to github. And did a pull request to my main branch to merge the differences. Worked on minion AI, polished spawning to happen on a timer, having 3 minions spawn in a single file line every 30 seconds."
            },
            {
              date: "12/7/19",
              content: "Left class 30 min early for cyber club."
            },
            {
              date: "12/8/19",
              content:
                "Player has targeting missiles, will be changing behaviour later."
            }
          ]
        },
        {
          id: 2,
          name: "Jose Santos",
          amount: 10,
          nextClass: "12/7/19",
          nextPaymentDate: "12/15/19",
          notes: [
            {
              date: "11/23/19",
              content: "Worked on tracking hits, next is tracking runs."
            }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <Header />
        <View style={{ flex: 1 }}>
          <View style={styles.subheaderView}>
            <View style={styles.subheaderTitle}>
              <Text style={{ fontSize: 16 }}>Students</Text>
            </View>
            <View style={styles.subheaderButton}>
              <CustomActionButton
                style={{
                  width: 200,
                  backgroundColor: "transparent"
                }}
                onPress={() => this.props.navigation.navigate("AddNewStudent")}
              >
                <Text>New Student</Text>
              </CustomActionButton>
            </View>
          </View>
          <View style={styles.listHeaderContainer}>
            <View style={styles.studentListNameView}>
              <Text>Name</Text>
            </View>
            <View style={styles.studentListGeneralView}>
              <Text>Amount</Text>
            </View>
            <View style={styles.studentListGeneralView}>
              <Text>Next Class</Text>
            </View>
            <View style={styles.studentListNotesView}>
              <Text>Notes</Text>
            </View>
          </View>
          <StudentList
            students={this.state.students}
            navigation={this.props.navigation}
          />
        </View>
        <Footer />
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  subheaderView: {
    height: 70,
    borderWidth: 0.5,
    borderColor: "#E9E9E9",
    flexDirection: "row"
  },
  subheaderTitle: {
    flex: 2,
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center"
  },
  subheaderButton: {
    flex: 1,
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E9E9E9",
    borderLeftColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center"
  },
  listHeaderContainer: {
    height: 40,
    borderBottomWidth: 0.75,
    borderBottomColor: "#E9E9E9",
    flexDirection: "row"
  },
  studentListNameView: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  studentListGeneralView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  studentListNotesView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
