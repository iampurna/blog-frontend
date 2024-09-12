import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BlogService } from '../../blog.service';
import { Blog } from '../../types/blog';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
blogService = inject(BlogService);
featuredBlogs! : Blog[];
// constructor(private blogService:BlogService){
// }
ngOnInit(){
  this.blogService.getFeaturedBlogs().subscribe((result)=>{
    this.featuredBlogs = result;  
    console.log(this.featuredBlogs);
  })
}
}
