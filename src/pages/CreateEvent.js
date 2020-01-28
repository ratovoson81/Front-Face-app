import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView, Alert } from "react-native";
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
  Toast,
  Picker,
  Item
} from "native-base";

function CreateEvent(props) {
  const {
    actions,
    categorieData,
    groupeData,
    matiereData,
    responsableData
  } = props;

  const [state, setState] = useState({
    categorie: "",
    responsable: "",
    matiere: "",
    groupeParticipants: [],
    showToast: false,
    gp: ""
  });

  function onValueChangeC(value) {
    setState({
      ...state,
      categorie: value
    });
  }

  function onValueChangeR(value) {
    setState({
      ...state,
      responsable: value
    });
  }

  function onValueChangeM(value) {
    setState({
      ...state,
      matiere: value
    });
  }

  function onValueChangeP(value) {
    setState({
      ...state,
      gp: value
    });
  }

  useEffect(() => {
    actions.asyncGetEventData();
  }, [actions]);

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
    let idGp = [];
    let month = new Date().getMonth() + 1;

    if (
      state.categorie !== "" &&
      state.responsable !== "" &&
      state.matiere !== "" &&
      state.groupeParticipants.length > 0
    ) {
      dataFormCategorie.forEach(categorie => {
        if (categorie.value === state.categorie)
          evenement.categorie = categorie.id;
      });

      dataFormResponsable.forEach(responsable => {
        if (responsable.value === state.responsable)
          evenement.responsables = responsable.id;
      });

      dataFormMatiere.forEach(matiere => {
        if (matiere.value === state.matiere) evenement.matiere = matiere.id;
      });

      dataFormGroupeParticipants.forEach(groupe => {
        state.groupeParticipants.forEach(value => {
          if (groupe.value === value) {
            idGp.push(groupe.id);
          }
        });
      });
      evenement.groupeParticipants = idGp;
      Toast.show({
        text: "Evenement crée !",
        type: "success"
      });
      //props.navigation.navigate("EventList", { evenement: evenement });

      return evenement;
    } else {
      Toast.show({
        text: "completez les champs !",
        type: "danger"
      });
      return null;
    }
  }

  function _addParticipant() {
    if (state.groupeParticipants.find(element => element === state.gp)) {
      Toast.show({
        text: "Slectionner un autre participants !",
        type: "danger"
      });
    } else if (state.gp !== "") {
      setState({
        ...state,
        groupeParticipants: state.groupeParticipants.concat(state.gp)
      });
    } else {
      Toast.show({
        text: "Slectionner un participants !",
        type: "danger"
      });
    }
  }

  function handleSubmit() {
    const event = createObjectEvent();
    if (event !== null) {
      actions.asyncCreateEvent({ event });
    }
  }

  function deleteP(item) {
    setState({
      ...state,
      groupeParticipants: state.groupeParticipants.filter(gp => gp !== item)
    });
  }

  function deleteParticipant(item) {
    Alert.alert(
      "Supprimer le groupe",
      item,
      [
        { text: "Valider", onPress: () => deleteP(item) },
        {
          text: "Annuler",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }

  return (
    <Container style={styles.container}>
      <Header>
        <Left />
        <Body>
          <Title>New event</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Form style={styles.form}>
          <Item picker style={styles.item}>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={state.categorie}
              onValueChange={onValueChangeC.bind(this)}
            >
              <Picker.Item value="" label="Catégorie" />
              {dataFormCategorie.map((v, index) => {
                return (
                  <Picker.Item label={v.value} value={v.value} key={index} />
                );
              })}
            </Picker>
          </Item>

          <Item picker style={styles.item}>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={state.responsable}
              onValueChange={onValueChangeR.bind(this)}
            >
              <Picker.Item value="" label="Responsable" />
              {dataFormResponsable.map((v, index) => {
                return (
                  <Picker.Item label={v.value} value={v.value} key={index} />
                );
              })}
            </Picker>
          </Item>

          <Item picker style={styles.item}>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={state.matiere}
              onValueChange={onValueChangeM.bind(this)}
            >
              <Picker.Item value="" label="Matiere" />
              {dataFormMatiere.map((v, index) => {
                return (
                  <Picker.Item label={v.value} value={v.value} key={index} />
                );
              })}
            </Picker>
          </Item>

          <Item picker style={styles.item}>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={state.gp}
              onValueChange={onValueChangeP.bind(this)}
            >
              <Picker.Item value="" label="Participants" />
              {dataFormGroupeParticipants.map((v, index) => {
                return (
                  <Picker.Item label={v.value} value={v.value} key={index} />
                );
              })}
            </Picker>

            <Button info rounded onPress={() => _addParticipant()}>
              <Icon name="add" />
            </Button>
          </Item>

          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              horizontal
              style={{ flexDirection: "column" }}
              contentContainerStyle={styles.list}
              data={state.groupeParticipants}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Button
                  bordered
                  rounded
                  info
                  style={styles.buttonList}
                  onPress={() => deleteParticipant(item)}
                >
                  <Text style={{ color: "#33b5e5" }}>{item}</Text>
                </Button>
              )}
            />
          </SafeAreaView>

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
    marginTop: 30,
    width: 350
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    padding: 15
  },
  buttonList: {
    marginTop: 10,
    marginRight: 5,
    padding: 10
  },
  text: {
    color: "white"
  },
  list: {
    justifyContent: "center",
    flexDirection: "row"
  },
  iconUser: {
    width: 25,
    height: 25,
    marginRight: 5
  }
});

export default CreateEvent;
