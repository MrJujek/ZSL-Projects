import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as xml2js from 'xml2js';
import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';
import { SerwisService} from './services/serwis.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'czasopisma';
  number: string;
  isDot: boolean = false;
  specialNumber: boolean = false;
  src: string = '';

  constructor(private http: HttpClient, public serwis: SerwisService) { 
    this.number = '';  
  }

  ngOnInit() {
    this.http.get('../assets/czasopisma.xml', { responseType: 'text' })
      .subscribe(data => {
        parseString(data, (err, result) => {
          this.serwis.json = result;
          for (let i = 0; i < Object.keys(result.czasopisma.zmienne[0]).length; i++) {
            let x = result.czasopisma.zmienne[0][Object.keys(result.czasopisma.zmienne[0])[i]][0].src[0];
            this.serwis.imgSrc.push('http://atarionline.pl/biblioteka/czasopisma/img/'+x);
            
            const img = new Image();
            img.src = 'http://atarionline.pl/biblioteka/czasopisma/img/' + x;
            img.onload = () => {
              console.log('Image loaded');
            };
          }
        });
        console.log(this.serwis.imgSrc);
        
        // console.log(Object.keys(this.serwis.json.czasopisma.zmienne[0]));
        
      },
      (error) => {
        console.log(error);
      });
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
    
  }
}
