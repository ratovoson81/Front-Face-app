import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { Button, Container, Content, Fab, Icon, Badge, Toast } from "native-base";
import { Table, Row } from "react-native-table-component";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import Moment from "moment";

function UserIcon({ color }) {
  return <Icon name="person" style={{ color: color }} />;
}

function EventDetail({ navigation, event, actions }) {
  const { id: idEvent } = navigation.state.params.item;
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
    active: false
  });

  function presence() {
    navigation.navigate("Presence", { idEvent: idEvent });
  }

  function startEvent() {
    const dateDebut = new Date(Date.now());
    setEvent({ variables: { dateDebut: dateDebut, idEvent: idEvent } });
    setState({ ...state, active: false });
    Toast.show({
      text: "Evenement démaré !",
      buttonText: "Okay",
    });
  }

  function cancelEvent() {
    setEvent({
      variables: { cancel: true, idEvent: idEvent, resetPresence: true }
    });
    setState({ ...state, active: false });
    Toast.show({
      text: "Evenement arrêté !",
      buttonText: "Okay",
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

  function generateTableData() {
    const listPresence = event.presences;
    const responsable = event.responsables;
    const dateFin = event.dateFin;
    const tableData = [];
    let rowData = [];

    event.groupeParticipants.forEach(groupe => {
      groupe.membres.forEach(membre => {
        rowData = [];
        rowData.push(membre.id);
        rowData.push(`${membre.individu.nom} ${membre.individu.prenom}`);
        rowData.push(`${membre.niveau} ${membre.parcours}`);
        rowData.push(
          verifPresence(membre, listPresence) ? (
            <View style={styles.iconPresence}>
              <UserIcon color="#2BE320" />
            </View>
          ) : (
            <View style={styles.iconPresence}>
              <UserIcon color="#D02A1E" />
            </View>
          )
        );
        tableData.push(rowData);
      });
    });
    responsable.forEach(responsable => {
      rowData = [];
      rowData.push(responsable.id);
      rowData.push(
        `${responsable.individu.nom} ${responsable.individu.prenom}`
      );
      rowData.push("responsable");
      rowData.push(
        dateFin ? (
          <View style={styles.iconPresence}>
            <UserIcon color="#2BE320" />
          </View>
        ) : (
          <View style={styles.iconPresence}>
            <UserIcon color="#D02A1E" />
          </View>
        )
      );
      tableData.unshift(rowData);
    });
    return tableData;
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

  function _displayDateDebut() {
    if (event.dateDebut) {
      return Moment(event.dateDebut).format("H:mm, Do MMM  YYYY");
    } else {
      return "";
    }
  }

  function _displayDateFin() {
    if (event.dateFin) {
      return Moment(event.dateFin).format("H:mm, Do MMM  YYYY");
    } else {
      return "";
    }
  }

  function getNbPresent() {
    const nbEtudiant = event.presences.length;
    const responsable = event.dateFin ? 1 : 0;
    return nbEtudiant + responsable;
  }
  function getNbAbsent() {
    const { groupeParticipants, dateFin, presences } = event;
    let total = 0;
    groupeParticipants.forEach(gp => {
      total = total + gp.membres.length;
    });
    total = total - presences.length;
    total = dateFin ? total : total + 1;
    return total;
  }

  return (
    <Container style={styles.allContainer}>
      <Content style={styles.content}>
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
          <SafeAreaView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <SafeAreaView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1 }}>
                  {generateTableData().map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index % 2 && {}]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </SafeAreaView>
            </View>
          </SafeAreaView>
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
  }
});

export default EventDetail;
