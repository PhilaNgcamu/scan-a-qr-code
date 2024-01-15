import { Modal, Text, Box } from "@gluestack-ui/themed";

import PersonDetails from "./PersonDetails";
import Button from "./Button";

export default function QrCodeModal({ isOpen, onClose, data, error }) {
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
            <PersonDetails personDetails={data} />

            <Button title="Press to Scan Again" onPress={onClose} />
          </Box>
        ) : (
          <Box>
            <Text
              fontSize={20}
              marginBottom={10}
              fontWeight="bold"
              textAlign="center"
            >
              Oops!
            </Text>
            <Text fontSize={18} marginBottom={10}>
              {error}
            </Text>

            <Button
              title="Try to Scan Again"
              backgroundColor="red"
              onPress={onClose}
            />
          </Box>
        )}
      </Box>
    </Modal>
  );
}
