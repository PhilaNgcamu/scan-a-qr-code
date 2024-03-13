import { TouchableOpacity } from "react-native";
import { Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function ScanQrCodeButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "#0275d8",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
      }}
    >
      <Ionicons name="scan" size={20} color="white" />
      <Text
        style={{
          color: "white",
          alignSelf: "center",
          marginLeft: 10,
        }}
      >
        Scan QR Code
      </Text>
    </TouchableOpacity>
  );
}
