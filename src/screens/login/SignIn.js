import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import {
  GREY,
  LIGHT_PURPLE,
  SELECTED_BUTTON,
  WHITE,
} from "../../styles/colors";
import CheckBox from "react-native-check-box";
import { auth, db } from "../../config/firebase";
import { signIn } from "../../api/loginApi";
import AlertModal from "../../components/alert-modal/AlertModal";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [validate, setValidate] = useState({
    error: "",
    valid: false,
  });

  const setShowAlertFunction = (showAlert) => {
    setShowAlert(showAlert);
  };

  const checkValidate = (component) => {
    if (component === email && email === "") {
      setValidate({ error: "*Email is required", valid: false });
      setShowAlert(true);
    } else if (
      component === email &&
      (!email.includes("@") || !email.includes(".com"))
    ) {
      setValidate({
        error: "*Email must be in format email@something.com",
        valid: false,
      });
      setShowAlert(true);
    } else {
      setValidate({ error: "", valid: true });
      setShowAlert(false);
    }

    // if (component === password && password === "") {
    //   setValidate({ error: "*Password is required", valid: false });
    //   setShowAlert(true);
    // } else if (component === password && password.length < 6) {
    //   setValidate({
    //     error: "*Password length must be more than 6",
    //     valid: false,
    //   });
    //   setShowAlert(true);
    // } else {
    //   setValidate({ error: "", valid: true });
    //   setShowAlert(false);
    // }
  };

  const [loaded, error] = useFonts({
    PoppinsSemiBold: require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBlack: require("../../../assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="padding"
        style={styles.container}
      >
        <Image
          source={require("../../../assets/adaptive-icon.png")}
          style={styles.icon}
        />
        <AlertModal
          showModal={showAlert}
          setShowModalFunction={setShowAlertFunction}
          message={validate.error}
        />
        <View style={styles.loginField}>
          <Text style={styles.textOne}>Sign in to your account</Text>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder={"Email"}
              keyboardType={"email-address"}
              placeholderTextColor={WHITE}
              onChangeText={(text) => setEmail(text)}
              defaultValue={email}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/email-icon.png")}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder={"Password"}
              placeholderTextColor={WHITE}
              onChangeText={(text) => setPassword(text)}
              defaultValue={password}
              secureTextEntry={true}
            />
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../assets/password-icon.png")}
            />
          </View>
        </View>
        <View style={styles.midFlex}>
          <View style={styles.checkBox}>
            <CheckBox
              style={styles.checkBoxIcon}
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
              isChecked={rememberMe}
              checkBoxColor={LIGHT_PURPLE}
              checkedCheckBoxColor={SELECTED_BUTTON}
            />
            <Text style={styles.checkBoxText}>Remember me</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.registerButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            checkValidate(email);

            signIn({ navigation }, email, password);
          }}
        >
          <View style={styles.loginButtonView}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.field}>
          <Text style={styles.label}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

//🇦🇺 🇦🇺
