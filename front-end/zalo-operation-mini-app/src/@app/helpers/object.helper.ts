import { IOption } from "../models/option.model";

export class ObjectHelper {
  public static parseOptions(data: Object): IOption[] {
    const options: IOption[] = [];
    if (!data) return options;
    Object.keys(data).forEach((k) => {
      options.push({ value: k, label: data[k], key: k });
    });
    return options;
  }
}
