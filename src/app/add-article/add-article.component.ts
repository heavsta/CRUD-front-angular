import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

import { ArticleService } from '../article.service';
import { Article } from './../model/Article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  FormData: FormGroup;
  article: Article = new Article;

  constructor(
    private builder:FormBuilder,
    private router:Router,
    private articleService:ArticleService) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      titre: this.article.titre,
      contenu: this.article.contenu,
      visible: this.article.visible,
      auteur: this.article.auteur,
      picture: this.article.picture
    })
  }

  onSubmit(FormData): void {
    console.log(FormData);
    this.articleService.postNewArticle(FormData).subscribe();
    this.router.navigateByUrl('/home');
  }

}
