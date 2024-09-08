import { Injectable } from '@angular/core';
import { ExcelConstant } from '@shared/constants/excel-config.constant';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';

export class ExcelConfig {
    headers: Array<any>; // [{header?: string; key?: string; width?: number; style?: any}]
    merges: IMergeCell[];
    wrapText: boolean;
    numberOfRowHeader: number[] = [1];
}

export interface IMergeCell {
    // merge by start row, start column, end row, end column (equivalent to K10:M12)
    merge: IMerge; // 10,11,12,13
    value?: any;
}

export interface IMerge {
    sRow: number;
    sCol: number;
    eRow: number;
    eCol: number;
}

@Injectable({ providedIn: 'root' })
export class ExcelService {
    public exportExcel(fileName: string, config: ExcelConfig, data: any[]) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = config.headers;
        worksheet.addRows(data);

        if (config.merges) {
            //double header
            worksheet.duplicateRow(1, 1, true);
            config.merges.forEach((m) => {
                worksheet.mergeCells(
                    m.merge.sRow,
                    m.merge.sCol,
                    m.merge.eRow,
                    m.merge.eCol,
                );
                if (m.value) {
                    worksheet.getCell(m.merge.sRow, m.merge.eCol).value =
                        m.value;
                }
            });
        }

        worksheet.eachRow((r) => {
            r.eachCell((e) => {
                if (e) {
                    if (config.wrapText && e.alignment) {
                        e.alignment.wrapText = true;
                    } else if (config.wrapText) {
                        e.alignment = { wrapText: true };
                    }

                    if (e.alignment) {
                        e.alignment.vertical = 'middle';
                    }

                    e.font = ExcelConstant.FONT_NORMAL;
                }
            });
        });

        // Format header
        config.numberOfRowHeader.forEach((i) => {
            const headerRow = worksheet.getRow(i);
            headerRow.eachCell((cell) => {
                if (cell.value) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'EEEEEE',
                        },
                    };
                    cell.font = ExcelConstant.FONT_BOLD;
                    cell.alignment = ExcelConstant.ALIGNMENT_CENTER;
                }
            });
        });

        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            fs.saveAs(blob, `${fileName}.xlsx`);
        });
    }
}
