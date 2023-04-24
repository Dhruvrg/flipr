import React, { useContext, useEffect, useState } from "react";
import songContext from "../Context/songs/songContext";
import ReactAudioPlayer from "react-audio-player";
import "./Footer.css";

const SongListItem = ({ song }) => {
  const context = useContext(songContext);
  const { playlists, getPlaylists, addASongToPlaylist, makePlaylist } = context;
  const [showComment, setShowComment] = useState(false);
  const [newcomment, setnewComment] = useState("");
  const [title, setTitle] = useState("");
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/songs/updatesong/${song._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newcomment }),
      }
    );
    const json = await response.json();
    song.comment.push(newcomment);
    setnewComment("");
  };

  const onChangeComment = (e) => {
    setnewComment(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="">
      <div className="text-white justify-center items-center relative bg-richblack-800 w-[15vw] rounded-lg">
        <div className="mx-auto">
          <img
            className="object-cover w-[15vw] h-[15vw] text-center relative rounded-lg"
            src={song.img}
          />
        </div>
        <div className="absolute top-[2px] left-[5px] text-white text-lg mx-auto my-auto">
          {song.name}
        </div>
        <div className="absolute top-[13vw] right-[5px] text-white text-lg mx-auto my-auto">
          {song.artist}
        </div>
        <div className="w-full mx-0">
          <ReactAudioPlayer className="w-[15vw]" src={song.link} controls />
        </div>
        <div className="flex justify-center gap-10 py-5">
          <button
            onClick={() => {
              setShowComment(!showComment);
              setShowPlaylists(false);
            }}
            className=" hover:scale-105"
          >
            <i class="fa-solid fa-message"></i>
          </button>
          <button
            onClick={() => {
              setShowPlaylists(!showPlaylists);
              setShowComment(false);
            }}
            className=" hover:scale-105"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
        {showComment ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="newcomment"
                  name="newcomment"
                  value={newcomment}
                  onChange={onChangeComment}
                  aria-describedby="emailHelp"
                  placeholder="Enter a comment"
                  className="bg-richblack-800 mx-2 border-b-2 border-gray-400"
                />
              </div>

              <div>
                <button type="submit"></button>
              </div>
            </form>
            <div className="flex flex-col gap-2 pb-2">
              {song.comment && song.comment.length > 0
                ? song.comment.map((temp) => {
                    return (
                      <div
                        className="bg-gray-400 mx-3 px-[1vw] w-[13vw] rounded-lg hover:cursor-pointers text-black"
                        key={temp}
                      >
                        {temp}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}
        {showPlaylists ? (
          <div className="">
            <div>
              {showInput ? (
                <div>
                  <form
                    onSubmit={() => {
                      makePlaylist(title, song._id);
                      setTitle("");
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChangeTitle}
                        aria-describedby="emailHelp"
                        className="bg-richblack-800 mx-2 border-b-2 border-gray-400 mb-2"
                        placeholder="Enter name of Playlist"
                      />
                    </div>

                    <div></div>
                  </form>
                </div>
              ) : null}
              <div
                onClick={() => setShowInput(!showInput)}
                className="hover:cursor-pointer bg-gray-400 mx-3 px-[1vw] w-[13vw] rounded-lg mb-2"
              >
                <i class="fa-regular fa-square-plus text-black"></i> New
                Playlist
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-2 pb-2">
              {playlists && playlists.length > 0
                ? playlists.map((pl) => {
                    return (
                      <div
                        className="bg-gray-400 mx-3 px-[1vw] w-[13vw] rounded-lg hover:cursor-pointer"
                        key={pl.title}
                        onClick={() => addASongToPlaylist(pl._id, song._id)}
                      >
                        {pl.title}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SongListItem;
