import { defineEventHandler, getQuery, createError } from 'h3'
import { AccessToken } from 'livekit-server-sdk';
import type { AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';

interface AccessTokenQuery {
  roomName: string;
  identity: string;
  name: string;
  metadata: string;
}

const apiKey = process.env.LK_API_KEY;
const apiSecret = process.env.LK_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { roomName, identity, name, metadata } = getQuery<AccessTokenQuery>(event);

    if (typeof identity !== 'string') {
      throw new ValidationError('provide one (and only one) identity');
    }
    if (typeof roomName !== 'string') {
      throw new ValidationError('provide one (and only one) roomName');
    }

    if (Array.isArray(name)) {
      throw new ValidationError('provide max one name');
    }
    if (Array.isArray(metadata)) {
      throw new ValidationError('provide max one metadata string');
    }

    // if (!userSession.isAuthenticated) {
    //   setResponseStatus(event, 403);
    // }
    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };
    const token = createToken({ identity, name, metadata }, grant);

    return { identity, accessToken: token };
  } catch (e) {
    if (e instanceof ValidationError) {
      throw createError({
        statusCode: 400,
        statusMessage: e.message,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: (e as Error).message,
    })
  }
})
