import { View, Image, StyleSheet } from "react-native";
import Text from "../Text";
import RepositoryName from "./RepositoryName";
import RepositoryDescription from "./RepositoryDescription";
import RepositoryLanguage from "./RepositoryLanguage";
import theme from "../theme";
import CountsTab from "./CountsTab";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  container: {
    flexDirection: "column",
    backgroundColor: theme.bgColor.white,
  },
  topSection: {
    flexDirection: "row",
  },
  avatarContainer: {
    padding: 10,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  bottomSection: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topSection}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={styles.textContainer}>
          <RepositoryName item={item}/>
          <RepositoryDescription item={item}/>
          <RepositoryLanguage item={item}/>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <CountsTab item={item} type="stars"/>
        <CountsTab item={item} type="forks"/>
        <CountsTab item={item} type="reviews"/>
        <CountsTab item={item} type="rating"/>
      </View>
    </View>
  );
};

export default RepositoryItem;
