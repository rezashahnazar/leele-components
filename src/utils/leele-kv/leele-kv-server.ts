export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Redis from "ioredis";

const redisClient = new Redis(
  `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`
);

enum Command {
  GET = "GET",
  SET = "SET",
  HSET = "HSET",
  HGET = "HGET",
  HMSET = "HMSET",
  HMGET = "HMGET",
  HGETALL = "HGETALL",
  HKEYS = "HKEYS",
  HDEL = "HDEL",
}

type LeeleKvRequestBody = {
  command: Command;
  args: string[];
};

export async function handleLeeleKvServer(
  request: Request
): Promise<NextResponse> {
  function isAuthorizedForLeeleKV() {
    const apiKey = request.headers.get("Authorization")?.split("Bearer ")[1];
    return apiKey === process.env.LEELE_KV_API_KEY;
  }

  if (!isAuthorizedForLeeleKV()) {
    return NextResponse.json(
      {
        error: "Invalid Leele KV API key.",
      },
      { status: 401 }
    );
  }

  function restructureRedisResult(command: Command, result: any) {
    // Fo future neeeds
    return result;
  }

  const { command, args }: LeeleKvRequestBody = await request.json();

  try {
    let redisResult;
    switch (command) {
      case Command.GET:
        redisResult = await redisClient.get(args[0]);
        break;
      case Command.SET:
        redisResult = await redisClient.set(args[0], args[1]);
        break;
      case Command.HSET:
        redisResult = await redisClient.hset(args[0], args[1], args[2]);
        break;
      case Command.HGET:
        redisResult = await redisClient.hget(args[0], args[1]);
        break;
      case Command.HMSET:
        redisResult = await redisClient.hmset(args[0], ...args.slice(1));
        break;
      case Command.HMGET:
        redisResult = await redisClient.hmget(args[0], ...args.slice(1));
        break;
      case Command.HGETALL:
        redisResult = await redisClient.hgetall(args[0]);
        break;
      case Command.HKEYS:
        redisResult = await redisClient.hkeys(args[0]);
        break;
      case Command.HDEL:
        redisResult = await redisClient.hdel(args[0], ...args.slice(1));
        break;
      default:
        return NextResponse.json(
          {
            error: "Invalid command.",
          },
          { status: 400 }
        );
    }

    return NextResponse.json(
      {
        command,
        args,
        result: restructureRedisResult(command, redisResult),
        code: "success",
        message: `${command} command executed successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        command,
        result: null,
        code: "error",
        message: `${command} command failed.`,
      },
      { status: 500 }
    );
  }
}
