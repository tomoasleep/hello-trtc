"use client";

import { useId } from "react";
import TRTC, { Client, LocalStream } from "trtc-js-sdk";
import { useAsyncEffect } from "use-async-effect";

const sdkAppId = Number(process.env.NEXT_PUBLIC_TRTC_APP_ID);

type Props = {
  roomId: string;
  userId: string;
  userSig: string;
};

export function RoomCall({ roomId, userId, userSig }: Props) {
  const remoteStreamContainerId = useId();
  const localStreamContainerId = useId();

  let client: Client;
  let localStream: LocalStream;
  useAsyncEffect(
    async () => {
      client = TRTC.createClient({
        mode: "rtc",
        sdkAppId,
        userId,
        userSig,
        useStringRoomId: true,
      });

      client.on("stream-added", (event) => {
        const remoteStream = event.stream;
        console.log("remote stream add streamId: " + remoteStream.getId());
        client.subscribe(remoteStream);
      });

      client.on("stream-subscribed", (event) => {
        const remoteStream = event.stream;
        remoteStream.play(remoteStreamContainerId);
      });

      await client.join({ roomId });

      localStream = TRTC.createStream({ userId, audio: true, video: true });
      await localStream.initialize();
      localStream.play(localStreamContainerId);
      await client.publish(localStream);
    },
    async () => {
      localStream && localStream.close();
      if (client) {
        await client.leave();
        client.destroy();
      }
    },
    [localStreamContainerId, remoteStreamContainerId, roomId, userId, userSig]
  );

  return (
    <div className="flex flex-col gap-4">
      <div id={remoteStreamContainerId} />
      <div id={localStreamContainerId} />
    </div>
  );
}
