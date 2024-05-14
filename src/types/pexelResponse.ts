export interface PexelResponse {
    page: number;
    per_page: number;
    photos: Photo[];
    total_results: number;
}

export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: Src;
    liked: boolean;
    alt: string;
}

export interface Src {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}
