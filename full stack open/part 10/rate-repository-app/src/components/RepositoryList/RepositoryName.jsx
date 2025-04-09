import Text from "../Text";

const RepositoryName = ({ item }) => {
  return (
    <Text fontWeight="bold" fontSize="subheading" paddings="paddingsNotBottom">
      {item.fullName}
    </Text>
  );
};

export default RepositoryName;
