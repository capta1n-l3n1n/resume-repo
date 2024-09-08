import { plainToInstance } from 'class-transformer';

export class ObjectHelper {
    public static extractJustData(cls: any, plain: any) {
        return plainToInstance(cls, plain, { excludeExtraneousValues: true });
    }
}
