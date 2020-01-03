import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  View,
  SafeAreaView
} from "react-native";
import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Body,
  Right,
  Title,
  Picker,
  Icon
} from "native-base";
import SearchableDropdown from "react-native-searchable-dropdown";
import * as queries from "../graphql/queries";

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

  const [state, setState] = useState({});

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
    evenement = [
      {
        categorie: categorie,
        responsable: responsable,
        matiere: matiere,
        participants: groupeParticipants,
        date:
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          " " +
          new Date().getDate() +
          "-" +
          month +
          "-" +
          new Date().getFullYear()
      }
    ];

    console.log(evenement);

    props.navigation.navigate("EventList", { evenement: evenement });
  }

  let dataFormCategorie = [];
  for (const property in categorieData.listCategorie) {
    dataFormCategorie.push({
      name: categorieData.listCategorie[property].nomCategorie,
      id: categorieData.listCategorie[property].id
    });
  }

  let dataFormResponsable = [];
  let r = responsableData.listResponsable;
  for (const property in r) {
    dataFormResponsable.push({
      name: r[property].individu.nom + " " + r[property].individu.prenom,
      id: r[property].id
    });
  }

  let dataFormMatiere = [];
  for (const property in matiereData.listMatiere) {
    dataFormMatiere.push({
      name: matiereData.listMatiere[property].nomMatiere,
      id: matiereData.listMatiere[property].id
    });
  }

  let dataFormGroupeParticipants = [];
  for (const property in groupeData.listGroupe) {
    dataFormGroupeParticipants.push({
      name: groupeData.listGroupe[property].nomGroupeParticipant,
      id: groupeData.listGroupe[property].id
    });
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
            <SearchableDropdown
              multi={false}
              onItemSelect={item => {
                categorie = {
                  id: item.id,
                  name: item.name
                };
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={dataFormCategorie}
              defaultIndex={2}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Categorie",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5
                }
              }}
              listProps={{
                nestedScrollEnabled: true
              }}
            />
          </View>
          <View style={styles.item}>
            <SearchableDropdown
              multi={false}
              onItemSelect={item => {
                responsable = {
                  id: item.id,
                  name: item.name
                };
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={dataFormResponsable}
              defaultIndex={2}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Responsable",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5
                }
                //onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true
              }}
            />
          </View>
          <View style={styles.item}>
            <SearchableDropdown
              multi={false}
              onItemSelect={item => {
                matiere = {
                  id: item.id,
                  name: item.name
                };
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={dataFormMatiere}
              defaultIndex={2}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Matiere",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5
                }
                //onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true
              }}
            />
          </View>
          <View style={styles.item}>
            <SearchableDropdown
              multi={false}
              onItemSelect={item => {
                groupeParticipants = {
                  id: item.id,
                  name: item.name
                };
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={dataFormGroupeParticipants}
              defaultIndex={2}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: "Participants",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5
                }
                //onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true
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
    marginTop: 40,
    width: 350
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
    padding: 15
  },
  text: {
    color: "white"
  }
});

export default Event;
