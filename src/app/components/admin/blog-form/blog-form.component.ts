import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';
import { BlogService } from '../../../blog.service';
import { Blog } from '../../../types/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss',
})
export class BlogFormComponent {
  formBuilder = inject(FormBuilder);
  blogForm = this.formBuilder.group({
    id: [null],
    title: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
    description: [''],
    content: ['', [Validators.required]],
    image: [''],
    isFeatured: [false],
  });
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];
  blogService = inject(BlogService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.isEdit = true;
      this.blogService.getBlogsById(+id).subscribe((result) => {
        this.blogForm.patchValue(result as any);
      });
    }
    this.categoryService
      .getCategoryList()
      .subscribe((result) => (this.categoryList = result));
  }
  create() {
    console.log(this.blogForm.value);
    let model: any = this.blogForm.value;
    this.blogService.addBlog(model as Blog).subscribe(() => {
      alert('Blog Created');
      this.router.navigateByUrl('/admin/blogs');
    });
  }
  update() {
    console.log(this.blogForm.value);
    let model: any = this.blogForm.value;
    this.blogService
      .updateBlog(this.blogForm.value.id!, model as Blog)
      .subscribe(() => {
        alert('Blog Updated');
        this.router.navigateByUrl('/admin/blogs');
      });
  }
}
