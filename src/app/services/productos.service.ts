import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// interfaces
import { Producto } from "../interfaces/producto.interface";
import { promise } from "protractor";
import { resolve } from "dns";

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get("https://angular-html-be371.firebaseio.com/productos_idx.json")
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          console.log("cargó productos");
          resolve();
          setTimeout(() => {
            this.cargando = false;
          }, 3000);
        });
    });
  }

  public getProducto(id: string) {
    return this.http.get(
      `https://angular-html-be371.firebaseio.com/productos/${id}.json`
    );
  }

  public buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
        console.log("regresó la promesa");
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(palabra: string) {
    palabra = palabra.toLowerCase();
    this.productosFiltrados = [];
    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLowerCase();
      const categoriaLower = prod.categoria.toLowerCase();
      if (
        categoriaLower.indexOf(palabra) >= 0 ||
        tituloLower.indexOf(palabra) >= 0
      ) {
        this.productosFiltrados.push(prod);
      }
    });
    console.log(this.productosFiltrados);
  }
}
