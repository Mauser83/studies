import Text from "../Text";

const RepositoryDescription = ({ item }) => {
  return (
    <Text fontSize="subheading" paddings="paddingsNotBottom" textWrap="flexWrap">{item.description}</Text>

  );
};

export default RepositoryDescription;
