using Microsoft.EntityFrameworkCore;
using Task1.Contracts;
using Task1.Data;

namespace Task1.Repository
{
    public class BranchRepository : GenericRepository<Branch>, IBranchRepository
    {
        private readonly CustomerDataDbContext _context;
        public BranchRepository(CustomerDataDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Branch> GetDetails(int id)
        {
            return await _context.Branches.Include(q => q.City).FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<Branch> GetByBuCode(string code)
        {
            return await _context.Branches.Include(q => q.City).FirstOrDefaultAsync(q => q.BU_Codes == code);
        }
    }
}
