"use client";

import { useReducer } from "react";
import { RoomForm, formReducer } from "./RoomForm";
import { RoomCall } from "./RoomCall";

export default function Room({ params }: { params: { slug: string } }) {
  const [store, dispatch] = useReducer(formReducer, {});

  return (
    <div className="container mx-auto">
      <RoomForm formDispatch={dispatch} />
      {store.userId?.length && store.userSig?.length && (
        <RoomCall
          roomId={params.slug}
          userId={store.userId}
          userSig={store.userSig}
        />
      )}
    </div>
  );
}
