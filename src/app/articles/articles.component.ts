import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ArticleService } from 'src/app/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any;

  constructor(
    private articleService:ArticleService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
      console.log(articles);
    });
  }

  delete(id: number): void {
    console.log(id);
    // remove from server
    this.articleService.deleteArticle(id).subscribe();
    // remove from UI
    this.articles = this.articles.filter(list => list.id !== id);
  }

}