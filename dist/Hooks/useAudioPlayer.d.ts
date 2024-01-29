import { Howl } from 'howler';
declare const useAudioPlayer: (setAudio: React.Dispatch<React.SetStateAction<Howl | null>>, setAudioDuration: React.Dispatch<React.SetStateAction<string | undefined>>, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>, setChangedTime: React.Dispatch<React.SetStateAction<number>>, volumeRef: React.MutableRefObject<number>) => {
    setNewAudio: (src: string | string[]) => void;
};
export default useAudioPlayer;
