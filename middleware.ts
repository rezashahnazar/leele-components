import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export const config = {
  // Mathing all pages and apis excluding images , statics, favicon , ...
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|ai.lottie|opengraph-image.png|opengraph-image.jpg|twitter-image.png|twitter-image.jpg|apple-icon.png).*)",
    "/api/:path*",
    "/",
  ],
};

const authRequiredRoutes: string[] = ["/api/search/", "/api/share/"];

const accessRequiredRoutes: string[] = ["/api/search/", "/api/share/"];

enum AccessStatus {
  Allowed = "allowed",
  NotAllowed = "not_allowed",
}

const DIGIKALA_USER_INIT_API_URL = "https://api.digikala.com/v1/user/init/";

const CUSTOM_TOKEN_SECRET_KEY = process.env.CUSTOM_TOKEN_SECRET_KEY as string;
const CUSTOM_TOKEN_COOKIE_KEY = process.env.CUSTOM_TOKEN_COOKIE_KEY as string;
const DIGIKALA_TOKEN_COOKIE_KEY = process.env
  .DIGIKALA_TOKEN_COOKIE_KEY as string;
const CUSTOME_TOKEN_PERMISSION_SCOPE = process.env
  .CUSTOME_TOKEN_PERMISSION_SCOPE as string;
const CUSTOM_COOKIE_MAX_AGE = process.env.CUSTOM_COOKIE_MAX_AGE as string;

