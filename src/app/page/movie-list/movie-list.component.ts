import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  searchResults: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.searchResults = this.movieService.getSearchResults();
  }
}
