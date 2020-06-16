# Getting started

### Install app dependencies

In root folder, run `yarn install`

### Run The App

There are 2 ways to build and run the app locally:

-   **Via official IDEs**: Xcode (iOS), Android Studio (Android)
-   **Via command line**: `yarn ios` and `yarn android`

If you have an Android device, you can also install the release [apk file](https://github.com/anguyen1817/playlist/raw/master/files/app-release.apk) to try out the app.

# Features
### Current

- View playlists
- View songs of a playlist
- Add songs to a playlist
- Preview songs before adding to a playlist
- Play songs from a playlist
- Auto play the next song 
- View currently playing song and control it (play/pause) from any screen via the global mini "Now Playing" bar
- View currently playing song and control it (play/pause/next/previous) via the fullscreen "Now Playing"
- Playlists, songs as well as last played song are persisted throughout app session

### Future enhancements

- Seek bar  
- Playing queue
- Playlist song rearrangement & removal
- Music control from notification drawer
- Deeplinking support
- Artwork color extraction (so background matches song)
- Beat/Tempo visualizers

# App Demo
https://vimeo.com/429460227

# Prototype design
### Figma prototype

https://www.figma.com/proto/MWj45afi0fp4QjDcNmSdZ0/Playlist?node-id=0%3A2&scaling=scale-down

### Sketch screenshot

<img src="https://github.com/anguyen1817/playlist/blob/master/files/sketch-screenshot.png?raw=true" width="900" />

# Technical details
## Code structure
#### app folder

```
.
├── assets                        # images, animations
├── navigators                    # navigation system
├── store                         # redux store and reducers, actions and sagas (grouped by features)
├── styles                        # design system: color, font, size, dimension
├── utils                         # uitlities: audio, logger, toast
└── views                         # all UI components (grouped by navigation routes)
```
      
#### path aliases

```
actions              # redux actions
selectors            # redux selectors
styles               # design system
views                # UI components
types                # global typescript types
utils                # utilities
```

## Dependencies

#### media playback: [expo-av](https://docs.expo.io/versions/latest/sdk/av/)

#### animation: [lottie-react-native](https://airbnb.io/lottie/#/README), [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)

#### navigation: [react-navigation](https://reactnavigation.org/)


## Navigation system
<img src="https://github.com/anguyen1817/playlist/blob/master/files/navigation.png?raw=true" width="900" />


## State management & side effects

The app uses a combination of [redux](https://redux.js.org/ "https://redux.js.org/"), [redux saga](https://redux-saga.js.org/ "https://redux-saga.js.org/") and [react hooks](https://reactjs.org/docs/hooks-intro.html "https://reactjs.org/docs/hooks-intro.html") depending on the situation. For example, sagas are used to control music playback so that the logic is not coupled to any single UI component and can be triggered from anywhere.

## Unit testing

-   sagas via `redux-saga-test-plan`
-   redux reducers via `jest`
