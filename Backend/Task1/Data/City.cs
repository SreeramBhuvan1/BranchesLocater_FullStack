using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Task1.Data
{
    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Currency { get; set; }
        public virtual IList<Branch> Branches{ get; set; }
    }
}
