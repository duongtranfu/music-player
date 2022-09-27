import { useEffect, useState, useRef } from "react";
import { FaPlay, FaChevronRight, FaChevronLeft, FaStop, FaVolumeUp, FaVolumeMute, FaRandom, FaQuestionCircle } from "react-icons/fa";
import { MdLoop } from "react-icons/md";
import { Popover } from '../Popover';
import styles from './player.module.scss';

const convertSecondsToMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export const Player = ({ mode, url, picture, artist, onChangeSong, onEndASong, toggleMode }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(false);
  const [urlSong, setUrlSong] = useState(url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    setUrlSong(url);
  }, [url]);

  const audioRef = useRef();
  const handleLoadedData = (e) => {
    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume / 100;
    audioRef.current.play();
    setLoading(false);
  };
  const handleTimeSliderChange = (e) => {
    if (!audioRef.current.paused) {
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
    if (e.deltaY < 0) {
      // Scroll Up
      onChangeSong('back');
    }
    if (e.deltaY > 0) {
      // Scroll down
      onChangeSong('next');
    }
  }

  const toggleMute = () => {
    setIsMute(!isMute);
    audioRef.current.muted = !isMute;
  };

  return (
    <div className={styles.player} onWheel={handleOnWheel}>
      <Popover
        target={<FaQuestionCircle />}
        content={
          <ul>
            <li>Scroll down to go to the next song</li>
            <li>Scroll up to back to the previous song</li>
            <li>Random mode will work after the song has ended</li>
          </ul>
        }
      />
      <img className={styles.picture} src={picture} alt="" />
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
          onEnded={() => onEndASong()}
        />
        <input
          type="range"
          min="0"
          max={duration}
          onMouseUp={() => audioRef.current.play()}
          value={progress}
          onChange={handleTimeSliderChange}
          disabled={loading}
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
      <div className={styles.volumeBar}>
        {isMute ? <FaVolumeMute onClick={toggleMute} /> : <FaVolumeUp onClick={toggleMute} />}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleChangeVolume}
        />
      </div>
      <div className={styles.volumeBar}>
        <span>{mode}</span>&nbsp;{mode === 'loop' ? <MdLoop onClick={toggleMode} /> : <FaRandom onClick={toggleMode} />}
      </div>
    </div>
  );
}
