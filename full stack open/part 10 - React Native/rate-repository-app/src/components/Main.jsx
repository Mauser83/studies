import { StyleSheet, View, Text } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import AppBar from "./AppBar/AppBar";
import RepositoryList from "./RepositoryList/RepositoryList";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import SignIn from "./SignIn/SignIn";
import { GET_USER } from "../graphql/queries";
import theme from "./theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.bgColor.lightGray,
  },
});

const Main = () => {
  const { data: user, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <AppBar user={user}/>
        <Routes>
          <Route path="/repositories" element={<RepositoryList />} />
          <Route path="/repositories/:repositoryId" element={<RepositoryItem singleView={true}/>} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/repositories" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
