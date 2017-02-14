import { Component, OnInit } from '@angular/core';

import {Account} from '../account';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
}

goToAccountDetail() {
  let link = ['detail'];
  this.router.navigate(link);
}

}
