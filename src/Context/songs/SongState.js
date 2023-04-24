import { useState } from "react";
import SongContext from "./songContext";

const SongState = (props) => {
  const host = "http://localhost:8000";
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [aSong, setASong] = useState([]);

  // //Get all songs
  const getSongs = async () => {
    const response = await fetch(`${host}/api/songs/fetchallsongs`, {
      method: "GET",
    });
    const json = await response.json();
    setSongs(json);
  };

  const getPlaylists = async () => {
    const response = await fetch(`${host}/api/playlist/fetchallplaylist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setPlaylists(json.playlists);
    setASong(json.song);
  };

  const makePlaylist = async (title, songId) => {
    const response = await fetch(`${host}/api/playlist/makeplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, songId }),
    });
    const json = await response.json();
    setPlaylists(playlists.push(json));
  };

  const getASongs = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/songs/fetchasong/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    setASong(aSong.concat(json));
  };

  const addASongToPlaylist = async (id, newSongId) => {
    const response = await fetch(`${host}/api/playlist/addasong/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ newSongId }),
    });
    const json = await response.json();
  };

  const deleteASongFromPlaylist = async (id, newSongId, name) => {
    const response = await fetch(`${host}/api/playlist/deleteasong/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ newSongId }),
    });
    const json = await response.json();
    getPlaylists();
  };

  const deleteplaylist = async (id) => {
    const response = await fetch(`${host}/api/playlist/deleteplaylist/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newPlaylists = playlists.filter((play) => {
      return play._id !== id;
    });
    setPlaylists(newPlaylists);
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        getSongs,
        playlists,
        getPlaylists,
        aSong,
        getASongs,
        addASongToPlaylist,
        makePlaylist,
        deleteplaylist,
        deleteASongFromPlaylist,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
};
export default SongState;
