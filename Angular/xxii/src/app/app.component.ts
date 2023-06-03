import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as xml2js from 'xml2js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xxii';
  number: string;
  isDot: boolean = false;
  specialNumber: boolean = false;

  constructor(private http: HttpClient) {
    this.number = '';

    this.http.get('https://mendela.pl/ap_kli/czasopisma.xml', { responseType: 'text' }).subscribe(data => {
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(data, 'application/xml');
      console.log(xmlData);
    });

    // fetch("https://mendela.pl/ap_kli/czasopisma.xml", { mode: 'no-cors' })
    //   .then(response => response.text())
    //   .then(data => {
    //     const parser = new xml2js.Parser({ explicitArray: false });
    //     parser.parseString(data, (err, result) => {
    //       console.log(result);
    //       // console.log(result.czasopisma.zmienne.Atari_Age.src)
    //     });
    //   })
    //   .catch(console.error);
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
}
