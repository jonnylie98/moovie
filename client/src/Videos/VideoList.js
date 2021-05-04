import React, { useState, useEffect } from "react";
import Video from "./Video";
import AddVideos from "./AddVideos";
import axios from "axios";
import useForm from "../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

const VideoList = ({
  videos,
  currentPlaylistId,
  addPlaylist,
  selectPlaylist,
}) => {
  const [videoIds, setVideoIds] = useState(videos);
  const [allVideos, setAllVideos] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [videosAdded, setVideosAdded] = useState(false);
  const [videosManaged, setVideosManaged] = useState(false);
  const [values, handleChange] = useForm({ name: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/retrieve-videos").then((res) => {
      const videosArray = res.data.videos;
      setAllVideos(videosArray);
      setPlaylistVideos(
        videosArray.filter((v) => {
          return videoIds.includes(v.id);
        })
      );
    });
  }, [videoIds]);

  const stopAddingVideos = (animationStopped) => {
    if (animationStopped) setVideosAdded((currentAdded) => !currentAdded);
  };

  const addPlaylistVideos = (newPlaylistVideos) => {
    setVideoIds(newPlaylistVideos);
  };

  return (
    <div className="page-wrapper">
      {!videosAdded ? (
        <div className="video-page">
          <div className="top-container">
            <header className="title">
              <h1>MOOVIE</h1>
            </header>
            <div className="back-btn-container">
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={"2x"}
                color={"white"}
                className="back-btn"
                onClick={() => selectPlaylist(null)}
              />
            </div>
            <div className="manage-btn-container">
              <button className="video-manage-btn" onClick={stopAddingVideos}>
                ADD VIDEOS
              </button>
              <button
                className="video-manage-btn"
                onClick={() => setVideosManaged((currManaged) => !currManaged)}
              >
                MANAGE VIDEOS
              </button>
            </div>
          </div>
          <div className="container-wrapper">
            <div className="search-container">
              <FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                size={"2x"}
                color={"white"}
              />
              <input
                className="search-input"
                type="text"
                name="name"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <main>
            {playlistVideos
              .filter((p) =>
                p.name.toLowerCase().includes(values.name.toLowerCase())
              )
              .map((video) => (
                <Video
                  key={video.id}
                  video={video}
                  currentPlaylistId={currentPlaylistId}
                  addPlaylist={addPlaylist}
                  addPlaylistVideos={addPlaylistVideos}
                  videosManaged={videosManaged}
                />
              ))}
          </main>
        </div>
      ) : (
        <AddVideos
          videosManaged
          videosAdded={videosAdded}
          stopAddingVideos={stopAddingVideos}
          allVideos={allVideos}
          currentPlaylistId={currentPlaylistId}
          addPlaylist={addPlaylist}
          addPlaylistVideos={addPlaylistVideos}
        />
      )}
    </div>
  );
};

export default VideoList;
