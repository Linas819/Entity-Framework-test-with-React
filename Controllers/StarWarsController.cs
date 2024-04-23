using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactTest.Models.Requests;
using ReactTest.Services;
using ReactTest.StarWars;

namespace ReactTest.Controllers
{
    [Route("api/[controller]")]
    public class StarWarsController : Controller
    {
        private starwarsContext starWarsContext;
        private StarWarsService starWars;
        public StarWarsController(StarWarsService starWars, starwarsContext starWarsContext)
        {
            this.starWars = starWars;
            this.starWarsContext = starWarsContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetStarWarsData() // async ir await naudojamas tik kai kreipias i nuoroda. Duomenu bazei to nereikia
        {
            List<StarWarsCharacter> characters = new List<StarWarsCharacter>();
            string[] links = await starWars.GetStarWarsData();
            foreach(string link in links)
            {
                characters.Add( await starWars.GetCharacterData(link));
            }
            return(Ok(new{
                Success = true,
                Data = characters
            }));
        }
        [HttpPost]
        public IActionResult PostStarWarsData([FromBody] List<StarWarsCharacter> data)
        {
            foreach(var item in data)
            {
                Character character = item.toCharacter(item);
                starWarsContext.Characters.Add(character);
            }
            try {
                starWarsContext.SaveChanges();
            } catch (Exception ex) {
                return(Ok(new {
                Success = false,
                Message = ex.Message
            }));
            }
            return(Ok(new {
                Success = true
            }));
        }
        [HttpGet]
        [Route("gender")]
        public IActionResult GetGenderCharacters(string gender)
        {
            var characters = starWarsContext.Characters.Where(x => x.Gender == gender).ToList(); //one type querry
            var reverseCharacers = (from character in starWarsContext.Characters //another type querry
                where character.Gender != gender
                select new StarWarsCharacter{
                    name = character.Name,
                    height = character.Height,
                    mass = character.Mass,
                    birth_year = character.BirthYear,
                    gender = character.Gender
                }).ToList();
            return(Ok(new{
                Success = true,
                Data = characters
            }));
        }
    }
}

