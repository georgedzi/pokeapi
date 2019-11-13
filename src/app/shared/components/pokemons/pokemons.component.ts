import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'app/shared/classes/pokemon/pokemon';
import { PokemonService } from 'app/shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  constructor(private pokemonSerive: PokemonService) { }

  public pokemons: Pokemon[];


  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonSerive.getPokemons()
      .subscribe(pokemon => this.pokemons = pokemon);
  }

}
