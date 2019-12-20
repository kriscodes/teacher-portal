import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Keyboard
} from "react-native";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import moment from "moment";
import key from "weak-key";

export default class StudentProfileScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      studentName: navigation.getParam("name"),
      paymentAmount: navigation.getParam("amount"),
      nextPayDate: navigation.getParam("nextPayDate"),
      nextClassDate: navigation.getParam("nextClass"),
      notes: navigation
        .getParam("notes")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
      newNote: ""
    };
  }
  componentDidMount() {}
  onChange = e => {
    const note = e;
    this.setState({ newNote: note });
  };
  onSubmit = e => {
    let obj = {
      date: moment()
        .format("ll")
        .toString(),
      content: this.state.newNote
    };
    this.setState({
      notes: this.state.notes
        .concat(obj)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
      newNote: ""
    });
  };
  onNoteAdd = e => {};
  render() {
    const notesOutput = this.state.notes.map(note => (
      <View key={key(note)} style={styles.noteRow}>
        <View>
          <Text style={styles.noteDate}>{note.date}</Text>
        </View>
        <View>
          <Text style={styles.noteContent}>{note.content}</Text>
        </View>
      </View>
    ));
    const currDate = moment()
      .format("ll")
      .toString();
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
              <Text style={styles.profileTitleText}>
                {this.state.studentName}'s Profile
              </Text>
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
              <Text style={{ padding: 12, fontWeight: "700", fontSize: 20 }}>
                Student Information
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.textLeft}>
                <Text style={styles.textLight}>Name</Text>
              </View>
              <View style={styles.textRight}>
                <Text style={styles.textDark}>{this.state.studentName}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.textLeft}>
                <Text style={styles.textLight}>Monthly</Text>
              </View>
              <View style={styles.textRight}>
                <Text style={styles.textDark}>${this.state.paymentAmount}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.textLeft}>
                <Text style={styles.textLight}>Next Pay Date</Text>
              </View>
              <View style={styles.textRight}>
                <Text style={styles.textDark}>{this.state.nextPayDate}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.textLeft}>
                <Text style={styles.textLight}>Next Class</Text>
              </View>
              <View style={styles.textRight}>
                <Text style={styles.textDark}>{this.state.nextClassDate}</Text>
              </View>
            </View>
            <View style={styles.addNoteLabelView}>
              <View style={styles.textLeft}>
                <Text style={styles.textLight}>Add Note</Text>
              </View>
              <View style={styles.textRight}>
                <Text style={styles.textDark}>{currDate}</Text>
              </View>
            </View>
            <View style={styles.notesRow}>
              <View style={{ flex: 1 }}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                >
                  <TextInput
                    placeholder="Type here..."
                    style={styles.textInput}
                    value={this.state.newNote}
                    onChangeText={this.onChange}
                    multiline={true}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </ScrollView>
              </View>
              <CustomActionButton
                onPress={this.onSubmit}
                name="notes"
                style={{ backgroundColor: colors.bgPrimary, borderRadius: 10 }}
              >
                <Text>Add</Text>
              </CustomActionButton>
            </View>
            <View style={{ flex: 5 }}>
              <View style={styles.addNoteLabelView}>
                <View style={styles.textLeft}>
                  <Text style={styles.textDark}>Notes</Text>
                </View>
              </View>
              <ScrollView
                style={{
                  flex: 1,
                  marginBottom: 16
                }}
              >
                {notesOutput}
              </ScrollView>
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
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  },
  text: {
    color: colors.txtWhite
  },
  textInput: {
    backgroundColor: "lightgray",
    padding: 4,
    flex: 1,
    borderRadius: 3,
    height: 40,
    textAlignVertical: "top"
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
  addNoteLabelView: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  addNoteLabelText: {
    fontSize: 18,
    marginLeft: 26,
    marginRight: 20,
    marginBottom: 3,
    paddingTop: 5,
    fontWeight: "300"
  },
  addNoteDateText: {
    justifyContent: "center"
  },
  backgroundImage: {
    width: 120,
    height: 120
  },
  row: {
    flex: 0.5,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderBottomWidth: 0.2
  },
  notesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 6,
    paddingBottom: 7,
    paddingTop: 7
  },
  noteRow: {
    marginLeft: 20,
    marginRight: 20
  },
  noteDate: {
    fontSize: 16,
    marginBottom: 3
  },
  noteContent: {
    fontSize: 15,
    marginBottom: 9
  },
  textLeft: {
    flex: 1,
    paddingLeft: 6,
    alignItems: "flex-start"
  },
  textLight: {
    fontWeight: "200",
    fontSize: 18
  },
  textRight: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 6
  },
  textDark: {
    fontWeight: "600",
    fontSize: 18
  }
});
