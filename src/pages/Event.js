import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
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

import * as queries from "../graphql/queries";

function Event(props) {
  const { actions, categorieData } = props;

  let categorie = "";
  let responsable = "";
  let matiere = "";

  const { loading } = useQuery(queries.ALL_DATA, {
    onCompleted: data => {
      const categories = data.categories;
      actions.setCategorie({
        listCategorie: categories
      });
    }
  });

  console.log("eto ay => ", categorieData);
  console.log("hello");

  const [state, setState] = useState({
    niveau: undefined,
    parcour: undefined,
    participants: [],
    evenement: []
  });

  function _categorieTextInputChanged(text) {
    categorie = text;
  }
  function _reponsableTextInputChanged(text) {
    responsable = text;
  }
  function _matiereTextInputChanged(text) {
    matiere = text;
  }

  function onValueChangeP(value) {
    setState({
      ...state,
      parcour: value
    });
  }

  function onValueChangeN(value) {
    setState({
      ...state,
      niveau: value
    });
  }

  function _addParticipant() {
    const data = [
      {
        niveau: state.niveau,
        parcour: state.parcour
      }
    ];
    setState({
      participants: [...state.participants, ...data]
    });
  }

  function _doPresence() {
    this.setState(
      {
        evenement: [
          {
            categorie: this.categorie,
            responsable: this.responsable,
            matiere: this.matiere,
            participants: this.state.participants,
            date: new Date().getDate()
          }
        ]
      },
      () => {
        props.screenProps.evenement = state.evenement;
        //console.log(props.screenProps.evenement);
        props.navigation.navigate("Presence", { categorieData });
      }
    );
    //console.log(this.state.evenement);
  }

  //console.log(this.state.participants);
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
          <Item inlineLabel style={styles.item}>
            <Icon active name="calendar" />
            <Label>Catégorie</Label>
            <Input onChangeText={text => _categorieTextInputChanged(text)} />
          </Item>

          <Item inlineLabel style={styles.item}>
            <Icon active name="person" />
            <Label>Responsable</Label>
            <Input onChangeText={text => _reponsableTextInputChanged(text)} />
          </Item>

          <Item inlineLabel style={styles.item}>
            <Icon active name="book" />
            <Label>Matière</Label>
            <Input onChangeText={text => _matiereTextInputChanged(text)} />
          </Item>

          <Form>
            <Label style={styles.label}>Choisir les participants</Label>
            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Niveau"
                //placeholderStyle={{ color: "#bfc6ea" }}
                //placeholderIconColor="#007aff"
                selectedValue={state.niveau}
                onValueChange={onValueChangeN.bind(this)}
              >
                <Picker.Item label="L1" value="L1" />
                <Picker.Item label="L2" value="L2" />
                <Picker.Item label="L3" value="L3" />
                <Picker.Item label="M1" value="M1" />
                <Picker.Item label="M2" value="M2" />
              </Picker>

              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Parcour"
                //placeholderStyle={{ color: "#bfc6ea" }}
                //placeholderIconColor="#007aff"
                selectedValue={state.parcour}
                onValueChange={onValueChangeP.bind(this)}
              >
                <Picker.Item label="GB" value="GB" />
                <Picker.Item label="SR" value="SR" />
                <Picker.Item label="IG" value="IG" />
              </Picker>

              <Button secondary rounded onPress={() => _addParticipant()}>
                <Icon name="add" />
              </Button>
            </Item>
          </Form>

          <ScrollView style={{ flex: 1 }}>
            <FlatList
              data={state.participants}
              keyExtractor={item => item.niveau + item.parcour}
              renderItem={({ item }) => (
                <Text>
                  {item.niveau} {item.parcour}
                </Text>
              )}
            />
          </ScrollView>
          <Button
            style={styles.button}
            rounded
            iconLeft
            onPress={() => _doPresence()}
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
  label: {
    marginLeft: 20,
    marginTop: 20
  },
  form: {
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
    width: 350
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15
  },
  text: {
    color: "white"
  }
});

export default Event;
