import { Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

export default function ClickButton({ title, backgroundColor, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        backgroundColor: backgroundColor ? backgroundColor : "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );
}
