import { useSelector } from "react-redux";
import {
  Modal,
  Text,
  ModalBackdrop,
  ModalContent,
  View,
} from "@gluestack-ui/themed";

import PersonDetails from "./PersonDetails";
import ScanQrCodeButton from "./ScanQrCodeButton";

export default function DisplayContentModal({ onClose }) {
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const errorMessage = useSelector((state) => state.errorMessage);
  const isSameQrCode = useSelector((state) => state.isSameQrCode);
  const modalData = useSelector((state) => state.modalData);
  const displayExistingData = isSameQrCode ? null : modalData;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <ModalBackdrop />
      <ModalContent>
        {displayExistingData ? (
          <PersonDetails personDetails={displayExistingData} />
        ) : (
          <View>
            <Text
              fontSize={20}
              marginBottom={10}
              marginTop={20}
              fontWeight="bold"
              textAlign="center"
            >
              Oops!
            </Text>
            <Text fontSize={18} textAlign="center">
              {errorMessage}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <ScanQrCodeButton onPress={onClose} />
        </View>
      </ModalContent>
    </Modal>
  );
}
