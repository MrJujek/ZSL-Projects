import { Component, OnInit } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent implements OnInit {
  constructor(public serwis: SerwisService, private router: Router) { }

  ngOnInit(): void {
    if (this.serwis.toShow.length == 0) {
      this.router.navigate(['/choose-book']);
    }
  }
}
