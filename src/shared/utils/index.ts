export const uniqueList = <T>(arr: T[] = [], key: keyof T) => {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
};
