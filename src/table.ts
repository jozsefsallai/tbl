import { initCharacters } from './init.ts';
import Renderer from './render.ts';
import { truncateTable, TruncatedTable } from '../utils/truncate.ts';

export interface TableCharacters {
  middleMiddle?: string;
  rowMiddle?: string;
  topRight?: string;
  topLeft?: string;
  leftMiddle?: string;
  topMiddle?: string;
  bottomRight?: string;
  bottomLeft?: string;
  bottomMiddle?: string;
  rightMiddle?: string;
  left?: string;
  right?: string;
  middle?: string;
}

export interface TableOptions {
  header?: any[];
  widths?: number[];
  chars?: TableCharacters;
}

export class Table extends Array {
  private options: TableOptions;

  constructor(opts?: TableOptions) {
    super();

    this.options = {};

    this.options.header = opts?.header || [];
    this.options.widths = opts?.widths;
    this.options.chars = opts?.chars
      ? initCharacters(opts.chars)
      : initCharacters();

    if (opts?.widths?.length) {

    }
  }

  fromObjects(arr: any[]): Table {
    if (!this.options.header?.length) {
      throw new Error(`Table.fromObjects requires that you have the "headers" option set up.`);
    }

    const rows: any[][] = [];

    arr.forEach(row => {
      if (Object.keys(row).length < 1) {
        return;
      }

      const current: any[] = [];

      this.options.header?.forEach(cell => {
        current.push(row[cell] || '');
      });

      rows.push(current);
    });

    this.push(...rows);

    return this;
  }

  toString(): string {
    if (!this.length) {
      return '';
    }

    let items = this as any[][];
    let truncatedTable: TruncatedTable | undefined;
    let truncatedHeader: TruncatedTable | undefined;

    const renderer = new Renderer({
      header: this.options.header,
      widths: this.options.widths,
      items,
      characters: this.options.chars
    });

    const stringComponents = [];
    stringComponents.push(renderer.renderTop());

    if (this.options?.header?.length) {
      let headers = [this.options.header];

      if (this.options.widths?.length) {
        truncatedHeader = truncateTable(headers, this.options.widths);
        headers = truncatedHeader.table;
      }

      stringComponents.push(
        headers
          .map((item, idx) => renderer.renderRow(item, true, idx === headers.length - 1))
          .join('\n')
      );
    }

    if (this.options.widths?.length) {
      truncatedTable = truncateTable(items, this.options.widths);
      items = truncatedTable.table;
    }

    stringComponents.push(
      items
        .map((item, idx) => renderer.renderRow(item, false, idx !== items.length - 1 && (truncatedTable?.renderBorders[idx])))
        .join('\n')
    );

    stringComponents.push(renderer.renderBottom());
    return stringComponents.join('\n');
  }
}
