import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

function EventList(props) {

  function EventDetail(id) {    
    props.navigation.navigate("EventDetail", {id : id});
  }

return (
  <Container>
  <Header>
    <Left />
    <Body>
      <Title>Liste evenement </Title>
    </Body>
    <Right />
  </Header>
  <Content>

    <TouchableOpacity onPress={() => EventDetail("1")}>
      <Text style={styles.item}>
          evenement 1 + detail (responsable, participants,date) + status ( fini ou pas ) + TouchableOpacity pour plus de detail individu
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => EventDetail("2")}>
      <Text style={styles.item}>
          evenement 2 +detail (responsable,groupe participants,date) + status ( fini ou pas ) + TouchableOpacity pour plus de detail individu
      </Text>
      </TouchableOpacity>

  </Content>
  </Container>
);

}

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    marginBottom: 20,
    padding: 15,
    maxWidth: 60,
  },
  item: {
    marginTop: 40,
    width: 350
  },
  text: {
    color: "white"
  },
  Content: {
      alignItems: "center",
      justifyContent: "center"
  }
});

export default EventList;
