---
id: list-hero
title: Lista de héroes
sidebar_label: Lista de héroes
---

## Mostrar una lista de héroes

En esta página, expandirás la aplicación Tour of Heroes para mostrar una lista de héroes y permitir a los usuarios seleccionar un héroe y mostrar los detalles del héroe.

## Crear héroes simulados

Necesitarás algunos héroes para mostrar.

Eventualmente los obtendrás de un servidor de datos remoto. Por ahora, crearás algunos héroes simulados y fingirás que provienen del servidor.

Crea un archivo llamado **mock-heroes.ts** en la carpeta *src/app/*. Define una constante HEROES como una matriz de diez héroes y expórtala. El archivo debería verse así.

<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/mock-heroes.ts-->
```
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Mostrando héroes

Estás a punto de mostrar la lista de héroes en la parte superior de la HeroesComponent.

Abre el archivo HeroesComponent de clase e importa el simulacro HEROES.

<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/heroes/heroes.component.ts (import HEROES)-->
```
import { HEROES } from '../mock-heroes';
```
<!--END_DOCUSAURUS_CODE_TABS-->

En el mismo archivo (clase HeroesComponent), defina una propiedad de componente llamada heroes para exponer la matriz HEROES para el enlace.
```
export class HeroesComponent implements OnInit {

  heroes = HEROES;
```

## Lista de héroes con *ngFor

Abra el archivo HeroesComponent de plantilla y realice los siguientes cambios:
- Añadir un elemento **h2** en la parte superior,
- Debajo de esto, agregue una lista HTML desordenada (**ul**)
- Insertar un elemento **li** dentro del **ul** que muestra las propiedades de un hero.
- Espolvoree algunas clases de CSS para el estilo (en breve agregará los estilos CSS).

Haz que se vea así:
<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (heroes template)-->
```
<h2>My Heroes</h2>
<ul class="heroes">
  <li>
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```
<!--END_DOCUSAURUS_CODE_TABS-->

Ahora cambia el elemento **i** a esto:
```
<li *ngFor="let hero of heroes">
```

El *ngFor es una directiva de angular repetidora. Repite el elemento host para cada elemento en una lista.

En este ejemplo
- **li** es el elemento host
- heroes es la lista de la clase HeroesComponent
- hero contiene el objeto de héroe actual para cada iteración a través de la lista.

> No olvides el asterisco (*) delante de ngFor. Es una parte crítica de la sintaxis.

Después de que el navegador se actualiza, aparece la lista de héroes.

### Estilo de los héroes

La lista de héroes debe ser atractiva y debe responder visualmente cuando los usuarios se desplazan y seleccionan un héroe de la lista.

<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/heroes/heroes.component.css -->
```
/* HeroesComponent's private CSS styles */
.selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Maestro / Detalle

Cuando el usuario hace clic en un héroe en la lista maestra , el componente debe mostrar los detalles del héroe seleccionado en la parte inferior de la página.

En esta sección, escuchará el evento de clic del elemento héroe y actualizará los detalles del héroe.

### Añadir un enlace de evento de clic

Agrega un enlace de evento de clic a **li** este como:
<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (template excerpt)-->
```
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```
<!--END_DOCUSAURUS_CODE_TABS-->

Este es un ejemplo de la sintaxis de enlace de eventos de Angular .

Los paréntesis alrededor le click dicen a Angular que escuche el evento click del elemento **li**. Cuando el usuario hace clic en **li**, Angular ejecuta la expresión onSelect(hero).

onSelect() Es un método HeroesComponent que estás a punto de escribir. Angular lo llama con el hero objeto mostrado en el clic **li**, el mismo hero definido previamente en la expresión ***ngFor**

### Añadir el controlador de eventos de clic

Cambie el nombre de la propiedad hero del componente a selectedHero pero no la asigne. No hay héroe seleccionado cuando se inicia la aplicación.

Agregue el siguiente método onSelect(), que asigna el héroe seleccionado de la plantilla a los componentes selectedHero.

<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/heroes/heroes.component.ts (onSelect)-->
```
selectedHero: Hero;
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Actualizar la plantilla de detalles

La plantilla aún se refiere a la antigua propiedad hero del componente que ya no existe. Renombrar hero a selectedHero.

<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (selected hero details)-->
```
<h2>{{selectedHero.name | uppercase}} Details</h2>
<div><span>id: </span>{{selectedHero.id}}</div>
<div>
  <label>name:
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </label>
</div>
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Ocultar detalles vacios con *ngIf

Después de que el navegador se actualiza, la aplicación se rompe.
Abra las herramientas de desarrollo del navegador y busque en la consola un mensaje de error como este:
```
HeroesComponent.html:3 ERROR TypeError: Cannot read property 'name' of undefined
```

Ahora haga clic en uno de los elementos de la lista. La aplicación parece estar funcionando de nuevo. Los héroes aparecen en una lista y los detalles sobre el héroe seleccionado aparecen en la parte inferior de la página.

¿Que pasó? 
Cuando se inicia la aplicación, selectedHeroes undefined por diseño .
Encuadernación expresiones en la plantilla que se refieren a propiedades de selectedHero- expresiones como {{selectedHero.name}} - debe fallar porque no hay ningún héroe seleccionado.

La corrección

El componente solo debería mostrar los detalles del héroe seleccionado si selectedHeroexiste.
Envuelve el detalle del héroe HTML en un archivo **div**. Agrega la directiva de Angular a y configúralo en *ngIf **div** selectedHero

> No olvides el asterisco (*) delante de ngIf. Es una parte crítica de la sintaxis.

<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/heroes/heroes.component.html (*ngIf)-->
```
<div *ngIf="selectedHero">

  <h2>{{selectedHero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="selectedHero.name" placeholder="name"/>
    </label>
  </div>

</div>
```
<!--END_DOCUSAURUS_CODE_TABS-->

Después de que el navegador se actualiza, la lista de nombres vuelve a aparecer. El área de detalles está en blanco. Haga clic en un héroe y sus detalles aparecen.

¿Por qué funciona ?

Cuando selectedHero no está definido, ngIf elimina el detalle del héroe del DOM. No hay  ataduras de selectedHero de las que preocuparse.
Cuando el usuario elige un héroe, selectedHero tiene un valor y ngIf coloca el detalle del héroe en el DOM.

### Estilo del héroe seleccionado

Es difícil identificar al héroe seleccionado en la lista cuando todos los elementos **li** se parecen.

Si el usuario hace clic en "Magneta", ese héroe debe renderizar con un color de fondo distintivo pero sutil como este:

El coloreado del héroe seleccionado es el trabajo de la clase CSS .selected en los estilos que agregaste anteriormente . Solo tiene que aplicar la clase .selected al **li** cuando el usuario haga clic en ella.

<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (toggle the 'selected' CSS class)-->
```
[class.selected]="hero === selectedHero"
```
<!--END_DOCUSAURUS_CODE_TABS-->

Cuando el héroe de la fila actual es el mismo que el selectedHero, Angular agrega la selected clase CSS. Cuando los dos héroes son diferentes, Angular elimina la clase.

El acabado **li** se ve así:

<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (list item hero)-->
```
<li *ngFor="let hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```
<!--END_DOCUSAURUS_CODE_TABS-->


## Resumen
- La aplicación Tour of Heroes muestra una lista de héroes en una vista Maestro / Detalle.
- El usuario puede seleccionar un héroe y ver los detalles de ese héroe.
- Solías mostrar una lista.*ngFor
- Que utilizó para incluir o excluir condicionalmente un bloque de HTML.*ngIf
- Puede alternar una clase de estilo CSS con un classenlace.



















