import { useState } from 'react';

interface Stopwatch {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  formattedTime: string;
}

const useStopwatch = (): Stopwatch => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let intervalId: NodeJS.Timeout;

  const start = () => {
    if (!isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const stop = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return { time, isRunning, start, stop, reset, formattedTime: formatTime(time) };
};

export default useStopwatch;
