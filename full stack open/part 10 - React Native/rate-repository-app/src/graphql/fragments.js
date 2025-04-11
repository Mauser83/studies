import { gql } from "@apollo/client";

export const REPOSITORY_FRAGMENT = gql`
    fragment RepositoryFragment on Repository {
        id
        ownerAvatarUrl
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
    }
`;