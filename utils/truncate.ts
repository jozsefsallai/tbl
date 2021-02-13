import { GenericType } from '../src/render.ts';

export interface TruncatedTable {
  table: string[][];
  renderBorders: boolean[];
}

export function truncate(str: string, len: number): string[] {
  if (len === 0) {
    return [str];
  }

  const output: string[] = [];

  str
    .split(' ')
    .forEach(word => {
      const chunks = word.match(new RegExp(`.{1,${len}}`, 'g'));
      if (!chunks) {
        return;
      }

      if (!output.length) {
        output.push(...chunks);
        return;
      }

      chunks.forEach(chunk => {
        if (`${output[output.length - 1]} ${chunk}`.length <= len) {
          output[output.length - 1] += ` ${chunk}`;
          return;
        }

        output.push(chunk);
      });
    });

  return output;
}

export function truncateTable(table: GenericType[][], widths: number[]): TruncatedTable {
  const truncatedTable: TruncatedTable = {
    table: [],
    renderBorders: []
  };

  for (let i = 0; i < table.length; i++) {
    const row: string[][] = [];

    for (let j = 0; j < table[i].length; j++) {
      const truncated = truncate(String(table[i][j]), widths[j]);

      row[0] = table[i] as string[];

      for (let k = 0; k < truncated.length; k++) {
        if (k) {
          row[k] = new Array(table[i].length).fill('');
        }

        row[k][j] = truncated[k];
      }
    }

    for (let j = 0; j < row.length; j++) {
      truncatedTable.renderBorders.push(j === row.length - 1);
    }

    truncatedTable.table.push(...row);
  }

  return truncatedTable;
}
