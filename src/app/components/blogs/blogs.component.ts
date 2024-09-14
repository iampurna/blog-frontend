import { Component, inject } from '@angular/core';
import { Blog } from '../../types/blog';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { BlogService } from '../../blog.service';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  allBlogs!: Blog[];
  categoryList: Category[] = [];

  blogService = inject(BlogService);
  categoryService = inject(CategoryService);
  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((result) => {
      this.allBlogs = result;
    });

    this.categoryService.getCategoryList().subscribe((result) => {
      this.categoryList = result;
    });
  }
}
