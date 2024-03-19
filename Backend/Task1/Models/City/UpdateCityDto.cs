namespace Task1.Models.City
{
    public class UpdateCityDto
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Currency { get; set; }
    }
}
