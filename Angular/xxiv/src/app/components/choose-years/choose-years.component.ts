import { Component } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-years',
  templateUrl: './choose-years.component.html',
  styleUrls: ['./choose-years.component.scss']
})
export class ChooseYearsComponent {
  constructor(public serwis: SerwisService, private router: Router) {
    console.log("chooseyears", this.router.url);

    serwis.imgClick(null, this.router.url.split('/')[1]);

  }
}
