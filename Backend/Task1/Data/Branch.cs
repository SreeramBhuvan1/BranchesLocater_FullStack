using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Task1.Data
{
    public class Branch
    {
        public int Id { get; set; }
        public string BuCode { get; set; }
        public string Status { get; set; }
        public DateOnly OpenedDate { get; set; }
        public string Address { get; set; }

        [ForeignKey(nameof(CityId))]
        public int CityId { get; set; }
        public City City { get; set; }


        public string Phone { get; set; }
        public string BusinessHours { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
