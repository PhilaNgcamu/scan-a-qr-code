import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Text, Box, View, Image } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { closeModal, renderDetail } from "../../utils/generalUtils";

export default function ContactDetailsScreen({ route }) {
  const { contact } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToCamera = () => {
    navigation.push("Camera Screen");
    closeModal(dispatch);
  };

  return (
    <View>
      <Box alignItems="center" justifyContent="center" marginTop={50}>
        {contact.profilePic && (
          <Image
            source={{ uri: contact.profilePic }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 5,
              marginBottom: 20,
            }}
            alt={contact.name}
          />
        )}
      </Box>

      <Box
        flexDirection="column"
        alignItems="start"
        paddingBottom={5}
        paddingTop={15}
        style={{ padding: 20 }}
      >
        {renderDetail({ iconName: "user" }, contact.name)}

        {contact.email &&
          renderDetail(
            { iconName: "envelope" },
            contact.email,
            `mailto:${contact.email}`
          )}

        {contact.status &&
          renderDetail({ iconName: "info-circle" }, contact.status)}

        {contact.github &&
          renderDetail({ iconName: "github" }, contact.github, contact.github)}

        {contact.linkedin &&
          renderDetail(
            { iconName: "linkedin" },
            contact.linkedin,
            contact.linkedin
          )}

        {contact.twitter &&
          renderDetail(
            { iconName: "twitter" },
            contact.twitter,
            contact.twitter
          )}

        {contact.personalWebsite &&
          renderDetail(
            { iconName: "globe" },
            contact.personalWebsite,
            contact.personalWebsite
          )}

        {contact.company &&
          renderDetail({ iconName: "building" }, contact.company)}

        {contact.companyURL &&
          renderDetail(
            { iconName: "globe" },
            contact.companyURL,
            contact.companyURL
          )}

        <TouchableOpacity
          onPress={navigateToCamera}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            backgroundColor: "green",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Feather name="camera" size={24} color="white" />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            Scan QR Code
          </Text>
        </TouchableOpacity>
      </Box>
    </View>
  );
}
