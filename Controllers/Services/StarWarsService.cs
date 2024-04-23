using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ReactTest.Models.Requests;

namespace ReactTest.Services
{
    public class StarWarsService
    {
        public class CharacterLinks
        {
            public string[] characters { get; set; }
        }
        public async Task<string[]> GetStarWarsData()
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync("https://swapi.dev/api/films/1/");
            string responseBody = await response.Content.ReadAsStringAsync();
            var links = JsonConvert.DeserializeObject<CharacterLinks>(responseBody);
            return links.characters;
        }

        public async Task<StarWarsCharacter> GetCharacterData(string url)
        {
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            string responseBody = await response.Content.ReadAsStringAsync();
            StarWarsCharacter character = JsonConvert.DeserializeObject<StarWarsCharacter>(responseBody);
            return character;
        }
    }
}