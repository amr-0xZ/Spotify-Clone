
const PlaylistSkeleton = () => {
  return (
      Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          
          {/* Album Art Placeholder: Fixed size, rounded edges */}
          <div className="flex-none w-12 h-12 rounded-md bg-zinc-800 animate-pulse" />

          {/* Text Placeholders Container: Stretches to fill space */}
          <div className="flex-1 space-y-2">
            
            {/* Playlist Title: Slightly longer and taller */}
            <div className="h-4 w-3/4 rounded bg-zinc-800 animate-pulse" />
            
            {/* Playlist Subtitle: Shorter and thinner */}
            <div className="h-3 w-1/2 rounded bg-zinc-800 animate-pulse" />
            
          </div>
        </div>
      ))
  );
};

export default PlaylistSkeleton;