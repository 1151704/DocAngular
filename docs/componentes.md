---
id: componentes
title: Componentes
sidebar_label: Componentes
---

## Componentes en Angular 

Los componentes son los elementos fundamentales de las aplicaciones con angular. Muestran datos en la pantalla, escuchan las eventos del usuario y toman medidas en función de esa entrada.

## Componente raiz

Como parte de la aplicación inicial, la Angular-CLI creó el primer componente angular para usted. Es el componente raíz, y se nombra app-root.

1.  Localiza el componente en la siguiente dirección: ./src/app/app.component.ts
2.  Cambiar la title propiedad de 'mi-primer-proyecto'a 'Mi Primer Aplicación Angular!'.
```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Primer Aplicación Angular!';
}
```
El navegador se vuelve a cargar automáticamente con el título revisado. Eso está bien, pero podría verse mejor.
3.  Abre ./src/app/app.component.css y dale un poco de estilo al componente.
```
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```
![](/img/angular-componente.png)
