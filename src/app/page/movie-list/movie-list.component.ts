import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/template/header/header.component";
import { FooterComponent } from "../../components/template/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MovieListGridComponent } from "../../components/movie-list-grid/movie-list-grid.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule, RouterModule, MovieListGridComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }
}
