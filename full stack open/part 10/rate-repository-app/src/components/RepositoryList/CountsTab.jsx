import Text from "../Text";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  countsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    paddingBottom: 5,
  }
});

const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

const CountsTab = ({ item, type }) => {
  switch (type) {
    case "stars":
      return (
        <>
          <View style={styles.countsContainer}>
            <Text style={styles.text} fontWeight="bold">{formatNumber(item.stargazersCount)}</Text>
            <Text style={styles.text}>Stars</Text>
          </View>
        </>
      );
    case "forks":
      return (
        <>
          <View style={styles.countsContainer}>
            <Text style={styles.text} fontWeight="bold">{formatNumber(item.forksCount)}</Text>
            <Text style={styles.text}>Forks</Text>
          </View>
        </>
      );
    case "reviews":
      return (
        <>
          <View style={styles.countsContainer}>
            <Text style={styles.text} fontWeight="bold">{item.reviewCount}</Text>
            <Text style={styles.text}>Reviews</Text>
          </View>
        </>
      );
    case "rating":
      return (
        <>
          <View style={styles.countsContainer}>
            <Text style={styles.text} fontWeight="bold">{item.ratingAverage}</Text>
            <Text style={styles.text}>Rating</Text>
          </View>
        </>
      );
  }
};

export default CountsTab;
