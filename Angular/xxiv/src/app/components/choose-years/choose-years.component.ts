import { Component } from '@angular/core';
import { SerwisService } from '../../services/serwis.service'

@Component({
  selector: 'app-choose-years',
  templateUrl: './choose-years.component.html',
  styleUrls: ['./choose-years.component.scss']
})
export class ChooseYearsComponent {
  constructor(public serwis: SerwisService) { }
}
