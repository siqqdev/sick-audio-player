import React from 'react'
import styles from './Sliders.module.css'

interface VolumeSliderProps {
    volumeRef: React.MutableRefObject<number>, 
    audio: Howl | null, 
    setVolume: React.Dispatch<React.SetStateAction<number>>, 
    volume: number, 
    sliderColorProp?: string 
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ 
    volumeRef, 
    audio, 
    setVolume, 
    volume, 
    sliderColorProp 
}) => {

const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.currentTarget.value, 10);
        volumeRef.current = newVolume;
        setVolume(newVolume)
        if (audio) {
            audio.volume(newVolume / 100);
        }
};

const sliderStyles = {
    '--slider-color': sliderColorProp || '#ffffff',
    '--thumb-color': sliderColorProp || '#ffffff',
} as React.CSSProperties;

  return (
        <input
            type="range"
            min="0"
            max="100"
            step='1'
            value={volume}
            onChange={handleVolumeChange}
            className={`${styles.sliderVolume} ${styles.sliderColor} ${styles.sliderThumbColor}`}
            style={sliderStyles}
        />
  )
}

export default VolumeSlider