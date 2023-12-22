"use client";

import { useId } from "react";
import { useTRTC } from "./useTRTC";

type Props = {
  roomId: string;
  userId: string;
  userSig: string;
};

export function RoomCall({ roomId, userId, userSig }: Props) {
  const remoteStreamContainerId = useId();
  const localStreamContainerId = useId();

  const { client, localStream } = useTRTC({
    roomId,
    userId,
    userSig,
    localStreamContainerId,
    remoteStreamContainerId,
  });

  return (
    <div className="container mx-auto">
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
