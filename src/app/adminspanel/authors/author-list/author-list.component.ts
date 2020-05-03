import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Subscription } from 'rxjs';
import { Author } from '../author';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, OnDestroy {

  subscriptionForGettingAuthors$: Subscription;
  authors: Author[];

  constructor(private authorService: AuthorService, private router: Router) { }

  getAuthors(): void {
    this.subscriptionForGettingAuthors$ = this.authorService.getAuthors().subscribe(data=>this.authors = data)
  }

  editAuthor(author): void {
    author.isNew = false;
    let JSONauthor = JSON.stringify(author)
    this.router.navigate(['adminspanel/authors/edit'], {queryParams: { JSONauthor }})
  }

  deleteAuthor(id): void {
    this.authorService.deleteAuthor(id).subscribe();
  }

  ngOnInit(): void {
      this.getAuthors();
  }

  ngOnDestroy(): void {
      this.subscriptionForGettingAuthors$.unsubscribe();
  }



}
