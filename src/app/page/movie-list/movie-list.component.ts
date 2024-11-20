import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MovieListGridComponent } from "../../components/movie-list-grid/movie-list-grid.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule, RouterModule, MovieListGridComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  
}
