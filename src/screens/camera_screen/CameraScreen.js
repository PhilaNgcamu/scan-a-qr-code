import React from "react";
import { TouchableOpacity } from "react-native";
import { GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { config } from "@gluestack-ui/config";
import { AntDesign } from "@expo/vector-icons";

import ScanQrCode from "../../components/ScanQrCode";

export default function CameraScreen() {
  const navigation = useNavigation();

  const navigateToContactList = () => {
    navigation.push("Contact List");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GluestackUIProvider config={config}>
        <ScanQrCode />
      </GluestackUIProvider>
      <TouchableOpacity
        onPress={navigateToContactList}
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          justifyContent: "center",
          backgroundColor: "#0275d8",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <AntDesign name="contacts" size={20} color="white" />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginLeft: 10,
          }}
        >
          View Contacts
        </Text>
      </TouchableOpacity>
    </View>
  );
}
