import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, XhrFactory } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from './model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url:string = 'https://localhost:8000/articles/json';

  constructor(private http:HttpClient) { }

  getArticles():Observable<Article> {
    return this.http.get<Article>(this.url);
  }

  getSingleArticle(id: number):Observable<Article> {
    const urlID = `${this.url}/${id}`
    return this.http.get<Article>(urlID);
  }

  postNewArticle(article: Article):Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const postUrl = `${this.url}-add`;
    return this.http.post<Article>(postUrl, article, httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  editArticle(article: Article, id: number):Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const editUrl = `${this.url}-edit/${id}`;

    return this.http.put<Article>(editUrl, article, httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteArticle(id: number):Observable<Article> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const deleteUrl = `${this.url}-delete/${id}`;

    return this.http.delete<Article>(deleteUrl, httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error");
  }
}

// Ex-POST req

  // postNewArticle(article:Article) {
  //   const xhr = new XMLHttpRequest;
  //   xhr.open('POST', 'http://localhost:8000/car-create', true);
  //   xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //   xhr.onreadystatechange = function() {
  //     if(xhr.readyState === 4 && xhr.status === 200) {
  //       console.log(xhr.responseText);
  //     }
  //   };

  //   xhr.send(JSON.stringify({'mark': 'Ford'}));
  // }