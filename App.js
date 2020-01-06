import React from "react";
import Navigation from "./src/pages/Navigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";

import apolloClient from "./src/graphql/apollo";
import store from "./src/redux/store";

import { Root } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Root>
            <Navigation />
            </Root>
        </Provider>
      </ApolloProvider>
    );
  }
}
