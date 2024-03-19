using Task1.Data;

namespace Task1.Contracts
{
    public interface IBranchRepository : IGenericRepository<Branch>
    {
        Task<Branch> GetDetails(int id);
        Task<Branch> GetByBuCode(string code);
    }
}
