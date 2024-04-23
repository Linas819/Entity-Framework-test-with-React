using System;
using ReactTest.StarWars;

namespace ReactTest.Models.Requests
{
    public class StarWarsCharacter
    {
        public Character toCharacter(StarWarsCharacter data)
        {
            Character character = new Character
            {
                Name = data.name,
                Height = data.height,
                BirthYear = data.birth_year,
                Gender = data.gender,
                Mass = data.mass
            };
            return character;
        }
        public string name { get; set; }
        public string height { get; set; }
        public string birth_year { get; set; }
        public string gender { get; set; }
        public string mass { get; set; }
    }
}