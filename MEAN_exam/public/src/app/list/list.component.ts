import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  places = [];
  place = {};
  update = false;
  rem = "";
  constructor(private _ftservice: RestaurantService, private _router: Router) { }

  ngOnInit() {
    this.getAllPlaces();
    this.rem = localStorage.getItem("id");
    setTimeout( () => {
      this.rem = "";
      localStorage.removeItem("id");
    }, 5000);
  }

  getAllPlaces(){
    let observable = this._ftservice.getPlaces();
    observable.subscribe( data => {
      this.places = data['restaurants'];
      console.log(data);
    });
  }

  delete(id){
    let observable = this._ftservice.deleteOne(id);
    observable.subscribe( data => {
        // this._router.navigate(['/']);
        this.getAllPlaces();
    })
  }
  edit(id){
    this.update = true;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("id");
  }

}
