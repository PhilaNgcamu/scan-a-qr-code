import { createStore } from "redux";
import qrCodeReducer from "./reducer";

const store = createStore(qrCodeReducer);

export default store;
