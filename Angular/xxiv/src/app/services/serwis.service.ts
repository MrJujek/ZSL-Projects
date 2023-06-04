import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SerwisService {
  klik: string = '';
  lata: string[] = [];
  year: string = '';
  yearChoosed: boolean = false;
  toShow: any = [];
  showBook: boolean = false;
  imgSrc:string[] = [];
  json: any;

  constructor(private router: Router) { }

  imgClick(event: MouseEvent) {
    this.showBook = true;
    const clickedImg = event.target as HTMLImageElement;
    const index = this.imgSrc.indexOf(clickedImg.src);

    this.klik = this.json.czasopisma.zmienne[0][Object.keys(this.json.czasopisma.zmienne[0])[index]][0].klik[0];

    this.lata = this.json.czasopisma.lata[0][this.klik][0].split(',');

    this.router.navigate([this.klik]);
  }

  goBack() {
    this.showBook = false;
    this.yearChoosed = false;
    this.toShow = [];
    this.router.navigate(['/choose']);
  }

  yearClick(event: MouseEvent) {
    this.toShow = [];
    const clickedButton = (event.target as HTMLButtonElement).value;
    const value = clickedButton;
    this.year = value;
    
    this.yearChoosed = true;

    for (let i = 0; i < Object.keys(this.json.czasopisma[this.klik][0]).length; i++) {
      if (!(this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]['$']['brak'])) {
        if (this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]['$']['rok'] == this.year) {
          this.toShow.push(this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]);
        } else if (this.year == 'all') {
          this.toShow.push(this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]);
        }
      }
    }

    this.router.navigate([this.klik+'/'+ this.year]);
  }
}
