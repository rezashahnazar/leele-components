export class LeeleKvClient {
  private url: string;
  private apiKey: string;

  constructor({ apiKey, url }: { apiKey: string; url: string }) {
    this.url = url || (process.env.LEELE_KV_FULL_API_URL as string);
    this.apiKey = apiKey || (process.env.LEELE_KV_API_KEY as string);
  }

  private async request(command: string, args: string[]) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ command, args }),
    });

    if (!response.ok) {
      return -2;
      // return response.statusText;
    }

    const data = await response.json();
    if (data.code !== "success") {
      return -2;
      // return data.message;
    }

    return data.result;
  }

  async get(key: string) {
    return this.request("GET", [key]);
  }

  async set(key: string, value: string) {
    return this.request("SET", [key, value]);
  }

  async hset(key: string, field: string, value: string) {
    return this.request("HSET", [key, field, value]);
  }

  async hget(key: string, field: string) {
    return this.request("HGET", [key, field]);
  }

  async hmset(key: string, ...fieldValues: string[]) {
    return this.request("HMSET", [key, ...fieldValues]);
  }

  async hmget(key: string, ...fields: string[]) {
    return this.request("HMGET", [key, ...fields]);
  }

  async hgetall(key: string) {
    return this.request("HGETALL", [key]);
  }

  async hkeys(key: string) {
    return this.request("HKEYS", [key]);
  }

  async hdel(key: string, ...fields: string[]) {
    return this.request("HDEL", [key, ...fields]);
  }
}
