import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {}
  constructor(public accountService : AccountService) { }

  ngOnInit(): void {
   
  }

  doLogin(){
    this.accountService.login(this.model).subscribe(res => {}, err => {
      console.log(err);
    })
  }

  doLogout(){
    this.accountService.logout();
  }
}
