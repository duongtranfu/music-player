import { useEffect, useState, useRef } from "react";
import styles from './player.module.scss';

const convertSecondsToMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export const Player = ({ url }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(false);
  const [urlSong, setUrlSong] = useState(url);
  useEffect(() => {
    setUrlSong(url);
    console.log('change url');
  }, [url]);
  const audioRef = useRef();
  const handleLoadedData = (e) => {
    console.log('handleLoadedData', e);
    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume / 100;
    audioRef.current.play();
    setLoading(false);
  };
  const handleTimeSliderChange = (e) => {
    console.log("change slider time")
    if (!audioRef.current.paused) {
      console.log("pause");

      audioRef.current.pause();
    }
    setProgress(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  const handleChangeVolume = (e) => {
    audioRef.current.volume = Number(e.target.value) / 100;
    setVolume(e.target.value);
  };

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={urlSong}
        hidden
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
        onLoadStart={() => setLoading(true)}
      />
      {loading ? '--:--' : convertSecondsToMMSS(progress)}
      <input
        type="range"
        min="0"
        max={duration}
        onMouseUp={() => audioRef.current.play()}
        value={progress}
        onChange={handleTimeSliderChange}
      />
      {loading ? '--:--' : convertSecondsToMMSS(duration)}
      <button onClick={() => audioRef.current.play()}>Play</button>
      <button onClick={() => audioRef.current.pause()}>Pause</button>
      <br /> volume
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleChangeVolume}
      />
    </div>
  );
}
