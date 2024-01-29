import { useCallback } from 'react';
import { Howl } from 'howler';
import useSecondsToMinutes from './useSecondsToMinutes';

const useAudioPlayer = (
  setAudio: React.Dispatch<React.SetStateAction<Howl | null>>,
  setAudioDuration: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>, // Изменение типа здесь
  setChangedTime: React.Dispatch<React.SetStateAction<number>>,
  volumeRef: React.MutableRefObject<number>
) => {

  const secondsToMinutes = useSecondsToMinutes();

  const setNewAudio = useCallback((src: string | string[]) => {
    setAudio((prevAudio) => {
      prevAudio?.stop();
      prevAudio?.unload();
      if (src) {
        const newAudio: Howl = new Howl({
          src: Array.isArray(src) ? src : [src],
          volume: volumeRef.current / 100,
          onload: () => {
            setAudioDuration(secondsToMinutes(newAudio?.duration()?.toString()) ?? '');
          },
          onend: () => {
            setIsPlaying(false);
            setChangedTime(0);
          },
          onplayerror: (error) => {
            console.log('Player error', error);
          },
        });
        return newAudio;
      }
      return prevAudio;
    });
  }, [setAudio, setAudioDuration, secondsToMinutes, setChangedTime, volumeRef, setIsPlaying]);

  return {
    setNewAudio,
  };
};

export default useAudioPlayer;
