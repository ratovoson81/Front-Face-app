import React, { useState, useEffect } from "react";
import { Button, Image, Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from 'expo-camera';
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";

function Presence() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const MUTATION = gql`
    mutation($file: Upload!) {
      compareImage(file: $file) {
        present
      }
    }
  `;
  const [mutate, { loading }] = useMutation(MUTATION);

  if (loading) console.log("...loading");

  const [state, setState] = useState({

  });


  async function takePicture() {
    setState({
        takeImageText: "... PROCESSING PICTURE ..."
    });
    camera.takePictureAsync({ skipProcessing: true }).then((data) => {
      const file = new ReactNativeFile({
        uri: data.uri,
        name: "temp",
        type: "image/jpeg"
      });
      const response = mutate({ variables: { file } });
      console.log({ response });
    })

  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'flex-end',
                flexDirection: 'column-reverse'
              }}
            onPress={takePicture.bind()} >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take picture </Text>
      </TouchableOpacity>
        </View>
      </Camera>
      <View>
    </View>
    </View>
  );

}

export default Presence;