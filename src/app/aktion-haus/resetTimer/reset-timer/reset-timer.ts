import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, map, Observable, startWith, Subject, Subscription, switchMap, takeWhile } from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-reset-timer',
  imports: [AsyncPipe],
  templateUrl: './reset-timer.html',
  styleUrl: './reset-timer.css',
})
export class ResetTimer implements OnDestroy, OnInit {

  @Input() set TimerShouldReset(value: boolean) {
    this.lastMinText$?.subscribe((isLastMin) => {
      if (value && isLastMin) {
      this.DURATION_SEC = 10;
      this.reset$.next();
    } else if (value && !isLastMin) {
      this.reset$.next();
    }
    });
    
  }

  @Output() timerExpired = new EventEmitter<boolean>();

  private  DURATION_SEC = 60;
  private  LAST_MIN = 60;
  private reset$ = new Subject<void>();

  remainingText$: Observable<string> | undefined;
  lastMinText$: Observable<boolean> | undefined;
  expired$: Observable<boolean> | undefined;

  constructor() {
  }

  ngOnInit(): void {
     const remainingSec$ = this.reset$.pipe(
      startWith(void 0),  
      switchMap(() =>
        interval(1000).pipe(
          startWith(0),
          map(tick => this.DURATION_SEC - tick),
          takeWhile(sec => sec >= 0)
        )
      )
    );

    this.remainingText$ = remainingSec$.pipe(
      map(sec => this.format(sec))
    );

    this.lastMinText$ = remainingSec$.pipe(
      map(sec => sec <= this.LAST_MIN)
    );

    this.expired$ = remainingSec$.pipe(
      map(sec => sec <= 0)
    );
    this.expired$.subscribe((isExpired) => {
      this.timerExpired.emit(isExpired);
    });
  }

  ngOnDestroy(): void {
  }

  private format(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${this.pad(m)}:${this.pad(s)}`;
  }

  private pad(v: number): string {
    return v < 10 ? `0${v}` : `${v}`;
  }

}
