import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Toast
} from "native-base";

import * as mutations from "../graphql/mutations";
import { Dropdown } from "react-native-material-dropdown";

function CreateEvent(props) {
  const {
    actions,
    categorieData,
    groupeData,
    matiereData,
    responsableData
  } = props;

  useEffect(() => {
    actions.asyncGetEventData();
  }, [actions]);

  const [state, setState] = useState({
    categorie: "",
    responsable: "",
    matiere: "",
    groupeParticipants: "",
    showToast: false
  });

  let dataFormCategorie = [];
  for (const property in categorieData.listCategorie) {
    dataFormCategorie.push({
      value: categorieData.listCategorie[property].nomCategorie,
      id: categorieData.listCategorie[property].id
    });
  }

  let dataFormResponsable = [];
  let r = responsableData.listResponsable;
  for (const property in r) {
    dataFormResponsable.push({
      value: r[property].individu.nom + " " + r[property].individu.prenom,
      id: r[property].id
    });
  }

  let dataFormMatiere = [];
  for (const property in matiereData.listMatiere) {
    dataFormMatiere.push({
      value: matiereData.listMatiere[property].nomMatiere,
      id: matiereData.listMatiere[property].id
    });
  }

  let dataFormGroupeParticipants = [];
  for (const property in groupeData.listGroupe) {
    dataFormGroupeParticipants.push({
      value: groupeData.listGroupe[property].nomGroupeParticipant,
      id: groupeData.listGroupe[property].id
    });
  }

  function createObjectEvent() {
    let evenement = {};

    if (
      state.categorie !== "" &&
      state.responsable !== "" &&
      state.matiere !== "" &&
      state.groupeParticipants !== ""
    ) {
      dataFormCategorie.forEach(categorie => {
        if (categorie.value === state.categorie)
          evenement.categorie = categorie.id;
      });

      dataFormResponsable.forEach(responsable => {
        if (responsable.value === state.responsable)
          evenement.responsables = [responsable.id];
      });

      dataFormMatiere.forEach(matiere => {
        if (matiere.value === state.matiere) evenement.matiere = matiere.id;
      });

      dataFormGroupeParticipants.forEach(groupe => {
        if (groupe.value === state.groupeParticipants)
          evenement.groupeParticipants = [groupe.id];
      });
      Toast.show({
        text: "Evenement crée !",
        buttonText: "Okay",
        type: "success"
      });
      //props.navigation.navigate("EventList", { evenement: evenement });
      return evenement;
    } else {
      Toast.show({
        text: "completez les champs !",
        buttonText: "Okay",
        type: "danger"
      });
    }
  }

  function handleSubmit() {
    const event = createObjectEvent();
    actions.asyncCreateEvent({ event });
  }

  function onCompleteMutation(data) {
    const event = data.createEvent.evenement;
    actions.addEvenement({ event });
  }

  return (
    <Container style={styles.container}>
      <Header>
        <Left />
        <Body>
          <Title>New event </Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Form style={styles.form}>
          <View style={styles.item}>
            <Dropdown
              label="Categorie"
              data={dataFormCategorie}
              onChangeText={value => {
                setState({ ...state, categorie: value });
              }}
            />
          </View>
          <View style={styles.item}>
            <Dropdown
              label="Responsable"
              data={dataFormResponsable}
              onChangeText={value => {
                setState({ ...state, responsable: value });
              }}
            />
          </View>
          <View style={styles.item}>
            <Dropdown
              label="Matiere"
              data={dataFormMatiere}
              onChangeText={value => {
                setState({ ...state, matiere: value });
              }}
            />
          </View>
          <View style={styles.item}>
            <Dropdown
              label="Participants"
              data={dataFormGroupeParticipants}
              onChangeText={value => {
                setState({ ...state, groupeParticipants: value });
              }}
            />
          </View>

          <Button style={styles.button} rounded iconLeft onPress={handleSubmit}>
            <Text style={styles.text}>CONFIRMER</Text>
            <Icon name="paper-plane" />
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8
  },
  form: {
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    marginTop: 20,
    width: 350
  },
  button: {
    marginTop: 50,
    marginBottom: 20,
    padding: 15
  },
  text: {
    color: "white"
  }
});

export default CreateEvent;
