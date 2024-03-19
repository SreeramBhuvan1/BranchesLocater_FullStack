using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task1.Contracts;
using Task1.Data;
using Task1.Models.City;
using Task1.Repository;

namespace Task1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly IMapper _mapper;  
        private readonly ICityRepository _cityRepository;
        private readonly HttpClient _client;
        public CitiesController(IMapper mapper, ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;

            _mapper = mapper;
            _client = new HttpClient();
            _client.BaseAddress = new Uri("http://api.weatherapi.com/v1/current.json");
        }

        // GET: api/Cities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCityDto>>> GetCities()
        {
            var cities = await _cityRepository.GetAllAsync();
            var records = _mapper.Map<List<GetCityDto>>(cities);
            return Ok(records);
        }

        // GET: api/Cities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCityDto>> GetCity(int id)
        {
            var city = await _cityRepository.GetAsync(id);

            if (city == null)
            {
                return NotFound();
            }
            var cityDetails = _mapper.Map<GetCityDto>(city);
            return Ok(cityDetails);
        }

        [HttpGet("{id}/weather")]
        public async Task<IActionResult> GetForecast(int id)
        {
            try
            {
                var city = await _cityRepository.GetAsync(id);
                if(city == null)
                {
                    return NotFound("CityId does not exist");
                }
                HttpResponseMessage response = await _client.GetAsync($"?key=e08165481634422b8df72421242702&q={city.CityName}");

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    var resultJson = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
                    return Ok(resultJson);
                }
                else
                {
                    return BadRequest("Failed to get data");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // PUT: api/Cities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutCity(int id, UpdateCityDto updateCity)
        {
            if (id != updateCity.CityId)
            {
                return BadRequest();
            }
            var city = await _cityRepository.GetAsync(id);
            if (city == null)
            {
                return NotFound();
            }
            _mapper.Map(updateCity, city);

            try
            {
                await _cityRepository.UpdateAsync(city);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<City>> PostCity(CreateCityDto createCity)
        {
            var city = _mapper.Map<City>(createCity);
            await _cityRepository.AddAsync(city);

            return CreatedAtAction("GetCity", new { id = city.CityId }, city);
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        [Authorize(Roles ="Administrator")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _cityRepository.GetAsync(id);
            if (city == null)
            {
                return NotFound();
            }

            await _cityRepository.DeleteAsync(id);

            return NoContent();
        }

        private async Task<bool> CityExists(int id)
        {
            return await _cityRepository.Exists(id);
        }
    }
}
