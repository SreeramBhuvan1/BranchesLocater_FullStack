using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task1.Contracts;
using Task1.Controllers;
using Task1.Data;
using Task1.Models.City;
using Task1.Repository;

namespace Task1.Tests.Controllers
{
    public class CitiesControllerTest
    {
        private readonly Mock<IMapper> _mapper;
        private readonly Mock<ICityRepository> _cityRepository;
        private readonly CitiesController _citiesController;

        public CitiesControllerTest()
        {
            _mapper = new Mock<IMapper>();  
            _cityRepository = new Mock<ICityRepository>();
            _citiesController = new CitiesController(_mapper.Object, _cityRepository.Object);
        }

        [Fact]
        public async Task GetCities_Success()
        {
            //Arrange
            var mockCities = new List<City> { new City{
                CityId = 1,
                CityName = "EDMONTON",
                State = "Alberta",
                Country = "Canada",
                Currency = "CAD",
            } };
            _cityRepository.Setup(q => q.GetAllAsync()).Returns(Task.FromResult(mockCities));
            var mockCitiesDto = new List<GetCityDto> { new GetCityDto{
                CityId = 1,
                CityName = "EDMONTON",
                State = "Alberta",
                Country = "Canada",
                Currency = "CAD",
            } };
            _mapper.Setup(m => m.Map<List<GetCityDto>>(It.IsAny<List<City>>())).Returns((List<City> cities) => cities.Select(s => new GetCityDto {
                CityId = s.CityId,
                CityName = s.CityName,
                State = s.State,
                Country = s.Country,
                Currency = s.Currency,
            }).ToList());

            //Act
            var result = await _citiesController.GetCities();

            //Assert
            var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
            var resultValue = okResult.Value.Should().BeOfType<List<GetCityDto>>().Subject;
            resultValue.Count.Should().Be(mockCities.Count);
            resultValue.Should().BeEquivalentTo(mockCitiesDto);
        }

        [Fact]
        public async Task GetyCity_Success()
        {
            //Assert
            var city = new City
            {
                CityId = 1,
                CityName = "EDMONTON",
                State = "Alberta",
                Country = "Canada",
                Currency = "CAD",
            };
            _cityRepository.Setup(q => q.GetAsync(1)).Returns(Task.FromResult(city));
            var cityDto = new GetCityDto 
            {
                CityId = 1,
                CityName = "EDMONTON",
                State = "Alberta",
                Country = "Canada",
                Currency = "CAD",
            };
            _mapper.Setup(m => m.Map<GetCityDto>(It.IsAny<City>())).Returns((City city) => new GetCityDto
            {
                CityId = city.CityId,
                CityName = city.CityName,
                State = city.State,
                Country = city.Country,
                Currency = city.Currency,
            });

            //Act
            var result = await _citiesController.GetCity(1);
            var result2 = await _citiesController.GetCity(2);

            //Assert
            result2.Result.Should().BeOfType<NotFoundResult>();
            var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
            var resultValue = okResult.Value.Should().BeOfType<GetCityDto>().Subject;
            resultValue.Should().BeEquivalentTo(cityDto);
        }

        [Fact]
        public async Task PostCity_Check()
        {
            //Arrange
            var newCityDto = new CreateCityDto
            {
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var newCity = new City
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            _mapper.Setup(m => m.Map<City>(It.IsAny<CreateCityDto>())).Returns((CreateCityDto cityDto) => new City
            {
                CityName = newCity.CityName,
                State = cityDto.State,
                Country = cityDto.Country,
                Currency = cityDto.Currency,
            });
            _cityRepository.Setup(q => q.AddAsync(It.IsAny<City>())).Returns(Task.FromResult(newCity));

            //Act
            var result = await _citiesController.PostCity(newCityDto);

            //Assert
            result.Result.Should().NotBeNull();
            var okResult = result.Result.Should().BeOfType<CreatedAtActionResult>().Subject;
            okResult.Value.Should().BeOfType<City>();
        }

        [Fact]
        public async Task DeleteCity_Check()
        {
            //Arrange
            var city = new City
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            _cityRepository.Setup(q => q.GetAsync(1)).Returns(Task.FromResult(city));
            _cityRepository.Setup(q => q.DeleteAsync(It.IsAny<int>())).Returns(Task.CompletedTask);

            //Act
            var result = await _citiesController.DeleteCity(1);
            var result2 = await _citiesController.DeleteCity(2);

            //Assert
            result.Should().BeOfType<NoContentResult>();
            result2.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task PutCity_Check()
        {
            //Arrange
            var updateCity = new UpdateCityDto
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var updateCity2 = new UpdateCityDto
            {
                CityId = 2,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var city = new City
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            _cityRepository.Setup(q => q.GetAsync(1)).Returns(Task.FromResult(city));
            _cityRepository.Setup(q => q.UpdateAsync(It.IsAny<City>())).Returns(Task.CompletedTask);
            _mapper.Setup(m => m.Map(It.Is<UpdateCityDto>(x => x == updateCity), It.Is<City>(x => x == city))).Returns(city);

            //Act
            var result = await _citiesController.PutCity(1, updateCity);
            var result2 = await _citiesController.PutCity(2, updateCity);
            var result3 = await _citiesController.PutCity(2, updateCity2);

            //Assert
            result.Should().BeOfType<NoContentResult>();
            result2.Should().BeOfType<BadRequestResult>();
            result3.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async Task PutCity_WithDbUpdateConcurrencyException()
        {
            //Arrange
            var updateCity = new UpdateCityDto
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var updateCity2 = new UpdateCityDto
            {
                CityId = 2,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var city = new City
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            _cityRepository.Setup(q => q.GetAsync(It.IsAny<int>())).Returns(Task.FromResult(city));
            _cityRepository.Setup(q => q.UpdateAsync(It.IsAny<City>())).Throws(new DbUpdateConcurrencyException());
            _cityRepository.Setup(q => q.Exists(1)).Returns(Task.FromResult(false));
            _cityRepository.Setup(q => q.Exists(2)).Returns(Task.FromResult(true));
            _mapper.Setup(m => m.Map(It.Is<UpdateCityDto>(x => x == updateCity), It.Is<City>(x => x == city))).Returns(city);

            //Act
            var result = await _citiesController.PutCity(1, updateCity);
            Func<Task> result2 = async() => await _citiesController.PutCity(2, updateCity2);

            //Assert
            result.Should().BeOfType<NotFoundResult>();
            await result2.Should().ThrowAsync<DbUpdateConcurrencyException>();
        }

        [Fact]
        public async Task GetForecast_Check()
        {
            //Arrange
            var city = new City
            {
                CityId = 1,
                CityName = "Test",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            var city2 = new City
            {
                CityId = 2,
                CityName = "",
                State = "Test",
                Country = "Test",
                Currency = "Test",
            };
            _cityRepository.Setup(q => q.GetAsync(1)).Returns(Task.FromResult(city));
            _cityRepository.Setup(q => q.GetAsync(2)).Returns(Task.FromResult(city2));
            _cityRepository.Setup(q => q.GetAsync(4)).Throws(new Exception());

            //Act
            var result = await _citiesController.GetForecast(1);
            var result2 = await _citiesController.GetForecast(2);
            var result3 = await _citiesController.GetForecast(3);
            var result4 = await _citiesController.GetForecast(4);

            //Assert
            result.Should().BeOfType<OkObjectResult>();
            result2.Should().BeOfType<BadRequestObjectResult>();
            result3.Should().BeOfType<NotFoundObjectResult>();
            result4.Should().BeOfType<ObjectResult>();
        }
    }
}
