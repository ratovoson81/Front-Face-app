import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  List,
  ListItem,
  Right,
  Title
} from "native-base";

import Moment from "moment";
import UserAvatar from "react-native-user-avatar";

function EventList({ navigation, evenementData, actions }) {
  function EventDetail(item) {
    actions.setEvenement({ selected: item.id });
    navigation.navigate("EventDetail", { item: item });
  }

  function _displayStatus(event) {
    let status = "";
    const dateDebut = event.dateDebut;
    const dateFin = event.dateFin;

    if (!dateDebut) status = "Non debuté";
    if (dateDebut) status = "En cours";
    if (dateFin) status = "Terminé";

    return <Text>{status}</Text>;
  }

  function _displayDateDebut(event) {
    if (event.dateDebut) {
      return (
        <Text note>{Moment(event.dateDebut).format("H:mm, Do MMM  YYYY")}</Text>
      );
    }
  }

  function _displayDateFin(event) {
    if (event.dateFin) {
      return (
        <Text note>{Moment(event.dateFin).format("H:mm, Do MMM  YYYY")}</Text>
      );
    }
  }

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Liste des événements</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <FlatList
            style={styles.list}
            data={evenementData.listEvenement}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem style={styles.list} avatar>
                <TouchableOpacity
                  style={styles.main_container}
                  onPress={() => EventDetail(item)}
                >
                  <Left>
                    <UserAvatar size="50" name={item.categorie.nomCategorie} />
                  </Left>
                  <Body>
                    <Text style={styles.categorie}>
                      {item.categorie.nomCategorie}
                    </Text>
                    <Text note style={styles.description_text}>
                      {item.matiere.nomMatiere}{" "}
                    </Text>
                    <Text note style={styles.description_text}>
                      {item.responsables.map(p => (
                        <Text
                          key={p.individu.id}
                          style={styles.description_text}
                        >
                          {p.individu.nom} {p.individu.prenom}{" "}
                        </Text>
                      ))}
                    </Text>
                    <Text note style={styles.description_text}>
                      {item.groupeParticipants.map(p => (
                        <Text key={p.id}>{p.nomGroupeParticipant} </Text>
                      ))}
                    </Text>
                  </Body>
                  <Right>
                    <Text note style={styles.status}>
                      {_displayStatus(item)}
                    </Text>
                    <Text note style={styles.description_text}>
                      {_displayDateDebut(item)}
                    </Text>
                    <Text note style={styles.description_text}>
                      {_displayDateFin(item)}
                    </Text>
                  </Right>
                </TouchableOpacity>
              </ListItem>
            )}
          />
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    marginBottom: 20,
    padding: 15,
    maxWidth: 60
  },
  item: {
    marginTop: 40,
    width: 350
  },
  text: {
    color: "white"
  },
  Content: {
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    flex: 1
  },
  main_container: {
    flexDirection: "row"
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: "row"
  },
  categorie: {
    fontWeight: "bold",
    fontSize: 17,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  status: {
    fontWeight: "bold",
    fontSize: 15
  },
  description_container: {
    flex: 7
  },
  description_text: {
    color: "#666666"
  },
  date_container: {
    flex: 1
  }
});

export default EventList;
