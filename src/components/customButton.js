// Node Modules
import React from 'react';
import { Text, TouchableHighlight, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient'

import styles, { viewportWidth } from "../styles/styles";

class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight underlayColor={this.props.underlay}
                                style={[styles.landingButton, this.props.style, {
                                        width: this.props.width,
                                        height: this.props.height,
                                        borderRadius: this.props.height/4
                                    }]}
                                onPress={this.props.onPress}
                                disabled={this.props.disabled}>
                <LinearGradient colors={this.props.gradients}
                                style={[styles.linearGradient, {
                                    width: this.props.width,
                                    height: this.props.height,
                                    borderRadius: this.props.height/4,
                                    justifyContent: 'center'
                                }]}>
                    <Text style={{
                        fontSize: this.props.fontSize,
                        fontFamily: this.props.fontFamily,
                        textAlign: 'center',
                        color: this.props.color,
                        backgroundColor: 'transparent',
                        includeFontPadding: false,
                        textAlignVertical: 'center'
                    }}>
                        {this.props.title}
                    </Text>
                </LinearGradient>
            </TouchableHighlight>
        )
    }
}

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    gradients: PropTypes.array.isRequired,
    fontFamily: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    underlay: PropTypes.string,
    style: ViewPropTypes.style,
};

CustomButton.defaultProps = {
    fontFamily: 'GelPen',
    gradients: ['#000000', '#000000', '#1B1B1B'],
    underlay: '#515151',
    height: 50,
    width: viewportWidth * .6,
    color: '#DA3865',
    fontSize: 18,
};

export default CustomButton;