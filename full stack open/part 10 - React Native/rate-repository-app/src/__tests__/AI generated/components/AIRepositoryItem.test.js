import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import RepositoryItem from "../../../components/RepositoryList/RepositoryItem"; // Update based on file structure
import { useQuery } from "@apollo/client";
import { ApolloProvider, InMemoryCache } from "@apollo/client";
import RepositoryList from "../../../components/RepositoryList/RepositoryList"; // Update the import based on the file structure

// Sample mock data
const mockRepositoriesData = {
  repositories: {
    edges: [
      {
        node: {
          id: "1",
          fullName: "jaredpalmer/formik",
          description: "Build forms in React, without the tears",
          language: "TypeScript",
          forksCount: 1589,
          stargazersCount: 21553,
          ratingAverage: 88,
          reviewCount: 4,
          ownerAvatarUrl:
            "https://avatars2.githubusercontent.com/u/4060187?v=4",
        },
      },
      {
        node: {
          id: "2",
          fullName: "rails/rails",
          description: "Ruby on Rails",
          language: "Ruby",
          forksCount: 18349,
          stargazersCount: 45377,
          ratingAverage: 100,
          reviewCount: 2,
          ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
        },
      },
    ],
  },
};

// Mock the Apollo Client hook
jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useQuery: jest.fn(),
}));

describe("RepositoryList", () => {
  it("renders repositories list when data is loaded", async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: mockRepositoriesData,
      error: null,
    });

    render(
      <ApolloProvider client={{ cache: new InMemoryCache() }}>
        <RepositoryList />
      </ApolloProvider>
    );

    // Wait for the elements with testID "repositoryItem" to appear
    await waitFor(() => screen.getAllByTestId("repositoryItem"));

    // Retrieve all repository items
    const repositoryItems = screen.getAllByTestId("repositoryItem");
    const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

    // Use regular expressions to check the content of the first repository item
    expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/); // Match "jaredpalmer/formik"
    expect(firstRepositoryItem).toHaveTextContent(
      /Build forms in React, without the tears/
    ); // Match description
    expect(firstRepositoryItem).toHaveTextContent(/TypeScript/); // Match language
    expect(firstRepositoryItem).toHaveTextContent(/21\.6k/); // Match formatted stars (21.6k)
    expect(firstRepositoryItem).toHaveTextContent(/1\.6k/); // Match formatted forks (1.6k)

    // Use regular expressions to check the content of the second repository item
    expect(secondRepositoryItem).toHaveTextContent(/rails\/rails/); // Match "rails/rails"
    expect(secondRepositoryItem).toHaveTextContent(/Ruby on Rails/); // Match description
    expect(secondRepositoryItem).toHaveTextContent(/Ruby/); // Match language
    expect(secondRepositoryItem).toHaveTextContent(/45\.4k/); // Match formatted stars (45.4k)
    expect(secondRepositoryItem).toHaveTextContent(/18\.3k/); // Match formatted forks (18.3k)  });
  });
});
