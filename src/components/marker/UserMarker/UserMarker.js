import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";
import styles from "./UserMarker.style";

const UserMarker = ({ coordinates, userImageURl, onSelect }) => {
  return (
    <Marker coordinate={coordinates} onPress={onSelect}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: userImageURl }} />
      </View>
    </Marker>
  );
};

export default UserMarker;