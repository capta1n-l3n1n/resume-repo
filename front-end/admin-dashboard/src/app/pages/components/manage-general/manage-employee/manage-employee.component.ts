import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StoreService } from '@/app/pages/service/store.service';
import { Store } from '@/app/pages/api/store';
import { EmployeeService } from '@/app/pages/service/employee.service';
import { Employee, EmployeeItem } from '@/app/pages/api/employee';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { PageConstant } from '@shared/constants/page.constant';
import { LayoutService } from '@shared/layout/app.layout.service';
@Component({
    templateUrl: './manage-employee.component.html',
    providers: [MessageService],
})
export class ManageEmployeeComponent implements OnInit {
    private searchSubject = new Subject<string>();

    isLoadingTable: boolean = false;
    stores: Store[];
    employeeDialog: boolean = false;
    employee: Employee;
    employees: EmployeeItem[] = [];
    phoneInvalid: boolean = false;
    employeeToEdit: EmployeeItem = {};
    searchTerm: string = '';
    cols: any[] = [];
    totalRecords: number = 0;
    rowsPerPageOptions: number[] = PageConstant.ITEM_PER_PAGE_OPTIONS;
    rows = PageConstant.ITEM_PER_PAGE;
    sort: string = 'createdAt,desc';
    page: number = 0;
    first: number = 0;

    constructor(
        private messageService: MessageService,
        private employeeService: EmployeeService,
        private storeService: StoreService,
        private layoutService: LayoutService,
    ) {
        this.layoutService.setPageTitle('Quản lý nhân viên');
    }

    ngOnInit() {
        this.searchEmployees();
        this.fetchEmployees();
        this.fetchStores();
        this.cols = [
            { field: 'name', header: 'Tên' },
            { field: 'phone', header: 'Số điện thoại' },
            { field: 'store', header: 'Cửa hàng' },
        ];
    }
    fetchEmployees(
        q: string = this.searchTerm,
        page: number = this.page,
        rows: number = this.rows,
        sort: string = this.sort,
    ) {
        this.isLoadingTable = true
        this.employeeService
            .searchEmployees(q, rows, page * rows, sort)
            .subscribe((res: any) => {
                this.totalRecords = Number(res.data.total);
                this.employee = res.data;
                this.employees = res.data.items;
                this.isLoadingTable = false
            });

    }
    fetchStores() {
        this.storeService.getStore().subscribe((res) => {
            this.stores = res.data;
        });
    }

    searchEmployees() {
        this.searchSubject
            .pipe(
                debounceTime(1000),
                switchMap((q: string = this.searchTerm) => {
                    this.isLoadingTable = true
                    return this.employeeService.searchEmployees(
                        q, this.rows, this.page * this.rows, this.sort
                    )
                }

                ),
            )
            .subscribe((res: any) => {
                this.employee = res.data;
                this.employees = res.data.items;
                this.totalRecords = res.data.total;
                this.isLoadingTable = false
            });
    }
    onSearch(event: any) {
        this.searchTerm = event.target?.value
        this.searchSubject.next(event.target?.value);
    }

    onPageChange(event: any): void {
        this.page = event.first / event.rows;
        this.first = event.first;
        this.rows = event.rows;

        this.fetchEmployees();
    }

    clearFilter(inputElement: HTMLInputElement) {
        inputElement.value = '';
        this.page = 0;
        this.first = 0;
        this.rows = 20;
        this.fetchEmployees();
    }

    createEmployee(data: any) {
        try {
            this.employeeService.createEmployee(data).subscribe((res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Tạo nhân viên ${res.data.name} thành công!`,
                    life: 3000,
                });
                this.fetchEmployees();
            });
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Tạo nhân viên không thành công!',
                life: 3000,
            });
        }
    }

    updateEmployee(data: any) {
        try {
            this.employeeService
                .updateEmployee(data.id, data)
                .subscribe((res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Cập nhật nhân viên ${res.data.name} thành công!`,
                        life: 3000,
                    });
                    this.fetchEmployees();
                });
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Cập nhật nhân viên không thành công!',
                life: 3000,
            });
        }
    }

    openNew() {
        this.employeeDialog = true;
        this.employeeToEdit = {};
    }

    editEmployee(data: EmployeeItem) {
        this.employeeDialog = true;
        this.employeeToEdit = { ...data };
    }

    hideDialog() {
        this.employeeDialog = false;
        this.employeeToEdit = {};
    }
    createOrUpdateEmployee() {
        try {
            if (!this.employeeToEdit.id) {
                this.createEmployee(this.employeeToEdit);

                return this.hideDialog();
            }
            this.updateEmployee(this.employeeToEdit);
            this.hideDialog();
        } catch (error) {
            this.hideDialog();
        }
    }
    validatePhone() {
        const phonePattern = /^[0-9]*$/;
        this.phoneInvalid = !phonePattern.test(this.employeeToEdit.phone);
    }

    ngOnDestroy() {
        this.layoutService.setPageTitle('');
        this.searchSubject.unsubscribe()
    }
}
