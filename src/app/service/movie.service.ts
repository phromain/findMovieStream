import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { Provider } from '../model/provider';
import { ENDPOINTS, BASE_URL_IMG, ERROR_MESSAGES, API_KEY } from '../const/api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private selectedMovieId: number | null = null;

  constructor(private http: HttpClient) { }

  setSelectedMovieId(movieId: number): void {
    this.selectedMovieId = movieId;
  }

  getSelectedMovieId(): number | null {
    return this.selectedMovieId;
  }

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${ENDPOINTS.movie.search}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr`;
    return this.http.get<{ results: any[] }>(url).pipe(
      map(response => {
        if (!response.results) {
          throw new Error(ERROR_MESSAGES.noResults);
        }
        return response.results.map(item => new Movie(
          item.id,
          item.title,
          item.poster_path ? `${BASE_URL_IMG}${item.poster_path}` : null,
          item.overview || 'Pas de résumé disponible',
          item.release_date || 'Date non spécifiée'
        ));
      }),
      catchError(error => throwError(this.handleError(error)))
    );
  }

  private handleError(error: any): string {
    if (error.status) {
      return ERROR_MESSAGES.httpError(error.status);
    }
    return error.message ;
  }
}
