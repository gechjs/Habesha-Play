import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import requests from "../../utils/request";
import "./css/banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await instance.get(requests.fetchNetflixOriginals);
        const filteredMovies = response.data.results.filter(
          (movie) => movie.vote_average >= 7
        );
        const randomMovie =
          filteredMovies.length > 0
            ? filteredMovies[
                Math.floor(Math.random() * filteredMovies.length)
              ]
            : response.data.results[
                Math.floor(Math.random() * response.data.results.length)
              ];
        setMovie(randomMovie);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    getMovie();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${
          movie?.backdrop_path || "/defaultFallbackImage.jpg"
        }")`,
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        {error ? (
          <h1 className="banner_error">Failed to load banner content. Please try again later.</h1>
        ) : (
          <>
            <h1 className="banner_title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner_buttons">
              <div className="banner_button play">Play</div>
              <div className="banner_button">My List</div>
            </div>
            <h1 className="banner_description">
              {movie?.overview?.length > 150
                ? movie?.overview.slice(0, 150) + "..."
                : movie?.overview}
            </h1>
          </>
        )}
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
