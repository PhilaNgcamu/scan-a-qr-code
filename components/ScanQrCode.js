import { useState, useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import yaml from "js-yaml";
import ClickButton from "./ClickButton";
import QrCodeScanner from "./QrCodeScanner";
import checkRequiredFields from "../util/util";
import QrCodeModal from "./QrCodeModal";

export default function ScanQrCode() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [shouldScan, setShouldScan] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const requiredFields = ["name", "email", "profilePic"];

  const handleBarCodeScanned = ({ data }) => {
    if (shouldScan) {
      processScannedData(data);
    }
  };

  const processScannedData = (data) => {
    try {
      const parsedData = yaml.safeLoad(data);

      const missingFields = checkRequiredFields(requiredFields, parsedData);

      if (missingFields.length > 0) {
        setIsModalOpen(true);
        setIsQrScanned(false);
        setShouldScan(false);
        return;
      }

      setModalData(parsedData);
      setIsModalOpen(true);
      setIsQrScanned(true);
      setShouldScan(false);
    } catch (error) {
      console.log("Error parsing QR data:", error);
    }
  };

  const handleScanAgain = () => {
    setIsQrScanned(false);
    setShouldScan(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setIsQrScanned(false);
    false;
  };

  if (cameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center" marginTop={100}>
      <Text fontSize={20} fontWeight="bold" marginBottom={20}>
        Find a QR Code
      </Text>
      <QrCodeScanner
        scanned={isQrScanned}
        onBarCodeScanned={handleBarCodeScanned}
      />
      <Box
        flex={1}
        width="100%"
        justifyContent="flex-start"
        alignItems="center"
        paddingHorizontal="5%"
      >
        {!shouldScan && !isModalOpen ? (
          <ClickButton title="Press to Scan Again" onPress={handleScanAgain} />
        ) : (
          ""
        )}
      </Box>
      <QrCodeModal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
    </Box>
  );
}
