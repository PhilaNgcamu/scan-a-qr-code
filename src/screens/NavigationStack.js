import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CameraScreen from "./CameraScreen";
import ContactListScreen from "./ContactListScreen";
import ContactDetailsScreen from "./ContactDetailsScreen";

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
