export class Movie {
    constructor(
        public id: number,
        public title: string,
        public posterPath: string | null,
        public overview: string,       
        public releaseDate: string     
    ) {}
}
export class MovieDetail {
    constructor(
        public genres: { id: number, name: string }[],
        public runtime: number,
        public productionCompanies: { id: number, name: string, logoPath: string | null, originCountry: string }[],
        public voteAverage: number,
        public voteCount: number
    ) {}
}








