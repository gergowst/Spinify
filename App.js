import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ChevronUp } from 'lucide-react';
import YouTube from "react-youtube";

const songs = [
  {
    title: "Another Love",
    artist: "Tom Odell",
    albumCover: "linear-gradient(135deg, #046125ff 0%, #0015ffff 100%)",
    duration: 241000,
    youtubeId: "Jkj36B1YuDU", 
    lyrics: [
      "I wanna take you somewhere so you know I care",
      "But it's so cold and I don't know where",
      "I brought you daffodils in a pretty string",
      "But they won't flower like they did last spring",
      "",
      "And I wanna kiss you, make you feel alright",
      "I'm just so tired to share my nights",
      "I wanna cry and I wanna love",
      "But all my tears have been used up"
    ]
  },
  {
    title: "Between The Bars",
    artist: "Elliott Smith",
    albumCover: "linear-gradient(135deg, #1c1c2e 0%, #3a2b24 100%)",
    duration: 141000,
    youtubeId: "Ccd59iNjTzc", 
    lyrics: [
      "Drink up, baby, stay up all night",
      "With the things you could do",
      "You won't but you might, the potential you'll be",
      "That you'll never see, the promises you'll only make",
      "",
      "Drink up with me now",
      "And forget all about",
      "The pressure of days",
      "Do what I say & I'll make you okay"
    ]
  },
  {
    title: "Miss Misery",
    artist: "Elliott Smith",
    albumCover: "linear-gradient(135deg, #2b2b2b 0%, #7a1e1e 100%)",
    duration: 192000,
    youtubeId: "gRUyC9veWtw", 
    lyrics: [
      "I'll fake it through the day",
      "With some help from Johnnie Walker Red",
      "Send the poison rain down the drain",
      "To put bad thoughts in my head",
      "",
      "With two tickets torn in half",
      "And a lot of nothing to do",
      "Do you miss me, Miss Misery",
      "Like you say you do?",
    ]
  },
  {
    title: "The Foundations of Decay",
    artist: "My Chemical Romance",
    albumCover: "linear-gradient(135deg, #8B0000 0%, #1a1a1a 100%)",
    duration: 360000,
    youtubeId: "V2kWUJkRvVs", 
    lyrics: [
      "See the man who stands upon the hill",
      "He dreams of all the battles won",
      "But fate had left its scars upon his face",
      "With all the damage they had done",
      "",
      "And so tired with age, he turns the page",
      "Let the flesh submit itself to gravity",
      "Let our bodies lay, mark our hearts with shame",
      "Let our blood in vain, you find God in pain"
    ]
  }
];

export default function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [vinylRotation, setVinylRotation] = useState(0);

  const currentSong = songs[currentSongIndex];
  const [player, setPlayer] = useState(null);
const onReady = (event) => {
  setPlayer(event.target); // save YouTube player instance
};

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setVinylRotation(prev => prev + 1);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

    useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        handleNext();
      }, currentSong.duration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentSongIndex]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setShowLyrics(false);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setShowLyrics(false);
  };

const handlePlayPause = () => {
  if (!player) return;
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
  setIsPlaying(!isPlaying);
};


  const backgroundGradients = [
    'from-purple-900 via-pink-800 to-indigo-900',
    'from-pink-900 via-red-800 to-orange-900',
    'from-blue-900 via-cyan-800 to-teal-900',
    'from-yellow-900 via-pink-800 to-purple-900'
  ];

  return (
    <div
  className="min-h-screen transition-all duration-1000 flex items-center justify-center p-4 lg:p-8"
  style={{
    background: currentSong.albumCover
  }}
> {/* Top-left credit */}
<div className="absolute top-4 left-6 text-white tracking-tight opacity-90">
  <p className="text-2xl font-bold" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
    Made by Gergo
  </p>
  <p className="text-base italic font-serif opacity-80" style={{ textShadow: 'none' }}>
    moonlight over the vale.
  </p>
    </div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Song Info */}
          <motion.div 
            className="text-white space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentSong.title}
                  className="text-5xl lg:text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    textShadow: '0 0 30px rgba(255,255,255,0.5)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  {currentSong.title}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentSong.artist}
                  className="text-2xl lg:text-3xl opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentSong.artist}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setShowLyrics(!showLyrics)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">Lyrics</span>
              {showLyrics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.button>

            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
                >
                  {currentSong.lyrics.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 0.8, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-lg leading-relaxed"
                    >
                      {line || '\u00A0'}
                    </motion.p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Vinyl Player */}
          <motion.div 
            className="flex flex-col items-center space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Vinyl Record */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: vinylRotation }}
                transition={{ duration: 0, ease: "linear" }}
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #000000 100%)',
                  boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 0 60px rgba(255,255,255,0.1)'
                }}
              >
                {/* Grooves */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-gray-800/30"
                    style={{
                      top: `${10 + i * 5}%`,
                      left: `${10 + i * 5}%`,
                      right: `${10 + i * 5}%`,
                      bottom: `${10 + i * 5}%`,
                    }}
                  />
                ))}
                
                {/* Center Label */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center"
                  style={{
                    background: currentSong.albumCover,
                    boxShadow: '0 0 40px rgba(255,255,255,0.3), inset 0 0 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="text-white text-center">
                    <p className="text-xs font-bold opacity-90">{currentSong.artist}</p>
                    <p className="text-[10px] opacity-70 mt-1">{currentSong.title}</p>
                  </div>
                </div>

                {/* Highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </motion.div>

              {/* Tonearm */}
              <motion.div
                className="absolute top-0 right-0 w-40 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full origin-right"
                style={{
                  transformOrigin: 'right center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
                animate={{
                  rotate: isPlaying ? -60 : -90,
                  x: isPlaying ? 30 : 50,
                  y: isPlaying ? 140 : 100
                }}
                transition={{ type: "spring", stiffness: 50, damping: 10 }}
              >
                {/* Tonearm head */}
                <div className="absolute -left-4 -top-2 w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg" />
                {/* Needle */}
                <div className="absolute -left-5 top-2 w-1 h-4 bg-gray-700" />
              </motion.div>
            </div>

            {/* Controls */}
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handlePrevious}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={24} className="text-white" />
              </motion.button>

              <motion.button
                onClick={handlePlayPause}
                className="p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white ml-1" />
                )}
              </motion.button>

              <motion.button
                onClick={handleNext}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={24} className="text-white" />
              </motion.button>
             </motion.div>   {/* controls end */}
            {/* Hidden YouTube player */}
          <YouTube
  key={currentSong.youtubeId} // force reload on song change
  videoId={currentSong.youtubeId}
  opts={{
    height: "0",
    width: "0",
    playerVars: { autoplay: isPlaying ? 1 : 0 }
  }}
  onReady={(event) => setPlayer(event.target)} // keep reference for pause/play
  onStateChange={(e) => {
    if (e.data === 0) { // ended
      handleNext();
    }
  }}
/>
          </motion.div>
        </div>
      </div>
    </div>
  );
}