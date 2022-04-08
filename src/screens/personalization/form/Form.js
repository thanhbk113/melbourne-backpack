import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PLACEHOLDER } from "../../../styles/colors";
import { pushData, uploadImage } from "../../../api/handleData";
import { auth } from "../../../config/firebase";
import Dropdown from "../../../components/dropdown/Dropdown";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

let data = ["Exchange", "Transfer", "Get Information"];

const Form = ({ navigation }) => {
  const [image, setImage] = useState("");

  // Information
  const [fullName, setFullName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [facebook, setFacebook] = useState("");
  const [bio, setBio] = useState("");

  const [fullNameValidate, setFullNameValidate] = useState({
    error: "",
    valid: false,
  });
  const [purposeValidate, setPurposeValidate] = useState({
    error: "",
    valid: false,
  });
  const [facebookValidate, setFacebookValidate] = useState({
    error: "",
    valid: false,
  });
  const [bioValidate, setBioValidate] = useState({ error: "", valid: false });
  const [imageValidate, setImageValidate] = useState({
    error: "",
    valid: false,
  });
  const [hasPermission, setHasPermission] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const onSelected = (item) => {
    setSelectedItem(item);
    setPurpose(item);
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    if (hasPermission === false) {
      window.alert(
        "No permission! Go to settings and allow Melbourne Backpack to access your library."
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  // handle font
  const [loaded, error] = useFonts({
    PoppinsSemiBold: require("../../../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const checkValidate = (component) => {
    if (component === image && image === "") {
      setImageValidate({ error: "*Avatar is required", valid: false });
    } else {
      setImageValidate({ error: "", valid: true });
    }
    if (component === fullName && fullName === "") {
      setFullNameValidate({ error: "*Full name is required", valid: false });
    } else {
      setFullNameValidate({ error: "", valid: true });
    }

    if (component === purpose && purpose === "") {
      setPurposeValidate({ error: "*Purpose is required", valid: false });
    } else {
      setPurposeValidate({ error: "", valid: true });
    }
    if (component === facebook && facebook === "") {
      setFacebookValidate({
        error: "*Facebook link is required",
        valid: false,
      });
    } else if (!facebook.includes("facebook.com/")) {
      setFacebookValidate({
        error: "*Facebook link must be format facebook.com/...",
        valid: false,
      });
    } else {
      setFacebookValidate({ error: "", valid: true });
    }
    if (component === bio && bio === "") {
      setBioValidate({ error: "*Introduction is required", valid: false });
    } else if (bio.length < 1) {
      setBioValidate({
        error: "*Introduction must be more than 100 words",
        valid: false,
      });
    } else {
      setBioValidate({ error: "", valid: true });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={pickImage}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={
                    image === ""
                      ? require("../../../../assets/avatar-default.png")
                      : { uri: image }
                  }
                  style={styles.avatarImage}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={styles.avatarText}>Upload avatar</Text>
                <Text style={styles.errorImage}>{imageValidate.error}</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder={"Full Name"}
              placeholderTextColor={PLACEHOLDER}
              onChangeText={(text) => {
                setFullName(text);
              }}
              defaultValue={fullName}
            />
            <View style={styles.errorHolder}>
              <Text style={styles.error}>{fullNameValidate.error}</Text>
            </View>

            <Dropdown
              data={data}
              onSelected={onSelected}
              value={selectedItem}
            />
            <View style={styles.errorHolder}>
              <Text style={styles.error}>{purposeValidate.error}</Text>
            </View>

            <TextInput
              style={styles.textInput}
              placeholder={"Facebook Link"}
              placeholderTextColor={PLACEHOLDER}
              onChangeText={(text) => {
                setFacebook(text);
              }}
              defaultValue={facebook}
            />
            <View style={styles.errorHolder}>
              <Text style={styles.error}>{facebookValidate.error}</Text>
            </View>

            <TextInput
              style={[styles.textInput, styles.introduction]}
              placeholder={"Introduce yourself"}
              placeholderTextColor={PLACEHOLDER}
              onChangeText={(text) => {
                setBio(text);
              }}
              defaultValue={bio}
            />
            <View style={styles.errorHolder}>
              <Text style={styles.error}>{bioValidate.error}</Text>
            </View>

            <View style={styles.textController}>
              <Text style={styles.normalText}>
                By submitting, you agree to our{" "}
              </Text>
              <Text style={styles.yellowText}>Terms, Data </Text>
              <Text style={styles.yellowText}>Policy </Text>
              <Text style={styles.normalText}>and </Text>
              <Text style={styles.yellowText}>Cookies Policy</Text>
            </View>
            {!(
              imageValidate.valid &&
              fullNameValidate.valid &&
              purposeValidate.valid &&
              facebookValidate.valid &&
              bioValidate.valid
            ) && (
              <TouchableOpacity
                onPress={() => {
                  checkValidate(image);
                  checkValidate(fullName);
                  checkValidate(purpose);
                  checkValidate(facebook);
                  checkValidate(bio);
                }}
              >
                <View style={styles.nextButtonView}>
                  <Text style={styles.nextButtonText}>Validate</Text>
                </View>
              </TouchableOpacity>
            )}
            {!(
              imageValidate.valid &&
              fullNameValidate.valid &&
              purposeValidate.valid &&
              facebookValidate.valid &&
              bioValidate.valid
            ) && (
              <TouchableOpacity onPress={() => navigation.navigate("Subject")}>
                <View style={styles.backButtonView}>
                  <Text style={styles.backButtonText}>Back</Text>
                </View>
              </TouchableOpacity>
            )}
            {imageValidate.valid &&
              fullNameValidate.valid &&
              purposeValidate.valid &&
              facebookValidate.valid &&
              bioValidate.valid && (
                <TouchableOpacity
                  onPress={() => {
                    pushData(
                      auth.currentUser.uid,
                      auth.currentUser?.email,
                      fullName,
                      purpose,
                      facebook,
                      bio
                    );
                    uploadImage(
                      image,
                      auth.currentUser.uid +
                        "." +
                        image
                          .substring(image.lastIndexOf("/") + 1)
                          .split(".")
                          .pop()
                    );
                    navigation.navigate("Ready");
                  }}
                >
                  <View style={styles.nextButtonView}>
                    <Text style={styles.nextButtonText}>Submit</Text>
                  </View>
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Form;
