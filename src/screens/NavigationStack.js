import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CameraScreen from "./camera_screen/CameraScreen";
import ContactListScreen from "./contact_list_screen/ContactListScreen";
import ContactDetailsScreen from "./contact_details_screen/ContactDetailsScreen";

const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact List" component={ContactListScreen} />
      <Stack.Screen name="Camera Screen" component={CameraScreen} />
      <Stack.Screen name="Contact Details" component={ContactDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function StackApp() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}
