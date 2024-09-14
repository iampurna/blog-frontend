import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Blog } from '../../../types/blog';
import { BlogService } from '../../../blog.service';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-manage-blogs',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatFormFieldModule,
  ],
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.scss',
})
export class ManageBlogsComponent {
  displayedColumns: string[] = ['title', 'categoryId', 'action'];
  dataSource: MatTableDataSource<Blog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.blogs);
  }

  blogs: Blog[] = [];
  blogService = inject(BlogService);
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];
  ngOnInit() {
    this.blogService.getAllBlogs().subscribe((result) => {
      this.blogs = result;
      this.dataSource.data = this.blogs;
    });
    this.categoryService.getCategoryList().subscribe((result) => {
      this.categoryList = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCategoryName(data: Blog) {
    return this.categoryList.find((x) => x.id == data.categoryId)?.name;
  }
  delete(data: Blog) {
    // console.log(data.id);
    // this.blogService.deleteBlogs(data.id).subscribe(() => {
    //   this.dataSource.data = this.blogs.filter((x) => x.id != data.id);
    this.blogService.deleteBlogs(data.id).subscribe({
      next: (response) => {
        console.log('Response from server:', response);
        this.blogs = this.blogs.filter((x) => x.id !== data.id);
        this.dataSource.data = this.blogs;
      },
      error: (err) => {
        console.error('Error deleting blog:', err);
      },
    });
  }
}
