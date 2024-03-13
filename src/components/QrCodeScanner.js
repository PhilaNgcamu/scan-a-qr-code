import { useEffect } from "react";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { Box } from "@gluestack-ui/themed";

import { setHasPermission } from "../redux/actions";

export default function QrCodeScanner({ onBarCodeScanned }) {
  const windowWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();

  const isScanned = useSelector((state) => state.isQrScanned);
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const hasPermission = useSelector((state) => state.hasPermission);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      dispatch(setHasPermission(status === "granted"));
    })();
  }, []);

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
      {!isModalOpen && hasPermission && (
        <Camera
          style={{
            flex: 1,
            width: "100%",
          }}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={isScanned ? undefined : onBarCodeScanned}
        />
      )}
    </Box>
  );
}
