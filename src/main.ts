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
