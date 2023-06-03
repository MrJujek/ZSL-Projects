import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  currentTime: number = new Date().getTime();

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 1000);
  }
}