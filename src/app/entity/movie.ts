export class Movie {
    id: string;
    title: string;
    poster_path: string;
    release_date: any;
    overview: any;
    popularity: any;
    genreList: any;
    // total_results: any;

    constructor(id
        , poster_path
        , release_date
        , overview
        , popularity
        , genreList
        , title
    ) {

        this.id = id;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.overview = overview;
        this.popularity = popularity;
        this.genreList = genreList;
        this.title = title;

    }
}

export class SearchedMovie {
    page: any;
    total_pages: any;
    total_results: any;
    results: Array<Movie>;
    constructor(
        page,
        total_pages,
        total_results,
        results,
    ) {
        this.page = page;
        this.total_pages = total_pages;
        this.total_results = total_results;
        this.results = results;
    }
}

export class MovieDetails {
    id: number;
    runtime: number;
    vote_average: number;
    tagline: string;
    video: Array<Video>;
    spoken_languages: Array<string>;
    revenue: number;
    credits: Array<Cast>;

    constructor(
        id, runtime, vote_average,
        tagline, video, spoken_languages, revenue,
        credits
    ) {

        this.id = id;
        this.runtime = runtime;
        this.vote_average = vote_average;
        this.tagline = tagline;
        this.video = video;
        this.spoken_languages = spoken_languages;
        this.revenue = revenue;
        this.credits = credits;
    }
}

export class Video {
    type: string;
    size: number;
    name: string;
    key: string;

    constructor(
        type,
        size,
        name,
        key,
    ) {
        this.type = type;
        this.size = size;
        this.name = name;
        this.key = key;
    }
}
export class Cast {
    order: number;
    character: string;
    name: string;
    profile_path: string;

    constructor(
        order,
        character,
        name,
        profile_path,
    ) {
        this.order = order;
        this.character = character;
        this.name = name;
        this.profile_path = profile_path;
    }

}
