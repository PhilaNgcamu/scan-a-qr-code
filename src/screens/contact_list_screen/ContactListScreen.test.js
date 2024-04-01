import React from "react";
import renderer, { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import qrCodeReducer from "../../redux/reducer";
import ContactListScreen from "./ContactListScreen";
import { fetchContactsFromDatabase } from "../../utils/generalUtils";

const Stack = createStackNavigator();
const store = createStore(qrCodeReducer);

jest.mock("../../utils/generalUtils", () => ({
  fetchContactsFromDatabase: jest.fn(),
}));

describe("ContactListScreen", () => {
  let tree;

  beforeAll(async () => {
    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Contact List" component={ContactListScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    });
  });

  it("should display the Contact List screen", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should fetch the contacts from the database", async () => {
    expect(fetchContactsFromDatabase).toHaveBeenCalledTimes(1);
  });

  it("should display a message if there are no contacts", async () => {
    expect(
      tree.root.findAllByProps({
        children: "No contacts displayed. Please scan the QR code.",
      })
    ).toBeTruthy();
  });

  it("display a 'Scan QR Code' button", async () => {
    expect(tree.root.findAllByType({ children: "Scan QR Code" })).toBeTruthy();
  });
});
