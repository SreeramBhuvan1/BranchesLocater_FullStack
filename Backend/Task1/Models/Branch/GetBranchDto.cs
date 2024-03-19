using System.ComponentModel.DataAnnotations.Schema;
using Task1.Data;

namespace Task1.Models.Branch
{
    public class GetBranchDto
    {
        public int Id { get; set; }
        public string BU_Codes { get; set; }
        public string Status { get; set; }
        public DateOnly Opened_dt { get; set; }
        public string Address { get; set; }
        public int CityId { get; set; }
        public string Phone { get; set; }
        public string Business_Hours { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
