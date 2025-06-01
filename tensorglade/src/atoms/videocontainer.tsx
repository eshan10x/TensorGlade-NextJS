// components/VideoContainer.tsx
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';


interface VideoContainerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({ 
  videoSrc, 
  posterSrc = '/video-placeholder.jpg',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start playing automatically when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      
      // Some browsers prevent autoplay unless video is muted
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            setIsPlaying(true);
          })
          .catch(error => {
            // Autoplay was prevented
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
    
    // Add event listener for when the video ends
    const handleVideoEnd = () => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }
    
    // Cleanup function
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={` mx-auto ${className}`}>
      <div className="relative rounded-3xl overflow-hidden p-1">
        <div className="bg-black rounded-xl overflow-hidden relative">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster={posterSrc}
            loop
            playsInline
            muted
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Controls Container */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all duration-200"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? 
                <VolumeX className="text-blue-600 w-6 h-6" /> : 
                <Volume2 className="text-blue-600 w-6 h-6" />
              }
            </button>
            
            <button 
              className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all duration-200"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <Pause className="text-blue-600 w-6 h-6" /> : 
                <Play className="text-blue-600 w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;