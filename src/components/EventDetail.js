import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

  const { loading, data } = useQuery(queries.EVENEMENT, {
    variables: { idEvent: idEvent }
  });

  const [setEvent] = useMutation(mutations.SET_EVENT, {
    refetchQueries: [{ query: queries.ALL_DATA }]
  });

  const [state, setState] = useState({
    tableHead: ["Num", "Nom prenom", "Parcours", "Presence"],
    widthArr: [40, 130, 90, 80],
    active: false
  });

  function presence() {
    navigation.navigate("Presence");
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

  function generateTableData() {
    const event = data.evenement;
    const responsable = event.responsables[0];
    const tableData = [];
    let rowData = [];

    event.groupeParticipants[0].membres.forEach(membre => {
      rowData = [];
      rowData.push(membre.id);
      rowData.push(`${membre.individu.nom} ${membre.individu.prenom}`);
      rowData.push(`${membre.niveau} ${membre.parcours}`);
      rowData.push(
        membre.present ? (
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
    rowData.push(responsable.id);
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
    const event = data.evenement;
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

  if (loading) return <View></View>;

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
