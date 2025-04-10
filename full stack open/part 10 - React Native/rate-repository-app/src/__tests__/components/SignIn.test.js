import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn/SignIn";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import { NativeRouter } from "react-router-native";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // Mock the onSubmit function
      const onSubmit = jest.fn();

      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={onSubmit} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Simulate user interaction with form fields
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for the form submission to be handled and assert onSubmit is called once
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

      // Assert the correct arguments were passed to onSubmit
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
    it("displays error message when invalid credentials are provided", async () => {
      const loginError = "Invalid username or password"; // Simulate error message from the backend or validation

      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={jest.fn()} loginError={loginError} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Simulate user entering invalid credentials
      fireEvent.changeText(
        screen.getByPlaceholderText("Username"),
        "invalidUser"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Password"),
        "wrongPassword"
      );
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for the error message to appear
      await waitFor(() => screen.getByText(loginError));

      // Check that the error message is shown
      expect(screen.getByText(loginError)).toBeTruthy();
    });
    it("shows validation error for empty username field", async () => {
      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={jest.fn()} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Try submitting with empty fields
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for validation to finish
      await waitFor(() => screen.getByText("Username is required"));

      // Assert that the validation error is displayed for username
      expect(screen.getByText("Username is required")).toBeTruthy();
    });

    it("shows validation error for short username", async () => {
      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={jest.fn()} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Simulate user entering a short username
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "ka");

      // Try submitting the form
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for validation to finish
      await waitFor(() => screen.getByText("Username must be atleast 3 characters long"));

      // Assert that the validation error is displayed for username
      expect(screen.getByText("Username must be atleast 3 characters long")).toBeTruthy();
    });

    it("shows validation error for empty password field", async () => {
      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={jest.fn()} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Try submitting with empty fields
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for validation to finish
      await waitFor(() => screen.getByText("Password is required"));

      // Assert that the validation error is displayed for password
      expect(screen.getByText("Password is required")).toBeTruthy();
    });

    it("shows validation error for short password", async () => {
      render(
        <NativeRouter>
          <ApolloProvider client={{ cache: new InMemoryCache() }}>
            <SignInContainer onSubmit={jest.fn()} />
          </ApolloProvider>
        </NativeRouter>
      );

      // Simulate user entering a short password
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "1234");

      // Try submitting the form
      fireEvent.press(screen.getByText("Sign in"));

      // Wait for validation to finish
      await waitFor(() => screen.getByText("Password must be atleast 5 characters long"));

      // Assert that the validation error is displayed for password
      expect(screen.getByText("Password must be atleast 5 characters long")).toBeTruthy();
    });
  });
});