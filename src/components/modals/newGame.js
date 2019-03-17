// Node Modules
import React from 'react';
import { Image, Modal, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { observer } from 'mobx-react';
import {extendObservable} from 'mobx'

import styles from '../../styles/styles.js'
// Components
import CustomButton from '../../components/customButton'
import DismissKeyboard from '../../components/dismissKeyboard'
// Stores
import GameStore from '../../stores/gameStore';
import ModalStore from '../../stores/modalStore'

// This is the menu modal page.
class NewGameModal extends React.Component {
    constructor() {
        super();
        extendObservable(this, {
            playerOne: '',
            playerTwo: '',
        })
    }
    // navigate to screen (react navigation)
    handleNavigation = (screen) => {
        this.props.navigation.navigate(screen);
    };

    componentWillMount() {
        this.playerOne = '';
        this.playerTwo = '';
    }

    // checks if textInputs values are empty
    isEmpty = () => {
        if (this.playerOne === '' || this.playerTwo === '') {
            return true;
        } else {
            return false;
        }

    };

    // renders the modal/screen
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalStore.showNewGame}
                onRequestClose={() => {
                    ModalStore.showNewGame = false;
                }}
            >
                <DismissKeyboard>
                    <View style={styles.container}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback onPress={() => {ModalStore.showNewGame = false;}}>
                                <Image source={require('../../assets/close.png')} style={styles.closeImg} resizeMode={'stretch'}/>
                            </TouchableWithoutFeedback>
                            <TextInput
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={(text) => this.playerOne = text}
                                value={this.playerOne}
                                placeholder='Player 1 First Name'
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.playerTwo = text}
                                value={this.playerTwo}
                                placeholder='Player 2 First Name'
                                underlineColorAndroid='transparent'
                            />
                            <CustomButton title={'Create Game'} height={40} style={{marginTop: 20}}
                                onPress={() => {
                                    if (!this.isEmpty()) {
                                        ModalStore.showNewGame = false;
                                        GameStore.resetStore();
                                        GameStore.title = this.playerOne + ' VS ' + this.playerTwo;
                                        GameStore.isInitialLoad = false;
                                        GameStore.createNewGame();
                                        this.handleNavigation('GameScreen');
                                    }
                                }}
                            />
                        </View>
                    </View>
                </DismissKeyboard>
            </Modal>
        );
    }
}

export default observer(NewGameModal);