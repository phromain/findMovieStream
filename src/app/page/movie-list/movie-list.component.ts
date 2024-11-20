import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
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
