import { Provider } from "react-redux";
import StackApp from "./src/screens/NavigationStack";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StackApp />
    </Provider>
  );
}
