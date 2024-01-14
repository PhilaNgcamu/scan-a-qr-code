import { Linking, TouchableOpacity } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

export const renderDetail = (label, value, link = null) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <Box flexDirection="row" alignItems="center">
      {label && label.iconName && (
        <Text>
          <FontAwesome
            name={label.iconName}
            size={16}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text>{label && label.text ? ` ${label.text}: ` : ""}</Text>
        </Text>
      )}
      {link ? (
        <TouchableOpacity onPress={() => openLink(link)}>
          <Text>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text>{value}</Text>
      )}
    </Box>
  );
};

export const checkRequiredFields = (requiredFields, parsedData) =>
  requiredFields.filter((field) => !parsedData[field]);
