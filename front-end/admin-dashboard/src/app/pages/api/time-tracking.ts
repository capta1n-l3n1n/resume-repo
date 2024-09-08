export interface TimeTracking {
    employeeName: string;
    storeName: string;
    totalDays: number;
    totalHours: number;
    logs: Record<string, string>;
}
