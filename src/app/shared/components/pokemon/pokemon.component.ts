import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'app/shared/classes/pokemon/pokemon';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  @Input() pokemon: Pokemon;

  styleContainer() {
    return this.pokemon.palleteColor;
  }

}
