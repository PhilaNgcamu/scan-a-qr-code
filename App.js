import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { decode } from "@mapbox/polyline";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          return;
        }

        // Watch user's location
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setLocation(location.coords);
            setRegion((prevRegion) => ({
              ...prevRegion,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }));

            // Update polyline
            const startLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            const endLocation = {
              latitude: -26.2001, // Replace with your actual end location latitude
              longitude: 28.0501, // Replace with your actual end location longitude
            };

            getGoogleInfo(startLocation, endLocation).then((polylinePoints) => {
              if (polylinePoints) {
                const decodedPoints = decode(polylinePoints);
                setPolylineCoordinates(
                  decodedPoints.map((point) => ({
                    latitude: point[0],
                    longitude: point[1],
                  }))
                );
              }
            });
          }
        );

        // Clean up the subscription on unmount
        return () => subscription.remove();
      } catch (error) {
        console.log("Error:", error);
        setErrorMessage(error.message);
      }
    })();
  }, []);

  const getGoogleInfo = async (startLocation, endLocation) => {
    try {
      const API_KEY = "AIzaSyAiS-wNj3d2m2LYryOSg4tG4NTei2TA5Os";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${API_KEY}&mode=driving`
      );

      if (response.data.routes.length > 0) {
        return response.data.routes[0].overview_polyline.points;
      }
      return null;
    } catch (error) {
      console.error("Error fetching route data:", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {location && (
          <Marker
            draggable
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
          >
            <Callout>
              <Text>You are here</Text>
            </Callout>
          </Marker>
        )}
        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#FF0000"
            strokeWidth={3}
          />
        )}
      </MapView>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "red",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
