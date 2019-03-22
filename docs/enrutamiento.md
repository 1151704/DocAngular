---
id: routing
title: Enrutamiento
sidebar_label: Enrutamiento
---

## Enrutamiento

Hay nuevos requisitos para la aplicación Tour of Heroes:

-   Añadir una vista de panel de control.
-   Añade la capacidad de navegar entre las vistas Héroes y Tablero .
-   Cuando los usuarios hagan clic en el nombre de un héroe en cualquiera de las vistas, navegue a una vista detallada del héroe seleccionado.
-   Cuando los usuarios hagan clic en un vínculo profundo en un correo electrónico, abra la vista detallada para un héroe en particular.

Cuando hayas terminado, los usuarios podrán navegar por la aplicación de esta manera:
![Enrutamiento](/img/final.png)

## Agregar el AppRoutingModule

En Angular, la mejor práctica es cargar y configurar el enrutador en un módulo separado de nivel superior dedicado al enrutamiento e importado por la raíz AppModule.

Por convención, el nombre de la clase del módulo es AppRoutingModule y pertenece *app-routing.module.ts* a la carpeta *src/app*.

Usa el CLI para generarlo.
```
ng generate module app-routing --flat --module=app
```
> --flat coloca el archivo en lugar src/app de su propia carpeta. 
>
> --module=app le dice a la CLI que lo registre en la matriz de imports de AppModule.

The generated file looks like this:

<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / app-routing.module.ts (generado)-->
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
```
<!--END_DOCUSAURUS_CODE_TABS-->

Por lo general, no declara los componentes en un módulo de enrutamiento, por lo que también puede eliminar la matriz @NgModule.declarations  y eliminar las referencias de CommonModule tambie.

Configurará el enrutador Routesen la RouterModule forma de importar esos dos símbolos de la biblioteca @angular/router.

Añadir una matriz @NgModule.exports con RouterModule en él. Exportando RouterModule hace que las directivas de enrutador estén disponibles para su uso en el AppModule los componentes que las necesitarán.

AppRoutingModule se ve así ahora
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / app-routing.module.ts (v1) -->
```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Agregar rutas

Las rutas le indican al enrutador qué vista mostrar cuando un usuario hace clic en un enlace o pega una URL en la barra de direcciones del navegador.

Un Angular típico Routetiene dos propiedades:

1.  path: una cadena que coincide con la URL en la barra de direcciones del navegador.
2.  component: el componente que el enrutador debe crear al navegar a esta ruta.

Tiene la intención de navegar a HeroesComponentcuando la URL es algo así localhost:4200/heroes.

Importa el HeroesComponentpara que puedas referenciarlo en un archivo Route. Luego, defina una matriz de rutas con un solo routecomponente para ese componente.
```
import { HeroesComponent }      from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];
```

Una vez que hayas terminado de configurar, el enrutador hará coincidir esa URL path: 'heroes' y mostrará el HeroesComponent.

### RouterModule.forRoot ()

Primero debe inicializar el enrutador y comenzar a escuchar los cambios de ubicación del navegador.

Agregue RouterModule a la matriz @NgModule.imports y configúrela con el routes en un solo paso llamando RouterModule.forRoot() dentro de la matriz de imports, como esto: 
```
imports: [ RouterModule.forRoot(routes) ],
```

> Se llama al método forRoot()porque configura el enrutador en el nivel raíz de la aplicación. El forRoot()método proporciona los proveedores de servicios y las directivas necesarias para el enrutamiento y realiza la navegación inicial según la URL del navegador actual.


## Añadir RouterOutlet

