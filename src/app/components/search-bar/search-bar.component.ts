import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [MovieService]
})
export class SearchBarComponent {
  query: string = '';
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  searchMovies(): void {
    if (this.query) {
      this.movieService.searchMovies(this.query).subscribe({
        next: (data: Movie[]) => {
          this.movies = data;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }
}
