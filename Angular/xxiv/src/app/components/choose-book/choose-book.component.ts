import { Component } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-book',
  templateUrl: './choose-book.component.html',
  styleUrls: ['./choose-book.component.scss']
})
export class ChooseBookComponent {
  constructor(public serwis: SerwisService, private router: Router) {
    console.log("choosebook", this.router.url);

    serwis.imgClick(null, this.router.url.split('/')[1]);

  }
}
