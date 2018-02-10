import {OptionT} from "nullshield";
import {OptT} from "nullshield/option";

const one = OptionT.some(1);

console.log(one.isSome());
console.log(one.map(x => x * 2).unwrapOr(3));

function printOption(a: OptT<number>) {
  if (a.isSome()) {
    console.log(a.unwrap());
  }
}

printOption(one);


function promiseMe (x: string): Promise<OptT<string>> {
  return new Promise(function(resolve, reject) {
    return resolve(OptionT.some(x));
  });
}

promiseMe("promise test")
  .then(maybePromise => {
    console.log("expect some", maybePromise.isSome(), maybePromise.unwrap())
  })

async function asyncAwaitTest (): Promise<OptT<string>> {
  const maybeAsyncAwait = await promiseMe("async/await");
  console.log("async await expect some", maybeAsyncAwait.isSome(), maybeAsyncAwait.unwrap())  
  return maybeAsyncAwait;
}

asyncAwaitTest()
