import { assertEquals, assertThrows } from 'https://deno.land/std@0.87.0/testing/asserts.ts';
import { Table } from './table.ts';

Deno.test('table: should create a simple table', () => {
  const table = new Table();

  table.push([ 'hello', 'world' ]);
  table.push([ 'testing', 123 ]);

  const expectedResult = `┌─────────┬───────┐
│ hello   │ world │
├─────────┼───────┤
│ testing │ 123   │
└─────────┴───────┘`;

  assertEquals(table.toString(), expectedResult);
});

Deno.test('table: should properly render headers', () => {
  const table = new Table({
    header: [ 'name', 'age', 'occupation' ]
  });

  table.push([ 'Joe', 19, 'Software Engineer' ]);
  table.push([ 'Niko', '?', 'Not a cat' ]);
  table.push([ 'Ryan Dahl', 39, 'Software Engineer' ]);

  const expectedResult = `┌───────────┬─────┬───────────────────┐
│\x1b[1m name      \x1b[22m│\x1b[1m age \x1b[22m│\x1b[1m occupation        \x1b[22m│
├───────────┼─────┼───────────────────┤
│ Joe       │ 19  │ Software Engineer │
├───────────┼─────┼───────────────────┤
│ Niko      │ ?   │ Not a cat         │
├───────────┼─────┼───────────────────┤
│ Ryan Dahl │ 39  │ Software Engineer │
└───────────┴─────┴───────────────────┘`;

  assertEquals(table.toString(), expectedResult);
});

Deno.test('table: should properly render custom widths', () => {
  const table = new Table({
    header: [ 'name', 'extension', 'description' ],
    widths: [ 20, 0, 60 ]
  });

  table.push([ 'JavaScript', 'js', 'JavaScript, often abbreviated as JS, is a programming language that onforms to the ECMAScript specification.' ]);
  table.push([ 'Go', 'go', 'Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson.' ]);

  const expectedResult = `┌──────────────────────┬───────────┬──────────────────────────────────────────────────────────────┐
│\x1b[1m name                 \x1b[22m│\x1b[1m extension \x1b[22m│\x1b[1m description                                                  \x1b[22m│
├──────────────────────┼───────────┼──────────────────────────────────────────────────────────────┤
│ JavaScript           │ js        │ JavaScript, often abbreviated as JS, is a programming        │
│                      │           │ language that onforms to the ECMAScript specification.       │
├──────────────────────┼───────────┼──────────────────────────────────────────────────────────────┤
│ Go                   │ go        │ Go is a statically typed, compiled programming language      │
│                      │           │ designed at Google by Robert Griesemer, Rob Pike, and Ken    │
│                      │           │ Thompson.                                                    │
└──────────────────────┴───────────┴──────────────────────────────────────────────────────────────┘`;

  assertEquals(table.toString(), expectedResult);
});

Deno.test('table#fromObjects: should throw if no headers were provided', () => {
  const table = new Table();
  const arr = [
    { hello: 'world' }
  ];

  const run = () => table.fromObjects(arr);

  assertThrows(run, Error, 'Table.fromObjects requires that you have the "headers" option set up.');
});

Deno.test('table#fromObjects: should generate table from an array of objects', () => {
  const table = new Table({
    header: [ 'name', 'age' ]
  });

  const data = [
    {
      name: 'Joe',
      age: 19
    },
    {
      name: 'Amelia',
      age: '?'
    }
  ];

  table.fromObjects(data);

  const expectedResult = `┌────────┬─────┐
│\x1b[1m name   \x1b[22m│\x1b[1m age \x1b[22m│
├────────┼─────┤
│ Joe    │ 19  │
├────────┼─────┤
│ Amelia │ ?   │
└────────┴─────┘`;

  assertEquals(table.toString(), expectedResult);
});
