
export const isDefined = (value: any) =>{
	return value !== undefined && value !== null;
}


export const isObject = (value : any) =>{
	return typeof value == 'object' && isDefined(value);
}

export const isPromise = (value: any) =>  value instanceof Promise;

export const isFunction = (value: any) => value instanceof Function;


export const newID = ()=> {
    return 'axxxxxxxxxxx'.replace(/[x]/g, function (_) {
        const val = Math.random() * 16 | 0;
        return val.toString(16);
    });
}