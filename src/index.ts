// dget safely gets a value from a nested object via a dot-notated path.
// In addition you have the ability to provide a fallback value to be returned
// if the full key path does not exists or the value is undefined.
export function dget<ObjectType extends { [key: string]: any }, DefaultType>(
	obj: ObjectType,
	key: string | string[],
	def?: DefaultType,
	p?: number,
) {
	p = 0;
	key =
		typeof (key as string).split === 'function'
			? (key as string).replace(/\[([\w\d]+)\]/g, '.$1').split('.')
			: key;
	while (obj && p < key.length) obj = obj[key[p++]];
	return obj === undefined || p < key.length ? def : obj;
}
