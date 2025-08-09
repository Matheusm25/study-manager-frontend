import { getHTTPServerClient } from "./client/server-client";

export class AuthService {
  public static async login(username: string, password: string): Promise<string> {
    const client = getHTTPServerClient();

    const response = await client.post("/user", {
      username,
      password,
    });

    if (response.status === 201) {
      console.log("Login successful:", response.data);
      return response.data.token;
    } else {
      console.log("Login failed:", response.data);
      return response.data.error;
    }
  }
}