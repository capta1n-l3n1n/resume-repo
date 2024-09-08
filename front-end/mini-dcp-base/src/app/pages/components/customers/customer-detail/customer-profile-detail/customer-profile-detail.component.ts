import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { Table } from 'primeng/table';
import { OrderHistory } from '@/app/pages/api/order-history';
import { OrderHistoryService } from '@/app/pages/service/order-history.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerProfileDetailService } from '@/app/shared/services/customer-profile-detail.service';
import { StorageService } from '@/app/shared/services/storage.service';
import { CurrencyPipe } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartOptions, ChartData, registerables } from 'chart.js';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexPlotOptions,
    ApexFill,
    ApexStroke,
    ApexYAxis,
    ApexLegend,
} from 'ng-apexcharts';

export type ChartApexOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    stroke: ApexStroke;
    legend: ApexLegend;
};
// const centerTextPlugin = {
//     id: 'centerText',
//     beforeDraw: (chart: Chart) => {
//         const { width, height, ctx } = chart;
//         ctx.restore();
//         const fontSize = (height / 114).toFixed(2);
//         ctx.font = `${fontSize}em sans-serif`;
//         ctx.textBaseline = 'middle';
//         const text = 'Center Text';
//         const textX = Math.round((width - ctx.measureText(text).width) / 2);
//         const textY = height / 2;
//         ctx.fillText(text, textX, textY);
//         ctx.save();
//     },
// };
// Register Chart.js components and plugins
Chart.register(...registerables);
Chart.register(ChartDataLabels);
// Chart.register(centerTextPlugin);

@Component({
    templateUrl: './customer-profile-detail.component.html',
    providers: [CurrencyPipe],
    styleUrls: ['./customer-profile-detail.component.css'],
})
export class CustomerProfileDetailComponent implements OnInit, OnDestroy {
    @ViewChild('chart') chart: ChartComponent;
    public chartApexOptions: Partial<ChartApexOptions>;
    dataTrendChart: ChartData<'bar'>;
    optionsTrendChart: ChartOptions<'bar'>;

    dataOrderDoughnut: ChartData<'doughnut'>;
    optionsOrderDoughnut: ChartOptions<'doughnut'>;

    itemDetail: any;
    totalPayment: number;
    orderHistory: any[];

    cols: any[] = [];

    itemFilter: MenuItem[];
    topSearchValue: any = '1T';
    topSearchOptions: any[] = [
        { label: '1T', value: '1T' },
        { label: '3T', value: '3T' },
        { label: '6T', value: '6T' },
    ];
    ratingValue: number | string = 4;

    activeTime: string = 'night';

    stateOptions: any[] = [
        { label: '  ', value: 'morning' },
        { label: '  ', value: 'noon' },
        { label: '  ', value: 'afternoon' },
        { label: '  ', value: 'night' },
    ];
    activeIndexHistory: number = 0;
    activeIndexReview: number = 0;
    backgroundColor: string = 'var(--primary-color)';
    constructor(
        public layoutService: LayoutService,
        private orderhistoryService: OrderHistoryService,
        private route: ActivatedRoute,
        private customerProfileDetailService: CustomerProfileDetailService,
        private storageService: StorageService,
        private currencyPipe: CurrencyPipe,
    ) {
        this.initApexChart();
    }

