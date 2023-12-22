"use client";

import { useCallback, useState } from "react";

type UserSession = {
  userId: string | null;
  userSig: string | null;
};

export function useUserSession(): [
  UserSession,
  (newSession: Partial<UserSession>) => void
] {
  const [, setCounter] = useState<number>(0);

  const setUserSession = useCallback(
    ({ userId, userSig }: Partial<UserSession>) => {
      if (userId) {
        sessionStorage.setItem("userId", userId);
      } else {
        sessionStorage.removeItem("userId");
      }

      if (userSig) {
        sessionStorage.setItem("userSig", userSig);
      } else {
        sessionStorage.removeItem("userSig");
      }

      setCounter((counter) => counter + 1);
    },
    []
  );

  const userId =
    typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
  const userSig =
    typeof window !== "undefined" ? sessionStorage.getItem("userSig") : null;

  return [{ userId, userSig }, setUserSession];
}
