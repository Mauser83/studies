import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import RepositoryList from '../../../components/RepositoryList/RepositoryList';  // Update the import based on the file structure
import { GET_REPOSITORIES } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';

// Mocking Apollo Client and GraphQL query result
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

// Sample mock data for repositories
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
          ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
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

describe('RepositoryList', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useQuery.mockReturnValue({
      loading: true,
      data: null,
      error: null,
    });

    render(
      <ApolloProvider client={{ cache: new InMemoryCache() }}>
        <RepositoryList />
      </ApolloProvider>
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders error state', () => {
    useQuery.mockReturnValue({
      loading: false,
      data: null,
      error: { message: 'Error fetching repositories' },
    });

    render(
      <ApolloProvider client={{ cache: new InMemoryCache() }}>
        <RepositoryList />
      </ApolloProvider>
    );

    expect(screen.getByText('Error: Error fetching repositories')).toBeTruthy();
  });

  it('renders repositories list when data is loaded', async () => {
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

    await waitFor(() => screen.getAllByTestId('repositoryItem'));

    expect(screen.getByText('jaredpalmer/formik')).toBeTruthy();
    expect(screen.getByText('rails/rails')).toBeTruthy();
    expect(screen.getByText('Ruby on Rails')).toBeTruthy();
  });
});
