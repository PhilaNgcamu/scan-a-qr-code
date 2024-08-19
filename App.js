import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import MapView, {
  Callout,
  Marker,
  Polyline,
  AnimatedRegion,
} from "react-native-maps";
import axios from "axios";
import { decode } from "@mapbox/polyline";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { getGreatCircleBearing } from "geolib";
import { debounce } from "lodash";

export default function App() {
  const [location, setLocation] = useState({
    latitude: -26.118427,
    longitude: 27.890004,
  });
  const [region, setRegion] = useState({
    latitude: -26.118427,
    longitude: 27.890004,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [destination, setDestination] = useState({
    latitude: -26.2001,
    longitude: 28.0501,
  });
  const [heading, setHeading] = useState(0);
  const carPosition = useRef(
    new AnimatedRegion({
      latitude: -26.118427,
      longitude: 27.890004,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
  ).current;

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMessage("Permission to access location was denied");
          return;
        }

        let location = await Location.getLastKnownPositionAsync({});
        if (location) {
          setLocation(location.coords);
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));

          const startLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          fetchRoute(startLocation, destination);
        }

        const startTracking = async () => {
          try {
            await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                distanceInterval: 1, // Update every 100 meters
              },
              debounce((newLocation) => {
                const coords = newLocation.coords;
                setLocation(coords);
                setRegion((prevRegion) => ({
                  ...prevRegion,
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }));

                carPosition
                  .timing({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    duration: 1000,
                    useNativeDriver: false,
                  })
                  .start();

                if (mapRef.current) {
                  mapRef.current.animateCamera(
                    {
                      center: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                      },
                      pitch: 0,
                      heading: heading,
                      zoom: 18,
                    },
                    { duration: 1000 }
                  );
                }
              }, 500) // Debounce to reduce frequency of updates
            );
          } catch (error) {
            setErrorMessage("Error starting tracking: " + error.message);
          }
        };

        await startTracking();
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [carPosition, heading]);

  const fetchRoute = useCallback(async (startLocation, endLocation) => {
    try {
      const API_KEY = "AIzaSyAiS-wNj3d2m2LYryOSg4tG4NTei2TA5Os";
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${endLocation.latitude},${endLocation.longitude}&key=${API_KEY}&mode=driving&departure_time=now`
      );

      if (response.data.routes.length > 0) {
        const points = response.data.routes[0].overview_polyline.points;
        const decodedPoints = decode(points);
        const polylineCoords = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setPolylineCoordinates(polylineCoords);
      }
    } catch (error) {
      setErrorMessage("Error fetching route data.");
    }
  }, []);

  const handleMarkerDragEnd = useCallback(
    (e) => {
      const newLocation = e.nativeEvent.coordinate;
      setLocation(newLocation);
      fetchRoute(newLocation, destination);
    },
    [fetchRoute, destination]
  );

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} region={region}>
        <Marker draggable coordinate={location} onDragEnd={handleMarkerDragEnd}>
          <Callout>
            <Text>You are here</Text>
          </Callout>
        </Marker>
        <Marker coordinate={destination}>
          <Callout>
            <Text>Destination</Text>
          </Callout>
        </Marker>
        <Polyline
          coordinates={polylineCoordinates}
          strokeColor="#FF0000"
          strokeWidth={3}
        />
        <Marker.Animated
          coordinate={carPosition}
          title="Car"
          rotation={heading}
        >
          <View style={styles.carMarker}>
            <Text style={styles.carMarkerText}>🚗</Text>
          </View>
        </Marker.Animated>
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
  carMarker: {
    padding: 5,
    borderRadius: 10,
  },
  carMarkerText: {
    fontSize: 50,
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
