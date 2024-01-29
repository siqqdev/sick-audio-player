import React, { ReactNode } from 'react';
interface PlayerPropsTypes {
    audioSrcProp: string | string[];
    imageSrcProp?: string;
    sliderColorProp?: string;
    bgColorProp?: string;
    playIconProp?: ReactNode;
    stopIconProp?: ReactNode;
    volumeIconProp?: ReactNode;
    nextIconProp?: ReactNode;
    prevIconProp?: ReactNode;
}
declare const AudioPlayer: React.FC<PlayerPropsTypes>;
export default AudioPlayer;
