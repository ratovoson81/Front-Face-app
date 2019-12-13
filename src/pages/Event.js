import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title, Picker, Icon } from 'native-base';

class Event extends React.Component{

    constructor(props) {
        super(props);
        this.categorie = ""
        this.responsable = ""
        this.matiere = ""
        this.state = {
            niveau: undefined,
            parcour: undefined,
            data: [],
            participants: [],
            evenement: []
        };
      }

      _categorieTextInputChanged(text) {
        this.categorie = text
      }
      _reponsableTextInputChanged(text) {
        this.responsable = text
      }
      _matiereTextInputChanged(text) {
        this.matiere = text
      }

      onValueChangeP(value: string) {
        this.setState({
             parcour: value 
        });
      }

      onValueChangeN(value: string) {
        this.setState({
             niveau: value 
        });
      }

      _addParticipant() {
          this.setState({
              data:[
                {
                  niveau: this.state.niveau,
                  parcour: this.state.parcour
                }],   
          }, () => {   
           this.setState({         
                participants: [ ...this.state.participants, ...this.state.data]
            })     
        })
      }

      _doPresence = () => {
        this.setState({
          evenement:[{
            categorie : this.categorie,
            responsable : this.responsable,
            matiere : this.matiere,
            participants : this.state.participants,
            date : new Date().getDate()
          }]
        }, () => {
          this.props.screenProps.evenement = this.state.evenement;
          console.log(this.props.screenProps.evenement);
          this.props.navigation.navigate("Presence")
        })
        //console.log(this.state.evenement);
      }

    render() {
        //console.log(this.state.participants);
        return (
            <Container style={styles.container}>
              <Header>
                <Left/>
                <Body>
                    <Title>New event </Title>
                </Body>
                <Right />
              </Header>
            <Content>
              <Form style={styles.form}>

                <Item inlineLabel  style={styles.item}>
                <Icon active name='calendar' />
                  <Label>Catégorie</Label>
                  <Input 
                    onChangeText={(text) => this._categorieTextInputChanged(text)}
                  />
                </Item>

                <Item inlineLabel style={styles.item} >
                <Icon active name='person' />
                  <Label>Responsable</Label>
                  <Input 
                    onChangeText={(text) => this._reponsableTextInputChanged(text)}
                  />
                </Item>

                <Item inlineLabel style={styles.item}>
                <Icon active name='book' />
                  <Label>Matière</Label>
                  <Input 
                    onChangeText={(text) => this._matiereTextInputChanged(text)}
                  />
                </Item>

                <Form>
                <Label style={styles.label}>Choisir les participants</Label>
                <Item picker style={styles.item}>
                    <Picker 
                        mode="dropdown"
                        style={{ width: undefined }}
                        placeholder="Niveau"
                        //placeholderStyle={{ color: "#bfc6ea" }}
                        //placeholderIconColor="#007aff"
                        selectedValue={this.state.niveau}
                        onValueChange={this.onValueChangeN.bind(this)}
                    >
                    <Picker.Item label="L1" value="L1" />
                    <Picker.Item label="L2" value="L2" />
                    <Picker.Item label="L3" value="L3" />
                    <Picker.Item label="M1" value="M1" />
                    <Picker.Item label="M2" value="M2" />
                </Picker>

                    <Picker
                        mode="dropdown"
                        style={{ width: undefined }}
                        placeholder="Parcour"
                        //placeholderStyle={{ color: "#bfc6ea" }}
                        //placeholderIconColor="#007aff"
                        selectedValue={this.state.parcour}
                        onValueChange={this.onValueChangeP.bind(this)}
                    >
                    <Picker.Item label="GB" value="GB" />
                    <Picker.Item label="SR" value="SR" />
                    <Picker.Item label="IG" value="IG" />
                </Picker>
                

                <Button secondary rounded onPress={() => this._addParticipant()}><Icon name='add' /></Button>
                </Item>
                </Form>

                <ScrollView style={{flex: 1}}>
                <FlatList
                    data={this.state.participants}
                    keyExtractor={(item) => item.niveau+item.parcour}
                    renderItem={({item}) => <Text>{item.niveau} {item.parcour}</Text>}
                />
                </ScrollView>
                <Button style={styles.button} 
                  rounded 
                  iconLeft
                  onPress={() => this._doPresence() }
                  >
                    <Text style={styles.text} >CONFIRMER</Text>
                    <Icon name='paper-plane' />
               </Button>

              </Form>
            </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        marginLeft: 20,
        marginTop: 20
    },
    form: {
      alignItems:'center',
      justifyContent: 'center'
    },
    item: {
      marginTop: 20,
      marginBottom: 20,
      width: 350,
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      padding: 15
    },
    text: {
      color: 'white'
    }
})

export default Event