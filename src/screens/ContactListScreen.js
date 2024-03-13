import { useEffect } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, View, FlatList, Image } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setIsLoading } from "../redux/actions";
import ScanQrCodeButton from "../components/ScanQrCodeButton";
import { closeModal, fetchContactsFromDatabase } from "../utils/generalUtils";

export default function ContactListScreen({ navigation }) {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts);
  const isLoading = useSelector((state) => state.isLoading);
  const errorMessage = useSelector((state) => state.errorMessage);

  const specificErrorMessage =
    "No contacts displayed. Please scan the QR code.";

  const navigateToScreen = (screenToNavigateTo, contact) => {
    if (contact) {
      navigation.push(screenToNavigateTo, { contact });
    } else {
      navigation.navigate(screenToNavigateTo);
    }
    closeModal(dispatch);
    dispatch(setErrorMessage(specificErrorMessage));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      await fetchContactsFromDatabase(dispatch);
      if (!contacts.length) {
        throw new Error(specificErrorMessage);
      }
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToScreen("Contact Details", item)}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "#ddd",
        }}
      >
        {item.profilePic && (
          <Image
            source={{ uri: item.profilePic }}
            style={{ width: 60, height: 60, borderRadius: 10, marginRight: 15 }}
            alt={item.name}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          {item.status && (
            <Text style={{ color: "#555" }}>Status: {item.status}</Text>
          )}
        </View>

        <AntDesign name="arrowright" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0275d8"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : !contacts.length ? (
        <View>
          <AntDesign
            name="contacts"
            size={100}
            color="black"
            style={{ textAlign: "center", marginTop: 50 }}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontSize: 20,
              padding: 20,
            }}
          >
            {errorMessage}
          </Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        <ScanQrCodeButton onPress={() => navigateToScreen("Camera Screen")} />
      </View>
    </View>
  );
}
