import { assertEquals } from 'https://deno.land/std@0.87.0/testing/asserts.ts';
import { initCharacters } from './init.ts';

Deno.test('initCharacters: should have sensible defaults', () => {
  const chars = initCharacters();

  assertEquals(chars.middleMiddle, '─');
  assertEquals(chars.rowMiddle, '┼');
  assertEquals(chars.topRight, '┐');
  assertEquals(chars.topLeft, '┌');
  assertEquals(chars.leftMiddle, '├');
  assertEquals(chars.topMiddle, '┬');
  assertEquals(chars.bottomRight, '┘');
  assertEquals(chars.bottomLeft, '└');
  assertEquals(chars.bottomMiddle, '┴');
  assertEquals(chars.rightMiddle, '┤');
  assertEquals(chars.left, '│');
  assertEquals(chars.right, '│');
  assertEquals(chars.middle, '│');
});

Deno.test('initCharacters: should merge custom characters', () => {
  const chars = initCharacters({
    middleMiddle: '═',
    topMiddle: '╤',
    topLeft: '╔',
    topRight: '╗'
  });

  assertEquals(chars.middleMiddle, '═');
  assertEquals(chars.rowMiddle, '┼');
  assertEquals(chars.topRight, '╗');
  assertEquals(chars.topLeft, '╔');
  assertEquals(chars.leftMiddle, '├');
  assertEquals(chars.topMiddle, '╤');
  assertEquals(chars.bottomRight, '┘');
  assertEquals(chars.bottomLeft, '└');
  assertEquals(chars.bottomMiddle, '┴');
  assertEquals(chars.rightMiddle, '┤');
  assertEquals(chars.left, '│');
  assertEquals(chars.right, '│');
  assertEquals(chars.middle, '│');
});
