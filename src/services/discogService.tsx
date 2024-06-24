import axios from "axios";
import {ArtistsResponse, ReleaseResponse} from "../interfaces";


const instance = axios.create({
    baseURL: 'https://api.discogs.com/',
    timeout: 1000,
    headers: {Authorization: `Discogs key=${import.meta.env.VITE_API_KEY}, secret=${import.meta.env.VITE_API_SECRET}`}
});

export const searchArtists = async (search: string, page: number) => {
    const res = await instance.get(`/database/search?q=${search}&type=artist?page=${page}&per_page=20`)
    return res.data as ArtistsResponse
}


export const releasesFromArtist = async (artistId: string, page: number)  => {
    const res = await instance.get(`/artists/${artistId}/releases?page=${page}&per_page=5`)
    return res.data as ReleaseResponse
}

export const getReleaseByID = async (releaseId: string)  => {
    const res = await instance.get(`/releases/${releaseId}`)
    return res.data as ReleaseResponse
}