import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductosService } from "../../services/productos.service";
import { PaginaProducto } from "../../interfaces/pagina-prod.interface";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  itemCargando = true;
  producto: PaginaProducto;
  id: string;

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      this.productoService
        .getProducto(parametros.id)
        .subscribe((producto: PaginaProducto) => {
          this.id = parametros.id;
          this.producto = producto;
          setTimeout(() => {
            this.itemCargando = false;
          }, 1000);
        });
    });
  }
}
