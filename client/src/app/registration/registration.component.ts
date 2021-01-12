import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  @Output() statusRegister = new EventEmitter();
  model : any = {};

  constructor(public accountService : AccountService) { }

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this.model).subscribe(res => {
      this.cancel();
      this.statusRegister.emit('success');
    },
      err => {
        console.log(err);
        this.statusRegister.emit('failed');
      })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
