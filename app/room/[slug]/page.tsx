"use client";

import { useEffect } from "react";
import { RoomCall } from "./RoomCall";
import { useUserSession } from "@/app/lib/useUserSession";
import { redirect } from "next/navigation";

export default function Room({ params }: { params: { slug: string } }) {
  const [{ userId, userSig }] = useUserSession();

  return (
    <div className="container mx-auto">
      {userId?.length && userSig?.length ? (
        <RoomCall roomId={params.slug} userId={userId} userSig={userSig} />
      ) : (
        <div>please login</div>
      )}
    </div>
  );
}
