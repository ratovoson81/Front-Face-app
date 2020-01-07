import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Fab,
  Icon
} from "native-base";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import * as queries from "../graphql/queries";

function UserIcon({ color }) {
  return <Icon name="person" style={{ color: color }} />;
}

function EventDetail({ navigation }) {
  const {
    id: idEvent,
    presences,
    groupeParticipants,
    matiere,
    responsables
  } = navigation.state.params.item;

  const {} = useQuery(queries.GP_MEMBERS, {
    variables: { gpId: groupeParticipants[0].id },
    onCompleted: onGpMembersCompleted
  });

  const [state, setState] = useState({
    tableHead: ["Num", "Nom prenom", "Parcours", "Presence"],
    widthArr: [40, 130, 90, 80],
    active: false,
    event: {
      start: false,
      id: idEvent,
      presences: presences,
      groupeParticipants: groupeParticipants,
      matiere: matiere,
      responsables: responsables,
      dateDebut: null,
      dateFin: null
    }
  });

  function presence() {
    navigation.navigate("Presence");
  }

  function onGpMembersCompleted(data) {
    const etudiants = data.gpMembers;
    const responsable = state.event.responsables[0];
    responsable.present = false;
    etudiants.forEach(etudiant => (etudiant.present = false));
    setState({
      ...state,
      event: {
        ...state.event,
        presences: etudiants,
        responsables: [responsable]
      }
    });
  }

  function startEvent() {
    const event = state.event;
    const dateDebut = Date.now();
    setState({
      ...state,
      event: { ...event, dateDebut: dateDebut, start: true }
    });
  }

  function cancelEvent() {
    const event = state.event;
    const dateDebut = null;
    setState({
      ...state,
      event: { ...event, dateDebut: dateDebut, start: false }
    });
  }

  function generateTableData() {
    const event = state.event;
    const responsable = state.event.responsables[0];
    const tableData = [];
    let rowData = [];

    event.presences.forEach(etudiant => {
      rowData = [];
      rowData.push(etudiant.id);
      rowData.push(`${etudiant.individu.nom} ${etudiant.individu.prenom}`);
      rowData.push(`${etudiant.niveau} ${etudiant.parcours}`);
      rowData.push(
        etudiant.present ? (
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
    rowData = [];
    rowData.push(responsable.individu.id);
    rowData.push(`${responsable.individu.nom} ${responsable.individu.prenom}`);
    rowData.push("responsable");
    rowData.push(
      responsable.present ? (
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

    return tableData;
  }

  function titleEvent() {
    const event = state.event;
    const nomGroupeParticipant =
      event.groupeParticipants[0].nomGroupeParticipant;
    const nomMatiere = event.matiere.nomMatiere;
    const nomResponsable = event.responsables[0].individu.nom;
    const prenomResponsable = event.responsables[0].individu.prenom;
    return (
      <View style={styles.title}>
        <Text>{`Fiche de présence ${nomGroupeParticipant}`}</Text>
        <Text>{`${nomMatiere} ${nomResponsable} ${prenomResponsable}`}</Text>
      </View>
    );
  }
  console.log(state.event.dateDebut);
  return (
    <Container style={styles.allContainer}>
      <Header>
        <Left />
        <Body>
          <Title>Details evenenement </Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          {titleEvent()}
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  {generateTableData().map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" }
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
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
          <Button style={{ backgroundColor: "#34A34F" }} onPress={startEvent}>
            <Icon name="play" />
          </Button>
          <Button style={{ backgroundColor: "#DD5144" }} onPress={cancelEvent}>
            <Icon name="square" />
          </Button>
          <Button
            onPress={() => presence()}
            style={{ backgroundColor: "#ffbb33" }}
          >
            <Icon name="camera" />
          </Button>
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
  text: {
    color: "white"
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  header: {
    height: 50,
    backgroundColor: "#537791"
  },
  text: {
    textAlign: "center",
    fontWeight: "100"
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1"
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
  }
});

export default EventDetail;
