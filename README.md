# React Sick Audio Player

## Overview

The sick-audio-player is a versatile component for integrating audio playback functionalities into React applications. It is built using Howler.js.

Source

## Preview

![Example.png](https://i.imgur.com/Nn0eYXV.png)

## Features

- Play, pause, stop audio playback
- Navigate between tracks with next and previous buttons
- Adjustable volume control
- Customizable appearance with various icons and styling options

## Installation
To install the library, use the following npm command:

```bash
npm install sick-audio-player
```

## NPM

Visit the [NPM](https://www.npmjs.com/package/sick-audio-player)

## Usage
```jsx
import AudioPlayer from '@your-namespace/react-audio-player';

import React from 'react';
import AudioPlayer from 'sick-audio-player';

const YourComponent = () => {
  // Your component

  return (
    <AudioPlayer
      audioSrcProp={yourAudioSource} // Provide the audio source URL or an array of URLs
      imageSrcProp={yourImageSource} // Optional: Image source URL for display
      sliderColorProp={yourSliderColor} // Optional: Customize the slider color
      bgColorProp={yourBackgroundColor} // Optional: Customize the background color
      playIconProp={yourPlayIcon} // Optional: Provide a custom play icon component
      stopIconProp={yourStopIcon} // Optional: Provide a custom stop icon component
      volumeIconProp={yourVolumeIcon} // Optional: Provide a custom volume icon component
      nextIconProp={yourNextIcon} // Optional: Provide a custom next track icon component
      prevIconProp={yourPrevIcon} // Optional: Provide a custom previous track icon component
    />
  );
};

```
## Props
### audioSrcProp (required)
Type: string | string[]
Description: Specifies the source or an array of sources for the audio file(s).

### imageSrcProp
Type: string
Description: URL of the image to be displayed as the album cover.

### sliderColorProp
Type: string
Description: Color of the slider and thumb.

### bgColorProp
Type: string
Description: Background color of the player.

### playIconProp
Type: ReactNode
Description: Custom play icon component.

### stopIconProp
Type: ReactNode
Description: Custom stop icon component.

### volumeIconProp
Type: ReactNode
Description: Custom volume icon component.

### nextIconProp
Type: ReactNode
Description: Custom next track icon component.

### prevIconProp
Type: ReactNode
Description: Custom previous track icon component.

## Styling
You can customize the player's appearance by providing styles through the respective prop or by editing the AudioPlayer.module.css

## Hooks
The library utilizes custom hooks for managing audio playback and time conversion. You can find them in the Hooks directory.

### useAudioPlayer: Manages audio player state and controls.
### useSecondsToMinutes: Converts seconds to a readable time format.

## License
This library is licensed under the MIT License.