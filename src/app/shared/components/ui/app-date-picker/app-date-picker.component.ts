import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LuxonDateAdapter, MAT_LUXON_DATE_FORMATS } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './app-date-picker.component.html',
  styleUrls: ['./app-date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatePickerComponent),
      multi: true
    }
  ]
})
export class AppDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() mask: string;
  @Input() disabled: boolean;
  @Output() changed = new EventEmitter<string>();
  modelValue = '';

  ngOnInit(): void {
  }
  dateChange(e) {
    const localeDate = `${e.value}`.slice(0, 10);
    this.onChange(localeDate);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: any) {
    this.modelValue = DateTime.fromISO(value);
    this.changeValue();
  }

  protected changeValue() {
    if (!this.modelValue) {
      return;
    }
  }
}
