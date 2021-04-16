import { TableCharacters } from './table.ts';

function initCharacters(chars: TableCharacters = {}): TableCharacters {
  const characters: TableCharacters = {};

  characters.middleMiddle = chars.middleMiddle || '─';
  characters.rowMiddle = chars.rowMiddle || '┼';
  characters.topRight = chars.topRight || '┐';
  characters.topLeft = chars.topLeft || '┌';
  characters.leftMiddle = chars.leftMiddle || '├';
  characters.topMiddle = chars.topMiddle || '┬';
  characters.bottomRight = chars.bottomRight || '┘';
  characters.bottomLeft = chars.bottomLeft || '└';
  characters.bottomMiddle = chars.bottomMiddle || '┴';
  characters.rightMiddle = chars.rightMiddle || '┤';
  characters.left = chars.left || '│';
  characters.right = chars.right || '│';
  characters.middle = chars.middle || '│';

  return characters;
}

export type {
  initCharacters
};
