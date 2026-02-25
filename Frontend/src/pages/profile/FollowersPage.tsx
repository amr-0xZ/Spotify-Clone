import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FollowersPage = () => {
  // Placeholder data - will be replaced with API data
  const followers = [
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: "3",
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      id: "4",
      name: "Sarah Williams",
      username: "sarahw",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "5",
      name: "Tom Brown",
      username: "tomb",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
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
        <h1 className="text-3xl font-bold text-white">Followers</h1>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        {followers.map((follower) => (
          <div
            key={follower.id}
            className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
          >
            <img
              src={follower.avatar}
              alt={follower.name}
              className="w-12 h-12 rounded-full bg-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{follower.name}</p>
              <p className="text-zinc-400 text-sm truncate">
                @{follower.username}
              </p>
            </div>
            <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
              Following
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
