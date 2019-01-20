import { 
	Component, 
	OnInit, 
	forwardRef,
	Input,
	HostBinding,
	ChangeDetectionStrategy,
	AfterViewInit,
	Attribute,
	ViewChild,
	ElementRef,
	ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  InjectionToken,
  Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isDefined, isObject } from './utils';
import { ItemsList } from './items-list';
import { SelectionModelFactory } from './selection.model';
import { CustomControlOption } from './custom-control.types';

const CUSTOMCONTROL_VALUE_ACCESSOR = {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CustomControlComponent),
        multi: true
};
export const SELECTION_MODEL_FACTORY = new InjectionToken<SelectionModelFactory>('custom-control-selection-model');
export type DropdownPosition = 'bottom' | 'top' | 'auto';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss'],
  providers:[CUSTOMCONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
        'role': 'listbox',
        'class': 'custom-control',
        '[class.custom-control-single]': '!multiple'
  }
})
export class CustomControlComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {

  //Inputs
  @Input() items: any[] = [];
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() placeholder: string;
  @Input() loading = false;
  @Input() clearAllText: string;
  @Input() dropdownPosition: DropdownPosition = 'auto';

  @Input() labelForId = null;

  @Input() @HostBinding('class.custom-control-multiple') multiple = false;
  @Input() @HostBinding('class.custom-control-opened') isOpen = false;
  @Input() @HostBinding('class.custom-control-searchable') searchable = true;


  @ViewChild('filterInput') filterInput : ElementRef;

  itemsList: ItemsList;
  focused: boolean;

  private _defaultLabel = 'label';
  private _primitive = true;
  private _manualOpen: boolean;

  constructor(
  	@Attribute('autofocus') private autoFocus: any,
  	@Attribute('class') public classes: string,
  	@Attribute('tabindex') public tabIndex: string,
    @Inject(SELECTION_MODEL_FACTORY) newSelectionModel: SelectionModelFactory,
  	 _elementRef: ElementRef,
  	 private _cd: ChangeDetectorRef,
  ) { 
    this.itemsList = new ItemsList(this, newSelectionModel());
  }


  get selectedItems(): CustomControlOption[] {
        return this.itemsList.selectedItems;
  }

  get hasValue() {
        return this.selectedItems.length > 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  	if (this.items && this.items.length === 0) {
  		console.log(this.items);
  	}
  	//console.log(isDefined(this.autoFocus));
  	if(isDefined(this.autoFocus)){
  		this.focus();
  	}
  }

  ngOnChanges(changes: SimpleChanges) {
  	console.log(changes);

  	if(changes.items){
  		this._setItems(changes.items.currentValue || []);
  	}

    if (changes.isOpen) {
        this._manualOpen = isDefined(changes.isOpen.currentValue);
    }
  }

  _setItems(items : any[]){
  	console.log(items);
  	const firstItem = items[0];
  	this.bindLabel = this.bindLabel || this._defaultLabel;
  	//console.log(this.bindLabel);
  	this._primitive = isDefined(firstItem) ? isObject(firstItem) : this._primitive;
  	this.itemsList.setItems(items);

    if (items.length > 0 && this.hasValue) {
        this.itemsList.mapSelectedItems();
    }
    

  }

  focus() {
    this.filterInput.nativeElement.focus();
  }

  handleMousedown($event: MouseEvent){
    const target = $event.target as HTMLElement;

    if (target.tagName !== 'INPUT') {
            $event.preventDefault();
    }
    $event.stopPropagation();

    if (target.classList.contains('custom-clear-wrapper')) {
            this.handleClearClick();
            return;
    }
    if (!this.focused) {
            this.focus();
    }
    if (target.classList.contains('custom-arrow-wrapper')) {
            this.handleArrowClick();
            return;
    }
    if (this.searchable) {
            this.open();
    } else {
            this.toggle();
    }
  }

  handleClearClick(){
      if (this.hasValue) {
            this.clearModel();
      }
      this.focus();
  }

  handleArrowClick(){

  }

  open(){
      this.isOpen = true;
      this.detectChanges();
  }

  toggle(){

  }

  detectChanges(){

  }

  clearModel(){

  }

  writeValue(){

  }

  registerOnChange(){

  }

  registerOnTouched(){

  }


  showClear() {
        //return this.clearable && (this.hasValue || this.filterValue) && !this.disabled;
  }

}
