import React, { useState } from "react";
import "./Playlist.css";

const Playlist = ({
  playlist,
  removePlaylist,
  selectPlaylist,
  backgroundColor,
  playlistsManaged,
}) => {
  const [background] = useState(backgroundColor);
  return (
    <div className="card-wrapper">
      <div
        className="card"
        style={{ backgroundColor: background, position: "relative" }}
        onClick={() => selectPlaylist(playlist)}
      >
        <img
          alt={playlist.description}
          src={require("../images/video.png").default}
          style={{ height: "100px", width: "100px" }}
        />
        {playlistsManaged && (
          <img
            src={require("../images/remove.png").default}
            className="delete-playlist-btn"
            onClick={(event) => {
              event.stopPropagation();
              removePlaylist(playlist);
            }}
            alt="delete-playlist-btn"
          />
        )}
      </div>
      <div className="playlist-text">
        <h2>{playlist.name}</h2>
      </div>
    </div>
  );
};

export default Playlist;
