import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView  } from "react-native";
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
    Icon,
  } from "native-base";
  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function EventDetail(props) {

    function presence() {    
      props.navigation.navigate("Presence");
    }

    const etudiants  = props.navigation.state.params.item.presences;
    const groupeParticipants = props.navigation.state.params.item.groupeParticipants[0].nomGroupeParticipant;
    const matiere = props.navigation.state.params.item.matiere.nomMatiere;
    const responsable = props.navigation.state.params.item.responsables[0].individu.nom + ' ' + props.navigation.state.params.item.responsables[0].individu.prenom;

    const [state, setState] = useState({
      tableHead: ['Id', 'Nom', 'Prenom', 'Presence'],
      widthArr: [40, 130, 140, 60],
      active: false
      });

      const tableData = [];
        for (const property in etudiants) {
          const rowData = [];
          rowData.push(etudiants[property].id);
          rowData.push(etudiants[property].individu.nom);
          rowData.push(etudiants[property].individu.prenom);
          rowData.push("absent");
          tableData.push(rowData);
      }

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
          <View style={styles.title}>
            <Text>Fiche de présence {groupeParticipants}</Text>
            <Text>{matiere} {responsable}</Text>
          </View>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
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
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => setState({ active: !state.active })}>
            <Icon name="add" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="play" />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }}>
              <Icon name="square" />
            </Button>
            <Button 
              onPress={() => presence()} 
              style={{ backgroundColor: '#ffbb33' }}
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
      maxWidth: 80,
    },
    text: {
      color: "white"
    },
    container: { 
      flex: 1, 
      padding: 16,
      paddingTop: 20, 
      backgroundColor: '#fff',
      },
    header: { 
      height: 50, 
      backgroundColor: '#537791' 
    },
    text: { 
      textAlign: 'center', 
      fontWeight: '100' 
    },
    dataWrapper: { 
      marginTop: -1 
    },
    row: { 
      height: 40, 
      backgroundColor: '#E7E6E1' 
    },
    title: {
      marginBottom: 15,
      alignItems: "center",
    },
    content: {
             
    },
    allContainer: {
      flex: 1,
    },
    fab:{

    }
  });

export default EventDetail;