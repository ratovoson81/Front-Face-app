import React from 'react'
import { StyleSheet, Text } from 'react-native'

class Presence extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            evenement: []
        };
      }

    render() {
        console.log(this.props.screenProps.evenement);
        if(this.props.screenProps.evenement.length === 0) {
        return (
            <Text>
                presence
            </Text>
        )}else {
            return (
                <Text>
                    presence
                </Text>
            )
        }
    }
}

const styles = StyleSheet.create({})

export default Presence