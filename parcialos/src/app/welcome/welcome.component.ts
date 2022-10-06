import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) {

  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }
  welcomeImgSource: string = "https://i.imgur.com/h4SfzQU.jpg";
  welcomeImg2Source: string = "https://i.imgur.com/KOFtR8O.jpg";
}
