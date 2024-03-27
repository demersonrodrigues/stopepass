import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ViewListComponent } from './pages/view-list/view-list.component';

export const routes: Routes = [
    { path: 'home',     component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'update', component: RegisterComponent },
    { path: 'view', component: ViewListComponent },

    { path: '**', component: HomeComponent },
];