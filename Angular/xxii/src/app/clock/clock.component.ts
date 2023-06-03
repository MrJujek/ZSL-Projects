import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: '<div>{{ timeString }}</div>'
})
export class ClockComponent implements OnInit {
  timeString: string;

  constructor() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    this.timeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  ngOnInit() {
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      this.timeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
}
