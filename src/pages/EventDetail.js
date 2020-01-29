import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Fab,
  Icon,
  Badge,
  Toast,
  Container,
  Content,
  Left,
  Body,
  List,
  ListItem,
  Right,
  Tabs,
  Header,
  Tab,
  Form,
  Picker
} from "native-base";

import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import Moment from "moment";

function UserIcon({ color }) {
  return <Icon name="person" style={{ fontSize: 30, color: color }} />;
}

function EventDetail({ navigation, event, actions }) {
  const { id: idEvent } = navigation.state.params.item;
  const allParticipants = [];
  event.groupeParticipants.forEach(groupe => {
    groupe.membres.forEach(membre => {
      allParticipants.push(membre);
    });
  });
  const [setEvent] = useMutation(mutations.SET_EVENT, {
    refetchQueries: [{ query: queries.ALL_DATA }],
    onCompleted: data => {
      const id = data.setEvent.evenement.id;
      const dateDebut = data.setEvent.evenement.dateDebut;
      actions.startEvent({
        id,
        dateDebut
      });
    }
  });

  const [state, setState] = useState({
    tableHead: ["Num", "Nom prenom", "Parcours", "Presence"],
    widthArr: [40, 210, 90, 70],
    active: false,
    selected: "",
    membres: allParticipants
  });

  function getMembers() {
    let all = [];
    let absent = [];
    let presents = event.presences;
    event.groupeParticipants.forEach(groupe => {
      groupe.membres.forEach(membre => {
        all.push(membre);
      });
    });

    var onlyInA = all.filter(comparer(presents));
    var onlyInB = presents.filter(comparer(all));

    absent = onlyInA.concat(onlyInB);
    if (state.selected === "absent") {
      setState({
        ...state,
        membres: absent
      });
    } else if (state.selected === "present") {
      setState({
        ...state,
        membres: presents
      });
    } else {
      setState({
        ...state,
        membres: all
      });
    }
  }

  function comparer(otherArray) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return (
            other.individu.nom === current.individu.nom &&
            other.individu.prenom === current.individu.prenom &&
            other.id === current.id
          );
        }).length == 0
      );
    };
  }

  function onValueChange(value) {
    setState({
      ...state,
      selected: value
    });
  }

  function presence() {
    navigation.navigate("Presence", { idEvent: idEvent });
  }

  function startEvent() {
    const dateDebut = new Date(Date.now());
    setEvent({ variables: { dateDebut: dateDebut, idEvent: idEvent } });
    setState({ ...state, active: false });
    Toast.show({
      text: "Evenement démaré !"
    });
  }

  function cancelEvent() {
    setEvent({
      variables: { cancel: true, idEvent: idEvent, resetPresence: true }
    });
    setState({ ...state, active: false });
    Toast.show({
      text: "Evenement arrêté !"
    });
  }

  function verifPresence(membre, listePresence) {
    let present = false;
    listePresence.forEach(item => {
      if (item.individu.id === membre.individu.id) {
        present = true;
        return present;
      }
    });
    return present;
  }

  function titleEvent() {
    const nomMatiere = event.matiere.nomMatiere;

    return (
      <View style={styles.title}>
        <Text>{`Fiche de présence ${event.categorie.nomCategorie}`}</Text>
        {event.groupeParticipants.map((v, index) => {
          return (
            <Text key={index}>{`Participants ${index + 1}: ${
              v.nomGroupeParticipant
            }`}</Text>
          );
        })}
        <Text>{`Matiere: ${nomMatiere}`}</Text>
        {event.responsables.map((v, index) => {
          return (
            <Text
              key={index}
            >{`Responsable : ${v.individu.nom} ${v.individu.prenom}`}</Text>
          );
        })}
      </View>
    );
  }

  function displayButtonStart() {
    if (!event.dateDebut)
      return (
        <Button style={{ backgroundColor: "#34A34F" }} onPress={startEvent}>
          <Icon name="play" />
        </Button>
      );
  }

  function displayButtonCancel() {
    if (event.dateDebut && !event.dateFin)
      return (
        <Button style={{ backgroundColor: "#DD5144" }} onPress={cancelEvent}>
          <Icon name="square" />
        </Button>
      );
  }

  function displayButtonPresence() {
    if (event.dateDebut && !event.dateFin)
      return (
        <Button
          style={{ backgroundColor: "#ffbb33" }}
          onPress={() => presence()}
        >
          <Icon name="camera" />
        </Button>
      );
  }

  function displayButtonPrint() {
    if (event.dateDebut && event.dateFin)
      return (
        <Button
          style={{ backgroundColor: "#2BBBAD" }}
          onPress={() => createPDF()}
        >
          <Icon name="paper" />
        </Button>
      );
  }

  function _displayDateDebut() {
    if (event.dateDebut) {
      return Moment(event.dateDebut).format("H:mm, Do MMM YYYY");
    } else {
      return "";
    }
  }

  function _displayDateFin() {
    if (event.dateFin) {
      return Moment(event.dateFin).format("H:mm, Do MMM YYYY");
    } else {
      return "";
    }
  }

  function getNbPresent() {
    const nbEtudiant = event.presences.length;
    const responsable = 0; //event.dateFin ? 1 : 0;
    return nbEtudiant + responsable;
  }
  function getNbAbsent() {
    const { groupeParticipants, dateFin, presences } = event;
    let total = 0;
    groupeParticipants.forEach(gp => {
      total = total + gp.membres.length;
    });
    total = total - presences.length;
    //total = dateFin ? total : total + 1;
    return total;
  }

  async function createPDF() {
    try {
      let file = await Print.printToFileAsync({
        html: "<h1>PDF TEST</h1>",
        width: 612,
        height: 792,
        base64: false
      });
      Sharing.shareAsync(file.uri, { dialogTitle: "Here is your PDF" });
    } catch (error) {
      alert("error");
    }
  }

  return (
    <Container style={styles.allContainer}>
      <Content padder style={styles.content}>
        <View style={styles.container}>
          <View style={styles.eventDetail}>
            {titleEvent()}
            <View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={{ marginRight: 5 }}>Present</Text>
                <Badge success>
                  <Text style={{ color: "#ffffff" }}>{getNbPresent()}</Text>
                </Badge>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 5 }}>Absent</Text>
                <Badge>
                  <Text style={{ color: "#ffffff" }}>{getNbAbsent()}</Text>
                </Badge>
              </View>
            </View>
          </View>
          <Form style={styles.form}>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={state.selected}
              onValueChange={onValueChange.bind(this)}
            >
              <Picker.Item label="Tout" value="all" />
              <Picker.Item label="Present" value="present" />
              <Picker.Item label="Absent" value="absent" />
            </Picker>
            <Button
              bordered
              rounded
              info
              style={styles.button}
              onPress={() => getMembers()}
            >
              <Text style={{ color: "#33b5e5" }}>flitrer</Text>
            </Button>
          </Form>
          <List>
            <FlatList
              data={state.membres}
              keyExtractor={item => item.individu.id.toString()}
              renderItem={({ item }) => (
                <ListItem avatar>
                  <Left>
                    <Text style={styles.id}>{item.id}</Text>
                  </Left>
                  <Body>
                    <Text style={styles.nom}>
                      {item.individu.nom} {item.individu.prenom}
                    </Text>
                    <Text note style={styles.description_text}>
                      {item.niveau} {item.parcours}{" "}
                    </Text>
                  </Body>
                  <Right>
                    {verifPresence(item, event.presences) ? (
                      <View style={styles.iconPresence}>
                        <UserIcon color="#2BE320" />
                      </View>
                    ) : (
                      <View style={styles.iconPresence}>
                        <UserIcon color="#D02A1E" />
                      </View>
                    )}
                  </Right>
                </ListItem>
              )}
            />
          </List>
          <View style={styles.date}>
            <Text
              style={styles.date}
            >{`Date de début :${_displayDateDebut()}`}</Text>
            <Text
              style={styles.date}
            >{`Date de fin :${_displayDateFin()}`}</Text>
          </View>
        </View>
      </Content>
      <View style={styles.fab}>
        <Fab
          active={state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => setState({ ...state, active: !state.active })}
        >
          <Icon name="add" />
          {displayButtonStart()}
          {displayButtonCancel()}
          {displayButtonPresence()}
          {displayButtonPrint()}
        </Fab>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    marginBottom: 20,
    padding: 15,
    maxWidth: 80
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  header: {
    height: 50
  },
  text: {
    textAlign: "center",
    fontWeight: "100"
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40
  },
  title: {
    marginBottom: 15,
    alignItems: "center"
  },
  content: {},
  allContainer: {
    flex: 1
  },
  fab: {},
  iconPresence: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  date: {
    marginTop: 10,
    alignItems: "center"
  },
  eventDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  nom: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  description_text: {
    color: "#666666"
  },
  id: {
    paddingTop: 7
  },
  form: {
    flexDirection: "row",
    alignSelf: "center",
    width: 200
  },
  button: {
    padding: 15
  }
});

export default EventDetail;
