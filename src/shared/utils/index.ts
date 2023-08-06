export const uniqueList = <T>(arr: T[] = [], key: keyof T) => {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const isNumber = (value: string) => !Number.isNaN(Number(value));

export const isExist = (value: string) => value.length > 0;
