const crypto = require('crypto');

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
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(this.SPACE);
    }

    public static generateOTP(length: number, options: any) {
        const digits = '0123456789';
        const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase();
        const specialChars = '#!&@';

        length = length || 10;
        const generateOptions = options || {};

        generateOptions.digits = Object.prototype.hasOwnProperty.call(generateOptions, 'digits') ? options.digits : true;
        generateOptions.lowerCaseAlphabets = Object.prototype.hasOwnProperty.call(generateOptions, 'lowerCaseAlphabets') ? options.lowerCaseAlphabets : true;
        generateOptions.upperCaseAlphabets = Object.prototype.hasOwnProperty.call(generateOptions, 'upperCaseAlphabets') ? options.upperCaseAlphabets : true;
        generateOptions.specialChars = Object.prototype.hasOwnProperty.call(generateOptions, 'specialChars') ? options.specialChars : true;

        const allowsChars =
            ((generateOptions.digits || this.EMPTY) && digits) +
            ((generateOptions.lowerCaseAlphabets || this.EMPTY) && lowerCaseAlphabets) +
            ((generateOptions.upperCaseAlphabets || this.EMPTY) && upperCaseAlphabets) +
            ((generateOptions.specialChars || this.EMPTY) && specialChars);
        let otp = this.EMPTY;
        while (otp.length < length) {
            const charIndex = crypto.randomInt(0, allowsChars.length);
            otp += allowsChars[charIndex];
        }
        return otp;
    }
}
