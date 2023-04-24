import React, { useContext, useEffect } from "react";
import songContext from "../Context/songs/songContext";
import SongListItem from "./SongListItem";

const SongList = () => {
  const context = useContext(songContext);
  const { songs, getSongs } = context;

  useEffect(() => {
    getSongs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-richblack-900 flex flex-row flex-wrap relative gap-10 justify-evenly px-20 pb-[10vh] mt-[12.5vh]">
      {songs && songs.length > 0
        ? songs.map((song) => {
            return <SongListItem key={song._id} song={song} />;
          })
        : null}
    </div>
  );
};

export default SongList;
