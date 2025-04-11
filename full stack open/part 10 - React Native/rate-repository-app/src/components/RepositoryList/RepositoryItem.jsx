import { View, Image, StyleSheet, Platform, Pressable } from "react-native";
import { useParams, Link } from "react-router-native";
import * as Linking from "expo-linking";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../../graphql/queries";
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
  ratingSection: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  bottomSection: {
    padding: 10,
  },
});

const RepositoryItem = ({ item, singleView }) => {
  if (singleView) {
    const { repositoryId } = useParams();


  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const openLink = () => {
    if (Platform.OS === "web") {
      window.open(data.repository.url, "_blank");
    } else {
      Linking.openURL(data.repository.url);
    }
  };

  console.log(data.repository);

    return (
        <View style={styles.container} testID="repositoryItem">
          <View style={styles.topSection}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: data.repository.ownerAvatarUrl }}
              />
            </View>
            <View style={styles.textContainer}>
              <RepositoryName item={data.repository} />
              <RepositoryDescription item={data.repository} />
              <RepositoryLanguage item={data.repository} />
            </View>
          </View>
          <View style={styles.ratingSection}>
            <CountsTab item={data.repository} type="stars" />
            <CountsTab item={data.repository} type="forks" />
            <CountsTab item={data.repository} type="reviews" />
            <CountsTab item={data.repository} type="rating" />
          </View>
          <View style={styles.bottomSection}>
            <Pressable onPress={openLink}><Text button="primary">Open in GitHub</Text></Pressable>
          </View>
        </View>
    );
  } else {
    return (
      <Link key={item.id} to={`/repositories/${item.id}`}>
        <View style={styles.container} testID="repositoryItem">
          <View style={styles.topSection}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: item.ownerAvatarUrl }}
              />
            </View>
            <View style={styles.textContainer}>
              <RepositoryName item={item} />
              <RepositoryDescription item={item} />
              <RepositoryLanguage item={item} />
            </View>
          </View>
          <View style={styles.ratingSection}>
            <CountsTab item={item} type="stars" />
            <CountsTab item={item} type="forks" />
            <CountsTab item={item} type="reviews" />
            <CountsTab item={item} type="rating" />
          </View>
        </View>
      </Link>
    );
  }
};

export default RepositoryItem;
