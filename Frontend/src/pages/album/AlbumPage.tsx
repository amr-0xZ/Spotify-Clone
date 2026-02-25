import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, Clock, Heart } from "lucide-react";
import { useMusicStore } from "@/stors/useMusicStore";
import { cn } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";

// Helper function to format duration
const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Define Album type locally
interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: any[];
}

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentAlbum, setCurrentAlbum } = useMusicStore();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/albums/${id}`);
        setAlbum(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch album");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const handlePlay = () => {
    if (album) {
      setCurrentAlbum(album);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="p-6">
        <div className="text-zinc-400">Album not found</div>
      </div>
    );
  }

  const isCurrentPlaying = currentAlbum?._id === album._id;
  const totalDuration =
    album.songs?.reduce(
      (acc: number, song: { duration: number }) => acc + song.duration,
      0,
    ) || 0;

  return (
    <div className="pb-8">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-b from-zinc-800 to-zinc-950">
        <img
          src={album.imageUrl}
          alt={album.title}
          className="w-52 h-52 rounded-lg shadow-lg object-cover"
        />
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-sm font-medium text-white uppercase tracking-wider">
            Album
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-1 mb-2">
            {album.title}
          </h1>
          <p className="text-lg text-zinc-300 mb-1">{album.artist}</p>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <span>{album.releaseYear}</span>
            <span>•</span>
            <span>{album.songs?.length || 0} songs</span>
            <span>•</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 px-6 py-4">
        <button
          onClick={handlePlay}
          className="bg-green-500 hover:bg-green-400 rounded-full p-4 transition-colors"
        >
          {isCurrentPlaying ? (
            <Pause className="size-8 text-black fill-black" />
          ) : (
            <Play className="size-8 text-black fill-black" />
          )}
        </button>
        <button className="text-zinc-400 hover:text-white transition-colors">
          <Heart className="size-8" />
        </button>
      </div>

      {/* Songs List */}
      <div className="px-6">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-zinc-400 border-b border-zinc-800 text-sm">
          <span className="w-8 text-center">#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <Clock className="size-4" />
        </div>

        {/* Songs */}
        <div className="mt-2">
          {album.songs && album.songs.length > 0 ? (
            album.songs.map((song, index) => (
              <div
                key={song._id}
                className="group grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-zinc-800/50 transition-colors items-center cursor-pointer"
              >
                <span className="w-8 text-center text-zinc-400 group-hover:text-white">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play className="size-4 hidden group-hover:block text-white mx-auto" />
                </span>
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="size-10 rounded object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">
                      {song.title}
                    </p>
                    <p className="text-zinc-400 text-sm truncate">
                      {song.artist}
                    </p>
                  </div>
                </div>
                <span className="hidden md:block text-zinc-400 text-sm truncate">
                  {album.title}
                </span>
                <span className="text-zinc-400 text-sm">
                  {formatDuration(song.duration)}
                </span>
              </div>
            ))
          ) : (
            <div className="text-zinc-400 text-center py-12">
              <p>No songs in this album</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
