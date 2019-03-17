
import React from 'react'
import { View } from 'react-native'
import AppNavigator from './src/components/navigation/navigators'
import { observer } from 'mobx-react'

class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

export default observer(App);