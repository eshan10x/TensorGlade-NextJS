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
    <div className={`mx-auto ${className}`}>
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

          {/* Enhanced Controls Container - More visible and prominent */}
          <div className="absolute bottom-6 right-6 flex gap-4 z-40">
            <button 
              className="bg-white backdrop-blur-sm rounded-full p-4 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border-2 border-white/20"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? 
                <VolumeX className="text-blue-600 w-7 h-7" /> : 
                <Volume2 className="text-blue-600 w-7 h-7" />
              }
            </button>
            
            <button 
              className="bg-white backdrop-blur-sm rounded-full p-4 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border-2 border-white/20"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <Pause className="text-blue-600 w-7 h-7" /> : 
                <Play className="text-blue-600 w-7 h-7 ml-1" />
              }
            </button>
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;