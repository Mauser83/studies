import * as yup from "yup";
import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

import Text from "../Text";
import theme from "../theme";
import useSignIn from "../../hooks/useSignIn";
import useAuthStorage from "../../hooks/useAuthStorage";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be atleast 3 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be atleast 5 characters long")
    .required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgColor.white,
    padding: 10,
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.bgColor.lightGray,
    borderRadius: 5,
    width: "100%",
    padding: 10,
    color: theme.colors.textPrimary,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    color: "#d73a4a",
    alignSelf: "flex-start",
  },
});

const initialValues = {
  username: "",
  password: "",
};

export const SignInContainer = ({ onSubmit, loginError }) => {
  const [focusedField, setFocusedField] = useState(null);

  // const login = async (values) => {
  //   onSubmit(values);
  // };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => { onSubmit(values)},
  });

  return (
    <View style={styles.container}>
      {loginError && <Text style={styles.errorContainer}>{loginError}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              formik.touched.username && formik.errors.username
                ? "red"
                : focusedField === "username"
                ? theme.bgColor.primary
                : theme.bgColor.lightGray,
          },
        ]}
        placeholder="Username"
        placeholderTextColor={theme.bgColor.lightGray}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        keyboardType="default"
        onFocus={() => setFocusedField("username")}
        onBlur={() => setFocusedField(null)}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorContainer}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              formik.touched.password && formik.errors.password
                ? "red"
                : focusedField === "password"
                ? theme.bgColor.primary
                : theme.bgColor.lightGray,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={theme.bgColor.lightGray}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={true}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField(null)}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorContainer}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.buttonContainer} onPress={formik.handleSubmit}>
        <Text button="primary">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [loginError, setLoginError] = useState(null);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      await authStorage.setAccessToken(result);
      apolloClient.resetStore();
      navigate("/repositories");
    } catch (error) {
      setLoginError("Invalid username or password");
    }
  };

  return <SignInContainer onSubmit={onSubmit} loginError={loginError} />;
};

export default SignIn;
