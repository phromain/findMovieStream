import { Component } from '@angular/core';
import { Movie } from '../../model/movie';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list-grid.component.html',
  styleUrl: './movie-list-grid.component.css'
})
export class MovieListGridComponent {
  searchResults: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.searchResults = this.movieService.getSearchResults();
  }

  selectMovie(movie: Movie): void {
    this.movieService.setSelectedMovie(movie);
    this.router.navigate(['/detail'], { queryParams: { id: movie.id, title: this.generateSlug(movie.title) } });
  }

  generateSlug(title: string): string {
    return this.movieService.generateSlug(title);
  }
}
