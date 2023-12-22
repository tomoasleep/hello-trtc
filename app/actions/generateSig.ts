"use server";

import { Api } from "tls-sig-api-v2";

const sdkAppId = Number(process.env.NEXT_PUBLIC_TRTC_APP_ID);

export async function generateSig(userId: string): Promise<string> {
  "use server";

  const sdkSecretKey = process.env.TRTC_SECRET_KEY;
  if (!sdkSecretKey) {
    throw new Error("secret key is not given");
  }

  const api = new Api(sdkAppId, sdkSecretKey);

  return api.genSig(userId, 86400 /* 1day */);
}
