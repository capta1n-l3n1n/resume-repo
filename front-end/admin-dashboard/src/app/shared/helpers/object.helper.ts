import { IOption } from '@shared/models/option.model';

export class ObjectHelper {
    public static flattenObject(obj, parent = '', res = {}) {
        for (let key in obj) {
            const propName = parent ? `${key}` : key;
            if (
                typeof obj[key] == 'object' &&
                obj[key] !== null &&
                !Array.isArray(obj[key])
            ) {
                ObjectHelper.flattenObject(obj[key], propName, res);
            } else {
                res[propName] = obj[key];
            }
        }
        return res;
    }

    public static parseOptions(data: Object): IOption[] {
        const options: IOption[] = [];
        if (!data) return options;
        Object.keys(data).forEach((k) => {
            options.push({ value: k, label: data[k], key: k });
        });
        return options;
    }
}
