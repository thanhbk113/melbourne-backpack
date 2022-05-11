import { Image, ImageBackground, Text, View } from "react-native";
import styles from "./styles";
import { useFonts } from "expo-font";
import { widthPercentageToDP } from "react-native-responsive-screen";

// use replace instead of navigate to avoid the back button on Android
const SplashScreen = ({ navigation }) => {
  const [loaded, error] = useFonts({
    PoppinsExtraBold: require("../../../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // setTimeout(() => {
  //   navigation.replace("Onboarding");
  // }, 3000);
  return (
    <ImageBackground
      source={require("../../../assets/images/melbourne-bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://media4.giphy.com/media/h8gfzy5zmIEULnetC1/giphy.gif?cid=ecf05e47p7vm16248f5jql6e1q638ag2x6l1ufv7fd8lu14d&rid=giphy.gif&ct=s",
          }}
          style={styles.icon}
        />
        {/*<Image*/}
        {/*  source={require("../../../assets/adaptive-icon.png")}*/}
        {/*  style={styles.icon}*/}
        {/*/>*/}
        <Text style={styles.textTitle}>Melbourne {"\n"} Backpack</Text>
        <Text style={styles.description}>A mini-Melbourne in your pocket!</Text>
      </View>
      <View style={styles.holdText}>
        <Image
          source={require("../../../assets/Splash-1.png")}
          style={{
            width: widthPercentageToDP(85),
            height: 200,
            marginBottom: 30,
          }}
        />
        <Text style={styles.versionText}>Version 1.0</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
