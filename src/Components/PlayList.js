import React, { useContext, useEffect } from "react";
import songContext from "../Context/songs/songContext";
import PlaylistItem from "./PlaylistItem";

const PlayList = () => {
  const context = useContext(songContext);
  const { playlists, getPlaylists } = context;
  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mx-10 mt-[10vh] min-h-[90vh]">
      {playlists && playlists.length > 0
        ? playlists.map((pl) => {
            return <PlaylistItem key={pl._id} pl={pl} />;
          })
        : null}
    </div>
  );
};

export default PlayList;
