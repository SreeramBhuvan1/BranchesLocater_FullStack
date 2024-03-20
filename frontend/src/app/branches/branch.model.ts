export class Branch {
    branchId: number;
    bU_Codes: string;
    status: string;
    opened_dt: Date;
    address: string;
    cityId: number;
    phone: string;
    business_Hours: string;
    latitude: string;
    longitude: string;

    constructor(branchId: number, bU_Codes: string, status: string, opened_dt: Date, address: string, cityId: number, phone: string, business_Hours: string, latitude: string, longitude: string) {
        this.branchId = branchId;
        this.bU_Codes = bU_Codes;
        this.status = status;
        this.opened_dt = opened_dt;
        this.address = address;
        this.cityId = cityId;
        this.phone = phone;
        this.business_Hours = business_Hours;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}