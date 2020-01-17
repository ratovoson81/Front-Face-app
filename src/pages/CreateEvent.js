import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
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
import { Dropdown } from "react-native-material-dropdown";

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
    responsable: [],
    matiere: "",
    groupeParticipants : [],
    showToast: false,
    gp: "",
    res: ""
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
      res: value
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
    let idResponsable = [];
    let idGp = [];
    let month = new Date().getMonth() + 1;

    if (
      state.categorie !== "" &&
      state.responsable.length > 0 &&
      state.matiere !== "" &&
      state.groupeParticipants.length > 0

    ) {
      dataFormCategorie.forEach(categorie => {
        if (categorie.value === state.categorie)
          evenement.categorie = categorie.id;
      });

      dataFormResponsable.forEach(responsable => {
        state.responsable.forEach(value => {
          if (responsable.value === value){
            idResponsable.push(responsable.id);
          }
        });
      });
      evenement.responsables = idResponsable;

      dataFormMatiere.forEach(matiere => {
        if (matiere.value === state.matiere) evenement.matiere = matiere.id;
      });

      dataFormGroupeParticipants.forEach(groupe => {
        state.groupeParticipants.forEach(value => {
          if (groupe.value === value){
            idGp.push(groupe.id);
          }
        });
      });
      evenement.groupeParticipants = idGp;

      Toast.show({
        text: "Evenement crée !",
        buttonText: "Okay",
        type: "success"
      })
      //props.navigation.navigate("EventList", { evenement: evenement });
      console.log("event",evenement)

      return evenement;
    } else {
      Toast.show({
        text: "completez les champs !",
        buttonText: "Okay",
        type: "danger"
      })
      console.log("event",evenement)
    }
  }

  function _addParticipant() {
    if(state.gp !== ""){
      setState({ 
        ...state,
        groupeParticipants: state.groupeParticipants.concat(state.gp)
      });
    }else {
      Toast.show({
        text: "Slectionner un participants !",
        buttonText: "Okay",
        type: "danger"
      })
    }
  }

  function _addResponsable() {
    if(state.res !== ""){
      setState({ 
        ...state,
        responsable: state.responsable.concat(state.res)
      });
    } else{
      Toast.show({
        text: "Slectionner un Responsable !",
        buttonText: "Okay",
        type: "danger"
      })
    }
  }

  console.log("categorie",state.categorie);
  console.log("responsable",state.responsable);
  console.log("matiere",state.matiere);
  console.log("participant",state.groupeParticipants);

      });
    }
  }

  function handleSubmit() {
    const event = createObjectEvent();
    actions.asyncCreateEvent({ event });
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
      <Content padder>
        <Form style={styles.form}>
            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={state.categorie}
                onValueChange={onValueChangeC.bind(this)}
              >
                <Picker.Item value="" label='Catégorie' />
                {dataFormCategorie.map((v,index)=>{
                    return (<Picker.Item label={v.value} value={v.value} key={index}/>) 
                })}
              </Picker>
            </Item>

            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Responsable"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={state.res}
                onValueChange={onValueChangeR.bind(this)}
              >
                <Picker.Item value="" label='Responsable' />
                {dataFormResponsable.map((v,index)=>{
                    return (<Picker.Item label={v.value} value={v.value} key={index}/>) 
                })}
              </Picker>
              <Button info rounded onPress={() => _addResponsable()}>
                <Icon name="add" />
              </Button>
            </Item>
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={styles.list}
                  data={state.responsable}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <Button 
                      bordered 
                      rounded
                      info
                      style={styles.buttonList}
                      >
                      <Text style={{ color: "#33b5e5" }}>{item}</Text>
                    </Button>
                  )}
                />
              </ScrollView>
              
            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={state.matiere}
                onValueChange={onValueChangeM.bind(this)}
              >
                <Picker.Item value="" label='Matiere' />
                {dataFormMatiere.map((v,index)=>{
                    return (<Picker.Item label={v.value} value={v.value} key={index}/>) 
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
                <Picker.Item value="" label='Participants' />
                {dataFormGroupeParticipants.map((v,index)=>{
                    return (<Picker.Item label={v.value} value={v.value} key={index}/>) 
                })}
              </Picker>
            
              <Button info rounded onPress={() => _addParticipant()}>
                <Icon name="add" />
              </Button>
            </Item>

            <ScrollView style={{ flex: 1 }}>
                <FlatList
                  contentContainerStyle={styles.list}
                  data={state.groupeParticipants}
                  keyExtractor={item => item}
                  renderItem={({ item }) => (
                    <Button 
                      bordered 
                      rounded
                      info
                      style={styles.buttonList}
                      >
                      <Text style={{ color: "#33b5e5" }}>{item}</Text>
                    </Button>
                  )}
                />
              </ScrollView>

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
    marginTop: 20,
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default CreateEvent;
