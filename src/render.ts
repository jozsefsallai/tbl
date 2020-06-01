import { TableCharacters } from './init.ts';
import iro, { bold } from 'https://deno.land/x/iro@1.0.1/src/iro.ts';
import { truncateTable } from '../utils/truncate.ts';

interface RendererOpts {
  items: any[][];
  header?: any[];
  widths?: number[];
  characters?: TableCharacters;
}

class Renderer {
  private header: any[];
  private items: any[][];
  private characters: TableCharacters;

  private count: number;
  private widths: number[];

  constructor(opts: RendererOpts) {
    this.items = opts.items;
    this.header = opts.header || [];
    this.characters = opts.characters || {};
    this.count = this.header.length || opts.items[0].length;
    this.widths = this.calculateMaxWidths();

    if (opts.widths?.length) {
      for (let i = 0; i < opts.widths.length; i++) {
        if (opts.widths[i] !== 0) {
          this.widths[i] = opts.widths[i];
        }
      }
    }
  }

  private calculateMaxWidths(): number[] {
    const widths: number[] = new Array(this.count).fill(0);
    const items = this.header.length
      ? [this.header, ...this.items]
      : this.items;

    items.forEach((item, idx) => {
      if (item.length > this.count) {
        console.warn(`Row no. ${idx + 1} contains more cells than the first row. The additional cells will be truncated.`);
      }

      if (item.length < this.count) {
        throw new Error(`Row no. ${idx + 1} has fewer cells than the first row.`);
      }

      item
        .slice(0, this.count)
        .forEach((v, i) => {
          const width = String(v).length;

          if (width > widths[i]) {
            widths[i] = width;
          }
        });
    });

    return widths;
  }

  public renderTop(): string {
    let str: string = '' + this.characters.topLeft;

    str += this.widths.map(w => {
      return ''.padEnd(w + 2, this.characters.middleMiddle);
    }).join(this.characters.topMiddle);

    str += this.characters.topRight;

    return str;
  }

  public renderRow(row: any[], isHeader: boolean = false, renderVerticalSeparator: boolean = true): string {
    let str = '' + this.characters.left;

    str += row
      .slice(0, this.count)
      .map((cell, idx) => {
        cell = String(cell);
        cell = ` ${cell} `.padEnd(this.widths[idx] + 2, ' ');

        return isHeader
          ? iro(cell, bold)
          : cell;
      })
      .join(this.characters.middle);

    str += this.characters.right;

    if (renderVerticalSeparator) {
      str += `\n${this.characters.leftMiddle}`;

      str += this.widths.map(w => {
        return ''.padEnd(w + 2, this.characters.middleMiddle);
      }).join(this.characters.rowMiddle);

      str += this.characters.rightMiddle;
    }

    return str;
  }

  public renderBottom(): string {
    let str: string = '' + this.characters.bottomLeft;

    str += this.widths.map(w => {
      return ''.padStart(w + 2, this.characters.middleMiddle);
    }).join(this.characters.bottomMiddle);

    str += this.characters.bottomRight;

    return str;
  }
}

export default Renderer;
