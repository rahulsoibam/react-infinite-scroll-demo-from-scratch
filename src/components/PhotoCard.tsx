import { FC } from "react";
import { Photo } from "../types/pexelResponse";

interface PhotoCardProps {
    photo: Photo;
}
export const PhotoCard: FC<PhotoCardProps> = ({ photo }) => {
    return (
        <a href={photo.url} className="block shadow-lg rounded-lg">
            <img
                alt=""
                src={photo.src.large}
                className="h-60 w-full object-cover sm:h-80 lg:h-96"
            />
            <div className="p-4">
                <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    {photo.photographer}
                </h3>

                <p className="mt-2 max-w-sm text-gray-700 h-12 mb-1 overflow-hidden">
                    {photo.alt}
                </p>
            </div>
        </a>
    );
};
