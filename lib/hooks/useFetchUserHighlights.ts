import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface UseFetchUserHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}
const useFetchUserHighlights = (username: string) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pageQuery = page ? `page=${page}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";
  const { data, error, mutate } = useSWR<UseFetchUserHighlightsResponse, Error>(
    `users/${username}/highlights?${pageQuery}${limitQuery}`,
    publicApiFetcher as Fetcher<UseFetchUserHighlightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    setPage,
    mutate,
  };
};

export { useFetchUserHighlights };
