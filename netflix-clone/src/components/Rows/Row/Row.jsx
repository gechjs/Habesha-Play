import React, { useEffect, useState, useRef } from "react";
import "./css/row.css";
import instance from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


const Loading = () => <div className="loading">Loading...</div>;


const ErrorMessage = () => <div className="error">Error loading movies.</div>;

const Row = ({ fetchUrl, title, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [arrowVisible, setArrowVisible] = useState(false);
  const imgBaseUrl = "https://image.tmdb.org/t/p/original/";
  const [trailerUrl, setTrailerUrl] = useState("");
  const sliderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(fetchUrl);
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [fetchUrl]);

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMovieClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error(error));
    }
  };

  const opts = {
    width: "100%",
    height: "390",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div
      className="row"
      onMouseEnter={() => setArrowVisible(true)}
      onMouseLeave={() => setArrowVisible(false)}
    >
      <h1>{title}</h1>
      {arrowVisible && (
        <>
          <ArrowBackIosNewIcon
            sx={{ fontSize: 60 }}
            onClick={slideLeft}
            className="leftArrow"
          />
          <ArrowForwardIosIcon
            sx={{ fontSize: 60 }}
            onClick={slideRight}
            className="rightArrow"
          />
        </>
      )}
      <div className="row_posters" ref={sliderRef}>
        {isLoading ? (
          <Loading />
        ) : hasError ? (
          <ErrorMessage />
        ) : (
          movies.map((movie, index) => {
            const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
            return imagePath && ( // Check if imagePath is not null before rendering
              <img
                key={index}
                onClick={() => handleMovieClick(movie)}
                src={`${imgBaseUrl}${imagePath}`}
                className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
                alt={movie.name || movie.title || movie.original_name}
              />
            );
          })
        )}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
