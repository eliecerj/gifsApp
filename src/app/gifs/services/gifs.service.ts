import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'r5W7nUZc5vPz8NEakgUSFZIbp19pnPNK';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [... this._historial]; //romper la referencia ...
  }

  constructor(private http: HttpClient ) {}
  
  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes (query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=r5W7nUZc5vPz8NEakgUSFZIbp19pnPNK&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log('resp', resp.data);
        this.resultados = resp.data;
        
      })

    console.log(this._historial);
    
  }

}
