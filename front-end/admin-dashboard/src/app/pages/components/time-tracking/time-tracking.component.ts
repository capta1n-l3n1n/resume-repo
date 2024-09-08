import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { normalizeString } from '@/app/shared/utils';
import { TimeTracking } from '../../api/time-tracking';
import { TimeTrackingService } from '../../service/time-tracking.service';
import { xyzService } from '../../service/xyz.service';
import { LogsDetail } from '../../api/logsDetail';
import { StoreService } from '../../service/store.service';
import { ArrayHelper } from '@shared/helpers';
import { ExcelConfig, ExcelService, IMergeCell } from '@shared/services';
import { ExcelConstant } from '@shared/constants/excel-config.constant';
import { ObjectHelper } from '@shared/helpers/object.helper';

@Component({
    templateUrl: './time-tracking.component.html',
})
@ViewChild('app-map')
export class TimeTrackingComponent implements OnInit, OnDestroy {
    constructor(
        public layoutService: LayoutService,
        private timeTrackingService: TimeTrackingService,
        private xyzService: xyzService,
        private storeService: StoreService,
        private cdRef: ChangeDetectorRef,
        private excelService: ExcelService,
    ) {}
    attendanceData!: TimeTracking[];
    filteredAttendanceData = this.attendanceData;
    loading: boolean = true;
    days: { dayOfWeek: string; date: string }[] = [];
    filterName: string = '';

    optionDate: any[] | undefined;
    selectedMonth: any;
    selectedTime: any = { month: '', year: '' };
    storeOptions: any[] = [];
    selectedStoreId: any = '';
    selectedStore: any;
    now: Date = new Date();
    currentMonth: number = this.now.getMonth();
    currentYear: number = this.now.getFullYear();
    previousYear: number = this.currentYear - 1;
    visible: boolean = false;
    logsDetailData: LogsDetail;
    attendanceDetailData: TimeTracking;
    ngOnInit() {
        this.optionDate = [
            {
                name: this.previousYear,
                months: Array.from({ length: 12 }, (_, i) => ({
                    display: `Tháng ${i + 1}`,
                    value: `${i + 1}/${this.previousYear}`,
                    month: `${i + 1}`,
                    year: `${this.previousYear}`,
                })),
            },
            {
                name: this.currentYear,
                months: Array.from(
                    { length: this.currentMonth + 1 },
                    (_, i) => ({
                        display: `Tháng ${i + 1}`,
                        value: `${i + 1}/${this.currentYear}`,
                        month: `${i + 1}`,
                        year: `${this.currentYear}`,
                    }),
                ),
            },
        ];
        this.updateDays();

        this.fetchActivitieLogs();

        this.fetchStore();
    }
    ngOnDestroy() {}
    updateDays() {
        this.days = this.getDaysArray(this.currentYear, this.currentMonth);
        // Check for month change every day at midnight
        setInterval(
            () => {
                this.updateDays();
            },
            1000 * 60 * 60 * 24,
        );
    }

    getDaysArray(
        year: number,
        month: number,
    ): { dayOfWeek: string; date: string }[] {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysOfWeek = [
            'Chủ Nhật',
            'Thứ Hai',
            'Thứ Ba',
            'Thứ Tư',
            'Thứ Năm',
            'Thứ Sáu',
            'Thứ Bảy',
        ];
        return Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month, i + 1);
            const dayOfWeek = daysOfWeek[date.getDay()];
            const day = (i + 1).toString().padStart(2, '0');
            const monthStr = (month + 1).toString().padStart(2, '0');

