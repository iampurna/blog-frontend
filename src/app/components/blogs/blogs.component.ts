import { Component, inject } from '@angular/core';
import { Blog } from '../../types/blog';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  allBlogs!:Blog[];
  blogService=inject(BlogService);
  ngOnInit(){
    this.blogService.getAllBlogs().subscribe(result=>{
      this.allBlogs=result;
    })
  }
}
