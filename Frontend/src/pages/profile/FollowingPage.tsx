import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FollowingPage = () => {
  // Placeholder data - will be replaced with API data
  const following = [
    {
      id: "1",
      name: "Alice Johnson",
      username: "alicej",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    {
      id: "2",
      name: "Bob Williams",
      username: "bobw",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    {
      id: "3",
      name: "Charlie Davis",
      username: "charlied",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
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
        <h1 className="text-3xl font-bold text-white">Following</h1>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden">
        {following.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full bg-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user.name}</p>
              <p className="text-zinc-400 text-sm truncate">@{user.username}</p>
            </div>
            <button className="px-4 py-2 bg-zinc-700 text-white rounded-full text-sm font-medium hover:bg-zinc-600 transition-colors">
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingPage;