            return {
                dayOfWeek: `${dayOfWeek}`,
                date: `${day}/${monthStr}`,
            };
        });
    }
    isWeekend(dayDisplay: string): boolean {
        return dayDisplay === 'Chủ Nhật' || dayDisplay === 'Thứ Bảy';
    }

    isTablet() {
        return this.layoutService.isTablet();
    }
    filterEmployees() {
        this.loading = true;
        const normalizedFilterName = normalizeString(this.filterName);
        this.filteredAttendanceData = this.attendanceData.filter((employee) =>
            normalizeString(employee.employeeName).includes(
                normalizedFilterName,
            ),
        );
        this.loading = false;
    }
    onMonthSelect(event: any) {
        const { display, value, month, year } = event.value;
        // this.getDaysArray(Number(year), Number(month));
        this.days = this.getDaysArray(Number(year), Number(month) - 1);

        this.selectedTime = { month, year };
        this.fetchActivitieLogs(month, year, '', this.selectedStoreId);
    }
    fetchActivitieLogs(
        month: string = '',
        year: string = '',
        employeeId: string = '',
        storeId: string = '',
    ) {
        this.loading = true;
        try {
            this.xyzService
                .getActivitieLogs(month, year, employeeId, storeId)
                .subscribe((res) => {
                    this.attendanceData = res.data;
                    this.filteredAttendanceData = res.data;
                    this.loading = false;
                });
        } catch (error) {
            this.loading = false;
        }
    }
    fetchLogsById(id: string) {
        try {
            this.xyzService.getLogById(id).subscribe((res) => {
                this.logsDetailData = res.data;
                this.cdRef.detectChanges();
            });
            return (this.visible = true);
        } catch (error) {
            return null;
        }
    }
    showDialog(id: string, data: any) {
        this.fetchLogsById(id);
        this.attendanceDetailData = data;
        console.log(this.attendanceDetailData);
    }
    fetchStore() {
        try {
            this.storeService.getStore('').subscribe((res) => {
                console.log('storeService', res.data);
                this.storeOptions = res.data.map((store) => ({
                    label: store.name,
                    value: store.id,
                }));
            });
        } catch (error) {
            console.log('error:', error);
        }
    }
    onStoreSelect(event: any) {
        console.log('onStoreSelect event:', event);
        console.log('selectedStore onStoreSelect:', this.selectedStore);
        const selectedStore = event.value;
        const { month, year } = this.selectedTime;
        this.selectedStoreId = selectedStore.value;
        this.fetchActivitieLogs(month, year, '', selectedStore.value);
    }
    resetSelections() {
        this.selectedStore = null;
        this.selectedMonth = null;
        this.fetchActivitieLogs();
    }

    onExportClicked() {
        const data = this.buildExcelData(this.filteredAttendanceData);
        this.excelService.exportExcel(
            'time-tracking',
            this.buildExcelConfig(),
            data,
        );
    }

    buildExcelConfig(): ExcelConfig {
        const excelConfig = new ExcelConfig();
        const headers: any = [
            {
                header: 'Tên',
                key: 'employeeName',
                width: ExcelConstant.WIDTH_COL_LONG,
            },
            {
                header: 'Cửa hàng',
                key: 'storeName',
                width: ExcelConstant.WIDTH_COL_LONG,
            },
            {
                header: 'Tổng ngày',
                key: 'totalDays',
                width: ExcelConstant.WIDTH_COL_SHORT,
                style: { alignment: ExcelConstant.ALIGNMENT_CENTER },
            },
            {
                header: 'Tổng giờ',
                key: 'totalHours',
                width: ExcelConstant.WIDTH_COL_SHORT,
                style: { alignment: ExcelConstant.ALIGNMENT_CENTER },
            },
        ];

        this.days.forEach((d) => {
            headers.push({
                header: d.date,
                key: d.date,
                width: ExcelConstant.WIDTH_COL_SHORT,
                style: { alignment: ExcelConstant.ALIGNMENT_CENTER },
            });
        });

        excelConfig.headers = headers;
        excelConfig.wrapText = true;
        return excelConfig;
    }

    buildExcelData(res: any[]) {
        if (ArrayHelper.isEmpty(res)) {
            return [];
        }
        const data = [];
        let logData;
        res.forEach((i) => {
            const dataItem = {
                ...i,
                totalHours: i.totalHours.toFixed(2),
            };

            logData = i.logs;
            Object.keys(logData).forEach((key) => {
                dataItem[key] =
                    `${logData[key].minLog} - ${logData[key].maxLog}`;
            });

            data.push(dataItem);
        });
        return data;
    }
}
