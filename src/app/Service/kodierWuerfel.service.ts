import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KodierWuerfelService {

  getKeyWordAsArray(keyword: string): string[] {
    return keyword.toUpperCase().split('');
  }

  getInputTextAsArray(text: string): string[] {
    return text.replace(/ /g, '_').split('');
  }

  getCipherTextAsArray(text: string | null): string[] {
    return String(text)
      .replace(/\r?\n/g, '')
      .replace(/ /g, '_')
      .split('');
  }

  setLocked(
  input: string[],
  sortedIndex: number[],
  table: string[][],
  rows: number,
  cols: number
): string {

  const total = rows * cols;

  // Klartext-zeilenweise
  const Klartext = Array.from({ length: total }, (_, i) => input[i] ?? '_');

  // setzten die Cols nach Rangs
  const rankToCol = sortedIndex
    .map((rank, col) => ({ rank, col }))
    .sort((a, b) => a.rank - b.rank)
    .map(o => o.col);

  let cipher = '';

  // Alphabeten spaltenweise erstellen
  for (let rank = 0; rank < cols; rank++) {
    const col = rankToCol[rank];
    for (let r = 0; r < rows; r++) {
      cipher += Klartext[r * cols + col];
    }
  }

  // Tabelle Spaltenweise
  table.length = 0;

  for (let r = 0; r < rows; r++) {
    const rowArr: string[] = [];
    for (let rank = 0; rank < cols; rank++) {
      const col = rankToCol[rank];
      const idx = r * cols + col;
      rowArr.push(Klartext[idx] ?? '_');
    }
    table.push(rowArr);
  }

  return cipher;
}

  setUnlocked(
    cipher: string[],
    sortedIndex: number[],
    table: string[][],
    rows: number,
    cols: number
  ): string {

    const total = rows * cols;
    const C = [...cipher];
    while (C.length < total) C.push('_');

    // rank zu originale Spalte
    const rankToCol = sortedIndex.map((rank, col) => ({ rank, col }))
    .sort((a, b) => a.rank - b.rank)
    .map(o => o.col);

    const P = new Array<string>(total).fill('_');

    // spaltenweise zu zeilenweise
    for (let rank = 0; rank < cols; rank++) {
      const col = rankToCol[rank];
      for (let r = 0; r < rows; r++) {
        const cIdx = rank * rows + r;
        const pIdx = r * cols + col;
        P[pIdx] = C[cIdx] ?? '_';
      }
    }

    table.length = 0;
    for (let r = 0; r < rows; r++) {
      table.push(P.slice(r * cols, r * cols + cols));
    }

    return P.join('');
  }
}
