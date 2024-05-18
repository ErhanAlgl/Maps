import React, { useRef, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import useFetch from "./hooks/useFetch";
import responseMaps from "./hooks/useFetch";
import Loading from "./components/Loading/Loading";

import UserMarker from "./components/marker/UserMarker";
import InfoCard from "./components/InfoCard/";

export default function App() {
  const mapRef = useRef();
  const [user, setUser] = useState();
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  const { data, loading, error } = useFetch(responseMaps);

  const renderUserMarker = () => {
    return data.map(
      ({
        id,
        first_name,
        last_name,
        username,
        avatar,
        address: { coordinates },
      }) => {
        return (
          <UserMarker
            key={id}
            coordinates={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
            userImageURl={avatar}
            onSelect={() =>
              handleMarkerSelect(coordinates, {
                first_name,
                last_name,
                username
              })
            }
          />
        );
      }
    );
  };

  const handleMarkerSelect = (coor, selectedUser) => {
    setUser(selectedUser);
    handleModalVisibility();
    mapRef.current.animateToRegion({
      latitude: coor.lat,
      longitude: coor.lng,
      latitudeDelta: 10,
      longitudeDelta: 10,
    });
  };

  const handleModalVisibility = () => {
    setInfoModalVisibility(!infoModalVisibility);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        showsMyLocationButton
        showsUserLocation
      >
        {data && renderUserMarker()}
      </MapView>
      {loading && <Loading />}
      {user && (
        <InfoCard
          user={user}
          visible={infoModalVisibility}
          close={handleModalVisibility}
        />
      )}
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
});
