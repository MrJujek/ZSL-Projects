import { Component } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'

@Component({
  selector: 'app-choose-book',
  templateUrl: './choose-book.component.html',
  styleUrls: ['./choose-book.component.scss']
})
export class ChooseBookComponent {
  constructor(public serwis: SerwisService) { 
    console.log(serwis);
    
  }
}
