import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import ScanQrCode from "./components/ScanQrCode";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <ScanQrCode />
    </GluestackUIProvider>
  );
}