Abra la plantilla AppComponent reemplace el elemento *app-heroes* con un elemento *router-outlet*.
```
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

Se eliminó *app-heroes* porque solo se mostrará HeroesComponent cuando el usuario navegue hacia él.

El *router-outlet* Le indica al enrutador dónde mostrar las vistas enrutadas.

> El RouterOutlet es una de las directivas de router que ahora están disponibles para las AppComponent PORQUE AppModule importa AppRoutingModule que exportaron RouterModule.

Pruébalo 

Todavía debe estar ejecutando con este comando CLI.
```
ng serve
```
El navegador debe actualizar y mostrar el título de la aplicación, pero no la lista de héroes.

Mira la barra de direcciones del navegador. La URL termina en /. El camino a la ruta HeroesComponentes /heroes.

Adjuntar /heroes a la URL en la barra de direcciones del navegador. Deberías ver la vista de maestro / detalle de los héroes familiares.

## Añadir un enlace de navegación ( routerLink) 

Los usuarios no deberían tener que pegar una URL de ruta en la barra de direcciones. Deben poder hacer clic en un enlace para navegar.

Agregue un elemento **nav** y, dentro de eso, un elemento de anclaje que, al hacer clic, active la navegación hacia HeroesComponent. La plantilla AppComponent revisada se ve así:

Un routerLinkatributo se establece en "/heroes", la cadena con la que el enrutador coincide con la ruta HeroesComponent. El routerLinkes el selector para la directiva RouterLink que convierte los clics del usuario en navegaciones del enrutador. Es otra de las directivas publicas en el RouterModule.

El navegador actualiza y muestra el título de la aplicación y el enlace de los héroes, pero no la lista de héroes.

Haga clic en el enlace. La barra de direcciones se actualiza /heroes y aparece la lista de héroes.

> Haga que este y los futuros enlaces de navegación se vean mejor agregando estilos de CSS privados app.component.css como se indica en la revisión final del código a continuación.
```
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607d8b;
}
nav a:hover {
  color: #039be5;
  background-color: #cfd8dc;
}
nav a.active {
  color: #039be5;
}
```

## Añadir una vista de panel de control

El enrutamiento tiene más sentido cuando hay varias vistas. Hasta el momento sólo hay vista de los héroes.

Agregue un DashboardComponent usando el CLI:
```
ng generate component dashboard
```

El CLI genera los archivos para DashboardComponent y lo declara en AppModule.

Reemplace el contenido del archivo predeterminado en estos tres archivos de la siguiente manera y luego vuelva para una pequeña discusión:


<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / dashboard / dashboard.component.html-->
```
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>
```
<!--src / app / dashboard / dashboard.component.ts-->
```
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
```
<!-- src / app / dashboard / dashboard.component.css -->
```
/* DashboardComponent's private CSS styles */
[class*='col-'] {
  float: left;
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
a {
  text-decoration: none;
}
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h3 {
  text-align: center;
  margin-bottom: 0;
}
h4 {
  position: relative;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607d8b;
  border-radius: 2px;
}
.module:hover {
  background-color: #eee;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px; }
}
@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->


La plantilla presenta una cuadrícula de enlaces de nombre de héroe.
- El repetidor *ngFor crea tantos enlaces como están en la matriz del componente heroes
- Los enlaces están diseñados como bloques de colores por el dashboard.component.css.
- Los enlaces no van a ninguna parte todavía, pero lo harán en breve .

La clase es similar a la clase HeroesComponent.
- Define una propiedad de matriz de heroes.
- El constructor espera que Angular inyecte el HeroService en una propiedad privada heroService .
- El ngOnInit() gancho del ciclo de vida llama getHeroes.

Esto getHeroes devuelve la lista dividida de héroes en las posiciones 1 y 5, devolviendo solo cuatro de los mejores héroes (2º, 3º, 4º y 5º).
```
getHeroes(): void {
  this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
}
```

##  Añadir el panel de control

Para navegar hacia el panel de control, el enrutador necesita una ruta adecuada.

Importar el DashboardComponent en el AppRoutingModule.
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / app-routing.module.ts (importar DashboardComponent)-->
```
import { DashboardComponent }   from './dashboard/dashboard.component';
```
<!--END_DOCUSAURUS_CODE_TABS-->

Agregue una ruta a la matriz AppRoutingModule.routes que coincida con una ruta al DashboardComponent.
```
{ path: 'dashboard', component: DashboardComponent },
```

### Añadir ruta por defecto

Cuando se inicia la aplicación, la barra de direcciones del navegador apunta a la raíz del sitio web. Eso no coincide con ninguna ruta existente, por lo que el enrutador no navega a ningún lado. El espacio debajo de **router-outlet** está en blanco.

Para hacer que la aplicación navegue automáticamente al panel de control, agregue la siguiente ruta a la matriz AppRoutingModule.Routes.
```
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
```

Esta ruta redirige una URL que coincide completamente con la ruta vacía a la ruta cuya ruta es '/dashboard'.

Una vez que se actualiza el navegador, el enrutador carga DashboardComponent y la barra de direcciones del navegador muestra la URL /dashboard.


### Añadir enlace al panel

El usuario debe poder navegar hacia adelante y hacia atrás entre DashboardComponent y HeroesComponent haciendo clic en los enlaces en el área de navegación cerca de la parte superior de la página.

Agrega un enlace de navegación del panel a la plantilla AppComponent, justo encima del enlace Héroes.
```
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

Después de que el navegador se actualice, puede navegar libremente entre las dos vistas haciendo clic en los enlaces.


## Navegando a los detalles del héroe

La HeroDetailsComponent muestra los detalles de un héroe seleccionado. Por el momento HeroDetailsComponent solo es visible en la parte inferior de la HeroesComponent

El usuario debe poder acceder a estos detalles de tres maneras.

1. Al hacer clic en un héroe en el tablero de mandos.
2. Al hacer clic en un héroe en la lista de héroes.
3. Al pegar una URL de "vínculo profundo" en la barra de direcciones del navegador que identifica al héroe que se mostrará.

En esta sección, habilitará la navegación hacia HeroDetailsComponent y la liberará de HeroesComponent.

### Eliminar detalles del héroe desde el HeroesComponent

Cuando el usuario hace clic en un elemento de héroe en el HeroesComponent, la aplicación debe navegar a HeroDetailComponent, reemplazando la vista de lista de héroes con la vista de detalles del héroe. La vista de lista de héroes ya no debería mostrar detalles de héroe como lo hace ahora.

Abra la plantilla HeroesComponent ( heroes/heroes.component.html) y elimine el elemento **app-hero-detail** de la parte inferior.

Hacer clic en un objeto de héroe ahora no hace nada. Lo arreglará poco después de habilitar el enrutamiento a HeroDetailComponent.

### Añadir una ruta de detalle de héroe

Una URL como ~/detail/11 sería una buena URL para navegar a la vista de Detalle del héroe del héroe cuyo id es 11.

Abrir AppRoutingModule e importar HeroDetailComponent.
```
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
```

Luego, agregue una ruta parametrizada a la AppRoutingModule.routesmatriz que coincida con el patrón de ruta en la vista de detalles del héroe .
```
{ path: 'detail/:id', component: HeroDetailComponent },
```

Los dos puntos (:) en el pathindica que :id es un marcador de posición para un héroe específico id.

En este punto, todas las rutas de aplicación están en su lugar.
```
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];
```

### DashboardComponent enlaces de héroe 

Los DashboardComponent enlaces de héroe no hacen nada por el momento.

Ahora que el enrutador tiene una ruta a HeroDetailComponent, corrija los enlaces del héroe del tablero para navegar a través de la ruta del tablero parametrizado .
```
<a *ngFor="let hero of heroes" class="col-1-4"
    routerLink="/detail/{{hero.id}}">
  <div class="module hero">
    <h4>{{hero.name}}</h4>
  </div>
