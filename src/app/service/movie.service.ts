import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie, MovieDetail } from '../model/movie';
import { Provider } from '../model/provider';
import { ENDPOINTS, BASE_URL_IMG, ERROR_MESSAGES, API_KEY } from '../const/api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private selectedMovie: Movie | null = null;
  private searchResults: Movie[] = [];

  constructor(private http: HttpClient) {}

  setSelectedMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  getSelectedMovie(): Movie | null {
    return this.selectedMovie;
  }

  setSearchResults(results: Movie[]): void {
    this.searchResults = this.sortMoviesByDate(results);
  }

  getSearchResults(): Movie[] {
    return this.searchResults;
  }

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr`;
    return this.http.get<{ results: any[] }>(url).pipe(
      map(response => {
        if (!response.results || response.results.length === 0) {
          throw { type: 'NO_RESULTS', message: ERROR_MESSAGES.noResults };
        }
        return response.results
          .filter(item => this.isValidMovie(item))
          .map(item => new Movie(
            item.id,
            item.title,
            item.poster_path ? `${BASE_URL_IMG}${item.poster_path}` : null,
            item.overview || 'Pas de résumé disponible',
            item.release_date || 'Date non spécifiée'
          ));
      }),
      catchError(error => {
        if (error.type === 'NO_RESULTS') {
          return throwError(error.message);
        }
        return throwError(ERROR_MESSAGES.serviceUnavailable);
      })
    );
  }

  private sortMoviesByDate(movies: Movie[]): Movie[] {
    return movies.sort((a, b) => {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });
  }
  
  generateSlug(title: string): string {
    return title.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  getMovieDetails(movieId: number): Observable<MovieDetail> {
    const url = `${ENDPOINTS.movie.details(movieId)}?api_key=${API_KEY}&language=fr`;
    return this.http.get<any>(url).pipe(
      map(item => new MovieDetail(
        item.genres.map((genre: any) => ({ id: genre.id, name: genre.name })) || [],
        item.runtime || 0,
        item.production_companies?.map((company: any) => ({
          id: company.id,
          name: company.name,
          logoPath: company.logo_path ? `${BASE_URL_IMG}${company.logo_path}` : null,
          originCountry: company.origin_country || 'Pays non disponible'
        })) || [],
        parseFloat(item.vote_average.toFixed(1)) || 0,
        item.vote_count || 0
      )),
      catchError(error => throwError(ERROR_MESSAGES.serviceUnavailable))
    );
  }

  
  getProviders(movieId: number): Observable<Provider[]> {
    const url = `${ENDPOINTS.movie.providers(movieId)}?api_key=${API_KEY}&language=fr`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const providers = response.results?.FR?.flatrate || [];
        if (providers.length === 0) {
          console.warn(ERROR_MESSAGES.noProviders);
        }
        return providers.map((provider: any) =>
          new Provider(
            provider.provider_id,
            provider.provider_name,
            provider.logo_path ? `${BASE_URL_IMG}${provider.logo_path}` : ''
          )
        );
      }),
      catchError(error => {
        return throwError(ERROR_MESSAGES.serviceUnavailable);
      })
    );
  }


  private isValidMovie(item: any): boolean {
    const posterPath = item.poster_path ? `${BASE_URL_IMG}${item.poster_path}` : null;
    const overview = item.overview;
    const releaseDate = item.release_date;

    return posterPath !== null || (overview && overview.trim() !== '') || (releaseDate && releaseDate.trim() !== '');
  }

}
  



