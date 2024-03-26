export class Branch {
    id: number;
    bU_Codes: string;
    status: string;
    opened_dt: Date;
    address: string;
    cityId: number;
    phone: string;
    business_Hours: string;
    latitude: number;
    longitude: number;

    constructor(id: number, buCode: string, status: string, openedDate: Date, address: string, cityId: number, phone: string, businessHours: string, latitude: number, longitude: number) {
        this.id = id;
        this.bU_Codes = buCode;
        this.status = status;
        this.opened_dt = openedDate;
        this.address = address;
        this.cityId = cityId;
        this.phone = phone;
        this.business_Hours = businessHours;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class CreateBranch {
    bU_Codes: string;
    status: string;
    opened_dt: Date;
    address: string;
    cityId: number;
    phone: string;
    business_Hours: string;
    latitude: number;
    longitude: number;

    constructor(buCode: string, status: string, openedDate: Date, address: string, cityId: number, phone: string, businessHours: string, latitude: number, longitude: number) {
        this.bU_Codes = buCode;
        this.status = status;
        this.opened_dt = openedDate;
        this.address = address;
        this.cityId = cityId;
        this.phone = phone;
        this.business_Hours = businessHours;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}