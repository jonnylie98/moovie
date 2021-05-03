import React from "react";
import "./Video.css";
import axios from "axios";
import moment from "moment";

const ACTIONS = {
  ADD_VIDEOS: "add-videos",
  REMOVE_VIDEOS: "remove-videos",
};

const Video = ({
  video,
  videosAdded,
  currentPlaylistId,
  addPlaylist,
  addPlaylistVideos,
  videosManaged,
  playAnimation,
}) => {
  const addOrRemoveVideo = (url) => {
    const videoToAddOrRemove = {
      videoId: video.id,
      currentPlaylistId,
    };
    axios
      .post(`http://localhost:3001/${url}`, { videoToAddOrRemove })
      .then((res) => {
        addPlaylist(res.data.playlists);
        const object = selectObjectPlaylist(
          res.data.playlists,
          currentPlaylistId
        );
        addPlaylistVideos(object[0].videoIds);
      });
  };

  const convertDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const getUploadedTime = (date) => {
    const [yyyy, mm, dd] = getDateArray(date);
    return moment([yyyy, mm, dd]).fromNow();
  };

  const getDateArray = (date) => {
    const yyyy = parseInt(date.substr(0, 4));
    const mm = parseInt(date.substr(5, 2));
    const dd = parseInt(date.substr(8, 2));
    return [yyyy, mm, dd];
  };

  const selectObjectPlaylist = (allPlaylists, currentPlaylistId) => {
    return allPlaylists.filter((p) => {
      return p.id === currentPlaylistId;
    });
  };

  return (
    <div className="video-container">
      <div className="thumbnail-container">
        <img alt={video.name} src={video.thumbnail} className="thumbnail" />
        <div className="video-duration">{convertDuration(video.duration)}</div>
      </div>
      <div className="video-details">
        <div className="video-name">
          <h2>{video.name}</h2>
        </div>
        <div className="uploaded-time">
          {getUploadedTime(video.dateCreated)}
        </div>
        <div className="video-description">
          <p>{video.description}</p>
        </div>
      </div>
      <div className="video-actions">
        {videosAdded && (
          <button
            onClick={() => {
              addOrRemoveVideo(ACTIONS.ADD_VIDEOS);
              playAnimation();
            }}
            className="action-btn"
          >
            Add
          </button>
        )}
        {videosManaged && (
          <button
            onClick={() => addOrRemoveVideo(ACTIONS.REMOVE_VIDEOS)}
            className="action-btn"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Video;
