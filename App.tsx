import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  const getCameraPermissions = async () => {
    // useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
    // },[];
  };

  // if (hasCameraPermission === undefined) {
  //   return alert("Checking camera and photo gallery permissions...");
  // } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
  //   return alert(
  //     "Go to Settings if you change your mind about Camera and Photo Gallery permissions."
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Get Permissions" onPress={getCameraPermissions} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
  },
});
