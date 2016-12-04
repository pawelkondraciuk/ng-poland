import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from '../app.rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-stock-lookup',
  template: `<div>
    <input #foo type="text" (keyup)="keyup$.next(foo.value)" />
    <ul>
      <li *ngFor="let suggestion of suggestions">
        <button (click)="addTicker(suggestion)">{{ suggestion }}</button>
      </li>
    </ul>
    <div *ngFor="let ticker of tickers; let i = index">
      <button (click)="removeTicker(i)">Remove</button>
      <app-stock [ticker]="ticker"></app-stock>
    </div>
  </div>`,

  styles: []
})
export class StockLookupComponent implements OnInit, OnDestroy {


  // list of chosen tickers
  tickers: string[] = [];

  suggestions: string[] = null;

  error: string = null;

  subscription: Subscription;

  keyup$ = new Subject();

  constructor(private http: Http) {
    
  }


  get suggestion$() : Observable<string[]> {
    /*
      This should return an observable of suggestions for an auto complete.
    */
    return this.keyup$
      .debounceTime(2000)
      .switchMap( q => 
        this.http.get('http://localhost:8080/suggest/' + q)
          .map(response => response.json())
      );
  }

  clearSuggestions() {
    this.suggestions = null;
  }

  addTicker(ticker: string) {
    this.tickers.push(ticker);
    this.clearSuggestions();
  }

  removeTicker(index: number) {
    this.tickers.splice(index, 1);
  }

  ngOnInit() {
    this.subscription = this.suggestion$.subscribe(suggestions => {
      this.suggestions = suggestions;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
