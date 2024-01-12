import { Modal, Text, Box } from "@gluestack-ui/themed";
import PersonDetails from "./PersonDetails";
import ClickButton from "./ClickButton";

export default function QrCodeModal({ isOpen, onClose, data, openLink }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Box
        backgroundColor="white"
        padding={20}
        borderRadius={8}
        alignItems="center"
      >
        {data ? (
          <Box>
            <PersonDetails personDetails={data} openLink={openLink} />

            <ClickButton title="Okay" onPress={onClose} />
          </Box>
        ) : (
          <Box>
            <Text fontSize={18} marginBottom={10}>
              Error: Invalid QR code or missing details
            </Text>
            <ClickButton
              title="Close"
              backgroundColor="red"
              onPress={onClose}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
}
