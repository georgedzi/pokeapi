import { stringify } from '@angular/compiler/src/util';

export class Pokemon {
    id: string;
    name: string;
    url: string;
    imageURL: string;
  
    static parse(data, index) {
      let pokemon = Object.assign(new Pokemon(), data);
      pokemon.getId(index);
      pokemon.getImageUrl();
      pokemon.capitilizeName();
      return pokemon;
    }
  
    getId(index) {
    //   const url = this.url;
    //   if (this.url) {
    //     const reg = this.url.match('([0-9]+)\/$');
    //     this.id = reg[1];
    //   }

        this.id = index + 1;
    }
  
    getImageUrl() {
      this.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png";
    }

    capitilizeName(){
        this.name = this.name[0].toUpperCase() + this.name.slice(1);
    }
  }