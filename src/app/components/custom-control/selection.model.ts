import { CustomControlOption } from './custom-control.types';


export type SelectionModelFactory = () => SelectionModel;

export interface SelectionModel {
    value: CustomControlOption[];
    select(item: CustomControlOption, multiple: boolean, selectableGroupAsModel: boolean);
    unselect(item: CustomControlOption, multiple: boolean);
    clear();
}



export function  DefaultSelectionModelFactory(){
	return new DefaultSelectionModel();
}


class DefaultSelectionModel implements SelectionModel {

	private _selected: CustomControlOption[] = [];

	get value(){
		return this._selected;
	}

	select(item: CustomControlOption, multiple: boolean, selectableGroupAsModel: boolean){

	}

	unselect(tem: CustomControlOption, multiple: boolean){

	}

	clear(){

	}
}