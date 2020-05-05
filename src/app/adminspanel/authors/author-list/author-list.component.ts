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

  subscriptions$: Subscription = new Subscription();
  authors: Author[];

  constructor(private authorService: AuthorService, private router: Router) { }

  getAuthors() {
    this.subscriptions$.add(this.authorService.getAuthors().subscribe(data=>this.authors = data));
  }

  editAuthor(author): void {
    author.isNew = false;
    let JSONauthor = JSON.stringify(author)
    this.router.navigate(['adminspanel/authors/edit'], {queryParams: { JSONauthor }});
  }

  deleteAuthor(id): void {
    this.subscriptions$.add(this.authorService.deleteAuthor(id).subscribe());
  }

  ngOnInit(): void {
    this.getAuthors()
  }

  ngOnDestroy(): void {
      this.subscriptions$.unsubscribe();
  }



}
