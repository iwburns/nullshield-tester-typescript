import { Result } from '@iwburns/tupperware';

function printResult<T, E>(res: Result<T, E>) {
  if (res.isOk()) {
    console.log(res.unwrap());
  } else {
    console.log(res.unwrapErr());
  }
}

function getResult<T, E>(a: T): Result<T, E> {
  return Result.ok(a);
}

function promiseResult(x: string): Promise<Result<string, string>> {
  return new Promise((resolve) => {
    resolve(Result.ok(x));
  });
}

function basic() {
  console.log('==== basic usage ====');
  const one = Result.ok(1);
  console.log(one.isOk());
  const two = one.map(x => x * 2);
  console.log(two.isOk());
  console.log(two.unwrap());
  console.log('==== end basic usage ====');
}

function asArgument() {
  console.log('==== as an arguments ====');
  const one = Result.ok(1);
  const nope = Result.err('it broke');
  printResult(one);
  printResult(nope);
  console.log('==== end as an arguments ====');
}

function asReturn() {
  console.log('==== as a return value ====');
  printResult(getResult(5));
  printResult(getResult('testtest'));
  printResult(getResult(null));
  console.log('==== end as a return value ====');
}

function inPromise() {
  console.log('==== in a promise ====');
  promiseResult('information later')
    .then(res => {
      console.log('something later:', res.isOk(), res.unwrap());
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
