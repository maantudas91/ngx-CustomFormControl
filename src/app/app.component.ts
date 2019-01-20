import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface City{
	id: number,
	value: string,
	cityCode: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  form : FormGroup;

  cities : Array<City> = [
  	{ 'id': 123, 'value': 'Agartala', 'cityCode':"AGT" },
  	{ 'id': 124, 'value': 'Udaipur', 'cityCode':"UDP" },
  	{ 'id': 125, 'value': 'Bishalgarh', 'cityCode':"BSG" }
  ];

  constructor(
  	private fb : FormBuilder
  	){

  }

  ngOnInit(){
  		this.form = this.fb.group({
  			name : ['', [Validators.required]],
  			city : [[], [Validators.required]]
  		})
  }

}
