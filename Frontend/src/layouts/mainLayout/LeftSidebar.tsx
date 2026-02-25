import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stors/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle, User, Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type LeftSidebarProps = {
  isCollapsed?: boolean;
};

const LeftSidebar = ({ isCollapsed = false }: LeftSidebarProps) => {
  const { albums, isLoading, fetchAlbums } = useMusicStore();

  useEffect(() => {
    if (albums.length === 0 && !isLoading) {
      fetchAlbums();
    }
  }, [albums, isLoading, fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2 overflow-hidden">
      {/* Navigation Section */}
      <div className="bg-zinc-900 rounded-lg p-2 flex flex-col gap-1 shrink-0">
        <Link
          to={"/"}
          title="Home"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full text-white hover:bg-zinc-800",
            isCollapsed ? "justify-center px-2" : "justify-start px-3",
          )}
        >
          <HomeIcon className="size-5 shrink-0" />
          {!isCollapsed && <span className="ml-2 truncate">Home</span>}
        </Link>

        <SignedIn>
          <Link
            to={"/liked-songs"}
            title="Liked Songs"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-white hover:bg-zinc-800",
              isCollapsed ? "justify-center px-2" : "justify-start px-3",
            )}
          >
            <Heart className="size-5 shrink-0" />
            {!isCollapsed && <span className="ml-2 truncate">Liked Songs</span>}
          </Link>
          <Link
            to={"/chat"}
            title="Messages"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-white hover:bg-zinc-800",
              isCollapsed ? "justify-center px-2" : "justify-start px-3",
            )}
          >
            <MessageCircle className="size-5 shrink-0" />
            {!isCollapsed && <span className="ml-2 truncate">Messages</span>}
          </Link>
          <Link
            to={"/profile"}
            title="Profile"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full text-white hover:bg-zinc-800",
              isCollapsed ? "justify-center px-2" : "justify-start px-3",
            )}
          >
            <User className="size-5 shrink-0" />
            {!isCollapsed && <span className="ml-2 truncate">Profile</span>}
          </Link>
        </SignedIn>
      </div>

      {/* Library Section */}
      <div className="flex-1 bg-zinc-900 rounded-lg flex flex-col min-h-0 overflow-hidden">
        {/* Library Header */}
        <div
          className={cn(
            "flex items-center gap-2 p-3 shrink-0",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <Library className="size-5 text-zinc-400 shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex-1 truncate">
              Your Library
            </span>
          )}
        </div>

        {/* Scrollable Album List */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className={cn("pb-2", isCollapsed ? "px-1" : "px-2")}>
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    title={
                      isCollapsed
                        ? `${album.title} • ${album.artist}`
                        : undefined
                    }
                    className={cn(
                      "flex items-center gap-3 rounded-md hover:bg-zinc-800 transition-colors group",
                      isCollapsed ? "p-2 justify-center" : "p-2",
                    )}
                  >
                    <img
                      src={album.imageUrl}
                      alt={album.title}
                      className="size-10 rounded-md object-cover shrink-0"
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {album.title}
                        </p>
                        <p className="text-xs text-zinc-400 truncate">
                          Album • {album.artist}
                        </p>
                      </div>
                    )}
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
