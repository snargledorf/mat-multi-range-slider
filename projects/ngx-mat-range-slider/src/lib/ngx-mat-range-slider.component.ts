import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {ThemePalette} from '@angular/material/core';
import { coerceNumberProperty, NumberInput, BooleanInput } from '@angular/cdk/coercion';

export interface RangeType {
  min: number;
  max: number;
}

@Component({
  selector: 'lib-ngx-mat-range-slider',
  templateUrl: './ngx-mat-range-slider.component.html',
  styleUrls: ['./ngx-mat-range-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'mat-range-slider mat-slider mat-slider-horizontal',
    '[class.mat-slider-has-ticks]': 'tickInterval',
    '[class.mat-slider-disabled]': 'disabled',
  }
})
export class NgxMatRangeSliderComponent implements OnInit {
  thumbLabel = true;

  maxConf = 100;
  minConf = 0;

  maxValueConf = this.maxConf;
  minValueConf = this.minConf;

  @Input()
  set max(v: NumberInput) {
    console.debug("max()", "min", this.min, "max", this.max, "maxValue", this.maxValue, "minValue", this.minValue, "v", v);
    this.maxConf = coerceNumberProperty(v, this.max);
  }
  get max(): number {
    return this.maxConf;
  }

  @Input()
  set min(v : NumberInput) {
    console.debug("min()", "min", this.min, "max", this.max, "maxValue", this.maxValue, "minValue", this.minValue, "v", v);
    this.minConf = coerceNumberProperty(v, this.min);
  }
  get min(): number {
    return this.minConf;
  }

  @Input()
  set maxValue(v: NumberInput) {
    console.debug("maxValue()", "min", this.min, "max", this.max, "maxValue", this.maxValue, "minValue", this.minValue, "v", v);
    this.maxValueConf = coerceNumberProperty(v, this.maxValue);
  }
  get maxValue(): number {
    return this.maxValueConf;
  }

  @Input()
  set minValue(v : NumberInput) {
    console.debug("minValue()", "min", this.min, "max", this.max, "maxValue", this.maxValue, "minValue", this.minValue, "v", v);
    this.minValueConf = coerceNumberProperty(v, this.minValue);
  }
  get minValue(): number {
    return this.minValueConf;
  }

  @Input() minColor: ThemePalette = 'accent';
  @Input() maxColor: ThemePalette = 'primary';

  @Input() step: NumberInput = 1;
  @Input() tickInterval: NumberInput = 1;

  @Input() formatLabel = (v) => v;

  @Output() output = new EventEmitter<RangeType>();
  @Output() minValueChange = new EventEmitter<number>();
  @Output() maxValueChange = new EventEmitter<number>();

  @Input()
  set value(v: { min: number, max: number }) {
    this.minValue = v.min;
    this.maxValue = v.max;
  }

  ngOnInit(): void {
    if (!this.minValue) {
      this.minValue = this.min;
    }
    if (!this.maxValue) {
      this.maxValue = this.max;
    }

    this.minValueChange.emit(coerceNumberProperty(this.minValue, this.minConf));
    this.maxValueChange.emit(coerceNumberProperty(this.maxValue, this.maxConf));
    this.output.emit({min: coerceNumberProperty(this.minValue, this.minConf), max: coerceNumberProperty(this.maxValue, this.maxConf)});
  }

  onMinValueChange(): void {
    this.minValueChange.emit(coerceNumberProperty(this.minValue, this.minConf));
    this.onValueChange();
  }

  onMaxValueChange(): void {
    this.maxValueChange.emit(coerceNumberProperty(this.maxValue, this.maxConf));
    this.onValueChange();
  }

  private onValueChange(): void {
    this.output.emit({min: coerceNumberProperty(this.minValue, this.minConf), max: coerceNumberProperty(this.maxValue, this.maxConf)});
  }

  minValueInput(a: MatSliderChange): void {
    if (a.value >= this.maxValue) {
      a.source.value = this.maxValue-1;
    }
  }

  maxValueInput(a: MatSliderChange): void {
    if (a.value <= this.minValue) {
      a.source.value = this.minValue+1;
    }
  }

}
