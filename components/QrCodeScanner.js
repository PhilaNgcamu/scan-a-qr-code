import { Dimensions } from "react-native";
import { Box } from "@gluestack-ui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QrCodeScanner({
  scanned,
  onBarCodeScanned,
  isModalOpen,
}) {
  const windowWidth = Dimensions.get("window").width;

  return (
    <Box
      flex={1}
      width={windowWidth * 0.8}
      justifyContent="center"
      marginBottom={50}
      alignItems="center"
      opacity={isModalOpen ? 0 : 1}
    >
      {!isModalOpen && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Box>
  );
}
