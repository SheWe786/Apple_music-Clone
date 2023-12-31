import React, { useState, useEffect } from "react";
import "./BrowsePage.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause"; // Import PauseIcon
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RandomAlbumGrid from "./RandomAlbumGrid";

function BrowsePage() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const [isPlaying, setIsPlaying] = useState(false); // Add isPlaying state

  useEffect(() => {
    fetch("https://academics.newtonschool.co/api/v1/music/album?limit=300", {
      headers: {
        projectId: "f104bi07c490",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("API Data:", res);
        setAlbums(res.data);
      })
      .catch((error) => console.error("Error fetching album data:", error));
  }, []);

  useEffect(() => {
    const albumTitles = document.querySelectorAll(".album-title");
    albumTitles.forEach((title) => {
      if (title.scrollWidth > title.clientWidth) {
        title.classList.add("scrolling");
      }
    });
  }, [albums]);

  const handleAlbumClick = (album) => {
    console.log("Album clicked:", album);
    navigate("/album", { state: { album } });
  };

  const handleSectionClick = (index) => {
    if (
      index === 1 ||
      index === 2 ||
      index === 3 ||
      index === 4 ||
      index === 5 ||
      index === 6 ||
      index === 7 ||
      index === 8 ||
      index === 9 ||
      index === 10 ||
      index === 11
    ) {
      // If "Playlist on the Pulse" is clicked, navigate to the "/random-albums" route
      navigate("/random-albums");
    } else {
      setExpandedSections((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    }
  };

  const handlePlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  const renderAlbumSections = () => {
    const albumsPerSection = 25;
    const albumSections = [];

    for (let i = 0; i < albums.length; i += albumsPerSection) {
      const section = albums.slice(i, i + albumsPerSection);
      albumSections.push(section);
    }

    return albumSections.map((section, index) => (
      <div key={index} className={`section section-${index + 1}`}>
        {index !== 0 && (
          <h2
            className="section-heading"
            onClick={() => handleSectionClick(index)}
          >
            {index === 1
              ? "Playlist on the Pulse"
              : index === 2
              ? "Now in Spatial Audio"
              : index === 3
              ? "New Music"
              : index === 4
              ? "DJ Mixes"
              : index === 5
              ? "Just Ask Siri"
              : index === 6
              ? "Apple Music Radio"
              : index === 7
              ? "Discover More Apple Music"
              : index === 8
              ? "Meditation Moments"
              : index === 9
              ? "Just Updated"
              : index === 10
              ? "Sounds of Sampha"
              : index === 11
              ? "Coming Soon"
              : `Custom Heading ${index + 1}`}
          </h2>
        )}
        <div
          className={`album-container ${
            expandedSections[index] ? "expanded-album-container" : ""
          }`}
        >
          {section.map((album) => (
            <div
              className="album"
              onClick={() => handleAlbumClick(album)}
              key={album.id}
            >
              <Card className="album-card custom-card">
                {index === 0 ? (
                  <>
                    <CardContent>
                      <div className="text-truncate">
                        <Typography
                          variant="h5"
                          component="div"
                          className="album-title"
                        >
                          {album.title}
                        </Typography>
                      </div>
                      <div className="text-truncate">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="song-title"
                        >
                          {album.artists[0].name}
                        </Typography>
                      </div>
                    </CardContent>
                    <div className="image-container">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="album-image"
                      />
                      <div
                        className={`play-pause-button ${
                          isPlaying ? "visible" : ""
                        }`}
                        onClick={handlePlayPauseClick}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}{" "}
                        {/* Play or Pause icon */}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="image-container">
                      <img
                        src={album.image}
                        alt={album.title}
                        className="album-image hover-effect"
                      />{" "}
                      {/* Add hover-effect class here */}
                      <div
                        className={`play-pause-button hover-visible ${
                          isPlaying ? "visible" : ""
                        }`}
                        onClick={handlePlayPauseClick}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}{" "}
                        {/* Play or Pause icon */}
                      </div>
                    </div>
                    <CardContent>
                      <div className="text-truncate">
                        <Typography
                          variant="h5"
                          component="div"
                          className="album-title"
                        >
                          {album.title}
                        </Typography>
                      </div>
                      <div className="text-truncate">
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="song-title"
                        >
                          {album.artists[0].name}
                        </Typography>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="screen-container">
      <h1>Browse Albums</h1>
      {albums && albums.length > 0 && <div>{renderAlbumSections()}</div>}
    </div>
  );
}

export default BrowsePage;
