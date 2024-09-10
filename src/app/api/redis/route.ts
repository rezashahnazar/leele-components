import type { NextRequest } from "next/server";
import { handleLeeleKvServer } from "@/utils/leele-kv/leele-kv-server";

export async function POST(request: NextRequest) {
  return await handleLeeleKvServer(request);
}
