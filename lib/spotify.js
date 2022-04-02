import SpotifyWebApi from "spotify-web-api-node";



// All the credentials that the user has
const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read"
].join(',')

const params = {
    scope:scopes
};


// Creates a search url with the params
const querryParamsString = new URLSearchParams(params);


// Url to login with all the credentials of the user
const LOGIN_URL = `https://accounts.spotify.com/authorize?${querryParamsString.toString()}`


console.log(process.env.NEXT_PUBLIC_CLIENT_ID)

// Spotify Api
const spotifyApi = new SpotifyWebApi({
    clientId :process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi;

export { LOGIN_URL }