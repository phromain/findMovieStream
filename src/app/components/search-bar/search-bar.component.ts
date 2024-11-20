import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query: string = '';
  booleanError: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService, private router: Router) {}

  searchMovies(): void {
    if (this.query.length < 3) {
      this.booleanError = true;
      this.errorMessage = 'La requête doit contenir au moins 3 caractères';
      return;
    }
    this.booleanError = false;
    this.movieService.searchMovies(this.query).subscribe({
      next: (data) => {
        this.movieService.setSearchResults(data);
        this.router.navigate(['/liste']);
      },
      error: (err) => {
        this.booleanError = true;
        this.errorMessage = err;
      }
    });
  }
}
