import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription} from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscriotion : Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscriotion = interval(1000).subscribe( count =>{
    //   console.log(count);
    // });
    const customObservable =  Observable.create( observer => {
      let count= 0;
      setInterval(()=>{ 
        observer.next(count);
        if (count == 4){
          observer.complete();
        }
        if (count>2){
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      }, 1000); 
    }); 

    
    this.firstObsSubscriotion = customObservable.pipe(filter( data =>{
      return data>0;
    }), map( data => {
      return 'Round:' + (+data + 1);
    })).subscribe(data =>{
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy() : void{
    // this.firstObsSubscriotion.unsubscribe();
  }
}
