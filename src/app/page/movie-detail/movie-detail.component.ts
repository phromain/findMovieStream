import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movie';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieDetail: Movie | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieDetail = this.movieService.getSelectedMovie();
  }
}
