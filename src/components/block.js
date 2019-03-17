// Node Modules
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";

import styles from "../styles/styles";
// Stores
import GameStore from '../stores/gameStore'


class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // either gets X or O image
    getImage = () => {
        if (!GameStore.loading) {
            let imgObj = {
                1: require('../assets/x.png'),
                2: require('../assets/o.png')
            };
            return <Image style={styles.moveImg} source={imgObj[GameStore.list[this.props.index]]} resizeMode={'stretch'}/>
        }
    };

    render() {
        return (
            <View style={[styles.container, this.props.isCenter ? styles.verticalBorder : null]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        // check if block has already been pressed
                        if (GameStore.list[this.props.index] === 0) {
                            if (GameStore.isPlayersTurn()) {
                                GameStore.gameController(this.props.index);
                            }
                        }
                    }}
                >
                    <View style={styles.blockButtonChild}>
                        {this.getImage()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

Block.propTypes = {
    isCenter: PropTypes.bool,
    index: PropTypes.number.isRequired,
};

export default observer(Block);