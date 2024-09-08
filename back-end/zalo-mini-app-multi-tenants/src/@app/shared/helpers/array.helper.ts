export class ArrayHelper {
  public static isEmpty(val: Array<any>): boolean {
    return !val || val.length == 0;
  }
}
