import { useState } from 'react';
import { Player } from '../Player';
import styles from './playlist.module.scss';

export const Playlist = ({ songs = [] }) => {
  const firstSong = songs[0];
  const [selectedSong, setSelectedSong] = useState(firstSong);
  const [mode, setMode] = useState('loop'); // loop or random
  const handleSelectSong = song => {
    return () => {
      setSelectedSong(song);
    }
  }

  const handleNextSong = () => {
    const currentSongIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentSongIndex === songs.length - 1) {
      const nextSong = songs[0];
      setSelectedSong(nextSong);
      return;
    }
    setSelectedSong(songs[currentSongIndex + 1]);
  }

  const handleBackSong = () => {
    const currentSongIndex = songs.findIndex(song => song.id === selectedSong.id);
    if (currentSongIndex === 0) {
      const nextSong = songs[songs.length - 1];
      setSelectedSong(nextSong);
      return;
    }
    setSelectedSong(songs[currentSongIndex - 1]);
  }

  const randomSongInList = () => {
    const currentSongIndex = songs.findIndex(song => song.id === selectedSong.id);
    const randomIndex = Math.floor(Math.random() * songs.length);
    let randomSong;
    if (randomIndex === currentSongIndex) {
      randomSong = songs[randomIndex + 1];
    } else {
      randomSong = songs[randomIndex];
    }
    setSelectedSong(randomSong);
  }

  const handleChangeSong = (action) => {
    if (action === 'back') {
      handleBackSong();
    } else if (action === 'next') {
      handleNextSong();
    }
  }

  const handleToggleMode = () => {
    setMode(mode === 'loop' ? 'random' : 'loop');
  }

  const handleEndASong = () => {
    if (mode === 'random') {
      randomSongInList();
    } else {
      handleNextSong();
    }
  }

  return (
    <div className={styles.playList}>
      <div className={styles.listSong}>
        <div className={styles.libraryTitle}>
          Library
        </div>
        {songs.map(song => (
          <div key={song.id} className={`${styles.itemSong} ${song.id === selectedSong.id && styles.active}`} onClick={handleSelectSong(song)}>
            <img src={song.cover} alt={song.name} />
            <div className={styles.detailThumbnail}>
              <p>{song.name}</p>
              <p className={styles.artist}>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.song}>
        {
          selectedSong?.audio ?
            <Player
              mode={mode}
              url={selectedSong.audio}
              picture={selectedSong.cover}
              artist={selectedSong.artist}
              onChangeSong={handleChangeSong}
              onEndASong={handleEndASong}
              toggleMode={handleToggleMode}
            /> :
            <h3>Can't find song's source</h3>
        }
      </div>
    </div>
  );
}