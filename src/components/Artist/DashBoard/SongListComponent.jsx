function SongListComponent({ songs }) {
    return (
      <div className="w-100 list">
        {songs.map((song) => (
          <div key={song.id} className="song-item d-flex align-items-center justify-content-between mb-3">
            <div className="song-details d-flex align-items-center">
              <img src={song.cover_url} alt="Song Cover" className="song-cover" />
              <div className="song-info ms-3">
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
            <div className="song-player">
              <audio controls>
                <source src={song.audio_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default SongListComponent;
  