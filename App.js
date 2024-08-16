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
  const [destination, setDestination] = useState({
    latitude: -26.2001,
    longitude: 28.0501,
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          setLocation(location.coords);
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          const startLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          fetchRoute(startLocation, destination);
        }
      } catch (error) {
        console.log("Error:", error);
        setErrorMessage(error.message);
      }
    })();
  }, []);

  const fetchRoute = async (startLocation, endLocation) => {
    try {
      const API_KEY = "AIzaSyAiS-wNj3d2m2LYryOSg4tG4NTei2TA5Os";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${API_KEY}&mode=driving`
      );

      if (response.data.routes.length > 0) {
        const points = response.data.routes[0].overview_polyline.points;
        const decodedPoints = decode(points);
        setPolylineCoordinates(
          decodedPoints.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      setErrorMessage("Error fetching route data.");
    }
  };

  const handleMarkerDragEnd = (e) => {
    const newLocation = e.nativeEvent.coordinate;
    setLocation(newLocation);
    fetchRoute(newLocation, destination);
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
            onDragEnd={handleMarkerDragEnd}
          >
            <Callout>
              <Text>You are here</Text>
            </Callout>
          </Marker>
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
          >
            <Callout>
              <Text>Destination</Text>
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
