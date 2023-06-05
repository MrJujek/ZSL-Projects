import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';

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
  imgSrc: string[] = [];
  json: any;

  constructor(private router: Router, private http: HttpClient) {
    console.log(this.router.url);
  }

  ngOnInit() {
    console.log("serwis");

    this.http.get('../assets/czasopisma.xml', { responseType: 'text' })
      .subscribe(data => {
        parseString(data, (err, result) => {
          console.log("result", result);

          this.json = result;
          for (let i = 0; i < Object.keys(result.czasopisma.zmienne[0]).length; i++) {
            let x = result.czasopisma.zmienne[0][Object.keys(result.czasopisma.zmienne[0])[i]][0].src[0];
            this.imgSrc.push('http://atarionline.pl/biblioteka/czasopisma/img/' + x);

            const img = new Image();
            img.src = 'http://atarionline.pl/biblioteka/czasopisma/img/' + x;
            img.onload = () => {
              console.log('Image loaded');
            };
          }
        });

        // console.log(Object.keys(this.serwis.json.czasopisma.zmienne[0]));

      },
        (error) => {
          console.log(error);
        });
  }

  imgClick(event: MouseEvent | null, nazwa?: string) {
    this.json = null;
    this.http.get('../../assets/czasopisma.xml', { responseType: 'text' })
      .subscribe(data => {
        parseString(data, (err, result) => {
          console.log("result", result);

          this.json = result;
          for (let i = 0; i < Object.keys(result.czasopisma.zmienne[0]).length; i++) {
            let x = result.czasopisma.zmienne[0][Object.keys(result.czasopisma.zmienne[0])[i]][0].src[0];
            this.imgSrc.push('http://atarionline.pl/biblioteka/czasopisma/img/' + x);
          }
        });

        if (nazwa) {
          this.klik = nazwa;
        } else {
          const clickedImg = event!.target as HTMLImageElement;
          const index = this.imgSrc.indexOf(clickedImg.src);

          this.klik = this.json.czasopisma.zmienne[0][Object.keys(this.json.czasopisma.zmienne[0])[index]][0].klik[0];
        }

        this.lata = this.json.czasopisma.lata[0][this.klik][0].split(',');

        console.log(this.klik);

        this.showBook = true;

        this.router.navigate([this.klik]);

        // console.log(Object.keys(this.serwis.json.czasopisma.zmienne[0]));

      },
        (error) => {
          console.log(error);
        });
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

    this.router.navigate([this.klik + '/' + this.year]);
  }
}
