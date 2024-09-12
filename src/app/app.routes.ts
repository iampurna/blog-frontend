import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"blogs",
        component:BlogsComponent
    },
    {
        path:'blog/:id',
        component:BlogComponent
    },
    {
        path:"about",
        component:AboutComponent
    },
    {
        path:"footer",
        component:FooterComponent
    }
];
