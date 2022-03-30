import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import styles from "./styles";

const CommunityCardSmall = (props) => {
  return (
    <TouchableOpacity key={props.id} style={styles.card}>
      <ImageBackground
        resizeMode={"cover"}
        source={require("../../../../assets/images/avatar-placeholder.jpg")}
        style={styles.userImg}
        onPress={() => {
          props.navigation.navigate("Profile", {
            userID: props.id,
          });
        }}
      >
        <View style={styles.userContent}>
          <Image style={styles.userContentBackground} />
          <View style={styles.userContentRow}>
            <TouchableOpacity style={styles.detailBtn}>
              <Text style={styles.detailBtnText}>{props.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CommunityCardSmall;
