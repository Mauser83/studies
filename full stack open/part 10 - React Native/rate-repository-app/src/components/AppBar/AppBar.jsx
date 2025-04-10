import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import useAuthStorage from "../../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  contentContainer: {
    gap: 10,
  },
});

const AppBar = ({ user }) => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/repositories");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        <Link to="/repositories">
          <AppBarTab tabName="Repositories" />
        </Link>
        {!user.me ? (
          <Link to="signin">
            <AppBarTab tabName="Sign in" />
          </Link>
        ) : (
          <Pressable onPress={() => signOut()}>
            <AppBarTab tabName="Sign out" />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
