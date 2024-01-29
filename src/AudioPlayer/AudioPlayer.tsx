import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Howl, Howler } from 'howler';
import styles from './AudioPlayer.module.css';
import useSecondsToMinutes from '../Hooks/useSecondsToMinutes'
import useAudioPlayer from '../Hooks/useAudioPlayer'
import PrevIcon from '../Icons/PrevIcon'
// import PlayIcon from '../Icons/PlayIcon'
// import StopIcon from '../Icons/StopIcon'
import NextIcon from '../Icons/NextIcon'
import {SpeakerWaveIcon, ForwardIcon, BackwardIcon, PlayIcon, StopIcon} from '@heroicons/react/16/solid'


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
    Howler.autoUnlock = false;
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

    const handlePlayStopButton = () => {
        setIsPlaying(!isPlaying);
        isPlaying ? audio?.pause() : audio?.play();
        setVolume(volume);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.currentTarget.value, 10);
        volumeRef.current = newVolume;
        setVolume(newVolume)
        if (audio) {
            audio.volume(newVolume / 100);
        }
    };

    const handleTimeLineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseInt(e.currentTarget.value, 10);
        setChangedTime(newTime);
    };

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

    const playerBoxStyles: React.CSSProperties = {
        backgroundColor: `${bgColorProp ? bgColorProp : 'rgba(0, 0, 0, 0.2)'}`,
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '0.375rem',
        flexDirection: 'column',
        padding: '1em 2em 1em 2em',
    };

    const sliderStyles = {
        '--slider-color': sliderColorProp || '#ffffff',
        '--thumb-color': sliderColorProp || '#ffffff',
    } as React.CSSProperties;

    const PlayButton: React.FC = () =>
        playIconProp ? playIconProp : <PlayIcon color='white' style={{ width: '24px', height: '24px' }}/>

    const StopButton: React.FC = () =>
        stopIconProp ? stopIconProp : <StopIcon color='white' style={{ width: '24px', height: '24px' }}/>

    const handlePrevButton = async () => {
        if (Array.isArray(audioSrcProp) && audio) {
            if (currentIndex !== 0) {
                await new Promise<void>((resolve) => {
                    audio.once('stop', () => resolve());
                    audio.stop();
                    setCurrentIndex((prev) => prev - 1);
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
                    <div onClick={() => handlePrevButton()} style={{ cursor: 'pointer' }}>
                        {
                            prevIconProp ? prevIconProp
                            : 
                            <BackwardIcon color='white' style={{ width: '24px', height: '24px' }} />
                        }
                    </div>

                    <div onClick={() => handlePlayStopButton()} style={{ cursor: 'pointer' }}>
                        {
                            isPlaying ? <StopButton /> : <PlayButton />
                        }
                    </div>

                    <div onClick={() => handleNextButton()} style={{ cursor: 'pointer' }}>
                        {
                            nextIconProp ? nextIconProp 
                            :
                            <ForwardIcon color='white' style={{ width: '24px', height: '24px' }} />
                        }
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
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.2em 0 0 0' }} >
                            {
                                volumeIconProp ? volumeIconProp 
                                :
                                <SpeakerWaveIcon style={{ width: '10px', height: '10px' }} color='white'/>
                            }
                            
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
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};
          

export default AudioPlayer;