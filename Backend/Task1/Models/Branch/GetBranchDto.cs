using System.ComponentModel.DataAnnotations.Schema;
using Task1.Data;

namespace Task1.Models.Branch
{
    public class GetBranchDto
    {
        public int Id { get; set; }
        public string BuCode { get; set; }
        public string Status { get; set; }
        public DateOnly OpenedDate { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public string Phone { get; set; }
        public string BusinessHours { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
