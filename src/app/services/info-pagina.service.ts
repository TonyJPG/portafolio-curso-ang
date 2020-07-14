import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfoPagina } from "../interfaces/info-pagina.interface";

@Injectable({
  providedIn: "root",
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = 0;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http
      .get("assets/data/data-pagina.json")
      .subscribe((resp: InfoPagina) => {
        setTimeout(() => {
          this.cargada++;
          this.info = resp;
        }, 1000);
      });
  }

  private cargarEquipo() {
    this.http
      .get("https://angular-html-be371.firebaseio.com/equipo.json")
      .subscribe((resp: any[]) => {
        setTimeout(() => {
          this.cargada++;
          this.equipo = resp;
        }, 3000);
      });
  }
}
