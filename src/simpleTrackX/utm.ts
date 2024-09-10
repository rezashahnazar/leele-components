export const utmObject = {
  productcard: {
    utm_source: "pm-landing",
    utm_medium: "product-card",
    utm_campaign: "dk-shop-by-grade",
  },
  banner: {
    utm_source: "pm-landing",
    utm_medium: "banner",
    utm_campaign: "dk-shop-by-grade",
  },
  navbar: {
    utm_source: "pm-landing",
    utm_medium: "navbar",
    utm_campaign: "dk-shop-by-grade",
  },
  circleBadge: {
    utm_source: "pm-landing",
    utm_medium: "circleBadge",
    utm_campaign: "dk-shop-by-grade",
  },
};

export default function setDkUTM(
  utmObject: any,
  touchPoint: string,
  url: string
) {
  let urlObject = new URL(url);
  for (const [key, value] of Object.entries(utmObject[touchPoint])) {
    urlObject?.searchParams.set(String(key), value as any);
  }
  return urlObject?.href;
}