export const middleware = async (req: NextRequest) => {
  // Check required .env.local settings to be correct
  if (
    !DIGIKALA_TOKEN_COOKIE_KEY ||
    !CUSTOM_TOKEN_COOKIE_KEY ||
    !CUSTOM_TOKEN_SECRET_KEY ||
    !CUSTOME_TOKEN_PERMISSION_SCOPE ||
    !CUSTOM_COOKIE_MAX_AGE
  ) {
    throw new Error("Invalid environment configuration");
  }

  // Extract tokens from URL, DK Cookie or Custom Cookie
  const dkCookieToken = req.cookies.get(DIGIKALA_TOKEN_COOKIE_KEY)?.value;
  const dkUrlToken = req.nextUrl.searchParams.get("login_token");
  const customCookieToken = req.cookies.get(CUSTOM_TOKEN_COOKIE_KEY)?.value;

  // Check if auth is required for the current route
  const isAuthRequired = authRequiredRoutes.some((pattern) => {
    const authRegex = new RegExp(pattern.replace(":path*", ".*"));
    return authRegex.test(req.nextUrl.pathname);
  });

  // Delete Custom Cookie
  const deleteCookies = (res: NextResponse) => {
    res.cookies.delete(CUSTOM_TOKEN_COOKIE_KEY);
    return res;
  };

  // Extract Custom Cookie Payload (If Exists) -> { user_id: number, allowed_scopes: string[] }
  async function extractCustomCookiePayload(customCookieToken: string) {
    if (customCookieToken && customCookieToken.length > 10) {
      try {
        const customTokenVerified = await jwtVerify(
          customCookieToken,
          new TextEncoder().encode(CUSTOM_TOKEN_SECRET_KEY)
        );
        return {
          user_id: customTokenVerified.payload.user_id as number,
          allowed_scopes: customTokenVerified.payload.allowed_scopes as any[],
        };
      } catch {}
    }
    return null;
  }

  // Extract User ID from Dk URL Token (If Exists) -> number | null
  async function extractUserIdFromDkUrlToken(dkUrlToken: string) {
    if (dkUrlToken && dkUrlToken.length > 10) {
      try {
        const res = await fetch(
          `${DIGIKALA_USER_INIT_API_URL}?login_token=${dkUrlToken}`
        );

        const data = await res.json();
        const userId = data.data.user.id as number;

        return userId;
      } catch {}
    }
    return null;
  }

  // Extract User ID from Dk Cookie Token (If Exists) -> number | null
  async function extractUserIdFromDkCookieToken(dkCookieToken: string) {
    if (dkCookieToken && dkCookieToken.length > 10) {
      try {
        const res = await fetch(`${DIGIKALA_USER_INIT_API_URL}`, {
          credentials: "include",
          headers: {
            Cookie: `${DIGIKALA_TOKEN_COOKIE_KEY}=${dkCookieToken}`,
          },
        });
        const data = await res.json();
        const userId = data.data.user.id as number;

        return userId;
      } catch {}
    }
    return null;
  }

  // Evaluate Access By Sending Request To Access Management Service -> 'allowed' | 'not_allowed' | undefined
  async function fetchedAccessStatus() {
    const isAccessRequired = accessRequiredRoutes.some((pattern) => {
      const accessRegex = new RegExp(pattern.replace(":path*", ".*"));
      return accessRegex.test(req.nextUrl.pathname);
    });

    if (isAccessRequired) {
      return AccessStatus.Allowed;
      // TODO: Uncomment The line belwow and comment the line above to use External Access Manager

      // const access = await hasChatbotAccess(dkUrlToken, dkCookieToken);
      // if (access === false) {
      //   return AccessStatus.NotAllowed;
      // } else if (access === true) {
      //   return AccessStatus.Allowed;
      // }
    }
    return undefined;
  }

  // Generate New Custom Token With Access Scope -> string (JWT : header = { typ: 'JWT', alg: 'HS256' } , payload = { user_id : number , allowed_scopes : string[]})
  async function generateNewCustomToken(
    dkUserId: number,
    accessStatus: AccessStatus | undefined
  ) {
    let allowedScopes: string[] = [];
    if (accessStatus === AccessStatus.Allowed) {
      allowedScopes = [CUSTOME_TOKEN_PERMISSION_SCOPE];
    }
    return await new SignJWT({
      user_id: dkUserId,
      allowed_scopes: allowedScopes,
    })
      .setProtectedHeader({ typ: "JWT", alg: "HS256" })
      .sign(new TextEncoder().encode(CUSTOM_TOKEN_SECRET_KEY));
  }

  // The Main Middleware Execution Logic (Authentication & Access Evaluation)
  async function verifyAuthenticationAndAccess() {
    // if user_id is not undefined , user is authenticated
    let user_id: number | undefined = undefined;
    // if access_status is not undefined , user has been evaluated for access
    let access_status: AccessStatus | undefined;
    // Try Custom Cookie : user_id and access_status
    try {
      const customCookiePayload = await extractCustomCookiePayload(
        customCookieToken as string
      );
      if (customCookiePayload !== null) {
        user_id = customCookiePayload.user_id;
        if (
          customCookiePayload.allowed_scopes.includes(
            process.env.CUSTOME_TOKEN_PERMISSION_SCOPE
          )
        ) {
          access_status = AccessStatus.Allowed;
        }
      }
    } catch {}

    // IF still not authenticated by custom token
    if (user_id === undefined) {
      // Try Dk Url Token : user_id
      try {
        const userIdFromDkUrlToken = await extractUserIdFromDkUrlToken(
          dkUrlToken as string
        );
        if (userIdFromDkUrlToken !== null) {
          user_id = userIdFromDkUrlToken;
        }
      } catch {}
    }

    // IF still not authenticated by custom token or Dk URL token
    if (user_id === undefined) {
      // Try Dk Cookie Token : user_id
      try {
        const userIdFromDkCookieToken = await extractUserIdFromDkCookieToken(
          dkCookieToken as string
        );
        if (userIdFromDkCookieToken !== null) {
          user_id = userIdFromDkCookieToken;
        }
      } catch {}
    }

    // Check For access_status if user_id is available (user is authenticated) but access_status is still undefined
    if (user_id !== undefined && access_status === undefined) {
      access_status = await fetchedAccessStatus();
    }

    return { user_id, access_status };
  }

  // Instantiate a Response object -> to be passed to the next layer after the Middleware (e.g api handler , ...)
  const responseToNextLayer = NextResponse.next();

  // IF "Path Requires Authentication" and "User is not authenticated" -> Delete Custom Cookie + Return 401
  // IF "User is authenticated" and "Path Requires Access" and "Access is not Allowed" -> Delete Custom Cookie + Return 403
  // IF "User is authenticated" and "Path Requires Access" and "Access is Allowed" -> Generate New Custom Token and Cookie (If Not Present) + Pass Response to The Next Layer
  // IF "User is authenticated" and "Path Do not Require Authentication" ->  Generate New Custom Token and Cookie (If Not Present) + Pass Response to The Next Layer
  if (isAuthRequired) {
    const { user_id, access_status } = await verifyAuthenticationAndAccess();
    // Delete Cookies if not authenticated + Return 401
    if (user_id === undefined) {
      return deleteCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      );
    }
    // Delete Cookies if access is Not Allowed + Return 403
    if (access_status === AccessStatus.NotAllowed) {
      return deleteCookies(
        NextResponse.json({ message: "Unauthorized" }, { status: 403 })
      );
    }

    // -> Here, user is authenticated but access status might be Allowed or undefined (No Access Required)

    // Set a new Custom Cookie if Not Present (and user is authenticated)
    if (customCookieToken === undefined) {
      try {
        const newCookieToken = await generateNewCustomToken(
          user_id,
          access_status
        );
        responseToNextLayer.cookies.set(
          CUSTOM_TOKEN_COOKIE_KEY,
          newCookieToken,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: parseInt(CUSTOM_COOKIE_MAX_AGE),
          }
        );
      } catch {}
    }
  }

  // Pass the response to Next Layer after Middleware (With or Without Cookie)
  return responseToNextLayer;
};

async function hasChatbotAccess(
  login_token: string | null,
  dkCookieToken: string | undefined
) {
  const accessManagerApiUrl = `${process.env.SERVER_TO_ACCESS_MANAGER_URL_BASE}/api/v1/slg/access/cbt-access/`;

  try {
    const urlWithParams = new URL(accessManagerApiUrl);

    if (login_token) {
      urlWithParams.searchParams.append("login_token", login_token);
    }

    const response = await fetch(urlWithParams.toString(), {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `Digikala:User:Token:new=${dkCookieToken}`,
      },
    });

    const data = await response.json();
    return data?.success;
  } catch (error) {
    throw new Error("Error Checking access");
  }
}
