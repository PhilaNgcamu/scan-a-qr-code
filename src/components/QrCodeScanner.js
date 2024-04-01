import React from "react";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { Box } from "@gluestack-ui/themed";

export default function QrCodeScanner({ onBarCodeScanned }) {
  const windowWidth = Dimensions.get("window").width;

  const isScanned = useSelector((state) => state.isQrScanned);
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const cameraPermission = useSelector((state) => state.cameraPermission);

  return (
    <Box
      flex={1}
      width={windowWidth * 0.8}
      justifyContent="center"
      alignItems="center"
      borderRadius={20}
      borderWidth={5}
      position="relative"
      bottom={45}
      opacity={isModalOpen ? 0 : 1}
      overflow="hidden"
      borderColor="#fff"
    >
      {!isModalOpen && cameraPermission && (
        <Camera
          style={{
            flex: 1,
            width: windowWidth * 0.8,
            aspectRatio: 1,
          }}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={isScanned ? undefined : onBarCodeScanned}
        />
      )}
    </Box>
  );
}
