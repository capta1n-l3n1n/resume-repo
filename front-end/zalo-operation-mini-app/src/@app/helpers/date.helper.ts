export class DateHelper {
  public static FORMAT_DATE_TIME_VI = "DD/MM/yyyy HH:mm";
  public static FORMAT_DATE_VI = "DD/MM/yyyy";
  public static dayNames = {
    0: "Chủ Nhật",
    1: "Thứ Hai",
    2: "Thứ Ba",
    3: "Thứ Tư",
    4: "Thứ Năm",
    5: "Thứ Sáu",
    6: "Thứ Bảy",
  };

  public static getFirstDayOfMonth(
    year: number,
    month: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
  ): number {
    const firstDay = new Date(year, month, 1);
    return firstDay.getDay();
  }

  public static getTotalDaysInMonth(
    year: number,
    month: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
  ): number {
    const firstDay = new Date(year, month, 0);
    return firstDay.getDate();
  }

  public static genHourOptions = () => {
    const data: any = [];
    for (let i = 0; i < 24; i++) {
      data.push({ value: i, displayName: this.formatTimeUnit(i), key: i });
    }
    return data;
  };

  public static genMinuteOptions = () => {
    const data: any = [];
    for (let i = 0; i < 60; i++) {
      data.push({ value: i, displayName: this.formatTimeUnit(i), key: i });
    }
    return data;
  };

  public static formatTimeUnit(unit): string {
    return unit.toString().padStart(2, "0");
  }
}
