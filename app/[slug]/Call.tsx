"use client";

import { useId } from "react";
import { useTRTC } from "./useTRTC";
import TRTC, { LocalStream } from "trtc-js-sdk";
import { useAsyncValue } from "@/app/lib/useAsyncValue";

type Props = {
  roomId: string;
  userId: string;
  userSig: string;
};

export function Call({ roomId, userId, userSig }: Props) {
  const remoteStreamContainerId = useId();
  const localStreamContainerId = useId();

  const { localStream } = useTRTC({
    roomId,
    userId,
    userSig,
    localStreamContainerId,
    remoteStreamContainerId,
  });

  return (
    <div className="container mx-auto">
      <Selector localStream={localStream} kind={"videoinput"} />
      <table className="table-auto">
        <thead>
          <tr>
            <th>Local</th>
            <th>Remote</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <div id={localStreamContainerId} />
            </th>
            <th>
              <div id={remoteStreamContainerId} />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Selector({
  localStream,
  kind,
}: {
  localStream: LocalStream | null;
  kind: MediaDeviceKind;
}) {
  const { data: devices } = useAsyncValue(async () => {
    const devices = await TRTC.getDevices();
    return devices.filter((device) => device.kind === kind);
  });

  if (!devices || !localStream) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <select
        onChange={(event) => {
          if (event.target.value) {
            localStream.switchDevice(
              kind === "videoinput" ? "video" : "audio",
              event.target.value
            );
          }
        }}
      >
        {devices.map((device) => {
          return (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
