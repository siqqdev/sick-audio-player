import { useCallback } from 'react';

const useSecondsToMinutes = () => {
  const secondsToMinutes = useCallback((seconds: string) => {
    const inputSeconds = parseInt(seconds, 10);
    const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    };
    return formatTime(inputSeconds).toString();
  }, []);

  return secondsToMinutes;
};

export default useSecondsToMinutes;
