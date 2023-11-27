import { useState, useEffect } from "react";

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

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Use useEffect to manage the interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clean up the interval when the component is unmounted or when isRunning changes to false
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
    formattedTime: formatTime(time),
  };
};

export default useStopwatch;
