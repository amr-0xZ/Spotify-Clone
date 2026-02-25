import { Heart } from "lucide-react";

const LikedSongsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="size-24 bg-gradient-to-br from-purple-600 to-blue-400 rounded-lg flex items-center justify-center shrink-0">
          <Heart className="size-12 text-white fill-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white uppercase tracking-wider">
            Playlist
          </p>
          <h1 className="text-4xl font-bold text-white mt-1">Liked Songs</h1>
          <p className="text-zinc-400 mt-2">0 songs</p>
        </div>
      </div>

      <div className="text-zinc-400 text-center py-12">
        <p>Your liked songs will appear here</p>
      </div>
    </div>
  );
};

export default LikedSongsPage;
