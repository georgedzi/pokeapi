import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'app/shared/classes/pokemon/pokemon';
import { PokemonService } from 'app/shared/services/pokemon/pokemon.service';
import FuzzySearch from 'fuzzy-search'

import { Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

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
      .subscribe(pokemon => {
        this.allPokemon = pokemon;
        this.fuzzSearchedPokemon = pokemon;
        this.displayedPokemon = pokemon
          .slice(0, this.loadPokemonAmount)
          .map(pokemon => { pokemon.getPrimaryColor(); return pokemon });
      });
  }

  onScrollDown() {
    this.displayedPokemon = this.displayedPokemon
      .concat(this.fuzzSearchedPokemon
        .slice(this.displayedPokemon.length, this.displayedPokemon.length + this.loadPokemonAmount)
        .map(pokemon => { pokemon.getPrimaryColor(); return pokemon }));
  }

  fuzzySearchPokemon(pokemonName) {
    const searcher = new FuzzySearch(this.allPokemon, ['name'], {
      sort: true
    });

    this.fuzzSearchedPokemon = searcher.search(pokemonName);
    this.displayedPokemon = this.fuzzSearchedPokemon
      .slice(0, this.loadPokemonAmount)
      .map(pokemon => { pokemon.getPrimaryColor(); return pokemon });
  }

}
