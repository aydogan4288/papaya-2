import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

function bubble(arr, key){
  for(let i=0; i<arr.length; i++){
    let swapped = false;
    for(let j=i; j<arr.length-i-1; j++){
      if(arr[j][key] < arr[j+1][key]){
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        swapped = true;
      }
    }
    if(!swapped){
      return;
    }
  }
}


@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  place: any;
  newreview = {
    "name" : "",
    "rating" : 3,
    "comment" : ""
  }
  reviews = [];
  errors = {};

  constructor(private _ftservice: RestaurantService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getPlace(params['id']);
    })
  }

  getPlace(id){
    let observable = this._ftservice.getOne(id);
    observable.subscribe( data => {
      this.place = data['restaurant'];
      this.reviews = data['restaurant']['reviews'];
      bubble(this.reviews, "rating");
    })
  }

  newRating(id){
    let observable = this._ftservice.addReview(id, this.newreview);
    observable.subscribe( data => {
      if (data['status']== 'not ok'){
        this.errors = data['errors']['errors'];
      }else{
        this.getPlace(id);
        this.newreview = {
          "name" : "",
          "rating" : 3,
          "comment" : ""
        }
      }
    });
  }

  cancel(){
    this._router.navigate(['/']);
  }
}
