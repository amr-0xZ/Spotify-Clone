import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

// 1. Define Types based on your Backend Schemas
interface Song {
	_id: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
}

interface Album {
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: Song[];
}

// 2. Define the Store State & Actions
interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;

	fetchSongs: () => Promise<void>;
	fetchAlbums: () => Promise<void>;
}

// 3. Create the Store
export const useMusicStore = create<MusicStore>((set) => ({
	songs: [],
	albums: [],
	isLoading: false,
	error: null,

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get('/songs');
			set({ songs: response.data, isLoading: false });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get('/albums');
			set({ albums: response.data, isLoading: false });
		} catch (error: any) {
			set({ error: error.response.data.message, isLoading: false });
		}
	},
}));