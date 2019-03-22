---
id: detail-hero
title: Detalle del héroe
sidebar_label: Detalle del héroe
---

## Componentes de detalle

En este momento, HeroesComponent muestra la lista de héroes y los detalles del héroe seleccionado.

Mantener todas las funciones en un componente a medida que la aplicación crezca no se podrá mantener. Querrá dividir los componentes grandes en subcomponentes más pequeños, cada uno centrado en una tarea o flujo de trabajo específico.

En esta página, dará el primer paso en esa dirección al mover los detalles del héroe a un lugar separado y reutilizable HeroDetailComponent.

El componente HeroesComponent unicamente presentará la lista de héroes. El componente HeroDetailComponent presentará los detalles de un héroe seleccionado.

## Crear el HeroDetailComponent

Utilice la CLI angular para generar un nuevo componente llamado hero-detail.
```
ng generate component hero-detail
```

El comando de hace lo siguiente:
- Crea un directorio src/app/hero-detail.
Dentro de ese directorio se generan cuatro archivos:
- Un archivo CSS para los estilos de componentes.
- Un archivo HTML para la plantilla del componente.
- Un archivo de TypeScript con una clase de componente llamado HeroDetailComponent.
- Un archivo de prueba para la clase HeroDetailComponent.

El comando también agrega el HeroDetailComponent como una declaración en el decorador del archivo.@NgModule *src/app/app.module.ts*

### Escribir la plantilla

Corte el HTML para el detalle del héroe desde la parte inferior de la plantilla HeroesComponent y péguelo en la plantilla HeroDetailComponent generada en la plantilla.

Cuando hayas terminado, la plantilla HeroDetailComponent debería verse así:
<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/hero-detail/hero-detail.component.html-->
```
<div *ngIf="hero">

  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </label>
  </div>

</div>
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Añadir la propiedad @Input del héroe

La plantilla HeroDetailComponent se enlaza a la propiedad hero del componente que es de tipo Hero.

Abra el archivo HeroDetailComponent de clase e importe el Hero.
<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/hero-detail/hero-detail.component.ts (import Hero)-->
```
import { Hero } from '../hero';
```
<!--END_DOCUSAURUS_CODE_TABS-->

La propiedad hero debe ser una propiedad de entrada , anotada con el decorador, porque la externa se enlazará de esta manera.@Input() HeroesComponent
```
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

Modifique la declaración @angular/core de importación para incluir el @Input.
<!--DOCUSAURUS_CODE_TABS-->
<!--src/app/hero-detail/hero-detail.component.ts (import Input)-->
```
import { Component, OnInit, Input } from '@angular/core';
```
<!--END_DOCUSAURUS_CODE_TABS-->

Añade una propiedad hero, precedida por el decorador .@Input()
```
@Input() hero: Hero;
```

Ese es el único cambio que debes hacer en la clase HeroDetailComponent. No hay más propiedades. No hay lógica de presentación. Este componente simplemente recibe un objeto héroe a través de su propiedad hero y lo muestra.

## Mostrar el HeroDetailComponent

El HeroesComponent sigue siendo un punto de vista de maestro / detalle.

Solía ​​mostrar los detalles del héroe por su cuenta, antes de cortar esa parte de la plantilla. Ahora delegará en el HeroDetailComponent.

Los dos componentes tendrán una relación padre / hijo. El padre HeroesComponent controlará al niño HeroDetailComponent enviándole un nuevo héroe para que lo muestre cada vez que el usuario seleccione un héroe de la lista.

No cambiarás la HeroesComponent clase pero cambiarás su plantilla .

## Actualizar la plantilla de HeroesComponent

El selector de HeroDetailComponent es 'app-hero-detail'. Agrega un elemento **app-hero-detail**  cerca de la parte inferior de la plantilla HeroesComponent, donde solía estar la vista detallada del héroe.

Enlazar la propiedad HeroesComponent.selectedHero del elemento hero como esta.
<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.html (enlace HeroDetail)-->
```
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```
<!--END_DOCUSAURUS_CODE_TABS-->

[hero]="selectedHero"Es un enlace de propiedad angular .

Es un enlace de datos unidireccional de la propiedad selectedHero del HeroesComponent a la propiedad hero del elemento de destino, que se asigna a la propiedad hero de la HeroDetailComponent.

Ahora cuando el usuario hace clic en un héroe en la lista, los cambios selectedHero. Cuando los cambios selectedHero, el enlace de propiedades se actualiza hero y se HeroDetailComponent muestra el nuevo héroe.

La plantilla HeroesComponent revisada debería tener este aspecto:
```
<h2>My Heroes</h2>

<ul class="heroes">
  <li *ngFor="let hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>

<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

El navegador se actualiza y la aplicación vuelve a funcionar como antes.


## ¿Qué cambió? 

Como antes , cada vez que un usuario hace clic en el nombre de un héroe, el detalle del héroe aparece debajo de la lista de héroes. Ahora el HeroDetailComponent está presentando esos detalles en lugar del HeroesComponent.

La refactorización del original HeroesComponent en dos componentes produce beneficios, tanto ahora como en el futuro:

1. Usted simplificó HeroesComponent, reducción de sus responsabilidades.
2. Puedes convertirlo HeroDetailComponent en un editor de héroe rico sin tocar al padre HeroesComponent.
3. Puedes evolucionar HeroesComponent sin tocar la vista detallada del héroe.
4. Puede volver a utilizar el HeroDetailComponent en la plantilla de algún componente futuro.

## Resumen

- Usted creó un separado, reutilizable HeroDetailComponent.
- Usaste un enlace de propiedad para darle al padre HeroesComponent control sobre el hijo HeroDetailComponent.
- Usaste el decorador @Input para hacer que la propiedad hero esté disponible para ser atada por el externo HeroesComponent.