"use client";

import { Call } from "./Call";
import { useUserSession } from "@/app/lib/useUserSession";

export default function Room({ params }: { params: { slug: string } }) {
  const [{ userId, userSig }] = useUserSession();

  return (
    <div className="container mx-auto">
      {userId?.length && userSig?.length ? (
        <Call roomId={params.slug} userId={userId} userSig={userSig} />
      ) : (
        <div>
          please login at <a href="/">here</a>
        </div>
      )}
    </div>
  );
}
