import { OptionT } from 'nullshield';


const one = OptionT.some(1);

console.log(one.isSome());
console.log(one.map(x => x * 2).unwrapOr(3));

function printOption(a: OptionT<number>) {
  if (a.isSome()) {
    console.log(a.unwrap());
  }
}

printOption(one);

function getOptionT(a: any): OptionT<number> {
  return OptionT.of(a);
}

printOption(getOptionT('5'));
printOption(getOptionT('testtest'));
printOption(getOptionT(null));

function promiseMe (x: string): Promise<OptionT<string>> {
  return new Promise(function(resolve, reject) {
    return resolve(OptionT.some(x));
  });
}

promiseMe("promise test")
  .then(maybePromise => {
    console.log("expect some", maybePromise.isSome(), maybePromise.unwrap());
  });

async function asyncAwaitTest(): Promise<OptionT<string>> {
  const maybeAsyncAwait = await promiseMe("async/await");
  console.log("async await expect some", maybeAsyncAwait.isSome(), maybeAsyncAwait.unwrap());
  return maybeAsyncAwait;
}

asyncAwaitTest();
