import {Component, EventEmitter, inject, Input, Output, output} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, UntypedFormBuilder, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Login } from "./loggin/login";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from "@angular/material/card";
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectAllArtikels } from './reducers/aktionhaus.selectors';
import { addArtikel, deleteArtikel } from './reducers/aktionhaus.actions';
import { Artikel, Detail } from './reducers/aktionhaus.models';
import { map, take, tap, timer } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ResetTimer } from "./resetTimer/reset-timer/reset-timer";

@Component({
  selector: 'app-aktion-haus',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    Login,
    AsyncPipe,
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    ResetTimer
],
providers: [provideNativeDateAdapter()],
  templateUrl: './aktion-haus.html',
  styleUrl: './aktion-haus.scss',
})

export class AktionHaus {
  // Timer
emitTimerReset = false;
loginStatus: boolean = false;
isSaledOut: boolean = false;
private formbuilder = new UntypedFormBuilder();
detail: Detail  = { title: '', notice: '' };
photo: any;
// Date
month: string = '';
day: string = '';
year: string = '';
  date: string = '';
  // Form Groups
  editForm: any = this.formbuilder.group({
  photo: [null]
  });
   priceGroup : any = this.formbuilder.group({
    priceCntrl: ['', Validators.required],
  });
  detailFormGroup: any = this.formbuilder.group({
    titleCtrl: ['', Validators.required],
    noticeCtrl: ['', Validators.required]
  });
    dateGroup : any = this.formbuilder.group({
    date:  new FormControl<Date | null>(null)
  });
  // Search
  searchValue: string = '';
  artikeForSale: any;
  // Artikels
  artikels$ : any;
  details$ : any;
  // Coins and Bidding
  coins : number = 50;
  newFirstPrice : number = 0;
  count = 1;
  saledArtikelId:any;

  ngOnInit() {
  }

  constructor(private store: Store) {
    this.artikels$ = this.store.select(selectAllArtikels);
  }

  ngOnDestroy() {
  }

  onlogginStatus(loginsucces : any) {
      this.loginStatus = loginsucces;
      return this.loginStatus;
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editForm.get('photo')?.setValue(reader.result as string);
    });
      reader.readAsDataURL(file);
    }
    this.editForm.get('photo')?.setValue(null);
  }
  addArtikel() {
    const firstPrice = this.priceGroup.get('priceCntrl').value;
    this.store.dispatch(addArtikel({
    detail: {title: this.detail.title, notice: this.detail.notice},
    photo: this.photo,
    duration: `${this.day}/${this.month}/${this.year}`,
    firstPrice: firstPrice
    }));
    this.priceGroup.reset();
    this.detailFormGroup.reset();
    this.editForm.reset();
    this.dateGroup.reset();
    this.photo = null;
  }

  setDetail() {
  this.detail.title = this.detailFormGroup.get('titleCtrl').value;
  this.detail.notice = this.detailFormGroup.get('noticeCtrl').value;
  }
  setPhoto() {
    this.photo = this.editForm.get('photo')?.value;
  }
    
  setDuration() {
    this.year = this.dateGroup.get('date')?.value.getFullYear();
    this.month = this.dateGroup.get('date')?.value.getMonth();
    this.day = this.dateGroup.get('date')?.value.getDate();
  }

  onSearchChange(event: Event): void {
  const value = ((event.target as HTMLInputElement)?.value ?? '');
  this.searchValue = value;

  const term = value.trim().toLowerCase();
  if (!term) {
    this.artikeForSale = [];
    return;
  }

  this.store.select(selectAllArtikels).pipe(
    take(1),
    map((artikels: any[]) =>
      artikels.filter(a =>
        (a?.detail?.title ?? '').toLowerCase().includes(term)
      )
    )
  ).subscribe(filtered => {
    this.artikeForSale = filtered;
  });
}

placeBid(firstPrice: number, id: string) {
  this.coins -= 1;
  this.newFirstPrice = firstPrice - this.count++;
  this.emitTimerReset = true;
  this.saledArtikelId = id;
}

  deleteArtikel(id: string) {
    this.store.dispatch(deleteArtikel({
    id: id
    }));
  }

  saleArtikel(isExpired: boolean) { 
   this.isSaledOut = isExpired;
  }
}
