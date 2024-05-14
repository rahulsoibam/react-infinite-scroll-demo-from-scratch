import React, { useState, useRef, useCallback } from "react";
import usePhotoSearch from "./hooks/usePhotoSearch";
import { PhotoCard } from "./components/PhotoCard";
import spinner from "./assets/spinner.svg";

// NOTE:
// Using the libraries React-Query (@tanstack/react-query) and React Intersection Observer (react-intersection-observer)
// would make this much simpler, cleaner and production grade.
// But this is an assignment, so: building from scratch whenver I could.

export default function App() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const { photos, hasMore, loading, error } = usePhotoSearch(
        query,
        pageNumber
    );

    const observer = useRef<IntersectionObserver | null>(null);

    const lastPhotoElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
        setPageNumber(1);
    }

    return (
        <>
            <div className="container mx-auto w-full">
                <form
                    className="max-w-md mx-auto py-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                        Search
                    </label>
                    <div className="relative px-4">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
                            placeholder="Search images..."
                            value={query}
                            onChange={handleSearch}
                        />
                    </div>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                    {photos.map((photo, index) => {
                        if (photos.length === index + 1) {
                            return (
                                <div ref={lastPhotoElementRef} key={photo.id}>
                                    <PhotoCard photo={photo} />
                                </div>
                            );
                        } else {
                            return (
                                <div key={photo.id}>
                                    <PhotoCard photo={photo} />
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="flex justify-center my-6">
                    {loading && (
                        <img
                            className="w-16 h-16"
                            src={spinner}
                            alt="Loading..."
                        />
                    )}
                </div>
                <div className="flex justify-center">{error && "Error"}</div>
            </div>
        </>
    );
}
