import { useUser } from "@clerk/clerk-react";
import { Users, UserPlus, UserMinus } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-400">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

      <div className="bg-zinc-900 rounded-lg p-6 mb-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user.imageUrl}
            alt={user.username || "Profile"}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {user.fullName || user.username || "User"}
            </h2>
            <p className="text-zinc-400">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Link
            to="/profile/followers"
            className="bg-zinc-800/50 rounded-lg p-4 text-center hover:bg-zinc-800 transition-colors cursor-pointer block"
          >
            <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">1,234</p>
            <p className="text-sm text-zinc-400">Followers</p>
          </Link>
          <Link
            to="/profile/following"
            className="bg-zinc-800/50 rounded-lg p-4 text-center hover:bg-zinc-800 transition-colors cursor-pointer block"
          >
            <UserMinus className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">567</p>
            <p className="text-sm text-zinc-400">Following</p>
          </Link>
          <Link
            to="/profile/friends"
            className="bg-zinc-800/50 rounded-lg p-4 text-center hover:bg-zinc-800 transition-colors cursor-pointer block"
          >
            <UserPlus className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-sm text-zinc-400">Friends</p>
          </Link>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="border-b border-zinc-800 pb-4">
            <label className="text-sm text-zinc-400 block mb-1">Email</label>
            <p className="text-white">
              {user.primaryEmailAddress?.emailAddress || "Not set"}
            </p>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <label className="text-sm text-zinc-400 block mb-1">
              First Name
            </label>
            <p className="text-white">{user.firstName || "Not set"}</p>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <label className="text-sm text-zinc-400 block mb-1">
              Last Name
            </label>
            <p className="text-white">{user.lastName || "Not set"}</p>
          </div>

          <div className="pb-4">
            <label className="text-sm text-zinc-400 block mb-1">
              Account Created
            </label>
            <p className="text-white">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
