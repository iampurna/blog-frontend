import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './types/blog';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  http=inject(HttpClient);
  constructor() { 
  }
  getFeaturedBlogs(){
    return  this.http.get<Blog[]>(environment.apiUrl+"/api/Blogs/featured");
  }
  getAllBlogs(){
    return  this.http.get<Blog[]>(environment.apiUrl+'/api/Blogs');
  }

  getBlogsById(id:number){
    return  this.http.get<Blog>(environment.apiUrl+'/api/Blogs/'+id);
  }
}
