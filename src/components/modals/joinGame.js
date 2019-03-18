// Node Modules
import React from 'react';
import { Clipboard, Image, Modal, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import { observer } from 'mobx-react';
import {extendObservable} from 'mobx'
import Toast from 'react-native-simple-toast';

import styles from '../../styles/styles.js'
// Stores
import ModalStore from '../../stores/modalStore'
import GameStore from '../../stores/gameStore';
// Components
import CustomButton from '../../components/customButton'
import DismissKeyboard from '../../components/dismissKeyboard'


// This is the menu modal page.
class JoinGameModal extends React.Component {
    constructor() {
        super();
        extendObservable(this, {
            currentGameKey: ''
        })
    }

    componentWillMount() {
        // Clipboard.setString('');
        this.currentGameKey = '';
    }

    controlJoinGame = async () => {
        GameStore.resetStore();
        GameStore.currentGameKey = this.currentGameKey;
        let successfulJoin = await GameStore.joinGame();
        // if data saved successfully to Firebase
        if (successfulJoin === 1) {
            ModalStore.showJoinGame = false;
            this.props.navigation.navigate('GameScreen');
        } else if (successfulJoin === 2) {
            // error saving data to Firebase
            // probably incorrect game code given by user
            Toast.show('Please enter a valid game code.', Toast.SHORT);
        } else {
            Toast.show('This game is already full.', Toast.SHORT);
        }
    };

    // renders the modal/screen
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalStore.showJoinGame}
                onRequestClose={() => {
                    ModalStore.showJoinGame = false;
                }}
            >
                <DismissKeyboard>
                    <View style={styles.container}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback onPress={() => {ModalStore.showJoinGame = false;}}>
                                <Image source={require('../../assets/close.png')} style={{position: 'absolute', top: 15, right: 15, height: 25, width: 25}} resizeMode={'stretch'}/>
                            </TouchableWithoutFeedback>
                            <TextInput
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={(text) => this.currentGameKey = text}
                                value={this.currentGameKey}
                                placeholder='Enter Game Code'
                                underlineColorAndroid='transparent'
                                autoCorrect={false}
                            />
                            <CustomButton title={'Join Game'} height={40} style={{marginTop: 20}}
                                onPress={() => { 
                                    this.controlJoinGame();
                                }}
                            />
                        </View>
                    </View>
                </DismissKeyboard>
            </Modal>

        );
    }
}

export default observer(JoinGameModal);