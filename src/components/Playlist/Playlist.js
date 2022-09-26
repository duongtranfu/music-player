import react, { useState } from 'react';
import { Player } from '../Player';
import styles from './playlist.module.scss';

export const Playlist = ({ songs = [] }) => {
  const firstSong = songs[0];
  const [selectedSong, setSelectedSong] = useState(firstSong);
  const handleSelectSong = song => {
    return () => {
      setSelectedSong(song);
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
        {selectedSong?.audio ? <Player url={selectedSong.audio} /> : <h3>Can't find song's source</h3>}
      </div>
    </div>
  );
}