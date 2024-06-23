

export interface Artist {
    anv: string;
    id: string;
    title: string;
    resource_url: string;
    role: string;
    tracks: string;
    cover_image: string;
}

export interface Release {
    id: string
    title: string,
    type: string,
    main_release: number,
    artist: string,
    role: string,
    resource_url: string
    year: number,
    thumb: string,
    stats: {
        community: {
            in_wantlist: string,
            in_collection: number
        }
    }
}

interface Pagination {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: any;
}

export interface ArtistsResponse {
    pagination: Pagination;
    results: Artist[];
}

export interface ReleaseRsponse{
    pagination: Pagination;
    releases: Release[]
}