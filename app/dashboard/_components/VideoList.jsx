import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  console.log("🎥 Loaded videoList:", videoList); // Optional debug log
   const [openPlayerDialog,setOpenPlayerDialog] = useState(false);
   const [videoId,setVideoId] = useState();
  return (
    <div className="mt-3 grid lg:grid-cols-4 gap-2 sm:grid-cols-2 md:grid-cols-3 ">
      {videoList?.map((video, index) => (
        <div key={video.id || index} className=" p-4 rounded-md  cursor-pointer hover:scale-105 transition-all"
        onClick={()=>{setOpenPlayerDialog(Date.now);setVideoId(video.id)}}>
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120} // You can make this dynamic if needed
            fps={30}
            style={{
                borderRadius:15
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log("🧮 Duration in frames:", v),
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;
