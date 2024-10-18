document.getElementById("search-button").addEventListener("click", function() {
  const input = document.getElementById("search-input").value.trim().toLowerCase();
  const PIKACHU_ID = "25";
  const GENGAR_ID = "94";
  const PIKACHU_NAME = "pikachu";
  const GENGAR_NAME = "gengar";

  console.log("Input value: ", input); // Debugging

  // Check if input is empty
  if (!input) {
    alert("Please enter a Pokémon name or ID.");
    return; // Stop execution if input is empty
  }

  // Convert the input to a number if it's numeric, otherwise keep it as a string
  const numericInput = !isNaN(input) ? input : null;

  const pokemonInfo = {
    [PIKACHU_NAME]: {
      name: "PIKACHU",
      id: PIKACHU_ID,
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
    [PIKACHU_ID]: {
      name: "PIKACHU",
      id: PIKACHU_ID,
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
    [GENGAR_ID]: {
      name: "GENGAR",
      id: GENGAR_ID,
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
  };

  // Clear previous types and image
  const typesElement = document.getElementById("types");
  typesElement.innerHTML = '';  // Clear previous types
  document.getElementById("sprite").style.display = "none"; // Hide the sprite initially

  // Check if input matches a Pokémon by name or ID (string or numeric input)
  const pokemon = pokemonInfo[numericInput] || pokemonInfo[input];
  if (pokemon) {
    // Populate the Pokémon data in the UI
    console.log("Setting Pokémon data:", pokemon); // Debugging line
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
    spriteImg.style.display = "block"; // Show the sprite image
  } else {
    // If Pokémon not found, alert the user
    alert("Pokémon not found");
  }
});
