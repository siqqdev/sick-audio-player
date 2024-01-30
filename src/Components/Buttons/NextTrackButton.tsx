import { ForwardIcon } from '@heroicons/react/16/solid';
import React, { ReactNode } from 'react'

interface NextTrackButtonProps {
    audioSrcProp: string | string[],
    audio: Howl | null,
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
    setNewAudio: (scr: string | string[]) => void,
    setChangedTime: React.Dispatch<React.SetStateAction<number>>,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    nextIconProp?: ReactNode
}

const NextTrackButton: React.FC<NextTrackButtonProps> = ({ 
    audioSrcProp, 
    audio, 
    currentIndex, 
    setCurrentIndex, 
    setNewAudio, 
    setChangedTime, 
    setIsPlaying,
    nextIconProp
 }) => {

const handleNextButton = async () => {
    if (Array.isArray(audioSrcProp) && audio) {
        if (currentIndex < audioSrcProp.length - 1) {
            await new Promise<void>((resolve) => {
                audio.once('stop', () => resolve());
                audio.stop();
                setCurrentIndex((prev) => prev + 1);
                setNewAudio(Array.isArray(audioSrcProp[currentIndex]) ? audioSrcProp[currentIndex] : audioSrcProp);
                setChangedTime(0);
            });
        } else {
            await new Promise<void>((resolve) => {
                audio.once('pause', () => resolve());
                audio.pause();
            });

            setChangedTime(0);
        }
        setIsPlaying(false);
    }
};
    
  return (
    <div onClick={() => handleNextButton()} style={{ cursor: 'pointer' }}>
        {
            nextIconProp ? nextIconProp 
            :
            <ForwardIcon color='white' style={{ width: '24px', height: '24px' }} />
        }
    </div>
  )
}

export default NextTrackButton