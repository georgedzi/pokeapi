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

  private pokemons: Pokemon[];
  private filterPokemon: Pokemon[];
  public loadPokemon: Pokemon[];
  private searchTerms = new Subject<string>();
  private cutAmount = 21;

  ngOnInit() {
    this.getPokemons();

    this.searchTerms.pipe(

      debounceTime(500),
      
      distinctUntilChanged(),

      switchMap((term: string) => {
        const searcher = new FuzzySearch(this.pokemons, ['name'], {
          sort: true
        });

        this.filterPokemon = searcher.search(term);
        return this.loadPokemon = this.filterPokemon
          .slice(0, this.cutAmount)
          .map(pokemon => { pokemon.getPrimaryColor(); return pokemon });
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
    const searcher = new FuzzySearch(this.pokemons, ['name'], {
      sort: true
    });

    this.filterPokemon = searcher.search(term);
    this.loadPokemon = this.filterPokemon
      .slice(0, this.cutAmount)
      .map(pokemon => { pokemon.getPrimaryColor(); return pokemon });
  }

  getPokemons(): void {

    this.pokemonSerive.getPokemons()
      .subscribe(pokemon => {
        this.pokemons = pokemon;
        this.filterPokemon = pokemon;
        this.loadPokemon = pokemon
          .slice(0, this.cutAmount)
          .map(pokemon => { pokemon.getPrimaryColor(); return pokemon });
      });
  }

  onScrollDown() {
    this.loadPokemon = this.loadPokemon
      .concat(this.filterPokemon
        .slice(this.loadPokemon.length, this.loadPokemon.length + this.cutAmount)
        .map(pokemon => { pokemon.getPrimaryColor(); return pokemon }));
  }

}
