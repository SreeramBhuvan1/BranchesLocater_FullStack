using AutoMapper;
using Task1.Data;
using Task1.Models.Branch;
using Task1.Models.City;
using Task1.Models.User;

namespace Task1.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig() 
        {
            CreateMap<Branch, GetBranchDto>().ReverseMap();
            CreateMap<Branch, UpdateBranchDto>().ReverseMap();
            CreateMap<Branch, CreateBranchDto>().ReverseMap();

            CreateMap<City, GetCityDto>().ReverseMap();
            CreateMap<City, UpdateCityDto>().ReverseMap();
            CreateMap<City, CreateCityDto>().ReverseMap();

            CreateMap<ApiUserDto, ApiUser>().ReverseMap();
        }
    }
}
