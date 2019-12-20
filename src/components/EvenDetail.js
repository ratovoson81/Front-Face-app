import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    Button,
    Container,
    Header,
    Content,
    Left,
    Body,
    Right,
    Title,
  } from "native-base";

function EventDetail(props) {

    function presence() {    
      props.navigation.navigate("Presence");
    }

  return (
    <Container>
    <Header>
      <Left />
      <Body>
        <Title>Details evenenement </Title>
      </Body>
      <Right />
    </Header>
    <Content style={styles.Content}>
        <Text>
            evenement {props.navigation.state.params.id} + liste individu present ou pas
        </Text>
        <Button
          style={styles.button}
            rounded
            onPress={() => presence()}
          >
            <Text style={styles.text}>check individu</Text>
          </Button>
    </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
    button: {
      marginTop: 40,
      marginBottom: 20,
      padding: 15,
      maxWidth: 80,
    },
    text: {
      color: "white"
    }
  });

export default EventDetail;