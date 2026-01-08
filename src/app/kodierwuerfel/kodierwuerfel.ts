import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KodierWuerfelService } from '../Service/kodierWuerfel.service';

@Component({
  selector: 'app-kodierwuerfel',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './kodierwuerfel.html',
  styleUrls: ['./kodierwuerfel.css'],
})
export class Kodierwuerfel {

  keywordArray: string[] = [];
  inputTextArray: string[] = [];
  sortedIndexArray: number[] = [];
  table: string[][] = [];

  lockedText = '';
  unLockedText = '';

  form = new FormGroup({
    keyword: new FormControl('', { nonNullable: true }),
    inputText: new FormControl('', { nonNullable: true })
  });

  private service = inject(KodierWuerfelService);

  private computeSortedIndex(keyword: string[]): number[] {
  const KeywordIndexCipher = keyword.map((char, i) => ({ char, i }));
  KeywordIndexCipher.sort((a, b) => a.char.localeCompare(b.char));

  const result: number[] = [];

  KeywordIndexCipher.forEach((item, rank) => {
    result[item.i] = rank;
  });

  return result;
}

  verschluesseln() {
    const key = this.form.value.keyword ?? '';
    const text = this.form.value.inputText ?? '';

    this.keywordArray = this.service.getKeyWordAsArray(key);
    this.inputTextArray = this.service.getInputTextAsArray(text);
    this.sortedIndexArray = this.computeSortedIndex(this.keywordArray);

    const cols = this.keywordArray.length;
    const rows = Math.ceil(this.inputTextArray.length / cols);

    const cipher = this.service.setLocked(
      this.inputTextArray,
      this.sortedIndexArray,
      this.table,
      rows,
      cols
    );

    this.lockedText = cipher.replace(/_/g, ' ');
    this.unLockedText = '';
  }

  entschluesseln() {
    const key = this.form.value.keyword ?? '';
    const cipher = this.form.value.inputText ?? '';

    this.keywordArray = this.service.getKeyWordAsArray(key);
    this.inputTextArray = this.service.getCipherTextAsArray(cipher);
    this.sortedIndexArray = this.computeSortedIndex(this.keywordArray);

    const cols = this.keywordArray.length;
    const rows = Math.ceil(this.inputTextArray.length / cols);

    this.table = [];

    const unlocked = this.service.setUnlocked(
      this.inputTextArray,
      this.sortedIndexArray,
      this.table,
      rows,
      cols
    );

    this.unLockedText = unlocked.replace(/_/g, ' ');
    this.lockedText = '';
  }
}
