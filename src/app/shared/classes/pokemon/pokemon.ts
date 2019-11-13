import Vibrant from 'node-vibrant';

export class Pokemon {
  id: string;
  name: string;
  url: string;
  imageURL: string;
  palleteColor: {};

  static parse(data, index) {
    const pokemon = Object.assign(new Pokemon(), data);
    pokemon.getId(index);
    pokemon.getImageUrl();
    pokemon.capitilizeName();
    pokemon.getPrimaryColor();
    return pokemon;
  }

  getId(index) {
    this.id = index + 1;
  }

  getImageUrl() {
    this.imageURL =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
      this.id +
      '.png';
  }

  capitilizeName() {
    this.name = this.name[0].toUpperCase() + this.name.slice(1);
  }

  getPrimaryColor() {
    Vibrant.from(this.imageURL).getPalette((err, palette) => {
      this.palleteColor = {
        'background-color' : this.name === 'Ivysaur' ? `${palette.Muted.getHex()}` : `${palette.LightVibrant.getHex()}`
      };
    });
  }
}
