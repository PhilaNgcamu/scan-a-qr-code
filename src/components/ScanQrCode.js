import { useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Text } from "@gluestack-ui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import yaml from "js-yaml";

import {
  checkRequiredFields,
  closeModal,
  fetchContactsFromDatabase,
} from "../utils/generalUtils";
import { addContact, initDatabase } from "../utils/databaseUtils";
import QrCodeScanner from "./QrCodeScanner";
import DisplayContentModal from "./DisplayContentModal";
import {
  cameraShouldScan,
  setCameraPermission,
  setIsModalOpen,
  updateModalData,
  setErrorMessage,
  setIsSameQrCode,
} from "../redux/actions";

export default function ScanQrCode() {
  const dispatch = useDispatch();
  const cameraPermission = useSelector((state) => state.cameraPermission);
  const shouldScan = useSelector((state) => state.shouldScan);
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    initDatabase();
    fetchContactsFromDatabase(dispatch);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCameraPermission(null));
      checkCameraPermission();
    }, [dispatch])
  );

  const checkCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    dispatch(setCameraPermission(status === "granted"));
  };

  const handleBarCodeScanned = ({ data }) => {
    if (shouldScan) {
      processScannedData(data);
    }
  };

  const processScannedData = async (data) => {
    try {
      const parsedData = yaml.safeLoad(data);
      const missingFields = checkRequiredFields(parsedData);

      if (missingFields.length > 0) {
        dispatch(cameraShouldScan(false));
        dispatch(setIsSameQrCode(true));

        throw new Error(
          "An error occurred while processing the QR code. Please try again."
        );
      }

      const doesContactExist = contacts.filter(
        (contact) => contact.email === parsedData.email
      );

      if (doesContactExist.length > 0) {
        dispatch(setIsSameQrCode(true));

        throw new Error("Cannot add the same QR code twice. Please try again.");
      }

      dispatch(updateModalData(parsedData));

      await addContact(parsedData);
      await fetchContactsFromDatabase(dispatch);

      dispatch(cameraShouldScan(true));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(cameraShouldScan(false));
    } finally {
      dispatch(cameraShouldScan(false));
      dispatch(setIsModalOpen(true));
    }
  };

  if (cameraPermission === null) {
    return <ActivityIndicator size="large" />;
  }

  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center" marginTop={50}>
      <QrCodeScanner onBarCodeScanned={handleBarCodeScanned} />
      <DisplayContentModal onClose={() => closeModal(dispatch)} />
    </Box>
  );
}
