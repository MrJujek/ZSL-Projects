import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wpisz-zarobki',
  templateUrl: './wpisz-zarobki.component.html',
  styleUrls: ['./wpisz-zarobki.component.scss']
})
export class WpiszZarobkiComponent {
  number: string;
  specialNumber: boolean = false;
  isDot: boolean = false;

  constructor(private router: Router) { 
    this.number = '';  
  }
  onInput(event: any) {
    const value = event.target.value;
    console.log(value);
    

    if (value == '666.666') {
      this.number = '666.666';
      event.target.value = this.number;
      console.log('666.666');
      this.specialNumber = true;
    }

    if (!value.includes('.')) {
      this.isDot = false;
    }

    const lastChar = value.charAt(value.length - 1);
    if (!isNaN(parseInt(lastChar))) {
      if (value.includes('.')) {
        const index = value.indexOf('.');
        const decimal = value.slice(index + 1);
        if (decimal.length <= 3) {
          this.number = value;
        } else {
          this.number = value.slice(0, value.length - 1);
          event.target.value = this.number;
        }
      } else {
        this.number = value;
      }
    } else if (lastChar === '.' && value.length > 1 && this.isDot == false) {
      if (!this.isDot) {
        this.isDot = true;
        this.number = value;
      }
    } else {
      this.number = value.slice(0, value.length - 1);
      event.target.value = this.number;
    }

    console.log(event.target.value);
    
    if (event.target.value == '666.666') {
      this.specialNumber = true;
      this.router.navigate(['/choose']);
    }
  }
}