</a>
```

### HeroesComponent enlaces de héroe

Los elementos de héroe en HeroesComponent son elementos **li** cuyos eventos de clic están vinculados al onSelect() método del componente .
```
<ul class="heroes">
  <li *ngFor="let hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```

Desplace el elemento **li** solamente con *ngFor, envuelva la insignia y el nombre en un elemento de ancla (**a**) y agregue un atributo routerLink al ancla que sea el mismo que en la plantilla del panel de control.
```
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
```

Tendrá que arreglar la hoja de estilo privada ( heroes.component.css) para que la lista se vea como lo hizo antes.
```
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color:#607D8B;
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
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
```

Eliminar el código muerto (opcional) 

Mientras la HeroesComponentclase todavía funciona, el método onSelect() y la propiedad selectedHero ya no se utilizan.

Es bueno ordenarlo y te lo agradecerás más tarde. Aquí está la clase después de podar el código muerto.
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / heroes / heroes.component.ts (limpiado)-->
```
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Enrutable HeroDetailComponent

Anteriormente, el padre HeroesComponent establecía la propiedad HeroDetailComponent.hero  y HeroDetailComponent mostraba al héroe.

HeroesComponent ya no hace eso Ahora el enrutador crea el HeroDetailComponent en respuesta a una URL como ~/detail/11.

El HeroDetailComponent necesita una nueva forma de obtener el héroe para mostrar .

- Consigue la ruta que lo creó,
- Extraer idde la ruta.
- Adquirir el héroe con eso iddesde el servidor a través de HeroService

Agregue las siguientes importaciones:
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / hero-detail / hero-detail.component.ts-->
```
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
```
<!--END_DOCUSAURUS_CODE_TABS-->

Inyecte el ActivatedRoute, HeroService y los Location services en el constructor, guardando sus valores en campos privados:
```
constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}
```

El ActivatedRoute guarda información sobre la ruta a esta instancia del HeroDetailComponent. Este componente está interesado en la bolsa de parámetros de la ruta extraída de la URL. El parámetro "id" es el id del héroe a mostrar.

La HeroService obtiene datos héroe desde el servidor remoto y este componente se utilizan para obtener el héroe-a-pantalla .

El Location un servicio angular para interactuar con el navegador. Lo usarás más tarde para volver a la vista que navegó aquí.

### Extraer el parametro de la ruta de ID

En el ngOnInit() gancho del ciclo de vida llame getHero() y defínalo de la siguiente manera.
```
ngOnInit(): void {
  this.getHero();
}

