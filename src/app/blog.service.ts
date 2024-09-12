import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './types/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  http=inject(HttpClient);
  constructor() { 
  }
  getFeaturedBlogs(){
    return  this.http.get<Blog[]>("http://localhost:5096/api/Blogs/featured");
  }
}
