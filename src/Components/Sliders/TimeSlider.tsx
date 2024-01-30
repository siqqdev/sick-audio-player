import React from 'react'
import useSecondsToMinutes from '../../Hooks/useSecondsToMinutes';
import styles from './Sliders.module.css'

interface TimeSliderProps {
    audio: Howl | null, 
    setChangedTime: React.Dispatch<React.SetStateAction<number>>, 
    changedTime: number, 
    setCurrentSecond: React.Dispatch<React.SetStateAction<string>>, 
    sliderColorProp?: string
}

const TimeSlider: React.FC<TimeSliderProps> = ({ 
    audio, 
    setChangedTime, 
    changedTime, 
    setCurrentSecond, 
    sliderColorProp 
}) => {

const secondsToMinutes = useSecondsToMinutes()

const handleTimeLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.currentTarget.value, 10);
    setChangedTime(newTime);
};

const sliderStyles = {
    '--slider-color': sliderColorProp || '#ffffff',
    '--thumb-color': sliderColorProp || '#ffffff',
} as React.CSSProperties;

const handleTimeLineChangeOnMouseUp = () => {
    setTimeout(() => {
        if (audio?.playing()) {
            audio?.pause();
            audio?.seek(changedTime);
            audio?.play();
        } else {
            audio?.seek(changedTime);
        }
    
        setCurrentSecond(secondsToMinutes(changedTime.toString()));
    }, 100)
};


  return (
    <input 
        type="range"
        min={0}
        max={audio?.duration() || 100}
        value={changedTime}
        step={1}
        onChange={(e) => handleTimeLineChange(e)}
        onMouseUp={() => handleTimeLineChangeOnMouseUp()}
        className={`${styles.sliderTime} ${styles.sliderColor} ${styles.sliderThumbColor}`}
        style={sliderStyles}    
    />
  )
}

export default TimeSlider