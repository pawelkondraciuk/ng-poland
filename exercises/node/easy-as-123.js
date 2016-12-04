var Rx = require('rxjs');

/*
  Create an observable that emits 1, 2, and 3 then completes.
  Subscribe to it and log the output to console.

  BONUS: Try logging before, during and after the subscription. Notice anything?
*/

// Rx.Observable.range(1,3).subscribe((x) => console.log(x));

const observable = new Rx.Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

observable.concat(observable).subscribe(
  (x) => console.log(x),
  null,
  () => console.log("done")
);
