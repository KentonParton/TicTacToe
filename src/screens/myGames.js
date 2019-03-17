// Node Modules
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { observer } from 'mobx-react'
import styles from '../styles/styles'
// Stores
import GameStore from '../stores/gameStore'


class MyGamesScreen extends React.Component {
    constructor() {
        super();
    }
    // React Navigation Styles
    static navigationOptions = {
        title: 'Games',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#191819',
            borderBottomWidth: 1,
            borderColor: 'gray',
        },
    };

    // Navigates to games screen
    navigateToGame = (game) => {
        // navigate to the game screen and pass the game object to the navigatin props
        this.props.navigation.navigate('GameScreen', {
            game: game,
        });
    };

    componentDidMount() {
        // Loads all games that the user is part of
        GameStore.getGames();
    }

    renderMyGames = () => {
        if (GameStore.myGames.length !== 0) {
            // prevents updating the local state multiple times
            let tempMyGames = [];
            let k = 0;

            GameStore.myGames.forEach((game) => {
                tempMyGames.push(
                    <TouchableOpacity key={k} 
                        onPress={() => {
                            GameStore.isInitialLoad = true;
                            GameStore.currentGameKey = game.key;
                            // Navigate to game screen
                            this.navigateToGame(game);
                        }}
                    >
                        <View style={styles.myGamesRow}>
                            <Text style={[styles.myGamesText, styles.medFont, styles.fontGelPen]}>{game.title}</Text>
                        </View>
                    </TouchableOpacity>
                );
                k++;
            });
            return tempMyGames;
        }
    };

    render() {
        return (
            <ScrollView style={[{flex: 1}, styles.grayBackground]}>
                {this.renderMyGames()}
            </ScrollView>
        );
    }
}
export default observer(MyGamesScreen);