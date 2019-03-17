// Node Modules
import React from 'react';
import { Modal, Text, TouchableWithoutFeedback, View, } from 'react-native';
import { observer } from 'mobx-react';

import styles from '../../styles/styles.js'
// Stores
import ModalStore from '../../stores/modalStore'

// This is the menu modal page.
class IsWinnerModal extends React.Component {
    constructor() {
        super();
    }

    // renders the modal/screen
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalStore.showIsWinner}
                onRequestClose={() => {
                    ModalStore.showIsWinner = false;
                }}
            >
                <TouchableWithoutFeedback style={styles.container} onPress={() => ModalStore.showIsWinner = false}>
                    <View style={styles.container}>
                        <View style={[styles.modalContainer, styles.blackBackground]}>
                            <Text style={[styles.colorPink, styles.xLrgFont, styles.fontGelPen]}>{ModalStore.displayIsWinnerModal()}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

export default observer(IsWinnerModal);