getHero(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}
```
El route.snapshot una imagen estática de la información de ruta poco después de que el componente fue creado.

El paramMap es un diccionario de valores de parámetros de ruta extraídos de la URL. La "id" clave devuelve la id del héroe a buscar.

Los parámetros de ruta son siempre cadenas. El operador de JavaScript (+) convierte la cadena en un número, que es lo que id debería ser un héroe .

El navegador se actualiza y la aplicación se bloquea con un error del compilador. HeroService no tiene un getHero() metodo Agrégalo ahora.

### Añadir HeroService.getHero()

Abre HeroService y añade este método getHero().
```
getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
```

> Tenga en cuenta los backticks (`) que definen un literal de plantilla de JavaScript para incrustar el id.

Como getHeroes(), getHero() tiene una firma asíncrona. Devuelve un héroe simulado como un Observable, utilizando la of() función RxJS .

Podrás volver a implementar getHero() como una solicitud Http real sin tener que cambiar el HeroDetailComponent que la llama.

Pruébalo

El navegador se actualiza y la aplicación está funcionando de nuevo. Puedes hacer clic en un héroe en el tablero o en la lista de héroes y navegar a la vista detallada de ese héroe.

Si pega localhost:4200/detail/11en la barra de direcciones del navegador, el enrutador navega a la vista de detalles del héroe con id: 11"Mr. Nice".

### Encuentra el camino de regreso

Al hacer clic en el botón de retroceso del navegador, puede volver a la lista de héroes o la vista del tablero de mandos, según lo que le haya enviado a la vista de detalles.

Sería bueno tener un botón en la vista HeroDetail que pueda hacer eso.

Agregue un botón de retroceso en la parte inferior de la plantilla del componente y ajústelo al método goBack() del componente .
```
goBack(): void {
  this.location.back();
}
```

Actualiza el navegador y comienza a hacer clic. Los usuarios pueden navegar por la aplicación, desde el panel de control hasta los detalles del héroe y viceversa, desde la lista de héroes hasta el mini detalle hasta los detalles del héroe y de nuevo a los héroes.

Has cumplido con todos los requisitos de navegación que impulsaron esta página.

## Revisicón final del código

Aquí están los archivos de código discutidos en esta página.

AppRoutingModule , AppModule y HeroService
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / app-routing.module.ts-->
```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```
<!--src / app / app.module.ts-->
```
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { MessagesComponent }    from './messages/messages.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
<!-- src / app / hero.service.ts -->
```
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

AppComponent
<!--DOCUSAURUS_CODE_TABS-->
<!-- src / app / app.component.html-->
```
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```
<!--src / app / app.component.css-->
```
/* AppComponent's private CSS styles */
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}
h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607d8b;
}
nav a:hover {
  color: #039be5;
  background-color: #cfd8dc;
}
nav a.active {
  color: #039be5;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

DashboardComponent
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / dashboard / dashboard.component.html-->
```
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4"
      routerLink="/detail/{{hero.id}}">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>
```
<!-- src / app / dashboard / dashboard.component.ts -->
```
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
```
<!-- src / app / dashboard / dashboard.component.css -->
```
/* DashboardComponent's private CSS styles */
[class*='col-'] {
  float: left;
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
a {
  text-decoration: none;
}
*, *:after, *:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h3 {
  text-align: center;
  margin-bottom: 0;
}
h4 {
  position: relative;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607d8b;
  border-radius: 2px;
}
.module:hover {
  background-color: #eee;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px; }
}
@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

HeroDetailComponent
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / hero-detail / hero-detail.component.html-->
```
<div *ngIf="hero">
  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </label>
  </div>
  <button (click)="goBack()">go back</button>
</div>
```
<!--src / app / hero-detail / hero-detail.component.ts-->
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
```
<!--src / app / hero-detail / hero-detail.component.css-->
```
/* HeroDetailComponent's private CSS styles */
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc;
  cursor: auto;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

HeroDetailComponent
<!--DOCUSAURUS_CODE_TABS-->
<!--END_DOCUSAURUS_CODE_TABS-->

## Resumen

- Agregaste el enrutador angular para navegar entre diferentes componentes.
- Se convirtió AppComponent en un componente de navegación con enlaces **a** y **router-outlet**.
- Configuró el enrutador en un AppRoutingModule
- Definió rutas simples, una ruta de redireccionamiento y una ruta parametrizada.
- Se utilizó la directiva routerLink en elementos de anclaje.
- Usted reformuló una vista maestra / detalle estrechamente acoplada en una vista de detalles enrutada.
- Usaste los parámetros del enlace del enrutador para navegar a la vista detallada de un héroe seleccionado por el usuario.
- Compartiste los múltiples HeroService componentes.