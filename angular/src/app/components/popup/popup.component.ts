import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(function () {
      document.getElementById('progressBar')!.classList.add('shrink');
    }, 1000);
    setTimeout(function () {
      document.getElementById('popupContainer')!.classList.add('slideOut');
    }, 6000);
    // setTimeout(function () {
    //   document.getElementById('popupContainer')!.classList.add('none');
    // }, 8000);
  }
}
