"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Search,
  Library,
  ListMusic,
  Heart,
  User,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Maximize2,
  Mic2,
  ListEnd,
  Laptop2,
  Menu,
  X,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Sample tracks data
const tracks = [
  {
    id: 1,
    title: "Locked Eyes",
    artist: "David Guetta",
    duration: 238, // in seconds
    cover: "/placeholder.svg?height=150&width=150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Summer Vibes",
    artist: "Oscar Anton",
    duration: 194,
    cover: "/placeholder.svg?height=150&width=150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Beach Party",
    artist: "Coastal Beats",
    duration: 215,
    cover: "/placeholder.svg?height=150&width=150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Pop Mix",
    artist: "Various Artists",
    duration: 183,
    cover: "/placeholder.svg?height=150&width=150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Bass Lounge",
    artist: "Electronic Beats",
    duration: 226,
    cover: "/placeholder.svg?height=150&width=150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
]

// Format time in MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

export default function SpotifyClone() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const audioRef = useRef(null)

  const currentTrack = tracks[currentTrackIndex]

  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle track change
  const changeTrack = (index) => {
    setCurrentTrackIndex(index)
    setCurrentTime(0)
    setIsPlaying(true)

    // We need to wait for the new audio source to load
    setTimeout(() => {
      audioRef.current.play()
    }, 100)
  }

  // Handle next track
  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length
    changeTrack(newIndex)
  }

  // Handle previous track
  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    changeTrack(newIndex)
  }

  // Update progress as audio plays
  const updateProgress = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  // Handle seeking
  const seek = (newValue) => {
    audioRef.current.currentTime = newValue[0]
    setCurrentTime(newValue[0])
  }

  // Handle volume change
  const changeVolume = (newValue) => {
    const volumeValue = newValue[0]
    setVolume(volumeValue)
    audioRef.current.volume = volumeValue
  }

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", nextTrack)

    // Set initial volume
    audio.volume = volume

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", nextTrack)
    }
  }, [currentTrackIndex])

  // Sidebar content component for reuse
  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Home className="h-5 w-5 mr-3" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Search className="h-5 w-5 mr-3" />
          Search
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Library className="h-5 w-5 mr-3" />
          Your Library
        </Button>
      </div>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <ListMusic className="h-5 w-5 mr-3" />
          Create Playlist
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-800">
          <Heart className="h-5 w-5 mr-3" />
          Liked Songs
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="space-y-2 text-gray-400 text-sm pr-4">
          <div className="px-3 py-1 hover:text-white cursor-pointer">Discover Weekly</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Chill Vibes</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Pop Mix</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Hip Hop Mix</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Have a Great Day!</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Brain Food</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Release Radar</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Workout & Pop</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Soul Mix</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Uplifting Soul Classics</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">Running & Remix</div>
          <div className="px-3 py-1 hover:text-white cursor-pointer">90's & 00's</div>
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Audio element */}
      <audio ref={audioRef} src={currentTrack.audio} preload="metadata" />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-black/50 text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-black border-r border-zinc-800">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xl font-bold">Spotify</div>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 bg-black p-4 flex-shrink-0 border-r border-zinc-800">
          <SidebarContent />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-auto">
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-6">
              {/* User profile */}
              <div className="flex justify-end mb-6">
                <Button variant="ghost" className="rounded-full bg-black/30 text-white hover:bg-black/40">
                  <User className="h-4 w-4 mr-2" />
                  User
                </Button>
              </div>

              {/* Good morning section */}
              <h1 className="text-3xl font-bold mb-6">Good morning</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Discover Weekly</span>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Soft Rock</span>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Soundscapes for Gaming</span>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Workday Soul</span>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Top Podcasts</span>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors border-none cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 rounded-md flex items-center justify-center">
                      <ListMusic className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Good Vibes</span>
                  </CardContent>
                </Card>
              </div>

              {/* Jump back in section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Jump back in</h2>
                  <Button variant="link" className="text-gray-400 hover:text-white">
                    SEE ALL
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {tracks.map((track, index) => (
                    <div key={track.id} className="space-y-3">
                      <div
                        className="aspect-square bg-zinc-800 rounded-md overflow-hidden relative group cursor-pointer"
                        onClick={() => changeTrack(index)}
                      >
                        <Avatar className="w-full h-full rounded-md">
                          <AvatarImage src={track.cover || "/placeholder.svg"} alt={track.title} />
                          <AvatarFallback className="bg-zinc-700">{track.title.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            className="rounded-full bg-green-500 h-10 w-10 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (currentTrackIndex === index && isPlaying) {
                                togglePlayPause()
                              } else {
                                changeTrack(index)
                              }
                            }}
                          >
                            {currentTrackIndex === index && isPlaying ? (
                              <Pause className="h-5 w-5 text-black" />
                            ) : (
                              <Play className="h-5 w-5 text-black" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{track.title}</h3>
                        <p className="text-xs text-gray-400">{track.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Player */}
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-2 md:px-4 sticky bottom-0 z-10">
        <div className="w-1/3 flex items-center gap-2 md:gap-3 overflow-hidden">
          <Avatar className="h-10 w-10 md:h-14 md:w-14 rounded-md flex-shrink-0">
            <AvatarImage src={currentTrack.cover || "/placeholder.svg"} alt="Album cover" />
            <AvatarFallback className="bg-zinc-700 rounded-md">{currentTrack.title.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{currentTrack.title}</div>
            <div className="text-xs text-gray-400 truncate">{currentTrack.artist}</div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden sm:flex">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-1/3 flex flex-col items-center gap-1 md:gap-2">
          <div className="flex items-center gap-2 md:gap-5">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={prevTrack}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-white h-8 w-8 text-black hover:scale-105 transition-transform flex items-center justify-center"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={nextTrack}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full flex items-center gap-2 text-xs text-gray-400">
            <span className="text-[10px] md:text-xs">{formatTime(currentTime)}</span>
            <div className="h-1 flex-1 bg-zinc-700 rounded-full">
              <div
                className="h-1 bg-gray-400 rounded-full hover:bg-green-500 transition-colors"
                style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] md:text-xs">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden md:flex">
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden md:flex">
            <ListEnd className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden md:flex">
            <Laptop2 className="h-4 w-4" />
          </Button>
          <div className="hidden sm:flex items-center gap-1 w-24">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider value={[volume]} max={1} step={0.01} onValueChange={changeVolume} />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hidden lg:flex">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
