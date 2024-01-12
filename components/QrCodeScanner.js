import { Dimensions } from "react-native";
import { Box } from "@gluestack-ui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QrCodeScanner({ scanned, onBarCodeScanned }) {
  const windowWidth = Dimensions.get("window").width;

  return (
    <Box
      flex={1}
      width={windowWidth * 0.8}
      aspectRatio={4 / 3}
      justifyContent="center"
      alignItems="center"
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}
