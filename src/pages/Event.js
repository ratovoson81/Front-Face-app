import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  Icon
} from "native-base";

import * as queries from "../graphql/queries";
import { Dropdown } from 'react-native-material-dropdown';

function Event(props) {
  const {
    actions,
    categorieData,
    groupeData,
    matiereData,
    responsableData
  } = props;

  let categorie = "";
  let responsable = "";
  let matiere = "";
  let groupeParticipants = "";
  let evenement = [];

  const [state, setState] = useState({

  });


  const { loading, data } = useQuery(queries.ALL_DATA, {
    onCompleted: data => {
      const categories = data.categories;
      actions.setCategorie({
        listCategorie: categories
      });

      const groupes = data.groupeParticipants;
      actions.setGroupe({
        listGroupe: groupes
      });

      const matieres = data.matieres;
      actions.setMatiere({
        listMatiere: matieres
      });

      const responsables = data.responsables;
      actions.setResponsable({
        listResponsable: responsables
      });
    }
  });

  function _addEvent() {
    let month = new Date().getMonth() + 1;

    if( categorie !== "" && responsable !== "" && matiere !== "" && groupeParticipants !== "" ){
      evenement = [
        {
          categorie: categorie,
          responsable: responsable,
          matiere: matiere,
          participants: groupeParticipants,
          /*date: new Date().getHours() +':'+
                new Date().getMinutes() +' '+
                new Date().getDate() +'-'+
                month +'-'+
                new Date().getFullYear()*/
        }
      ];    
    console.log(evenement);
    alert("Evenement crée")
    //props.navigation.navigate("EventList", { evenement: evenement });
    }else{
    alert("completer les formulaires")
    }
  }

  let dataFormCategorie = [];
  for (const property in categorieData.listCategorie) {
    dataFormCategorie.push({value : categorieData.listCategorie[property].nomCategorie, id : property})
  }

  let dataFormResponsable = [];
  let r = responsableData.listResponsable;
  for (const property in r) {
    dataFormResponsable.push({value : r[property].individu.nom +' '+ r[property].individu.prenom, id : property})
  }

  let dataFormMatiere = [];
  for (const property in matiereData.listMatiere) {
    dataFormMatiere.push({value : matiereData.listMatiere[property].nomMatiere, id : property})
  }

  let dataFormGroupeParticipants = [];
  for (const property in groupeData.listGroupe) {
    dataFormGroupeParticipants.push({value : groupeData.listGroupe[property].nomGroupeParticipant, id : property})
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
      <Content>
        <Form style={styles.form}>
          <View style={styles.item}>

          <Dropdown
            label='Categorie'
            data={dataFormCategorie}
            onChangeText={(value)=> {
              categorie = value
            }}
          />
          </View>
          <View style={styles.item}>
          <Dropdown
            label='Responsable'
            data={dataFormResponsable}
            onChangeText={(value)=> {
              responsable = value
            }}
          />
          </View>
          <View style={styles.item}>
          <Dropdown
            label='Matiere'
            data={dataFormMatiere}
            onChangeText={(value)=> {
              matiere = value
            }}
          />
          </View>
          <View style={styles.item}>
          <Dropdown
            label='Participants'
            data={dataFormGroupeParticipants}
            onChangeText={(value)=> {
              groupeParticipants = value
            }}
          />

          </View>

          <Button
            style={styles.button}
            rounded
            iconLeft
            onPress={() => _addEvent()}
          >
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
    width: 350,
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

export default Event;
