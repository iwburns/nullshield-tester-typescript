import { Optional } from '@iwburns/tupperware';

function printOption<T>(opt: Optional<T>) {
  if (opt.isSome()) {
    console.log(opt.unwrap());
  }
}

function getOptional<T>(a: T): Optional<T> {
  return Optional.of(a);
}

function promiseOpt(x: string): Promise<Optional<string>> {
  return new Promise((resolve) => {
    resolve(Optional.some(x));
  });
}

function basic() {
  console.log('==== basic usage ====');
  const one = Optional.some(1);
  console.log(one.isSome());
  const two = one.map(x => x * 2);
  console.log(two.isSome());
  console.log(two.unwrap());
  console.log('==== end basic usage ====');
}

function asArgument() {
  console.log('==== as an arguments ====');
  const one = Optional.some(1);
  const nope = Optional.none();
  printOption(one);
  printOption(nope);
  console.log('==== end as an arguments ====');
}

function asReturn() {
  console.log('==== as a return value ====');
  printOption(getOptional(5));
  printOption(getOptional('testtest'));
  printOption(getOptional(null));
  console.log('==== end as a return value ====');
}

function inPromise() {
  console.log('==== in a promise ====');
  promiseOpt('information later')
  .then(opt => {
    console.log('something later:', opt.isSome(), opt.unwrap());
  }).then(() => {
    console.log('==== end in a promise ====');
  });
}

export function run() {
  basic();
  asArgument();
  asReturn();
  inPromise();
}
