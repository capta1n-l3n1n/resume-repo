export class StringHelper {
    public static readonly SPLITTER = ';';
    public static readonly DBL_SPLITTER = ';;';
    public static readonly TBL_SPLITTER = ';;;';
    public static readonly SPACE = ' ';
    public static readonly EMPTY = '';
    public static readonly DOT = '.';
    public static readonly COMMA = ',';

    public static isEmpty(val: string): boolean {
        return !val || val.trim().length == 0;
    }

    public static capitalizeFirstLetter(phrase): string {
        return phrase[0].toUpperCase() + phrase.slice(1);
    }

    public static capitalizeLetter(phrase): string {
        return phrase
            .toLowerCase()
            .split(this.SPACE)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(this.SPACE);
    }
}
