import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import CameraScreen from "./camera_screen/CameraScreen";
import ContactListScreen from "./contact_list_screen/ContactListScreen";
import ContactDetailsScreen from "./contact_details_screen/ContactDetailsScreen";
import { isContactStarred } from "../redux/actions";

const Stack = createStackNavigator();

function NavigationStack() {
  const dispatch = useDispatch();
  const starIcon = useSelector((state) => state.isContactStarred);
  const toggleStarIcon = () => {
    dispatch(isContactStarred());
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact List" component={ContactListScreen} />
      <Stack.Screen name="Camera Screen" component={CameraScreen} />
      <Stack.Screen
        name="Contact Details"
        component={ContactDetailsScreen}
        options={({ route }) => ({
          title: "Contact Details",
          headerRight: () => (
            <TouchableOpacity onPress={route.params?.toggleStarIcon}>
              <AntDesign name={starIcon} size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
        })}
        initialParams={{ toggleStarIcon }}
      />
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
