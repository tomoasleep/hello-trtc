import { generateSig } from "@/app/actions/generateSig";
import { useState } from "react";

type Props = {
  formDispatch: FormDispatch;
};

export function RoomForm({ formDispatch }: Props) {
  const [userId, setUserId] = useState("");

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <form
        className="flex flex-col gap-4 space-y-12"
        onSubmit={async (event) => {
          event.preventDefault();
          const userSig = await generateSig(userId);
          formDispatch({ type: "submit", payload: { userId, userSig } });
        }}
      >
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
    </div>
  );
}

export type FormState = {
  userId?: string;
  userSig?: string;
};

export type FormAction = {
  type: "submit";
  payload: {
    userId: string;
    userSig: string;
  };
};

export type FormDispatch = (action: FormAction) => void;

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "submit":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
