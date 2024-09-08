import sharp from 'sharp';
import { StringHelper } from './string.helper';
import { ArrayHelper } from './array.helper';
import { IImageInfo } from '@app/models/image-info.model';

export class ImageHelper {
    public static readonly PREFIX_DATA_BASE64_JPEG = 'data:image/jpeg;base64,';
    public static readonly REGEX_IMAGE_BASE64 = /^data:(image\/jpeg|png|webp);base64,(.*)/g;

    public static extractImageBase64(base64Str: string): IImageInfo {
        if (StringHelper.isEmpty(base64Str)) {
            return null;
        }
        const match: any = base64Str.match(this.REGEX_IMAGE_BASE64);
        if (!match) return null;
        const [fullMatch, format, base64] = this.REGEX_IMAGE_BASE64.exec(base64Str);
        return { format, base64 };
    }

    public static async addWatermaskOnImage(originImage: Buffer, watermaskBuffer: Buffer): Promise<Buffer> {
        if (!originImage || !watermaskBuffer) {
            return null;
        }
        return await sharp(originImage)
            .composite([
                {
                    input: watermaskBuffer,
                    top: 0,
                    left: 0,
                },
            ])
            .toBuffer();
    }

    public static genTextWatermarkSvg(width: number, height: number, data: string[]): Buffer {
        if (ArrayHelper.isEmpty(data)) {
            return null;
        }
        let svgTxt = `<svg width="${width}" height="${height}">`;
        svgTxt += `
            <style type="text/css">
                .title {
                    fill: #fff;
                    font-size: 14px;
                    font-weight: bold;
                }
            </style>
            <text x="90%" y="90%" text-anchor="start" class="title">`;
        for (let i = 0; i < data.length; i++) {
            svgTxt += `<tspan x="20%" dy="1em">${data[i]}</tspan>`;
        }
        svgTxt += '</text></svg>';
        return Buffer.from(svgTxt);
    }

    // public static async addTextOnImage(originImage: Buffer): Promise<Buffer> {
    //     if (!originImage) {
    //         return null;
    //     }

    //     const image = await loadImage(originImage);
    //     const canvas = createCanvas(image.width, image.height);
    //     const ctx = canvas.getContext('2d');

    //     // Draw the image onto the canvas
    //     ctx.drawImage(image, 0, 0);

    //     ctx.font = 'bold 14px Arial';
    //     ctx.fillStyle = 'white'; // Text color
    //     ctx.textAlign = 'left'; // Align text to the left
    //     ctx.textBaseline = 'top'; // Align text to the top

    //     // Add text to the canvas
    //     ctx.fillText('Hello, World!', 50, 50); // X, Y coordinates for text position
    //     return canvas.toBuffer();
    // }

    public static genImageBase64Str(data: Buffer, format: string = 'image/jpeg') {
        const base64Image = data.toString('base64');
        return `data:${format};base64,${base64Image}`;
    }
}
