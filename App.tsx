import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Platform,
  Text,
  View,
  Alert,
  Linking,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  const getPermission = async () => {
    (async () => {
      if (Platform.OS === "ios") {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
      }
    })();

    if (hasCameraPermission === undefined) {
      return <Text>Requesting permissions...</Text>;
    } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
      return Alert.alert(
        "Go to Settings?",
        "Would you like to go to Settings now to change the Camera and Camera Roll settings in order to take photos or select photos from your photo library?",
        [
          {
            text: "Sure",
            onPress: () => {
              // link to settings
              Linking.openURL("app-settings:");
            },
          },
          {
            text: "Not now",
            onPress: () => {
              console.log("Not now...");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Get Permssions" onPress={getPermission} />
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
