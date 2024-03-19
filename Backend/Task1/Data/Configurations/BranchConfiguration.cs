using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Task1.Data.Configurations
{
    public class BranchConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.HasData(
                    new Branch
                    {
                        Id = 1,
                        BU_Codes = "AB100",
                        Status = "Open",
                        Opened_dt = new DateOnly(2008, 09, 15),
                        Address = "19020 111th Ave",
                        CityId = 1,
                        Phone = "780-801-5006",
                        Business_Hours = "Monday - Friday 7:30am - 5:00pm",
                        Latitude = 54,
                        Longitude = -114,
                    },
                    new Branch
                    {
                        Id = 2,
                        BU_Codes = "ABACH",
                        Status = "Open",
                        Opened_dt = new DateOnly(2008, 06, 26),
                        Address = "26229 Twp 531 A Unit 115",
                        CityId = 2,
                        Phone = "(780)-960-4120",
                        Business_Hours = "Monday - Friday 7:30am - 5:00pm",
                        Latitude = 54,
                        Longitude = -114,
                    },
                    new Branch
                    {
                        Id = 3,
                        BU_Codes = "ABAIR",
                        Status = "Open",
                        Opened_dt = new DateOnly(2008, 01, 10),
                        Address = "118 Eastlake Blvd NE Suite 101",
                        CityId = 3,
                        Phone = "(403)948-1347",
                        Business_Hours = "7:30 to 5:00 moday to friday",
                        Latitude = 51,
                        Longitude = -114,
                    },
                    new Branch
                    {
                        Id = 4,
                        BU_Codes = "ABCA1",
                        Status = "Open",
                        Opened_dt = new DateOnly(2008, 10, 09),
                        Address = "BAY P - 2020 32nd Avenue NE",
                        CityId = 4,
                        Phone = "(403)291-3282",
                        Business_Hours = "Monday - Friday 7:30am - 5:00pm",
                        Latitude = 51,
                        Longitude = -114,
                    },
                    new Branch
                    {
                        Id = 5,
                        BU_Codes = "ABCA2",
                        Status = "Open",
                        Opened_dt = new DateOnly(2008, 10, 23),
                        Address = "Bay # 10, 711 48 th Ave. S.E.",
                        CityId = 4,
                        Phone = "(403)-258-2658",
                        Business_Hours = "Monday - Friday 7:30am - 5:00pm",
                        Latitude = 51,
                        Longitude = -114,
                    }
                );
        }
    }
}
