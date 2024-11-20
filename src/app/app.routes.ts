import { Routes } from '@angular/router';
import { MovieSearchComponent } from './page/movie-search/movie-search.component';
import { MovieListComponent } from './page/movie-list/movie-list.component';
import { MovieDetailComponent } from './page/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: MovieSearchComponent },
    { path: 'liste', component: MovieListComponent },
    { path: 'detail', component: MovieDetailComponent },
    { path: '**', component: PageNotFoundComponent }
];
