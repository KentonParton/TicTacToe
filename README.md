# TicTacToe
Fun cross-platform Tic Tac Toe App using React Native and Firebase Realtime Database for online games. Please, note that some aspects of the app will differ between the simulator and an actual device in order to make things easier in the simulator. I hope you like it! :) 

To see how the app works, please go to https://youtu.be/azTaLPwwLwY


## First Steps
- Ensure that react Native is installed. If it is not installed, please follow the "Getting Started" guide at https://facebook.github.io/react-native/docs/getting-started

- Next open terminal (macOS)/command-line (windows) and navigate to the directory you would like to clone the project into.

- To clone the project into your current directory, run:
```git clone https://github.com/KentonParton/TicTacToe.git```

- Navigate into the project with:
```cd TicTacToe```

- Install Node Modules with:
```npm install```


## Running iOS (Xcode)
Please note that two simulators will be run at the same time as shown in the YouTube video above.

1. Navigate to 'TicTacToe/ios/' and open TicTacToe.xcworkspace. Please note that the project has been ejected and uses CocoaPods.
2. Select your "Team" under "Code Signing" in Xcode.
3. Select a device simulator and Press the play button.
4. Repeat step 3 with another device simulator.
5. Select the simulator, then click "Edit" (Top left by Apple icon) and enable Automatically Sync Pasteboard. This will allow the game code to be copied and pasted to another iOS simulator.


## Running Android
1. Open Android Studio and open emulator.
2. Navigate to the project directory "TicTacToe/" in terminal/command line and run:
```react-native run-android```
3. Next, press the 3 dots on the emulator and check "Enable clipboard sharing".


## How to Copy an Paste Game Code
Both iOS and Android simulators allow user to copy the game code by pressing the invite opponent. Once copied, press "Join Game" on the other device and pastse the code into the text field. On iOS simply press "cmd + V" or on Android, long-press in the text-input and press paste.