    ngOnInit(): void {
        this.initChart();
        this.route.snapshot.paramMap.get('phone');
        this.itemDetail = this.customerProfileDetailService.getSelectedItem();
        console.log(this.itemDetail);

        if (this.itemDetail) {
            this.storageService.setItem('customer-profile', this.itemDetail);
            this.orderHistory = this.itemDetail.billArray;
        } else {
            this.itemDetail = this.storageService.getItem('customer-profile');
            this.orderHistory = this.itemDetail.billArray;

            console.log(this.itemDetail);
        }
        this.setBackgroundColor();
        // this.orderhistoryService
        //     .getOrderHistory()
        //     .then((data) => (this.orderHistory = data));

        this.itemFilter = [
            {
                label: 'Bộ lọc',
                icon: 'pi pi-filter',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark',
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video',
                            },
                        ],
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link',
                    },
                ],
            },
        ];

        //chart
    }
    ngOnDestroy(): void {}

    getFirstLetter(name: string): string {
        return name ? name.charAt(0).toUpperCase() : '';
    }

    setBackgroundColor(): void {
        const colorsMap = {
            A: '#FF5733',
            B: '#33FF57',
            C: '#3357FF',
            D: '#F333FF',
            E: '#FF33A1',
            F: '#FFC300',
            G: '#DAF7A6',
            H: '#FF5733',
            I: '#33FF57',
            J: '#3357FF',
            K: '#F333FF',
            L: '#FF33A1',
            M: '#FFC300',
            N: '#DAF7A6',
            O: '#FF5733',
            P: '#33FF57',
            Q: '#3357FF',
            R: '#F333FF',
            S: '#FF33A1',
            T: '#FFC300',
            U: '#DAF7A6',
            V: '#FF5733',
            W: '#33FF57',
            X: '#3357FF',
            Y: '#F333FF',
            Z: '#FF33A1',
        };
        const firstLetter = this.getFirstLetter(this.itemDetail.name);
        // Default color if no match
        this.backgroundColor = colorsMap[firstLetter] || 'var(--primary-color)';
    }

    getFormattedTotalPayment(): string {
        return (
            this.currencyPipe.transform(
                this.itemDetail.totalPayment,
                'VND',
                'symbol',
            ) ?? 'No Data'
        );
    }
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary',
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
        this.dataTrendChart = {
            labels: [
                'Nhóm áo kiểu',
                'Nhóm váy',
                'Nhóm đầm',
                'Nhóm blazer',
                'Nhóm trang sức',
            ],
            datasets: [
                {
                    backgroundColor:
                        documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56],
                },
            ],
        };
        this.optionsTrendChart = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                    display: false,
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: textColor,
                    formatter: (value: number) => value + '%',
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        display: false,
                        color: surfaceBorder,
                        drawBorder: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        display: false,
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        this.dataOrderDoughnut = {
            labels: ['Đơn thành công', 'Đơn đã đổi trả/ Hủy'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--red-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--red-400'),
                    ],
                },
            ],
        };

        this.optionsOrderDoughnut = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                    position: 'bottom',
                },
                tooltip: {
                    enabled: true,
                },
                datalabels: {
                    display: false,
                },
                title: { text: 'ngon 2' },
                subtitle: { text: 'ngon' },
            },
        };
    }

    initApexChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const primaryColor = documentStyle
            .getPropertyValue('--primary-color')
            .trim();
        const primaryColorMedium = documentStyle
            .getPropertyValue('--primary-200')
            .trim();
        const primaryColorLight = documentStyle
            .getPropertyValue('--primary-50')
            .trim();
        this.chartApexOptions = {
            series: [
                {
                    name: 'Thứ 2',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Thứ 3',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Thứ 4',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Thứ 5',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Thứ 6',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Thứ 7',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
                {
                    name: 'Chủ nhật',
                    data: this.generateData(12, { min: 0, max: 90 }),
                },
            ],
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    colorScale: {
                        ranges: [
                            {
                                from: 0,
                                to: 5,
                                color: primaryColorLight,
                            },
                            {
                                from: 6,
                                to: 10,
                                color: primaryColorMedium,
                            },
                            {
                                from: 11,
                                to: 100,
                                color: primaryColor,
                            },
                        ],
                    },
                },
            },
            xaxis: {
                type: 'category',
                categories: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
            },
            legend: {
                formatter: function (seriesName, opts) {
                    if (seriesName == '6 - 10') {
                        return '>5';
                    }
                    if (seriesName == '11 - 100') {
                        return '>10';
                    }

                    return seriesName;
                },
            },
        };
    }
    generateData(
        count: number,
        yrange: { min: number; max: number },
    ): { x: string; y: number }[] {
        console.log(count);

        const series = [];
        for (let i = 0; i < count; i++) {
            const x = (i + 1).toString();
            const y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
                yrange.min;
            series.push({
                x: x,
                y: y,
            });
        }
        return series;
    }
}
