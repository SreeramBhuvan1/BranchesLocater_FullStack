using Task1.Contracts;
using Task1.Data;

namespace Task1.Repository
{
    public class CityRepository : GenericRepository<City>, ICityRepository
    {
        public CityRepository(CustomerDataDbContext context) : base(context)
        {
            
        }
    }
}
