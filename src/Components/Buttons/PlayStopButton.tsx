import { PlayIcon, StopIcon } from '@heroicons/react/16/solid';
import React, { ReactNode, SetStateAction } from 'react'

interface PlayStopButtonProps {
    setIsPlaying: React.Dispatch<SetStateAction<boolean>>, 
    isPlaying: boolean, 
    audio: Howl | null, 
    stopIconProp?: ReactNode, 
    playIconProp?: ReactNode 
}

const PlayStopButton: React.FC<PlayStopButtonProps> = ({ 
    setIsPlaying, 
    isPlaying, 
    audio, 
    stopIconProp, 
    playIconProp 
}) => {

const PlayButton: React.FC = () =>
    playIconProp ? playIconProp : <PlayIcon color='white' style={{ width: '24px', height: '24px' }}/>

const StopButton: React.FC = () =>
    stopIconProp ? stopIconProp : <StopIcon color='white' style={{ width: '24px', height: '24px' }}/>

const handlePlayStopButton = () => {
    setIsPlaying(!isPlaying);
    isPlaying ? audio?.pause() : audio?.play();
};

  return (
    <div onClick={() => handlePlayStopButton()} style={{ cursor: 'pointer' }}>
        {
            isPlaying ? <StopButton /> : <PlayButton />
        }
    </div>
  )
}

export default PlayStopButton