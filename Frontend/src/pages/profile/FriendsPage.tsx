import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FriendsPage = () => {
  // Placeholder data - will be replaced with API data
  const friends = [
    {
      id: "1",
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    {
      id: "2",
      name: "David Lee",
      username: "davidl",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "3",
      name: "Lisa Chen",
      username: "lisac",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
    {
      id: "4",
      name: "Chris Martin",
      username: "chrism",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
    },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/profile"
          className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">Friends</h1>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
          >
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-12 h-12 rounded-full bg-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{friend.name}</p>
              <p className="text-zinc-400 text-sm truncate">
                @{friend.username}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
