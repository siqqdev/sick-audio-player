import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler';
import useSecondsToMinutes from '../Hooks/useSecondsToMinutes'
import useAudioPlayer from '../Hooks/useAudioPlayer'
import {SpeakerWaveIcon} from '@heroicons/react/16/solid'
import NextTrackButton from '../Components/Buttons/NextTrackButton';
import PrevTrackButton from '../Components/Buttons/PrevTrackButton';
import TimeSlider from '../Components/Sliders/TimeSlider';
import VolumeSlider from '../Components/Sliders/VolumeSlider';
import PlayStopButton from '../Components/Buttons/PlayStopButton';


interface PlayerPropsTypes {
    audioSrcProp: string | string[]
    imageSrcProp?: string
    sliderColorProp?: string
    bgColorProp?: string
    playIconProp?: ReactNode
    stopIconProp?: ReactNode
    volumeIconProp?: ReactNode
    nextIconProp?: ReactNode
    prevIconProp?: ReactNode
}

Howler.autoUnlock = false;

const AudioPlayer: React.FC<PlayerPropsTypes> = ({
    audioSrcProp,
    imageSrcProp,
    sliderColorProp,
    bgColorProp,
    playIconProp,
    stopIconProp,
    volumeIconProp,
    nextIconProp,
    prevIconProp,
}) => {
    const [audio, setAudio] = useState<Howl | null>(null);
    const [volume, setVolume] = useState<number>(50);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSecond, setCurrentSecond] = useState<string>('00:00');
    const [audioDuration, setAudioDuration] = useState<string | undefined>('');
    const [changedTime, setChangedTime] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const volumeRef = useRef<number>(50);

    const secondsToMinutes = useSecondsToMinutes()

    const {setNewAudio} = useAudioPlayer(setAudio, setAudioDuration, setIsPlaying, setChangedTime, volumeRef)

    useEffect(() => {
        const setNewAudioCallback = () => setNewAudio(audioSrcProp[currentIndex]);
        Array.isArray(audioSrcProp) ? setNewAudioCallback() : setNewAudio(audioSrcProp);
        console.log(audioSrcProp[currentIndex]);
    }, [audioSrcProp, currentIndex, setNewAudio]);

    useEffect(() => {
        setCurrentSecond(secondsToMinutes(Math.floor(audio?.seek() ?? 0).toString()));
        const intervalId = setInterval(() => {
            setCurrentSecond(secondsToMinutes(Math.floor(audio?.seek() ?? 0).toString()));
            if (audio?.playing()) {
                setChangedTime((prev) => prev + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [audio, secondsToMinutes, setCurrentSecond, setChangedTime]);

    const playerBoxStyles: React.CSSProperties = {
        backgroundColor: `${bgColorProp ? bgColorProp : 'rgba(0, 0, 0, 0.2)'}`,
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '0.375rem',
        flexDirection: 'column',
        padding: '1em 2em 1em 2em',
    };

return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={playerBoxStyles}>
                {
                    imageSrcProp ? 
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '1em 0 1em 0' }}>
                        <img src={imageSrcProp} style={{ height: '8em', width: '8em', borderRadius: '0.375em', boxShadow: '0 0 0.1em', }} alt="Image loading failed. Couldn`t access to the imageSrc" />
                    </div>
                    :
                    null
                }
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                    <PrevTrackButton 
                        audioSrcProp={audioSrcProp}
                        audio={audio}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setNewAudio={setNewAudio}
                        setChangedTime={setChangedTime}
                        setIsPlaying={setIsPlaying}
                        prevIconProp={prevIconProp}/>

                    <div>
                        <PlayStopButton 
                        setIsPlaying={setIsPlaying}
                        isPlaying={isPlaying}
                        audio={audio}
                        stopIconProp={stopIconProp}
                        playIconProp={playIconProp}
                        />
                    </div>

                    <div>
                        <NextTrackButton 
                        audioSrcProp={audioSrcProp}
                        audio={audio}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        setNewAudio={setNewAudio}
                        setChangedTime={setChangedTime}
                        setIsPlaying={setIsPlaying}
                        nextIconProp={nextIconProp}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', padding: '0.2em 0 0.2em 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'start', color: 'white', fontSize: '0.5em'}}>
                        {currentSecond}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'end', color: 'white', marginLeft: '5px', fontSize: '0.5em'}}>
                        {audioDuration ? audioDuration : '00:00'}
                    </div>
                </div>

                <div style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: '100%', justifyContent: 'center'}}>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <TimeSlider 
                            audio={audio}
                            setChangedTime={setChangedTime}
                            changedTime={changedTime}
                            setCurrentSecond={setCurrentSecond}
                            sliderColorProp={sliderColorProp}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2em 0 0 0' }} >
                            {
                                volumeIconProp ? volumeIconProp 
                                :
                                <SpeakerWaveIcon style={{ width: '10px', height: '10px' }} color='white'/>
                            }
                            
                            <VolumeSlider 
                            volumeRef={volumeRef}
                            audio={audio}
                            setVolume={setVolume}
                            volume={volume}
                            sliderColorProp={sliderColorProp}
                            />
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};
          

export default AudioPlayer;