import { Dimensions, StyleSheet } from 'react-native'
export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const colors = {
    pink : '#DA3865',
    blue: '#00a7a7',
    black: '#000000',
    green: '#96c93d',
    offBlack: '#191819'
};

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    grayBackground: {
        backgroundColor: colors.offBlack,
    },
    blackBackground: {
        backgroundColor: colors.black,
    },
    fontGelPen: {
        fontFamily: 'GelPen'
    },
    row: {
        flex: 1,
        flexDirection: 'row', 
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },

    //======================Alignment======================
    aFlexStart: {
        alignItems: 'flex-start',
    },
    aCenter: {
        alignItems: 'center'
    },
    jCenter: {
        justifyContent: 'center',
    },

    //======================Fonts======================
    medFont: {
        fontSize: 18,
    },
    lrgFont: {
        fontSize: 22,
    },
    xLrgFont: {
        fontSize: 36,
    },
    //======================Loading Screen======================
    headerText: {
        fontSize: 36,
        marginVertical: '20%',
        color: 'white',
    },
    //======================MyGames Screen======================
    myGamesRow: {
        width: '100%',
        height: viewportHeight * .15,
        backgroundColor: 'black',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    //======================Game Screen======================    
    gameInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        height: 90,
        borderRadius: 10,
        paddingHorizontal: '5%',
        backgroundColor: colors.black,
        marginTop: 10,
    },
    matrix: {
        width: viewportWidth,
        aspectRatio: 1,
        padding: viewportWidth * .1,
    },
    tbBorder: {
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: colors.pink,
    },
    verticalBorder: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: colors.pink,
    },

    playerIcon: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    },
    playerText: {
        alignSelf: 'center',
        marginLeft: 10,
        color: 'white',
    },

    //======================Modal======================

    modalContainer: {
        borderRadius: 10,
        padding: 40,
        backgroundColor: 'white',
    },
    textInput: {
        width: '60%',
        fontSize: 18,
        borderBottomWidth: 0.5,
        marginBottom: 20,
        borderColor: 'black',
        alignSelf: 'center'
    },
    colorPink: {
        color: colors.pink
    },
    closeImg: {
        position: 'absolute',
        top: 15,
        right: 15,
        height: 25,
        width: 25,
    },

    //======================CustomButton======================
    linearGradient: {
        justifyContent: 'center',
        backgroundColor: 'purple'
    },
    landingButton: {
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        elevation: 5,
    },

    //======================Block======================
    blockButtonChild: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moveImg: {
        width: '50%',
        height: '50%'
    },
    myGamesText: {
        alignSelf: 'center',
        color: colors.blue,
    },
});