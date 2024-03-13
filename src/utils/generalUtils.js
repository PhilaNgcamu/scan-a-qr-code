import { Linking, TouchableOpacity } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import Icon from "@expo/vector-icons/FontAwesome";

import {
  cameraShouldScan,
  setContacts,
  setErrorMessage,
  setIsModalOpen,
  setIsSameQrCode,
} from "../redux/actions";
import { getAllContacts } from "./databaseUtils";

export const renderDetail = (label, value, link = null) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const contactInformation = (
    <Text
      style={{
        fontSize: 18,
        paddingRight: 45,
      }}
    >
      {" "}
      {value}
    </Text>
  );

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingLeft={15}
      paddingTop={10}
    >
      {label && label.iconName && (
        <Text>
          <Icon name={label.iconName} size={20} /> :
        </Text>
      )}

      {link ? (
        <TouchableOpacity onPress={() => openLink(link)}>
          {contactInformation}
        </TouchableOpacity>
      ) : (
        contactInformation
      )}
    </Box>
  );
};

export const checkRequiredFields = (parsedData) => {
  const requiredFields = ["name", "email", "profilePic"];

  return requiredFields.filter((field) => !parsedData[field]);
};

export const fetchContactsFromDatabase = async (dispatch) => {
  const contactsData = await getAllContacts();
  dispatch(setContacts(contactsData || []));
};

export const closeModal = (dispatch) => {
  dispatch(setIsModalOpen(false));
  dispatch(cameraShouldScan(true));
  dispatch(setIsSameQrCode(false));
  dispatch(setErrorMessage(null));
};
