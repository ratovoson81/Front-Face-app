import React, { useState, useEffect } from "react";

import { Button, Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/react-hooks";
import AwesomeAlert from 'react-native-awesome-alerts';

import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

import * as mutations from "../graphql/mutations";

function Presence({ navigation, actions, event }) {
  const idEvent = navigation.state.params.idEvent;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const [compareImage] = useMutation(mutations.COMPARE_IMAGE, {
    onError: function(error) {
      navigation.goBack();
      Alert.alert("Checking Error", "Image impossible à traiter");
    },
    onCompleted: function(data) {
      const etudiant = data.compareImage.etudiant;
      const present = data.compareImage.present;
      const dateFin = data.compareImage.dateFin;
      console.log(data);

      navigation.goBack();

      if (present) {
        if (etudiant) {
          actions.setEvenement({
            newPresenceEntry: etudiant,
            idEvent: event.id
          });
          Alert.alert("Résultat", etudiant.individu.nom +" "+ etudiant.individu.prenom);
        } else if (dateFin){
          actions.setEvenement({
            dateFin: dateFin,
            idEvent: event.id
          });
          Alert.alert("Responsable vérifié", "L'évenement est clôturée");
        }
      }else {
        Alert.alert("Résultat", "Visage introuvable");
      }
    }
  });
  const [state, setState] = useState({
    showAlert: false,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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

  async function takePicture() {
    showAlert();
    camera.takePictureAsync({ skipProcessing: true }).then(data => {
      const file = new ReactNativeFile({
        uri: data.uri,
        name: "temp",
        type: "image/jpeg"
      });
      const response = compareImage({ variables: { file, eventId: idEvent } });
    });
  }
  function displayIconFlash() {
    if (flashMode) {
        return <Ionicons
        name="ios-flash"
        style={{ color: "#efd807", fontSize: 40}}
    />;
    } else {
        return <Ionicons
        name="ios-flash-off"
        style={{ color: "#fff", fontSize: 40}}
    />;
    }
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
        flashMode={flashMode} 
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
          <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',                  
              }}
              onPress={() => {
                setFlashMode(
                  flashMode === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
              >
              {displayIconFlash()}              
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={takePicture.bind()}
              >
              <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              >
              <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40}}
              />
            </TouchableOpacity>
          </View>
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
