import React from "react";
import renderer, { act } from "react-test-renderer";
import { Provider, useDispatch } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import qrCodeReducer from "../../redux/reducer";
import CameraScreen from "./CameraScreen";
import { getAllContacts, initDatabase } from "../../utils/databaseUtils";

const Stack = createStackNavigator();
const store = createStore(qrCodeReducer);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../utils/databaseUtils", () => ({
  ...jest.requireActual("../../utils/databaseUtils"),
  initDatabase: jest.fn(),
  fetchContactsFromDatabase: jest.fn(),
  getAllContacts: jest.fn(),
}));

function MockBarCodeScanner() {
  return <></>;
}

MockBarCodeScanner.requestPermissionsAsync = jest
  .fn()
  .mockResolvedValue({ status: "granted" });

jest.mock("expo-barcode-scanner", () => ({
  BarCodeScanner: MockBarCodeScanner,
}));

jest.mock("expo-camera", () => {
  return {
    Camera: {
      Constants: {
        Type: { back: "back" },
      },
      getDefaultProps: jest.fn(),
    },
  };
});

describe("CameraScreen", () => {
  let tree;

  beforeAll(async () => {
    useDispatch.mockReturnValue(jest.fn());

    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Camera Screen"
                component={CameraScreen}
              ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    });
  });

  it("should display the Camera screen", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should initialize the database", async () => {
    expect(initDatabase).toHaveBeenCalledTimes(1);
  });

  it("should scan the QR code", async () => {
    expect(MockBarCodeScanner.requestPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it("should fetch the contacts from the database", async () => {
    expect(getAllContacts).toHaveBeenCalledTimes(1);
  });
});
