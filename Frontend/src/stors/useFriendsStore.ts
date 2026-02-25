import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export interface Friend {
  _id: string;
  fullName: string;
  imageUrl: string;
  clerkId: string;
  followersCount: number;
  followingCount: number;
  isOnline?: boolean;
}

interface FriendsStore {
  friends: Friend[];
  isLoading: boolean;
  error: string | null;
  fetchFriends: () => Promise<void>;
}

export const useFriendsStore = create<FriendsStore>((set) => ({
  friends: [],
  isLoading: false,
  error: null,

  fetchFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/friends");
      set({ friends: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch friends",
        isLoading: false,
      });
    }
  },
}));
