import React, { useState, useEffect } from "react";
import axios from "axios";
import Playlist from "./Playlist/Playlist";
import Form from "./Form/Form";
import VideoList from "./Videos/VideoList";
import "./Home.css";

const BACKGROUND_COLOR = [
  "lightgray",
  "lightblue",
  "lightpink",
  "lightgreen",
  "lightsalmon",
  "lightskyblue",
  "lightseagreen",
  "lightgoldenrodyellow",
  "lightslategray",
];

const Home = () => {
  const [playlists, setPlaylists] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const [playlistsManaged, setPlaylistsManaged] = useState(false);

  const addPlaylist = (playlists) => {
    setPlaylists(playlists);
  };

  const selectPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
  };

  const removePlaylist = (playlist) => {
    axios
      .post("http://localhost:3001/remove-playlist", {
        playlist,
      })
      .then((res) => {
        setPlaylists(res.data.playlists);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/retrieve-playlist").then((res) => {
      setPlaylists(res.data.playlists);
    });
  }, []);

  return (
    <div>
      {!currentPlaylist ? (
        <div className="home-page">
          <header className="title">
            <h1>MOOVIE</h1>
          </header>
          <div className="btn-wrapper">
            <button
              className="manage-btn"
              onClick={() => setPlaylistsManaged(!playlistsManaged)}
            >
              MANAGE PLAYLISTS
            </button>
          </div>
          <main>
            <div className="grid-wrapper">
              {playlists &&
                playlists.map((playlist, index) => (
                  <Playlist
                    key={playlist.id}
                    backgroundColor={BACKGROUND_COLOR[index % 9]}
                    playlist={playlist}
                    removePlaylist={removePlaylist}
                    selectPlaylist={selectPlaylist}
                    playlistsManaged={playlistsManaged}
                  />
                ))}
              <div
                className="button-wrapper"
                onClick={() => setPlaylistAdded(true)}
              >
                {playlistAdded ? (
                  <Form
                    addPlaylist={addPlaylist}
                    setPlaylistAdded={setPlaylistAdded}
                  ></Form>
                ) : (
                  <img
                    src={require("./images/add.png").default}
                    className="add-button"
                    alt="add-btn"
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <VideoList
          videos={[...currentPlaylist.videoIds]}
          currentPlaylistId={currentPlaylist.id}
          addPlaylist={addPlaylist}
          selectPlaylist={selectPlaylist}
        />
      )}
    </div>
  );
};

export default Home;
