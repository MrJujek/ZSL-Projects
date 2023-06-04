import { Component } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.scss']
})
export class ShowBooksComponent {
  constructor(public serwis: SerwisService) { 
    console.log(serwis);
    
  }
}
