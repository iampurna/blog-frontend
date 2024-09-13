import { Component, inject, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Blog } from '../../types/blog';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
@Input() blog! : Blog;
categoryService = inject(CategoryService);
categoryList:Category[]=[];

ngOnInit(){
  this.categoryService.getCategoryList().subscribe(result=>{
    this.categoryList=result;
  });
}
getCategoryName(){
  return this.categoryList.find(x=>x.id==this.blog?.categoryId)?.name
}
}
