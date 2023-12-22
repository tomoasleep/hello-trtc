"use server";

import { Api } from "tls-sig-api-v2";

const sdkAppId = Number(process.env.NEXT_PUBLIC_TRTC_APP_ID);

export async function generateSig(userId: string): Promise<string> {
  "use server";

  const sdkSecretKey = process.env.NEXT_PUBLIC_TRTC_SECRET_KEY || "";
  const api = new Api(sdkAppId, sdkSecretKey);

  return api.genSig(userId, 86400 /* 1day */);
}
