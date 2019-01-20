import { 
	Component, 
	OnInit,
	Input,
	ChangeDetectionStrategy} from '@angular/core';
import { DropdownPosition } from './custom-control.component';



@Component({
  selector: 'app-custom-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="ng-dropdown-header"></div>
  `
  
})
export class CustomDropdownComponent implements OnInit{

	@Input() position: DropdownPosition = 'auto';


	private _currentPosition: DropdownPosition;

	
	constructor(){

	}

	ngOnInit(){

	}
}