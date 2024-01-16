import { TouchableOpacity } from "react-native";
import { Text } from "@gluestack-ui/themed";

export default function Button({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        Press to Scan QR Code
      </Text>
    </TouchableOpacity>
  );
}
