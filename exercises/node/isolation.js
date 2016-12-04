const Rx = require('rxjs');
const Observable = Rx.Observable;

const source = Observable.interval(100).take(10);

const mapEverythingButFours = x => {
  if (x === 4) {
    throw new Error('fours are bad');
  }
  return x + '!';
}

source
  .mergeMap(x => 
    Observable.of(x)
    .map(mapEverythingButFours)
    .catch((err) => Observable.empty())
  )
  .subscribe(
    (x) => console.log(x),
    null,
    () => console.log('done')
  )

// Use the above mapping function, `mapEverythingButFours`, to map all of the
// values from `source`. In the event of an error in your mapping function, just
// skip the value. Log the values out to console

