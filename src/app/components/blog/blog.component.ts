import { Component, inject } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../types/blog';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  catergoryService = inject(CategoryService);
  blog!: Blog;
  catergoryList: Category[] = [];
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.blogService.getBlogsById(id).subscribe((result) => {
      this.blog = result;
    });
    this.catergoryService.getCategoryList().subscribe((result) => {
      this.catergoryList = result;
    });
  }
  getCategoryName() {
    return this.catergoryList.find((x) => x.id == this.blog?.categoryId)?.name;
  }
}
