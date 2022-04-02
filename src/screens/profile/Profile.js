import { Image, View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { WHITE } from "../../styles/colors";

const data = [
  {
    id: "1",
    name: "agagag",
    campus: "sgs",
    photo: "../../../assets/images/avatar-placeholder.jpg",
    facebook: "facebook.com/user/123235780432",
    bio: "abcdefghjdfafeffijfkadlsjfvalrwerwerwerdasddasdasdsadsadsadadsadsadsadskdjlsadjaskldjsladsdsadsdasdasdasdasds",
  },
  {
    id: "2",
    name: "bbbbb",
    campus: "sgs",
    photo: "../../../assets/images/avatar-placeholder.jpg",
    facebook: "facebook.com/user/124535",
    bio: "abcdefghjdfafeffijfkadlsjfvalrwerwerwer",
  },
  {
    id: "3",
    name: "ccccc",
    campus: "sgs",
    photo: "../../../assets/images/avatar-placeholder.jpg",
    facebook: "facebook.com/user/126235",
    bio: "abcdefghjdfafeffijfkadlsjfvalrwerwerwer",
  },
  {
    id: "4",
    name: "ddddd",
    campus: "sgs",
    photo: "../../../assets/images/avatar-placeholder.jpg",
    facebook: "facebook.com/user/123275",
    bio: "abcdefghjdfafeffijfkadlsjfvalrwerwerwer",
  },
];

const Profile = ({ route, navigation: { goBack } }) => {
  const id = route.params.id;
  const self = "2";
  return (
    <ScrollView style={styles.background}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign
            name={"left"}
            size={24}
            color={WHITE}
            style={styles.backBtn}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      {data.map((user) => {
        console.log(user.id === id);
        console.log(route);
        if (user.id.toString() === id.toString()) {
          return (
            <View key={user.id}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={require("../../../assets/images/avatar-placeholder.jpg")}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.userContentDisplay}>
                <View style={styles.userContentRow}>
                  <View style={styles.userContentHeadingWrapper}>
                    <Text style={styles.userContentHeading}>Display Name</Text>
                  </View>
                  <View style={styles.userContentWrapper}>
                    <Text style={styles.userContent}>{user.name}</Text>
                  </View>
                </View>
                <View style={styles.userContentRow}>
                  <View style={styles.userContentHeadingWrapper}>
                    <Text style={styles.userContentHeading}>Campus</Text>
                  </View>
                  <View style={styles.userContentWrapper}>
                    <Text style={styles.userContent}>{user.campus}</Text>
                  </View>
                </View>
                <View style={styles.userContentRow}>
                  <View style={styles.userContentHeadingWrapper}>
                    <Text style={styles.userContentHeading}>Facebook Link</Text>
                  </View>
                  <View style={styles.userContentWrapper}>
                    <Text style={styles.userContent}>{user.facebook}</Text>
                  </View>
                </View>
                <View
                  style={[styles.userContentRow, styles.userContentLastRow]}
                >
                  <View style={styles.userContentHeadingWrapper}>
                    <Text style={styles.userContentHeading}>Bio</Text>
                  </View>
                  <View style={styles.userContentWrapper}>
                    <Text style={styles.userContent}>{user.bio}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }
      })}
      {id.toString() === self.toString() ? (
        <View style={styles.logoutBtnWrapper}>
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        console.log("id: " + id + "self: " + self)
      )}
    </ScrollView>
  );
};

export default Profile;
