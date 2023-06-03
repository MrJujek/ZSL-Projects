import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as xml2js from 'xml2js';
import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xxii';
  number: string;
  isDot: boolean = false;
  specialNumber: boolean = true;
  src: string = '';
  imgSrc:string[] = [];
  showBook: boolean = false;
  json: any;
  klik: string = '';
  lata: string[] = [];
  year: string = '';
  yearChoosed: boolean = false;
  toShow: any = [];


  constructor(private http: HttpClient) {
    this.number = '';    
  }

  ngOnInit() {
    this.http.get('../assets/czasopisma.xml', { responseType: 'text' })
      .subscribe(data => {
        parseString(data, (err, result) => {
          this.json = result;
          for (let i = 0; i < Object.keys(result.czasopisma.zmienne[0]).length; i++) {
            let x = result.czasopisma.zmienne[0][Object.keys(result.czasopisma.zmienne[0])[i]][0].src[0];
            this.imgSrc.push('http://atarionline.pl/biblioteka/czasopisma/img/'+x);
            
            const img = new Image();
            img.src = 'http://atarionline.pl/biblioteka/czasopisma/img/' + x;
            img.onload = () => {
              console.log('Image loaded');
            };
          }
        });
      },
      (error) => {
        console.log(error);
      });
  }

  onInput(event: any) {
    const value = event.target.value;

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
  }

  imgClick(event: MouseEvent) {
    this.showBook = true;
    const clickedImg = event.target as HTMLImageElement;
    const index = this.imgSrc.indexOf(clickedImg.src);

    this.klik = this.json.czasopisma.zmienne[0][Object.keys(this.json.czasopisma.zmienne[0])[index]][0].klik[0];

    this.lata = this.json.czasopisma.lata[0][this.klik][0].split(',');
  }

  goBack() {
    this.showBook = false;
  }

  yearClick(event: MouseEvent) {
    this.toShow = [];
    const clickedButton = (event.target as HTMLButtonElement).value;
    const value = clickedButton;
    this.year = value;
    
    this.yearChoosed = true;

    for (let i = 0; i < Object.keys(this.json.czasopisma[this.klik][0]).length; i++) {
      if (this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]['$']['rok'] == this.year) {
        this.toShow.push(this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]);
      } else if (this.year == 'all') {
        this.toShow.push(this.json.czasopisma[this.klik][0][Object.keys(this.json.czasopisma[this.klik][0])[i]][0]);
      }
    }
  }
}
