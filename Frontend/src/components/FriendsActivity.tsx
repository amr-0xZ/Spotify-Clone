import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Users } from "lucide-react";
import { useFriendsStore } from "@/stors/useFriendsStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const FriendsActivity = () => {
  const { friends, isLoading, fetchFriends } = useFriendsStore();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <div className="h-full flex flex-col bg-zinc-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-zinc-800 shrink-0">
        <Users className="size-5 text-emerald-500 shrink-0" />
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
          Friends Activity
        </h2>
      </div>

      {/* Friends List */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-md animate-pulse"
                >
                  <div className="size-10 rounded-full bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 bg-zinc-800 rounded" />
                    <div className="h-2 w-16 bg-zinc-800 rounded" />
                  </div>
                </div>
              ))
            ) : friends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="size-10 text-zinc-600 mb-2" />
                <p className="text-zinc-400 text-sm">No friends yet</p>
                <p className="text-zinc-500 text-xs mt-1">
                  Follow artists to see their activity
                </p>
              </div>
            ) : (
              friends.map((friend) => (
                <Link
                  to={`/profile/${friend.clerkId}`}
                  key={friend._id}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-zinc-800 transition-colors group"
                >
                  {/* Avatar with online indicator */}
                  <div className="relative shrink-0">
                    <img
                      src={friend.imageUrl}
                      alt={friend.fullName}
                      className="size-10 rounded-full object-cover"
                    />
                    {friend.isOnline && (
                      <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-zinc-900 rounded-full" />
                    )}
                  </div>

                  {/* Name and stats */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                      {friend.fullName}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <span>{friend.followersCount} followers</span>
                      <span>•</span>
                      <span>{friend.followingCount} following</span>
                    </div>
                  </div>

                  {/* Message button */}
                  <Link
                    to={`/chat?userId=${friend.clerkId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                    title="Send message"
                  >
                    <MessageCircle className="size-4" />
                  </Link>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FriendsActivity;
