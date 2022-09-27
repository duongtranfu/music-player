import { useEffect, useState, useRef } from "react";
import { FaPlay, FaChevronRight, FaChevronLeft, FaStop } from "react-icons/fa";
import styles from './player.module.scss';

const convertSecondsToMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export const Player = ({ url, picture, artist, onChangeSong }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(false);
  const [urlSong, setUrlSong] = useState(url);
  const [isPlaying, setIsPlaying] = useState(false);
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
  
  const handleOnWheel = (e) => {
    console.log(e);
  }

  return (
    <div className={styles.player} onWheel={handleOnWheel}>
      <img className={styles.picture} src={picture} />
      <p>{artist}</p>
      <h2>Player</h2>
      <div className={styles.progressBar}>
        {loading ? '--:--' : convertSecondsToMMSS(progress)}
        <audio
          ref={audioRef}
          src={urlSong}
          hidden
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
          onLoadStart={() => setLoading(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <input
          type="range"
          min="0"
          max={duration}
          onMouseUp={() => audioRef.current.play()}
          value={progress}
          onChange={handleTimeSliderChange}
        />
        {loading ? '--:--' : convertSecondsToMMSS(duration)}
      </div>
      <div className={styles.actionBar}>
        <FaChevronLeft className={styles.backBtn} onClick={() => onChangeSong('back')} />
        {
          isPlaying ?
            <FaStop className={styles.stopBtn} onClick={() => audioRef.current.pause()} /> :
            <FaPlay className={styles.playBtn} onClick={() => audioRef.current.play()} />}
        <FaChevronRight className={styles.nextBtn} onClick={() => onChangeSong('next')} />
      </div>
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
