import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Pokemon } from 'app/shared/classes/pokemon/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPokemons(): Observable<Pokemon []> {
    return this.http.get<Pokemon []>(`${this.pokemonUrl}?offset=0&limit=807`)
    .pipe(
      map(res => res['results'].map((pokemon, index) => Pokemon.parse(pokemon, index))),
      catchError(this.handleError<Pokemon []>('getPokemons', []))
    );
  }
}
