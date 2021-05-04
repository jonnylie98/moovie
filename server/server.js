const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonfile = require("jsonfile");

const videos = require("./videos.json");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-playlist", (req, res) => {
  const { name, description } = req.body.values;
  const playlist = {
    name,
    description,
    id: Math.floor(Math.random() * 10000000),
    videoIds: [],
    dateCreated: getDateCreated(),
  };
  addPlaylist(res, playlist);
});

app.post("/remove-playlist", (req, res) => {
  removePlaylist(res, req.body.playlist);
});

app.get("/retrieve-playlist", (req, res) => {
  retrievePlaylists(res);
});

app.get("/retrieve-videos", (req, res) => {
  retrieveVideos(res);
});

app.post("/add-videos", (req, res) => {
  const {
    videoId,
    currentPlaylistId: playlistId,
  } = req.body.videoToAddOrRemove;
  addVideo(res, playlistId, videoId);
});

app.post("/remove-videos", (req, res) => {
  const {
    videoId,
    currentPlaylistId: playlistId,
  } = req.body.videoToAddOrRemove;
  removeVideo(res, playlistId, videoId);
});

const getDateCreated = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const hour = String(today.getHours()).padStart(2, "0");
  const min = String(today.getMinutes()).padStart(2, "0");
  const sec = String(today.getSeconds()).padStart(2, "0");

  return yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + min + ":" + sec;
};

const retrievePlaylists = (res) => {
  jsonfile.readFile("playlists.json", (err, body) => {
    res.json(body);
  });
};

const retrieveVideos = (res) => {
  jsonfile.readFile("videos.json", (err, body) => {
    res.json(body);
  });
};

const addVideo = (res, playlistId, videoId) => {
  jsonfile.readFile("playlists.json", (err, body) => {
    addVideoToPlaylist(body, playlistId, videoId);
    jsonfile.writeFile("playlists.json", body, { spaces: 2 }, () => {
      res.json(body);
    });
  });
};

const removeVideo = (res, playlistId, videoId) => {
  jsonfile.readFile("playlists.json", (err, body) => {
    removeVideoFromPlaylist(body, playlistId, videoId);
    jsonfile.writeFile("playlists.json", body, { spaces: 2 }, () => {
      res.json(body);
    });
  });
};

const removePlaylist = (res, playlist) => {
  jsonfile.readFile("playlists.json", (err, body) => {
    removeFromPlaylists(body, playlist);
    jsonfile.writeFile("playlists.json", body, { spaces: 2 }, () => {
      res.json(body);
    });
  });
};

const addPlaylist = (res, playlist) => {
  jsonfile.readFile("playlists.json", (err, body) => {
    addToPlaylists(body, playlist);
    jsonfile.writeFile("playlists.json", body, { spaces: 2 }, () => {
      res.json(body);
    });
  });
};

const addToPlaylists = (body, playlist) => {
  body.playlists.push(playlist);
};

const removeFromPlaylists = (body, playlist) => {
  const playlists = body.playlists;
  body.playlists = playlists.filter((p) => p.id !== playlist.id);
};

const addVideoToPlaylist = (body, playlistId, videoId) => {
  body.playlists.forEach((p) => {
    if (p.id === playlistId && !p.videoIds.includes(videoId)) {
      p.videoIds.push(videoId);
    }
  });
};

const removeVideoFromPlaylist = (body, playlistId, videoId) => {
  body.playlists.forEach((p) => {
    if (p.id === playlistId) {
      p.videoIds = p.videoIds.filter((item) => item !== videoId);
    }
  });
};

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
