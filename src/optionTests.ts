import { OptionT } from 'nullshield';

function printOption<T>(opt: OptionT<T>) {
  if (opt.isSome()) {
    console.log(opt.unwrap());
  }
}

function getOptionT<T>(a: T): OptionT<T> {
  return OptionT.of(a);
}

function promiseOpt(x: string): Promise<OptionT<string>> {
  return new Promise((resolve) => {
    resolve(OptionT.some(x));
  });
}

function basic() {
  console.log('==== basic usage ====');
  const one = OptionT.some(1);
  console.log(one.isSome());
  const two = one.map(x => x * 2);
  console.log(two.isSome());
  console.log(two.unwrap());
  console.log('==== end basic usage ====');
}

function asArgument() {
  console.log('==== as an arguments ====');
  const one = OptionT.some(1);
  const nope = OptionT.none();
  printOption(one);
  printOption(nope);
  console.log('==== end as an arguments ====');
}

function asReturn() {
  console.log('==== as a return value ====');
  printOption(getOptionT(5));
  printOption(getOptionT('testtest'));
  printOption(getOptionT(null));
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

export default {
  run,
};
