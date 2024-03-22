export class Branch {
    id: number;
    buCode: string;
    status: string;
    openedDate: Date;
    address: string;
    cityId: number;
    phone: string;
    businessHours: string;
    latitude: number;
    longitude: number;

    constructor(id: number, buCode: string, status: string, openedDate: Date, address: string, cityId: number, phone: string, businessHours: string, latitude: number, longitude: number) {
        this.id = id;
        this.buCode = buCode;
        this.status = status;
        this.openedDate = openedDate;
        this.address = address;
        this.cityId = cityId;
        this.phone = phone;
        this.businessHours = businessHours;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class CreateBranch {
    buCode: string;
    status: string;
    openedDate: Date;
    address: string;
    cityId: number;
    phone: string;
    businessHours: string;
    latitude: number;
    longitude: number;

    constructor(buCode: string, status: string, openedDate: Date, address: string, cityId: number, phone: string, businessHours: string, latitude: number, longitude: number) {
        this.buCode = buCode;
        this.status = status;
        this.openedDate = openedDate;
        this.address = address;
        this.cityId = cityId;
        this.phone = phone;
        this.businessHours = businessHours;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}