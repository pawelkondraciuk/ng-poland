const Rx = require('rxjs');
const Observable = Rx.Observable;

const source = Observable.concat(
  Observable.of('A').delay(0),
  Observable.of('B').delay(1000),
  Observable.of('C').delay(2000)
);

// Create an interval for each arriving value, and play only the most recently
// created observable.

source
  .switchMap(value => Observable.interval(100).mapTo(value))
  .subscribe(
    (value) => console.log(value),
    (err) => console.log(err),
    () => console.log('done')
  )
