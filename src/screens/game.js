// Node Modules
import React from 'react';
import { Clipboard, Image, Share, Text, View} from 'react-native';
import { observer } from 'mobx-react'
import Toast from 'react-native-simple-toast';

import styles from '../styles/styles'
// Components
import Block from '../components/block'
import CustomButton from '../components/customButton'
import DeviceInfo from 'react-native-device-info'
import IsWinnerModal from '../components/modals/isWinner'
// Stores
import GameStore from '../stores/gameStore'

class GameScreen extends React.Component {
    constructor() {
        super();
    }

    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#191819',
            borderBottomWidth: 0,
            elevation: 0,
        },
    };

    componentDidMount() {
        // connect to the selected game
        GameStore.connectToGame();
    }

    // Gets the names of player one and two
    getPlayers = (index) => {        
        if (!GameStore.loading) {
            return GameStore.title.split(' VS ')[index]
        }
    };

    // checks if app is being run on a simulator
    isSimulator() {
        return DeviceInfo.isEmulator();
    }

    showNewGameButton = () => {
        if (GameStore.isWinner !== 0) {
            return (
                <CustomButton 
                    title={'New Game'}
                    fontFamily={'GelPen'} 
                    color={'#00a7a7'}
                    onPress={() => {
                        GameStore.resetGame();
                    }}
                />
            )
        }
    };

    showShareButton = () => {
        if (!GameStore.loading && !GameStore.gameHasSecondPlayer) {
            return (
                <CustomButton 
                    title={'Invite Opponent'}
                    fontFamily={'GelPen'} 
                    color={'#00a7a7'}
                    onPress={() => {
                        // if it's a simulator copy game code to clip board
                        if (this.isSimulator()) {
                            Clipboard.setString(GameStore.currentGameKey);
                            Toast.show('Game code copied to clipboard.', Toast.SHORT)
                        // allow user to share game code via an app on their phone
                        } else {
                            this.ShareMessage()
                        }
                    }}
                />
            )
        }
    };

    ShareMessage = () => {
        Share.share(
            {
                message: this.getPlayers(0) + ' has invited you to a game. Press "Join Game" and enter the following game code: ' + GameStore.currentGameKey
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    };
    

    render() {
        return (
            <View style={[styles.mainContainer, styles.grayBackground]}>
                <IsWinnerModal/>
                <View style={styles.gameInfo}>
                    <View style={[styles.column, styles.aFlexStart]}>
                        <View style={[styles.row, styles.jCenter]}>
                            <Image style={styles.playerIcon} source={require('../assets/x.png')} resizeMode={'contain'}/>
                            <View style={[styles.column, styles.jCenter]}>
                                <Text style={[styles.playerText, styles.lrgFont, styles.fontGelPen]}>{this.getPlayers(0)}</Text>
                                <Text style={[styles.playerText, styles.medFont, styles.fontGelPen]}>Wins: {!GameStore.loading ? GameStore.playerOneWins : null}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.column, styles.aFlexStart]}>
                        <View style={[styles.row, styles.jCenter]}>
                            <Image style={styles.playerIcon} source={require('../assets/o.png')} resizeMode={'contain'}/>
                            <View style={[styles.column, styles.jCenter]}>
                                <Text style={[styles.playerText, styles.lrgFont, styles.fontGelPen]}>{this.getPlayers(1)}</Text>
                                <Text style={[styles.playerText, styles.medFont, styles.fontGelPen]}>Wins: {!GameStore.loading ? GameStore.playerTwoWins : null}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.matrix}>
                    <View style={styles.row}>
                        <Block isCenter={false} index={0}/>
                        <Block isCenter={true} index={1}/>
                        <Block isCenter={false} index={2}/>
                    </View>
                    <View style={[styles.row, styles.tbBorder]}>
                        <Block isCenter={false} index={3}/>
                        <Block isCenter={true} index={4}/>
                        <Block isCenter={false} index={5}/>
                    </View>
                    <View style={styles.row}>
                        <Block isCenter={false} index={6}/>
                        <Block isCenter={true} index={7}/>
                        <Block isCenter={false} index={8}/>
                    </View>
                </View>
                {this.showNewGameButton()}
                {this.showShareButton()}
            </View>
        );
    }
}

export default observer(GameScreen);
