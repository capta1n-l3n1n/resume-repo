import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { LayoutService } from '@/app/shared/layout/app.layout.service';
import { ProductService } from '../../service/product.service';
import { Campaign } from '../../api/campaign';
import { CampaignService } from '../../service/campaign.service';
import { CustomerRequest } from '../../api/customer-request';
import { CustomerRequestService } from '../../service/customer-request.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    campaigns!: Campaign[];

    products!: Product[];

    customersRequests!: CustomerRequest[];

    chartData: any;

    chartOptions: any;

    chartDataDoughnut: any;

    chartOptionsDoughnut: any;

    chartDataLineCustomer: any;

    chartOptionsLineCustomer: any;

    chartDataLineEmailSms: any;

    chartOptionsLineEmailSms: any;

    subscription!: Subscription;

    times: any[] | undefined;

    selectedTime: any | undefined;

    filters: any[] | undefined;

    selectedFilter: any | undefined;

    filtersReq: any[] | undefined;

    selectedFilterReq: any | undefined;
    constructor(
        private productService: ProductService,
        private customerService: CustomerRequestService,
        private campaignService: CampaignService,
        public layoutService: LayoutService,
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));
        this.campaignService
            .getCampaign()
            .then((data) => (this.campaigns = data));
        this.customerService
            .getRequest()
            .then((data) => (this.customersRequests = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
        this.selectedTime = { name: '6 tháng gần nhất', value: '' };
        this.times = [
            { name: '6 tháng gần nhất', value: '' },
            { name: 'Cả năm', value: '' },
        ];
        this.selectedFilter = { name: 'Tháng', value: '' };
        this.filters = [
            { name: 'Tháng', value: '' },
            { name: 'Năm', value: '' },
        ];
        this.selectedFilterReq = { name: 'Tất cả', value: '' };
        this.filtersReq = [
            { name: 'Tất cả', value: '' },
            { name: 'Đang xử lí' },
            { name: 'Chờ xử lí', value: '' },
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary',
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
            ],
            datasets: [
                {
                    label: 'Doanh thu',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor:
                        documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    borderRadius: Number.MAX_VALUE,
                    borderSkipped: false,
                },
                {
                    label: 'Chi phí khuyến mãi',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    borderRadius: Number.MAX_VALUE,
                    borderSkipped: false,
                },
            ],
        };

        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            size: 10,
                        },
                    },
                    position: 'bottom',
                },
            },
            scales: {
                x: {
                    border: { display: false },
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

        this.chartDataDoughnut = {
            labels: ['Khách hàng cũ', 'Chi phí khuyến mãi'],
            datasets: [
                {
                    label: 'Khách hàng cũ',
                    data: [40, 50],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                    ],
                    borderSkipped: false,
                },
            ],
            hoverOffset: 4,
        };

        this.chartOptionsDoughnut = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            size: 10,
                        },
                    },
                    position: 'right',
                },
            },
            layout: {
                padding: {
                    top: 50,
                },
            },
        };

        this.chartDataLineCustomer = {
            labels: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
            ],
            datasets: [
                {
                    label: 'Khách hàng mới',
                    data: [65, 59, 80, 81, 56, 500],
                    backgroundColor:
                        documentStyle.getPropertyValue('--blue-400'),
                    borderColor: documentStyle.getPropertyValue('--blue-400'),
                    tension: 0.1,
                    fill: false,
                },
            ],
            hoverOffset: 4,
        };
        this.chartOptionsLineCustomer = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            size: 10,
                        },
                    },
                    position: 'top',
                    align: 'end',
                },
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    border: { display: false },
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
        this.chartDataLineEmailSms = {
            labels: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
            ],
            datasets: [
                {
                    label: 'Email',
                    data: [65, 59, 80, 81, 56, 500],
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-400'),
                    borderColor: documentStyle.getPropertyValue('--green-400'),
                    tension: 0.1,
                    fill: false,
                },
                {
                    label: 'SMS',
                    data: [50, 40, 60, 61, 41, 300],
                    backgroundColor:
                        documentStyle.getPropertyValue('--orange-400'),
                    borderColor: documentStyle.getPropertyValue('--orange-400'),
                    tension: 0.1,
                    fill: false,
                },
            ],
            hoverOffset: 4,
        };
        this.chartOptionsLineEmailSms = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            size: 10,
                        },
                    },
                    position: 'top',
                    align: 'end',
                },
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    border: { display: false },
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
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
