import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { withNavigationFocus } from "react-navigation";
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
import * as mutations from "../graphql/mutations";

function UserIcon({ color }) {
  return <Icon name="person" style={{ color: color }} />;
}

function EventDetail({ navigation }) {
  const { id: idEvent } = navigation.state.params.item;

  const { loading, data, refetch } = useQuery(queries.EVENEMENT, {
    variables: { idEvent: idEvent }
  });

  const [setEvent] = useMutation(mutations.SET_EVENT, {
    refetchQueries: [{ query: queries.ALL_DATA }]
  });

  const [state, setState] = useState({
    tableHead: ["Num", "Nom prenom", "Parcours", "Presence"],
    widthArr: [40, 210, 90, 70],
    active: false,
  });

  useEffect(() => {
    refetch();
  });

  function showAlert() {
    setState({
      error: true
    });
  }

  function presence() {
    navigation.navigate("Presence", { idEvent: idEvent });
  }

  function startEvent() {
    const dateDebut = new Date(Date.now());
    setEvent({ variables: { dateDebut: dateDebut, idEvent: idEvent } });
    setState({ ...state, active: false });
  }

  function cancelEvent() {
    setEvent({ variables: { cancel: true, idEvent: idEvent } });
    setState({ ...state, active: false });
  }

  function verifPresence(membre, listePresence) {
    let present = false;
    listePresence.forEach(item => {
      if (item.id === membre.id) {
        present = true;
        return present;
      }
    });
    return present;
  }

  function generateTableData() {
    const event = data.evenement;
    const listPresence = data.evenement.presences;
    const responsable = event.responsables;
    const dateFin = data.evenement.dateFin;
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
      rowData.push(`${responsable.individu.nom} ${responsable.individu.prenom}`);
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
    const event = data.evenement;
    const nomMatiere = event.matiere.nomMatiere;

    return (
      <View style={styles.title}>
        <Text>{`Fiche de présence ${event.categorie.nomCategorie}`}</Text>
        {event.groupeParticipants.map((v, index)=>{
                    return <Text>{`Participants ${index + 1}: ${v.nomGroupeParticipant}`}</Text> 
                })}
        <Text>{`Matiere: ${nomMatiere}`}</Text>
        {event.responsables.map((v, index)=>{
                    return <Text>{`Responsable ${index + 1}: ${v.individu.nom} ${v.individu.prenom}`}</Text> 
                })}
      </View>
    );
  }

  function displayButtonStart() {
    if(!data.evenement.dateDebut)
      return <Button style={{ backgroundColor: "#34A34F" }} onPress={startEvent}>
      <Icon name="play" />
    </Button>
  }

  function displayButtonCancel() {
    if(data.evenement.dateDebut && !data.evenement.dateFin)
      return <Button style={{ backgroundColor: "#DD5144" }} onPress={cancelEvent}>
      <Icon name="square" />
    </Button>
  }

  function displayButtonPresence() {
    if(data.evenement.dateDebut && !data.evenement.dateFin)
      return <Button style={{ backgroundColor: "#ffbb33"}}  onPress={() => presence()}>
      <Icon name="camera" />
    </Button>
  }

  if (loading) return <View></View>;

  return (
    <Container style={styles.allContainer}>
      <Content style={styles.content}>
        <View style={styles.container}>
          {titleEvent()}
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1 }}>
                  {generateTableData().map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[
                        styles.row,
                        index % 2 && { }
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          <View style={styles.date}>
            <Text style={styles.date}>{`Date de début ${ data.evenement.dateDebut}`}</Text>
            <Text style={styles.date}>{`Date de fin ${ data.evenement.dateFin}`}</Text>
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
    height: 50,
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
  }
});

export default withNavigationFocus(EventDetail);
