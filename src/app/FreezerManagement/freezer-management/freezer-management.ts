import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { selectAllFoods, selectAllFreezers } from '../freezer.selectors';
import { Store } from '@ngrx/store';
import { addFood, addFoodsDate, addFoodsPhoto, addFreezer, deleteFood, deleteFreezer } from '../freezer.actions';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatIconRegistry,MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { UntypedFormBuilder } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-freezer-management',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    FormsModule, 
    MatTabsModule, 
    AsyncPipe, 
    ReactiveFormsModule, 
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDivider,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './freezer-management.html',
  styleUrl: './freezer-management.scss',
})


export class FreezerManagement {

  freezerName = new FormControl('');
  freezerFachCount = new FormControl<number | null>(null);

  foodName = new FormControl('');
  fachNumber = new FormControl<number | null>(null);
  foodLabel = new FormControl('');
  selectedFreezerId = new FormControl<string | null>(null);
  freezers$ : any;
  foods$ : any;
  selectedFreezerName = this.selectedFreezerId.value;
  private fb = new UntypedFormBuilder();
  editForm: any = this.fb.group({
    photo: [null]
  });
  remindTitle: string = 'Heute wird das Haltbarkeitsdatum erreicht';
  reminderObj: Array<{id: string | null, isVisible: boolean}> = [];
  dateGroup: any = this.fb.group({
    date: new FormControl<Date | null>(null)
  });
f: any;
searchValue: string = '';

  constructor(private store: Store) {
    this.freezers$ = this.store.select(selectAllFreezers);
    this.foods$ = this.store.select(selectAllFoods);
  }

  reminder(food?: any | null): boolean {
    const selectedDate = food.date;
  if (food && food.date) {
      const today: Date = new Date();
      const isLastDay = () => {
        if (selectedDate) {
          const dateOnFood = new Date(selectedDate);
          dateOnFood.setDate(dateOnFood.getDate() + 5);
          return dateOnFood.getDate() <= today.getDate();
        }
        return false;
      };
      return isLastDay();
    }
    return false;
  }

  createFreezer() {
    const name = this.freezerName.value;
    const count = this.freezerFachCount.value ?? 0;
    if (!name || count <= 0) return;

    this.store.dispatch(addFreezer({ name, faecherAnzahl: count }));
    this.freezerName.setValue('');
    this.freezerFachCount.setValue(null);
  }

  addFoodToFreezer() {
  const name = this.foodName.value;
  const fachNumberValue = this.fachNumber.value;
  const bezeichnung = this.foodLabel.value || '';
  const freezerId = this.selectedFreezerId.value;
  const foodId = this.foodName.value;
  const photo = this.editForm.get('photo')?.value;
  const year = this.dateGroup.get('date')?.value.getFullYear();
  const month = this.dateGroup.get('date')?.value.getMonth();
  const day = this.dateGroup.get('date')?.value.getDate();

  if (!name || !freezerId || fachNumberValue == null) return;

  this.store.dispatch(addFood({
    name,
    freezerId,
    fachNumber: fachNumberValue,
    bezeichnung,
    photo: photo ?? null,
    date: `${day}/${month}/${year}`
  }));
  
  this.store.dispatch(addFoodsPhoto({
      fileData: photo,
      foodId: foodId
  }));

  this.store.dispatch(addFoodsDate({
      date: `${day}/${month}/${year}`,
      foodId: foodId
  }));

  this.foodName.setValue('');
  this.foodLabel.setValue('');
  this.fachNumber.setValue(null);
  this.editForm.get('photo')?.setValue(null);
  this.dateGroup.get('date')?.setValue(null);
}

deleteFood(foodId: string) {
  this.store.dispatch(deleteFood({ id: foodId }));
}

deleteFreezer(freezerIdToDelete: string) {
  this.store.dispatch(deleteFreezer({ id: freezerIdToDelete }));
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

  onSearchChange(searchValue: any): void {
    if (searchValue.data) {
       this.searchValue += searchValue.data;
    }
    if (searchValue.data != null && this.searchValue.length === 0) {
      this.foods$ = this.store.select(selectAllFoods);
      return;
    } else if (!searchValue.data && this.searchValue.length > 0) {
      this.searchValue = this.searchValue.slice(0, -1);
    }
    this.foods$ = this.store.select(selectAllFoods).pipe(
      map((foods: any[]) =>
        foods.filter(food =>
          food.name.toLowerCase().includes(this.searchValue.toLowerCase())        
        )
      )      
    );
    
  }
}

