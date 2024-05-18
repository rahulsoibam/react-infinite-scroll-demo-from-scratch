import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from "axios";
import { PexelResponse, Photo } from "../types/pexelResponse";
type ParamsType = AxiosRequestConfig["params"];

export default function usePhotoSearch(query: string, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPhotos([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        // Canceler so that the API doesn't get bombarded.
        let cancel: Canceler | undefined;

        let param: ParamsType = {};
        let url: string;
        if (query === "") {
            param = {
                page: pageNumber,
                per_page: 15,
            };
            url = "https://api.pexels.com/v1/curated";
        } else {
            param = {
                query: query,
                page: pageNumber,
                per_page: 15,
            };
            url = "https://api.pexels.com/v1/search";
        }
        axios({
            method: "GET",
            url: url,
            params: param,
            headers: {
                Authorization: import.meta.env.VITE_PEXEL_API_KEY,
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res: AxiosResponse<PexelResponse>) => {
                setPhotos((prevPhotos) => [
                    ...new Set([...prevPhotos, ...res.data.photos]),
                ]);
                setHasMore(res.data.photos.length > 0);
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
                setLoading(false);
            });

        return () => cancel && cancel();
    }, [query, pageNumber]);

    return { loading, error, photos, hasMore };
}
