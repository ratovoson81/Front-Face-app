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
  Right,
  Title
} from "native-base";

function EventList({ navigation, evenementData, actions }) {
  function EventDetail(item) {
    actions.setEvenement({ selected: item.id });
    navigation.navigate("EventDetail", { item: item });
  }

  function _displayStatus(event) {
    let status = "";
    const dateDebut = event.dateDebut;
    const dateFin = event.dateFin;

    if (!dateDebut) status = "non debutee";
    if (dateDebut) status = "en cours";
    if (dateFin) status = "terminee";

    return <Text>{status}</Text>;
  }

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Liste evenement </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <FlatList
          style={styles.list}
          data={evenementData.listEvenement}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.main_container}
              onPress={() => EventDetail(item)}
            >
              <View style={styles.content_container}>
                <View style={styles.header_container}>
                  <Text style={styles.categorie}>
                    {item.categorie.nomCategorie}
                  </Text>
                  <Text style={styles.status}>{_displayStatus(item)}</Text>
                </View>
                <View style={styles.description_container}>
                  <Text style={styles.description_text}>
                    {item.matiere.nomMatiere}{" "}
                  </Text>
                  <Text style={styles.description_text}>
                    {item.responsables.map(p => (
                      <Text key={p.individu.id}>
                        {p.individu.nom} {p.individu.prenom}
                      </Text>
                    ))}
                  </Text>
                  <Text style={styles.description_text}>
                    {item.groupeParticipants.nomGroupeParticipant}
                    {item.groupeParticipants.map(p => (
                      <Text key={p.id}>{p.nomGroupeParticipant}</Text>
                    ))}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  status: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#666666"
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
