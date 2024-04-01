import React from "react";
import renderer, { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import qrCodeReducer from "../../redux/reducer";
import ContactDetailsScreen from "./ContactDetailsScreen";
import { renderDetail } from "../../utils/generalUtils";

const Stack = createStackNavigator();
const store = createStore(qrCodeReducer);

jest.mock("../../utils/generalUtils", () => ({
  closeModal: jest.fn(),
  renderDetail: jest.fn(),
  openLink: jest.fn(),
}));

describe("ContactDetailsScreen", () => {
  let tree;

  beforeAll(async () => {
    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Contact Details"
                initialParams={{
                  contact: {
                    company: "CodeHub",
                    companyURL: "https://codehub.com",
                    email: "john.smith@example.com",
                    github: "https://github.com/john_smith",
                    id: 1,
                    linkedin: "https://linkedin.com/in/johnsmith",
                    name: "John Smith",
                    personalWebsite: "https://johnsmith.dev",
                    profilePic:
                      "https://source.unsplash.com/man-wearing-eyeglasses-K84vnnzxmTQ",
                    status: "Full Stack Developer at CodeHub",
                    twitter: "https://twitter.com/john_tweets",
                  },
                }}
              >
                {({ route }) => (
                  <ContactDetailsScreen route={{ params: route.params }} />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    });
  });

  it("should display the Contact Details screen", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should display the contact details", async () => {
    expect(renderDetail).toHaveBeenCalledTimes(9);
  });
});
