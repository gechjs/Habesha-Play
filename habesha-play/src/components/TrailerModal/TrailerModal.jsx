import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import './css/trailerModal.css';

const TrailerModal = ({ isOpen, onClose, movieTitle, trailerUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState(null);
  const [trailerNotFound, setTrailerNotFound] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (player) {
      player.stopVideo();
    }
    setIsPlaying(false);
    setTrailerNotFound(false);
    onClose();
  };

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      disablekb: 0,
      enablejsapi: 1,
      fs: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      cc_load_policy: 0,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    // Don't autoplay immediately, let user click play
  };

  const onStateChange = (event) => {
    const playerState = event.data;
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    setIsPlaying(playerState === 1);
  };

  const onError = (error) => {
    console.error('YouTube player error:', error);
    setTrailerNotFound(true);
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (player) {
      const iframe = player.getIframe();
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="trailer-modal-overlay">
      <div className="trailer-modal" ref={modalRef}>
        <div className="trailer-modal-header">
          <h2>{movieTitle}</h2>
          <button className="close-button" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="trailer-container">
          {trailerNotFound ? (
            <div className="trailer-not-found">
              <div className="trailer-not-found-content">
                <div className="trailer-icon">🎬</div>
                <h3>Trailer Not Available</h3>
                <p>Sorry, no trailer is available for "{movieTitle}"</p>
                <p>This movie doesn't have an official trailer yet. Please check back later as trailers are often added closer to release date.</p>
                <button className="trailer-not-found-button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="video-wrapper">
                <YouTube
                  videoId={trailerUrl}
                  opts={opts}
                  onReady={onReady}
                  onStateChange={onStateChange}
                  onError={onError}
                  className="youtube-player"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              
              <div className="video-controls">
                <div className="controls-left">
                  <button className="control-button play-pause-btn" onClick={togglePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                  </button>
                  
                  <button className="control-button mute-btn" onClick={toggleMute}>
                    {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </button>
                  
                  <button className="control-button fullscreen-btn" onClick={toggleFullscreen}>
                    <AspectRatioIcon />
                  </button>
                </div>
                
                <div className="controls-right">
                  <span className="control-info">Press ESC to close</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
