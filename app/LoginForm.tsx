import { generateSig } from "@/app/actions/generateSig";
import { useState } from "react";

type Props = {
  onSubmit: (props: { roomId: string; userId: string }) => void;
};

export function LoginForm({ onSubmit }: Props) {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <form
      className="flex flex-col gap-4 space-y-12"
      onSubmit={async (event) => {
        event.preventDefault();
        onSubmit({ roomId, userId });
      }}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="roomId">Room ID</label>
        <input
          type="text"
          placeholder="Room ID"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          placeholder="User ID"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          start call
        </button>
      </div>
    </form>
  );
}
