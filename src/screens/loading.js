// Node Modules
import React from 'react';
import { Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { observer } from 'mobx-react'

import styles from '../styles/styles'
// Stores
import GameStore from '../stores/gameStore'
import ModalStore from '../stores/modalStore'
//Components
import CustomButton from '../components/customButton'
import JoinGameModal from '../components/modals/joinGame'
import NewGameModal from '../components/modals/newGame'

class LoadingScreen extends React.Component {
    constructor() {
        super();
    }
    // React Navigation Header
    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        // set users unique ID. This would typically be a bearer token.
        GameStore.deviceId = DeviceInfo.getUniqueID();
    }

    render() {
        return (
        <View style={[styles.mainContainer, styles.grayBackground]}>
            <NewGameModal navigation={this.props.navigation}/>
            <JoinGameModal navigation={this.props.navigation}/>
            <Text style={[styles.headerText, styles.fontGelPen]}>Tic Tac Toe</Text>
            <CustomButton title={'New Game'} fontFamily={'GelPen'} color={'#00a7a7'}
                onPress={() => {
                    ModalStore.showNewGame = true;
                }}
            />
            <CustomButton title={'Join Game'} fontFamily={'GelPen'} style={{marginTop: '15%', marginBottom: '15%'}} 
                onPress={() => {
                    ModalStore.showJoinGame = true;
                }}
            />
            <CustomButton title={'My Games'} fontFamily={'GelPen'} color={'#96c93d'}
                onPress={() => {
                    this.props.navigation.navigate('MyGamesScreen');
                }}
            />
        </View>
        );
    }
}

export default observer(LoadingScreen);