import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, } from '@angular/forms';

import { ArticleService } from 'src/app/article.service';
import { Article } from '../model/Article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  article: Article;
  FormData: FormGroup;


  constructor(
    private articleService:ArticleService,
    private route:ActivatedRoute,
    private router:Router,
    private builder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.getSingleArticle().subscribe(article => {
      this.article = article;
      console.log(this.article.titre);
      console.log(this.article.contenu);
      console.log(this.article.picture);
      this.FormData = this.builder.group({
        titre: this.article.titre,
        contenu: this.article.contenu,
        picture: this.article.picture
      })
    });
  }

  getSingleArticle():Observable<any> {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.articleService.getSingleArticle(id);
  }

  onSubmit(FormData): void {
    console.log(FormData);
    this.articleService.editArticle(FormData, this.article.id).subscribe(res => {
      this.router.navigateByUrl('/home');
    });
  }

}
