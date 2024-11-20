import { Component } from '@angular/core';
import { FooterComponent } from "../../components/template/footer/footer.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { HeaderComponent } from "../../components/template/header/header.component";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [FooterComponent, SearchBarComponent, HeaderComponent, HttpClientModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent {

}
