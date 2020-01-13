import React, { useState, useEffect } from "react";
import { Button, Image, Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/react-hooks";
import AwesomeAlert from 'react-native-awesome-alerts';
import gql from "graphql-tag";
import EventDetail from "./EventDetail";

function Presence({ navigation }) {
  const idEvent = navigation.state.params.idEvent;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [state, setState] = useState({
    showAlert: false
  });

  const MUTATION = gql`
    mutation($file: Upload!, $eventId: ID!) {
      compareImage(file: $file, eventId: $eventId) {
        present
      }
    }
  `;

  function showAlert() {
    setState({
      showAlert: true
    });
  }

  function hideAlert() {
    setState({
      showAlert: false
    });
  }

  const [mutate, { loading }] = useMutation(MUTATION, { onError: function(error) {
    navigation.goBack();
    Alert.alert(
      'Résultat',
      'Checking Error',
    );
  },
  onCompleted: function() {
    navigation.goBack();
    Alert.alert(
      'Résultat',
      'Checking Success',
    );
}  
 });

  if (loading) console.log("...loading");


  async function takePicture() {
    showAlert()
    camera.takePictureAsync({ skipProcessing: true }).then(data => {
      const file = new ReactNativeFile({
        uri: data.uri,
        name: "temp",
        type: "image/jpeg"
      });
      const response = mutate({ variables: { file, eventId: idEvent } });
      console.log('reponse ici',{ response });
    });
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={ref => {
          camera = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
              flexDirection: "column-reverse"
            }}
            onPress={takePicture.bind()}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Take picture{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <AwesomeAlert
          show={state.showAlert}
          title="Traitement de l'image"
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          /*showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
          }}*/
        />
    </View>
  );
}

export default Presence;
