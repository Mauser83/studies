import Text from "../Text";

const RepositoryLanguage = ({ item }) => {
  return (
    <Text fontSize="subheading" bgStyle="primary">
      {item.language}
    </Text>
  );
};

export default RepositoryLanguage;
