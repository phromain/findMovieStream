import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../service/movie.service';
import { Movie, MovieDetail } from '../../model/movie';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { Provider } from '../../model/provider';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  movieDetail: MovieDetail | null = null
  provider: Provider[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movie = this.movieService.getSelectedMovie();
    if (this.movie) {
      this.movieService.getMovieDetails(this.movie.id).subscribe(
        (details: MovieDetail) => this.movieDetail = details,
        error => console.error(error)
      );
      this.movieService.getProviders(this.movie.id).subscribe(
        (providers: Provider[]) => this.provider = providers,
        error => console.error(error)
      );
    }
  }
}
