import { useAsyncEffect } from "@/app/lib/useAsyncEffect";
import { useMemo, useState } from "react";
import TRTC, { LocalStream } from "trtc-js-sdk";

type Props = {
  localStreamContainerId: string;
  remoteStreamContainerId: string;
  roomId: string;
  userId: string;
  userSig: string;
};

const sdkAppId = Number(process.env.NEXT_PUBLIC_TRTC_APP_ID);

export function useTRTC({
  localStreamContainerId,
  remoteStreamContainerId,
  roomId,
  userId,
  userSig,
}: Props) {
  const client = useMemo(() => {
    return TRTC.createClient({
      mode: "rtc",
      sdkAppId,
      userId,
      userSig,
      useStringRoomId: true,
    });
  }, [sdkAppId, userId, userSig]);

  const [localStream, setLocalStream] = useState<LocalStream | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAsyncEffect(async () => {
    client.on("stream-added", (event) => {
      const remoteStream = event.stream;
      console.log("remote stream add streamId: " + remoteStream.getId());
      client.subscribe(remoteStream);
    });

    client.on("stream-subscribed", (event) => {
      const remoteStream = event.stream;
      remoteStream.play(remoteStreamContainerId);
    });

    let localStream: LocalStream;
    try {
      await client.join({ roomId });
      console.log("join room success");

      localStream = TRTC.createStream({
        userId,
        audio: true,
        video: true,
      });
      await localStream.initialize();
      localStream.play(localStreamContainerId);
      await client.publish(localStream);

      setLocalStream(localStream);
    } catch (error) {
      console.error("join room failed " + error);
    }

    return async () => {
      localStream?.close();
      await client.leave();
      client.destroy();
    };
  }, [
    localStreamContainerId,
    remoteStreamContainerId,
    roomId,
    userId,
    userSig,
  ]);

  return {
    client,
    localStream,
  };
}
