import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { title } from 'process';
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
  constructor(public accountService : AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
   
  }

  doLogin(){
    this.accountService.login(this.model).subscribe(res => {
      this.toastr.success('Login successfully !!', 'Congratulation')
      this.router.navigateByUrl('/members');
    }, err => {
      console.log(err);
    })
  }

  doLogout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.toastr.info('You have already Sign Out', 'Just Info !')
  }
}
