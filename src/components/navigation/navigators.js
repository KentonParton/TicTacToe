// File Type: React Navigator
import { createAppContainer, createStackNavigator } from 'react-navigation';

import GameScreen from '../../screens/game'
import LoadingScreen from '../../screens/loading'
import MyGamesScreen from '../../screens/myGames'

// This is the main app navigator
const AppStack = createStackNavigator(
    {
        LoadingScreen: LoadingScreen,
        GameScreen: GameScreen,
        MyGamesScreen: MyGamesScreen,
    },
    {
        initialRouteName: "LoadingScreen",
    }
);

const AppNavigator = createAppContainer(AppStack);
export default AppNavigator;
