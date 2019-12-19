import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/react-hooks";

import gql from "graphql-tag";

function Presence() {
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
    image: null
  });

  let { image } = state;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={_pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );

  async function _pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setState({ image: result.uri });
    }
    const file = new ReactNativeFile({
      uri: result.uri,
      name: "temp",
      type: "image/jpeg"
    });
    const response = await mutate({ variables: { file } });
    console.log({ response });
  }
}

export default Presence;
