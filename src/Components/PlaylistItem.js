import React, { useContext } from "react";
import songContext from "../Context/songs/songContext";
import PlayListSong from "./PlayListSong";

const PlaylistItem = ({ pl }) => {
  const context = useContext(songContext);
  const { aSong, deleteplaylist } = context;
  return (
    <div className="my-10">
      <div className="flex gap-5">
        <div className="text-white">{pl.title}</div>
        <div
          className="text-white hover:cursor-pointer"
          onClick={() => deleteplaylist(pl._id)}
        >
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
      <div className="flex gap-4">
        {aSong && aSong.length > 0
          ? aSong.map((s, index) => {
              if (s == pl.title) {
                return (
                  <PlayListSong
                    key={index}
                    song={aSong[index + 1]}
                    plId={pl._id}
                    name={pl.title}
                  />
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default PlaylistItem;
