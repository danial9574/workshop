import {Component, inject, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
 readonly email = new FormControl('', [Validators.required, Validators.email]);
 readonly password = new FormControl('', [Validators.required]);
 @Output() emitLoginsucces = new EventEmitter<boolean>();
 loginsucces = false;

  errorMessage = signal('');

  constructor() {
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  submit() {
    if(this.email.valid && this.password.valid) {
        this.emitLoginsucces.emit(!this.loginsucces);
    }

  }

}
