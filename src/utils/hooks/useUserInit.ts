import useSWR from "swr";
const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());

export function useUserInit() {
  const { data, isLoading, error } = useSWR("/dkapi/v1/user/init/", fetcher);

  return { error, isLoading, userData: data?.data };
}
