import { Linking, TouchableOpacity } from "react-native";
import { Box, Text, Image } from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";

const renderDetail = (label, value, link = null) => {
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

export default function PersonDetails({ personDetails }) {
  return (
    <Box width="100%">
      {personDetails.profilePic && (
        <Box
          alignItems="center"
          justifyContent="center"
          style={{ marginVertical: 10 }}
        >
          <TouchableOpacity onPress={() => openLink(personDetails.linkedin)}>
            <Image
              source={{ uri: personDetails.profilePic }}
              alt={personDetails.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        </Box>
      )}
      {renderDetail({ iconName: "user", text: "Name" }, personDetails.name)}
      {renderDetail(
        { iconName: "envelope", text: "Email" },
        personDetails.email,
        `mailto:${personDetails.email}`
      )}
      {personDetails.status &&
        renderDetail(
          { iconName: "info-circle", text: "Status" },
          personDetails.status
        )}
      {personDetails.github &&
        renderDetail(
          { iconName: "github", text: "GitHub" },
          personDetails.github,
          personDetails.github
        )}
      {personDetails.linkedin &&
        renderDetail(
          { iconName: "linkedin", text: "LinkedIn" },
          personDetails.linkedin,
          personDetails.linkedin
        )}
      {personDetails.twitter &&
        renderDetail(
          { iconName: "twitter", text: "Twitter" },
          personDetails.twitter,
          personDetails.twitter
        )}
      {personDetails.personalWebsite &&
        renderDetail(
          { iconName: "globe", text: "Personal Website" },
          personDetails.personalWebsite,
          personDetails.personalWebsite
        )}
      {personDetails.company &&
        renderDetail(
          { iconName: "building", text: "Company" },
          personDetails.company
        )}
      {personDetails.companyURL &&
        renderDetail(
          { iconName: "globe", text: "Company Website" },
          personDetails.companyURL,
          personDetails.companyURL
        )}
    </Box>
  );
}
