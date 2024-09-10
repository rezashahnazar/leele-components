import { nanoid } from "nanoid";
import axios from "axios";

function getDatalayerObject() {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    return {
      sessionId: JSON.parse(
        window?.sessionStorage?.getItem("session_id") as string
      ),
      sessionStart: JSON.parse(
        window?.sessionStorage?.getItem("session_start") as string
      ),
      sessionDuration: JSON.parse(
        window?.sessionStorage?.getItem("session_duration") as string
      ),
      viewedProducts: JSON.parse(
        window?.sessionStorage?.getItem("viewed_products") as string
      ),
      clickedProducts: JSON.parse(
        window?.sessionStorage?.getItem("clicked_products") as string
      ),
      events: JSON.parse(window?.sessionStorage?.getItem("events") as string),
      lastReset: JSON.parse(
        window?.sessionStorage?.getItem("last_reset") as string
      ),
    };
  }
}

function getLocationSourceQueryparams() {
  if (typeof window !== "undefined") {
    const locationHref = new URL(window?.location?.href);
    const source = locationHref?.origin + locationHref?.pathname;

    const queryParams = location.search;

    return { source: source as string, queryParams: queryParams as string };
  }
}

function appendUrlDkLoginToken(url: string) {
  if (typeof window !== "undefined") {
    const loginToken = new URL(window?.location?.href).searchParams.get(
      "login_token"
    );
    let newUrl = new URL(url);
    if (loginToken) {
      newUrl.searchParams.set("login_token", loginToken);
    }
    return newUrl.href;
  }
}

function getMeowRequestBody(event: any) {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    const { source, queryParams } = getLocationSourceQueryparams() as any;
    const dkUserInitData = JSON.parse(
      window?.sessionStorage?.getItem("dk_user_init") as string
    );
    const dataLayerObject = getDatalayerObject();

    return {
      source: source,
      queryparams: queryParams,
      event: event,
      dkuserid: dkUserInitData?.user?.id,
      first_name: dkUserInitData?.user?.first_name,
      last_name: dkUserInitData?.user?.last_name,
      mobile: dkUserInitData?.user?.mobile,
      gender: dkUserInitData?.user?.gender,
      city_name: dkUserInitData?.user?.city_name,
      latitude: dkUserInitData?.default_address?.latitude,
      longitude: dkUserInitData?.default_address?.longitude,
      rfm_category: dkUserInitData?.data_layer?.data?.rfm_category,
      data_layer: JSON.stringify(dataLayerObject),
    };
  }
}

export function meow(event: any) {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    const requestBody = getMeowRequestBody(event);
    const MEOW_URL = "https://about.digikala.com/api/v1/strk/meows/meow/";
    axios
      .post(MEOW_URL, requestBody, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {});
  }
}

export function startSession() {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    // Calling User Init and Persisting in session storage

    const userInitUrl = appendUrlDkLoginToken(
      "https://about.digikala.com/dkapi/v1/user/init/"
    );
    axios
      .get(userInitUrl as string, { withCredentials: true })
      .then((res) => {
        window.sessionStorage.setItem(
          "dk_user_init",
          JSON.stringify(res.data?.data)
        );
      })
      .catch((err) => {});

    // Creating Datalayer
    try {
      const sessionId = nanoid();
      const sessionStart = Date.now();
      window.sessionStorage.setItem("session_id", JSON.stringify(sessionId));
      window.sessionStorage.setItem(
        "session_start",
        JSON.stringify(sessionStart)
      );
      window.sessionStorage.setItem("session_duration", JSON.stringify(0));
      window.sessionStorage.setItem("viewed_products", JSON.stringify([]));
      window.sessionStorage.setItem("clicked_products", JSON.stringify([]));
      window.sessionStorage.setItem("events", JSON.stringify([]));
      window.sessionStorage.setItem("last_reset", "");

      // Meow the Initial PAGE_VIEW
      meow("PAGE_VIEW");
    } catch (error) {
      return;
    }
  }
}

export function updateSessionDuration() {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    const sessionStart = JSON.parse(
      window?.sessionStorage?.getItem("session_start") as string
    );
    const currentTime = Date.now();
    const sessionDuration = Math.round(
      Number(currentTime - sessionStart) / 1000
    );
    try {
      window.sessionStorage.setItem(
        "session_duration",
        JSON.stringify(sessionDuration)
      );
    } catch (error) {
      return;
    }
  }
}

export function recycleSession() {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    try {
      meow("SYNC_DATA_LAYER");

      window.sessionStorage.setItem("last_reset", JSON.stringify(Date.now()));
      window.sessionStorage.setItem("viewed_products", JSON.stringify([]));
      window.sessionStorage.setItem("clicked_products", JSON.stringify([]));
      window.sessionStorage.setItem("events", JSON.stringify([]));
      return true;
    } catch (error) {
      return;
    }
  }
}

export function unloadSyncMeow() {
  const headers = {
    type: "application/json",
  };
  const unloadBlob = new Blob(
    [JSON.stringify(getMeowRequestBody("PAGE_UNLOAD"))],
    headers
  );
  navigator?.sendBeacon(
    "https://about.digikala.com/api/v1/strk/meows/meow/",
    unloadBlob
  );
}

// Collects
export function eventCollect(
  event: any,
  targetType = null,
  targetTitle = null,
  details = null
) {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    try {
      const storageEvents = JSON.parse(
        window.sessionStorage.getItem("events") as string
      );

      let events = [];
      if (storageEvents) {
        events = storageEvents;
      }

      events.push({
        event: event,
        target_type: targetType,
        target_title: targetTitle,
        details: details,
        time: Date.now(),
      });

      window?.sessionStorage?.setItem("events", JSON.stringify(events));
    } catch (error) {
      return;
    }
  }
}

export function productClickCollect(productId: number) {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    try {
      const storageClickedProducts = JSON.parse(
        window?.sessionStorage?.getItem("clicked_products") as string
      );

      let clickedProducts = [];
      if (storageClickedProducts) {
        clickedProducts = storageClickedProducts;
      }

      clickedProducts.push(String(productId));
      window.sessionStorage.setItem(
        "clicked_products",
        JSON.stringify(clickedProducts)
      );
    } catch (error) {
      return;
    }
  }
}

export function productViewCollect(productId: number) {
  if (typeof window !== "undefined" && window?.sessionStorage) {
    try {
      const storageViewedProducts = JSON.parse(
        window?.sessionStorage?.getItem("viewed_products") as string
      );

      let viewedProducts = [];
      if (storageViewedProducts) {
        viewedProducts = storageViewedProducts;
      }

      viewedProducts?.push(String(productId));
      window?.sessionStorage?.setItem(
        "viewed_products",
        JSON.stringify(viewedProducts)
      );
    } catch (error) {
      return;
    }
  }
}
