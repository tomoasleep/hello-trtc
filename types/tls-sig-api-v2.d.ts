declare module "tls-sig-api-v2" {
  export class Api {
    constructor(sdkappid: number, key: string);

    /**
     * @param userid
     * @param expire The expiration time of the UserSig ticket in seconds, e.g., 86400 means that the generated UserSig ticket is no longer available after one day.
     */
    genSig(userid: string, expire: Number): string;
  }
}
