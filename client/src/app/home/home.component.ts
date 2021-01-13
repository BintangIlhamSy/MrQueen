import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  regisToogle : boolean;
  successRegis: string;
  constructor() { }

  ngOnInit(): void {

  }

  wantRegistration(){
    this.regisToogle = !this.regisToogle;
  }

  cancelRegisterMode(event: boolean){
    this.regisToogle = event;
  }
}
