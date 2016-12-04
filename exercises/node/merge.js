const Rx = require('rxjs');

const Observable = Rx.Observable;

const a = Observable.interval(100).mapTo('A').take(12);
const b = Observable.interval(200).mapTo('B').take(5);
const c = Observable.interval(300).mapTo('C').take(10);

// Use any merge operator to run each of the Observables
// simultaneously and emit all values on one stream

a.merge(b, c).subscribe(
  (value) => console.log(value),
  (err) => console.log(err),
  () => console.log('done')
)

Observable.of(a,b,c).mergeAll().subscribe(
  (value) => console.log(value),
  (err) => console.log(err),
  () => console.log('done')
)

Observable.merge(a,b,c).subscribe(
  (value) => console.log(value),
  (err) => console.log(err),
  () => console.log('done')
)
