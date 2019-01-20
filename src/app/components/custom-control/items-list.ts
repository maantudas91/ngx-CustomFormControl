import { isDefined, isObject, newID } from './utils';
import { CustomControlComponent } from './custom-control.component';
import { CustomControlOption } from './custom-control.types';
import { SelectionModel } from './selection.model';

 
export class ItemsList {

	private _items: any = [];
	
	constructor(
		private _customControl : CustomControlComponent,
		private _selectionModel: SelectionModel
	) {}

	get items(): CustomControlOption{
		return this._items;
	}

	get selectedItems() {
        return this._selectionModel.value;
    }

	resolveNested(option : any, key: string){
		if (!isObject(option)) {
            return option;
        }
        if (key.indexOf('.') === -1){
        	return option[key];
        }else{
        	let keys: string[] = key.split('.');
        	let value = option;
        	for (let i = 0, len = keys.length; i < len; ++i) {
        		if (value == null) {
                    return null;
                }
                value = value[keys[i]];
        	}
        	return value;
        }
	}

	mapItem(item:any, index:number) :CustomControlOption{
		const label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._customControl.bindLabel);
		const value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
		return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: newID(),
        };
	}

	setItems(items: any[])	{
		this._items = items.map( (item, index) => this.mapItem(item, index));
	}

	mapSelectedItems(){

	}
}