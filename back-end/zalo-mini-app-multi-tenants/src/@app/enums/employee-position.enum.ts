export enum EmployeePosition {
    STAFF = 1,
    STORE_MANAGER = 2,
    AREA_MANAGER = 3,
    HR_MANAGER = 4,
    CEO = 5,
}

export const getPositionJson = (): any[] => {
    return Object.keys(EmployeePosition).map(k => {
        return { code: k, level: EmployeePosition[k] };
    });
};
