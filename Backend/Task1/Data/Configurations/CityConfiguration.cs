using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Task1.Data.Configurations
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.HasData(
                    new City
                    {
                        CityId = 1,
                        CityName = "EDMONTON",
                        State = "Alberta",
                        Country = "Canada",
                        Currency = "CAD",
                    },
                    new City
                    {
                        CityId = 2,
                        CityName = "ACHESON",
                        State = "Alberta",
                        Country = "Canada",
                        Currency = "CAD",
                    },
                    new City
                    {
                        CityId = 3,
                        CityName = "AIRDRIE",
                        State = "Alberta",
                        Country = "Canada",
                        Currency = "CAD",
                    },
                    new City
                    {
                        CityId = 4,
                        CityName = "CALGARY",
                        State = "Alberta",
                        Country = "Canada",
                        Currency = "CAD",
                    }
                );
        }
    }
}
