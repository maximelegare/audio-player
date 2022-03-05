export interface Song {
  song: {
    title: string;
    album: string;
    artist: string;
    song_route: string;
    album_route: string;
    artist_route: string;
    streaming_url: string;
    duration: number;
    liked: number;
    picture_url: string;
    playlist_title:string
  };
}
