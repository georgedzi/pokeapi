import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'app/shared/classes/pokemon/pokemon';
import { PokemonService } from 'app/shared/services/pokemon/pokemon.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import FuzzySearch from 'fuzzy-search'

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  constructor(private pokemonSerive: PokemonService) { }

  private allPokemon: Pokemon[];
  private fuzzSearchedPokemon: Pokemon[];
  public displayedPokemon: Pokemon[];
  private searchTerms = new Subject<string>();
  private loadPokemonAmount = 25;

  ngOnInit() {
    this.getPokemons();

    this.searchTerms
      .pipe(debounceTime(50))
      .subscribe((pokemonName) => this.fuzzySearchPokemon(pokemonName))
  }

  searchPokemon(pokemonName: string): void {
    this.searchTerms.next(pokemonName);
  }

  getPokemons(): void {
    this.pokemonSerive.getPokemons()
      .subscribe(pokemon => this.fillPokemonArrays(pokemon));
  }

  fuzzySearchPokemon(pokemonName: string) {
    const pokemonFuzzySearcher = new FuzzySearch(this.allPokemon, ['name'], {
      sort: true
    });

    this.fuzzSearchedPokemon = pokemonFuzzySearcher.search(pokemonName);
    this.loadPokemon();
  }

  fillPokemonArrays(pokemon: Pokemon[]) {
    this.allPokemon = pokemon;
    this.fuzzSearchedPokemon = pokemon;
    this.loadPokemon();
  }

  loadPokemon() {
    this.displayedPokemon = this.displayedPokemon
      .concat(this.fuzzSearchedPokemon
        .slice(this.displayedPokemon.length, this.displayedPokemon.length + this.loadPokemonAmount)
        .map(pokemon => { pokemon.getPrimaryColor(); return pokemon }));
  }

}
