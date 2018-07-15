import { run as optionRun } from './optionTests';
import { run as resultRun } from './resultTests';

import { OptionT, ResultT } from 'nullshield';

// optionRun();
// resultRun();

function getProp(obj: any, prop: any) {
  if (obj.hasOwnProperty(prop)) {
    return OptionT.some(obj[prop]);
  }

  return OptionT.none();
}

function safeParseInt(val: any) {
  const parsed = Number.parseInt(val, 10);

  if (Number.isNaN(parsed)) {
    return ResultT.err(`Error: could not parse the value: [${val}] into an integer.`);
  }

  return ResultT.ok(parsed);
}

function toOption(data = {}) {
  return {
    id: getProp(data, 'routing_option_id').flatMap(x => safeParseInt(x).getOk()).unwrapOr(0),
    description: getProp(data, 'description').unwrapOr(''),
    effectiveDate: getProp(data, 'effective_date').unwrapOr(''),
    expirationDate: getProp(data, 'expiration_date').unwrapOr(''),
  };
}

console.log(toOption({}));
console.log(toOption({ routing_option_id: '1', description: 'test', effective_date: '' }));
