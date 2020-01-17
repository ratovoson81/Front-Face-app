// Navigation/Navigations.js
import React from "react"; // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Event from "../redux/containers/EventCtn";
import EventList from "../redux/containers/EventListCtn";
import EventDetail from "../components/EventDetail";
import Presence from "../components/Presence";

const EventStackNavigator = createStackNavigator({
  Event: {
    screen: Event,
    navigationOptions: {
      //header: null,
      title: "Face Recognition"
    }
  },
});

const EventListStackNavigator = createStackNavigator({
  EventList: {
    screen: EventList,
    navigationOptions: {
      title: "Face Recognition"
    }
  },
  EventDetail: {
    screen: EventDetail,
    navigationOptions: {
      title: "Détail de l'événement"
    }
  },
  Presence: {
    screen: Presence,
    navigationOptions: {
      title: "Presence"
    }
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Event: {
      screen: EventStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image source={require("../assets/add.png")} style={styles.icon} />
          );
        }
      }
    },
    EventList: {
      screen: EventListStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../assets/clipboard.png")}
              style={styles.icon}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#DDDDDD",
      inactiveBackgroundColor: "#FFFFFF",
      showLabel: false,
      showIcon: true
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

export default createAppContainer(TabNavigator);
