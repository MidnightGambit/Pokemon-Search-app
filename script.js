// Store each Pokemon once and index both supported search keys.
const pokemonRecords = [
  {
    name: "PIKACHU",
    id: "25",
    weight: 60,
    height: 4,
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
    types: ["ELECTRIC"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    name: "GENGAR",
    id: "94",
    weight: 405,
    height: 15,
    hp: 60,
    attack: 65,
    defense: 60,
    specialAttack: 130,
    specialDefense: 75,
    speed: 110,
    types: ["GHOST", "POISON"],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
  }
];
const pokemonByQuery = new Map();
for (const pokemon of pokemonRecords) {
  pokemonByQuery.set(pokemon.id, pokemon);
  pokemonByQuery.set(pokemon.name.toLowerCase(), pokemon);
}

function clearPokemon() {
  for (const id of [
    "pokemon-name", "pokemon-id", "weight", "height", "hp", "attack",
    "defense", "special-attack", "special-defense", "speed"
  ]) {
    document.getElementById(id).textContent = "";
  }
  document.getElementById("types").innerHTML = "";
  const sprite = document.getElementById("sprite");
  sprite.style.display = "none";
  sprite.removeAttribute("src");
  sprite.alt = "";
}

function searchPokemon() {
  const input = document.getElementById("search-input").value.trim().toLowerCase();
  if (!input) {
    alert("Please enter a Pokémon name or ID.");
    return;
  }
  clearPokemon();
  const pokemon = pokemonByQuery.get(input);
  const typesElement = document.getElementById("types");
  if (pokemon) {
    // Populate the Pokémon data in the UI
    document.getElementById("pokemon-name").textContent = pokemon.name;
    document.getElementById("pokemon-id").textContent = `#${pokemon.id}`;
    document.getElementById("weight").textContent = `Weight: ${pokemon.weight}`;
    document.getElementById("height").textContent = `Height: ${pokemon.height}`;
    document.getElementById("hp").textContent = `${pokemon.hp}`;
    document.getElementById("attack").textContent = `${pokemon.attack}`;
    document.getElementById("defense").textContent = `${pokemon.defense}`;
    document.getElementById("special-attack").textContent = `${pokemon.specialAttack}`;
    document.getElementById("special-defense").textContent = `${pokemon.specialDefense}`;
    document.getElementById("speed").textContent = `${pokemon.speed}`;

    // Display types
    pokemon.types.forEach(type => {
      const typeElement = document.createElement("div");
      typeElement.className = "type";
      typeElement.textContent = type;
      typesElement.appendChild(typeElement);
    });

    // Show the sprite
    const spriteImg = document.getElementById("sprite");
    spriteImg.src = pokemon.sprite;
    spriteImg.alt = pokemon.name;
    spriteImg.style.display = "block"; // Show the sprite image
  } else {
    // If Pokémon not found, alert the user
    alert("Pokémon not found");
  }
}

document.getElementById("search-button").addEventListener("click", searchPokemon);
