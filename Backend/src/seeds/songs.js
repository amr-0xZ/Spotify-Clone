import mongoose from 'mongoose';
import { Song } from '../models/song.model.js'; 
import { Album } from '../models/album.model.js'; 
import {config} from 'dotenv'

config()

// Sample songs data
const songsData = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    tag: "Pop",
    playCount: 2500000,
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 200
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    tag: "Rock",
    playCount: 3200000,
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 354
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    tag: "Pop",
    playCount: 2800000,
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 233
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    tag: "Rock",
    playCount: 1900000,
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 301
  },
  {
    title: "One Dance",
    artist: "Drake",
    tag: "Hip-Hop",
    playCount: 2100000,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 173
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    tag: "Rock",
    playCount: 2700000,
    imageUrl: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 391
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    tag: "Pop",
    playCount: 1800000,
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 203
  },
  {
    title: "Circles",
    artist: "Post Malone",
    tag: "Pop",
    playCount: 1600000,
    imageUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 215
  },
  {
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    tag: "Rock",
    playCount: 2900000,
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 482
  },
  {
    title: "Bad Guy",
    artist: "Billie Eilish",
    tag: "Alternative",
    playCount: 2200000,
    imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 194
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    tag: "Funk",
    playCount: 2400000,
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    duration: 269
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    tag: "Rock",
    playCount: 2600000,
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    duration: 356
  },
  {
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    tag: "Pop",
    playCount: 1700000,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    duration: 174
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    tag: "Hip-Hop",
    playCount: 2000000,
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    duration: 177
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    tag: "Alternative",
    playCount: 1950000,
    imageUrl: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    duration: 204
  },
  {
    title: "Thunderstruck",
    artist: "AC/DC",
    tag: "Rock",
    playCount: 2300000,
    imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    duration: 292
  },
  {
    title: "Señorita",
    artist: "Shawn Mendes & Camila Cabello",
    tag: "Pop",
    playCount: 1850000,
    imageUrl: "https://images.unsplash.com/photo-1499415479124-43c32433a620?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
    duration: 191
  },
  {
    title: "God's Plan",
    artist: "Drake",
    tag: "Hip-Hop",
    playCount: 2150000,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
    duration: 198
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    tag: "Soul",
    playCount: 2450000,
    imageUrl: "https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3",
    duration: 228
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    tag: "Soul",
    playCount: 2350000,
    imageUrl: "https://images.unsplash.com/photo-1460667262436-cf19894f4774?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
    duration: 285
  }
];

// Albums data with their song titles
const albumsData = [
  {
    title: "After Hours",
    artist: "The Weeknd",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    releaseYear: 2020,
    songTitles: ["Blinding Lights"]
  },
  {
    title: "A Night at the Opera",
    artist: "Queen",
    imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400",
    releaseYear: 1975,
    songTitles: ["Bohemian Rhapsody"]
  },
  {
    title: "Divide",
    artist: "Ed Sheeran",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    releaseYear: 2017,
    songTitles: ["Shape of You"]
  },
  {
    title: "Nevermind",
    artist: "Nirvana",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    releaseYear: 1991,
    songTitles: ["Smells Like Teen Spirit"]
  },
  {
    title: "Views",
    artist: "Drake",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    releaseYear: 2016,
    songTitles: ["One Dance", "God's Plan"]
  },
  {
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    releaseYear: 2020,
    songTitles: ["Levitating"]
  },
  {
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
    releaseYear: 1971,
    songTitles: ["Stairway to Heaven"]
  },
  {
    title: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
    releaseYear: 2019,
    songTitles: ["Bad Guy"]
  },
  {
    title: "DAMN.",
    artist: "Kendrick Lamar",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
    releaseYear: 2017,
    songTitles: ["HUMBLE."]
  },
  {
    title: "21",
    artist: "Adele",
    imageUrl: "https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?w=400",
    releaseYear: 2011,
    songTitles: ["Rolling in the Deep", "Someone Like You"]
  }
];

// Main seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Step 1: Clear existing data
    console.log('\n📦 Clearing existing data...');
    await Song.deleteMany({});
    await Album.deleteMany({});
    console.log('Existing data cleared.');

    // Step 2: Insert songs first (without albumId)
    console.log('\n🎵 Inserting songs...');
    const insertedSongs = await Song.insertMany(songsData);
    console.log(`Successfully inserted ${insertedSongs.length} songs!`);

    // Step 3: Create albums with song references
    console.log('\n💿 Creating albums...');
    const albumsWithSongs = albumsData.map(albumData => {
      const songIds = albumData.songTitles
        .map(title => insertedSongs.find(song => song.title === title)?._id)
        .filter(id => id !== undefined);
      
      return {
        title: albumData.title,
        artist: albumData.artist,
        imageUrl: albumData.imageUrl,
        releaseYear: albumData.releaseYear,
        songs: songIds
      };
    });

    const insertedAlbums = await Album.insertMany(albumsWithSongs);
    console.log(`Successfully inserted ${insertedAlbums.length} albums!`);

    // Step 4: Update songs with their albumId
    console.log('\n🔗 Linking songs to albums...');
    let updatedCount = 0;
    
    for (const album of insertedAlbums) {
      const songTitles = albumsData.find(a => a.title === album.title)?.songTitles || [];
      
      for (const title of songTitles) {
        await Song.updateOne(
          { title: title },
          { $set: { albumId: album._id } }
        );
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} songs with album references.`);

    // Display results
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Songs: ${insertedSongs.length}`);
    console.log(`   Albums: ${insertedAlbums.length}`);
    console.log(`   Song-Album links: ${updatedCount}`);

    console.log('\n💿 Albums with their songs:');
    for (const album of insertedAlbums) {
      const albumSongTitles = albumsData.find(a => a.title === album.title)?.songTitles || [];
      console.log(`   ${album.title} - ${albumSongTitles.length} song(s): ${albumSongTitles.join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the seed function
seedDatabase();