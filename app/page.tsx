"use client";

import { LoginForm } from "./LoginForm";
import { useUserSession } from "./lib/useUserSession";
import { generateSig } from "./actions/generateSig";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [, setUserSession] = useUserSession();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    roomId.length && redirect(`/${roomId}`);
  }, [roomId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm
        onSubmit={async ({ roomId, userId }) => {
          const userSig = await generateSig(userId);
          setUserSession({ userId, userSig });

          setRoomId(roomId);
        }}
      />
    </main>
  );
}
