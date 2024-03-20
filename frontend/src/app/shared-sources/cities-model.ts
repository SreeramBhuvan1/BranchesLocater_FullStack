export class CityDetail{
  cityId:number=0;
    cityName:string;
    state:string;
    country:string;
    currency:string;
    constructor(cityId:number,cityName:string,state:string,country:string,currency:string){
      this.cityId=cityId;
      this.state=state;
      this.cityName=cityName;
      this.currency=currency;
      this.country=country;
    }
}