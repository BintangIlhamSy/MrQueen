import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl : string = 'https://localhost:5001/api/';
  validationError : string[] = [];
  constructor(private http : HttpClient) {}

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl+'buggy/not-found').subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  get400Error(){
    this.http.get(this.baseUrl+'buggy/bad-request').subscribe(res => {
      console.log(res); 
    }, err=>{
      console.log(err);
      
    });
  }

  get401Error(){
    this.http.get(this.baseUrl+'buggy/auth').subscribe(res=> {
      console.log(res);
        
    }, err=>{
      console.log(err);
        
    });
  }

  get500Error(){
    this.http.get(this.baseUrl+'buggy/server-error').subscribe(res=> {
      console.log(res);
      
    }, err=>{
      console.log(err);
      
    })
  }

  get400ErrorValidate(){
    this.http.post(this.baseUrl+'account/register',{}).subscribe(res=> {
      console.log(res);
      
    }, err=>{
      this.validationError=err;
      console.log(err);
      
    })
  }
}
