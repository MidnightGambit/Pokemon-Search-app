# Pokemon-Search-app

The Pokémon Search Application enables users to locate Pokémon by inputting either a name or an identification number. Once the search button is activated, the application presents details such as the Pokémon's name, ID, weight, height, statistics, types, and an accompanying image. At present, the application accommodates two Pokémon, namely Pikachu and Gengar, and it notifies the user if the entered information does not correspond to any available Pokémon.


## Structure

- `index.html`: search controls and result fields.
- `style.css`: page styling.
- `script.js`: one record per Pokemon, a name/ID lookup index, and result rendering.
- `script.test.cjs`: dependency-free regression tests using Node's built-in runner and a small DOM stub.

## Development workflow

1. Use Node.js 22 or newer. No `npm install` step is needed.
2. Run `npm run check` before opening a pull request. It checks JavaScript syntax and runs the regression suite.
3. Serve this directory with a static server (for example `python3 -m http.server 8000`), then open `http://localhost:8000`.
4. In a browser, check `pikachu`, `25`, `gengar`, `94`, and an unknown query after a successful result.
5. When adding a Pokemon, add one entry to `pokemonRecords` and a regression case; its name and ID are indexed automatically.

The tests cover search normalization, both supported Pokemon by name and ID, all stats, stale results, inherited object keys, type replacement, and the stylesheet path. They do not replace a real-browser check or verify external sprite availability. No hosted CI workflow is included.
