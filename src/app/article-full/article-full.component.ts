import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from 'src/app/article.service';
import { Article } from '../model/Article';

@Component({
  selector: 'app-article-full',
  templateUrl: './article-full.component.html',
  styleUrls: ['./article-full.component.css']
})
export class ArticleFullComponent implements OnInit {
  article: Article;

  constructor(
    private articleService:ArticleService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getSingleArticle();
    };

  getSingleArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getSingleArticle(id)
      .subscribe(article => this.article = article);
  }

}
