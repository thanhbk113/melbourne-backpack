import {
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  LogBox,
} from "react-native";
import styles from "./styles";
import {
  WHITE,
  DARK_BLUE,
  SELECTED_BUTTON,
  PLACEHOLDER,
} from "../../../styles/colors";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { SelectMultipleButton } from "react-native-selectmultiple-button";
import _ from "lodash";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Subject = ({ navigation }) => {
  // handle Selected button
  const [selectedData, setSelectedData] = React.useState([]);
  const [selected, setSelected] = React.useState(false);

  // handle Text Input value
  const [text, setText] = useState("");
  // handle font
  const [loaded, error] = useFonts({
    PoppinsSemiBold: require("../../../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const multipleData = [
    "Economics",
    "Business",
    "Robotics",
    "Management",
    "Aviation",
    "Education",
    "Design",
    "ProfComm",
    "Technology",
    "Digital Marketing",
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.wrapper}>
            <Text style={styles.textOne}>Tell us more about yourself</Text>
            <Text style={styles.textTwo}>
              Choose min.3 subjects you like, we will give you more often that
              relate to it.
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder={"Programs | Subjects of interest"}
              placeholderTextColor={PLACEHOLDER}
              onChangeText={(text) => setText(text)}
              defaultValue={text}
            >
              {selected ? _.join(selectedData, "") : ""}
            </TextInput>
            <View style={styles.buttonWrapper}>
              {multipleData.map((subject, index) => (
                <SelectMultipleButton
                  key={subject}
                  buttonViewStyle={styles.buttonViewStyle}
                  textStyle={styles.textStyle}
                  highLightStyle={{
                    borderColor: WHITE,
                    backgroundColor: "transparent",
                    textColor: WHITE,
                    borderTintColor: DARK_BLUE,
                    backgroundTintColor: SELECTED_BUTTON,
                    textTintColor: WHITE,
                  }}
                  value={subject}
                  selected={selectedData.includes(subject)}
                  singleTap={(valueTap) => {
                    setSelectedData(subject);
                    setSelected(true);
                  }}
                />
              ))}
            </View>
            <Text style={styles.selectedText}>3 topics Selected</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Form")}>
              <View style={styles.nextButtonView}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Campus")}>
              <View style={styles.backButtonView}>
                <Text style={styles.backButtonText}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Subject;
