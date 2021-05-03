import React, { useRef, useState, useEffect } from "react";
import Video from "./Video";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import lottie from "lottie-web";

const VIDEOS_PER_PAGE = 5;

const AddVideos = ({
  videosAdded,
  stopAddingVideos,
  allVideos,
  currentPlaylistId,
  addPlaylist,
  addPlaylistVideos,
}) => {
  const [videoList, loaderRef] = useInfiniteScroll(
    allVideos || [],
    VIDEOS_PER_PAGE
  );
  const [animationStopped, setAnimationStopped] = useState(true);
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: require("../images/done.json"),
    });
    container.current = null;
  }, []);

  useEffect(() => {
    if (!animationStopped) {
      setVisibiliity("visible");
      lottie.play();
      setTimeout(() => {
        lottie.stop();
        setAnimationStopped(true);
        setVisibiliity("hidden");
      }, 3000);
    }
  }, [animationStopped]);

  const setVisibiliity = (visibility) => {
    document.querySelector(
      ".animation-container"
    ).style.visibility = visibility;
  };

  const playAnimation = () => {
    setAnimationStopped(false);
  };

  return (
    <div className="add-videos-page">
      <div className="animation-container" ref={container}></div>
      <header className="add-videos title">
        <h1>MOOVIE</h1>
      </header>
      <div className="add-videos-top-container">
        <div className="back-btn-container">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={"2x"}
            color={"white"}
            className="back-btn"
            onClick={stopAddingVideos}
          />
        </div>
      </div>
      <main>
        {videoList.map((video) => (
          <Video
            key={video.id}
            video={video}
            videosAdded={videosAdded}
            stopAddingVideos={stopAddingVideos}
            currentPlaylistId={currentPlaylistId}
            addPlaylist={addPlaylist}
            addPlaylistVideos={addPlaylistVideos}
            playAnimation={playAnimation}
          />
        ))}
        <div ref={loaderRef} />
      </main>
    </div>
  );
};

export default AddVideos;
