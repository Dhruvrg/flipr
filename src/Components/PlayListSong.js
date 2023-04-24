import React, { useContext } from "react";
import songContext from "../Context/songs/songContext";

const PlayListSong = ({ song, plId, name }) => {
  const context = useContext(songContext);
  const { deleteASongFromPlaylist } = context;
  return (
    <div className="text-white my-[2vh]">
      <div>
        <img className="h-[15vh] w-[15vh] rounded-md" src={song[0].img} />
      </div>
      <div>
        <div
          className="text-center text-gray-500 hover:cursor-pointer"
          onClick={() => deleteASongFromPlaylist(plId, song[0]._id, name)}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default PlayListSong;
