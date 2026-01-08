import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ceasar',
  standalone: true,
  imports: [FormsModule,MatButtonModule],
  templateUrl: './ceasar.html',
  styleUrls: ['./ceasar.scss'],
})
export class Ceasar {

result = "";
errorMessage = "";
inputNumber!: string;
inputAlphabet!: string;

  alphabetToM = Array.from({ length: 77 - 65 + 1 }, (_, i) =>
  String.fromCharCode(i + 65));
  alphabetToZ = Array.from({ length: 90 - 78 + 1 }, (_, i) =>
  String.fromCharCode(i + 78));
  asciiArray = Array.from({ length: 47 - 33 + 1 }, (_, i) =>
  String.fromCharCode(i + 33));
  allAlphabet = Array.from({ length: 90 - 65 + 1 }, (_, i) =>
  String.fromCharCode(i + 65));

  doTheEntschluss() {
   this.doTheCaesar(true);
  }

  doTheVerschluss() {
   this.doTheCaesar(false);
  }

  setErrorMsg(shift: number) {
    this.errorMessage = "";
    if (shift < 0) {
      this.errorMessage = 'Please enter a positive number';
    } else if (shift > 25) {
      this.errorMessage = 'Please enter a number between 0-25';
    } else if (this.inputAlphabet.length === 0) {
      this.errorMessage = 'Please enter a valid text';
    }
    return this.errorMessage;
  }

  doTheCaesar(isEncryption: boolean): string {
    this.result = "";
    const shift = Number(this.inputNumber);
    if (this.setErrorMsg(shift).length > 0) {
      return this.errorMessage;
    }
    for (let i = 0; i < this.inputAlphabet.length; i++) {
      for (let j = 0; j < this.allAlphabet.length; j++) {
        if (this.allAlphabet[j] === this.inputAlphabet[i].split(',')[0].toUpperCase()) {
                this.result += this.findChar(j, shift, this.allAlphabet.length, isEncryption, this.allAlphabet);
           } else if (this.inputAlphabet[i].split(',')[0] === ' ') {
          this.result += ' ';
        } else { 
            for (let k = 0; k < this.asciiArray.length; k++) {
                if (this.inputAlphabet[i].split(',')[0] === this.asciiArray[k]) {
                this.result += this.findChar(k, shift, this.asciiArray.length, isEncryption, this.asciiArray);
                return this.result;
            }
        }
           }
      }
  }
      return this.result;
  }

  private findChar(index: number, shift: number, length: number, isEncryption: boolean, alphabetArray: Array<String>): String {
    if (isEncryption) {
      return alphabetArray[(index + shift) % length];
    } else if (index - shift < 0) {
      return alphabetArray[(index - shift + length) % length];
    } else {
      return alphabetArray[(index - shift) % length];   
    }
  }
}

