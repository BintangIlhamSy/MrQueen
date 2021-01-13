import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model : any = {};
  registerErrors : string[] = [];

  constructor(public accountService : AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe(res => {
      this.toastr.success(title, 'Registration successfull !!!')
      this.cancel();
    },
      err => {
        this.registerErrors = err;
        console.log(err);
      })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
