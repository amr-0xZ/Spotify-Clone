import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import MainLayout from "./layouts/mainLayout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import ProfilePage from "./pages/profile/ProfilePage";
import FollowersPage from "./pages/profile/FollowersPage";
import FollowingPage from "./pages/profile/FollowingPage";
import FriendsPage from "./pages/profile/FriendsPage";
import LikedSongsPage from "./pages/liked-songs/LikedSongsPage";
import AlbumPage from "./pages/album/AlbumPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:id" element={<AlbumPage />} />
          <Route path="/liked-songs" element={<LikedSongsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/followers" element={<FollowersPage />} />
          <Route path="/profile/following" element={<FollowingPage />} />
          <Route path="/profile/friends" element={<FriendsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
