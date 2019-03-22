---
id: hero
title: Héroes
sidebar_label: Héroes
---

## El editor héroe

La aplicación ahora tiene un título básico. A continuación, creará un nuevo componente para mostrar información de héroe y colocar ese componente en la aplicación base.

## Crear el componente heroes

Usando Angular CLI, genere un nuevo componente llamado heroes.
```
ng generate component heroes
```
Angular CLI crea una nueva carpeta *src/app/heroes/* y genera cuatro archivos de HeroesComponent.

El archivo de clase **HeroesComponent** es el siguiente:
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

Siempre importa el Component de la biblioteca principal Angular y anota la clase de componente con @Component

@Component es una función decoradora que especifica los metadatos de Angular para el componente.

CLI generó tres propiedades de metadatos:
1. selector- el selector de elementos CSS del componente
2. templateUrl- la ubicación del archivo de plantilla del componente.
3. styleUrls- La ubicación de los estilos CSS privados del componente.

El selector de elementos CSS , 'app-heroes', coincide con el nombre del elemento HTML que identifica este componente dentro de la plantilla de un componente de los padres.

El ngOnInit es un gancho de ciclo de vida. Angular llama a ngOnInit poco después de crear un componente. Es un buen lugar para poner la lógica de inicialización.

### Añadir una propiedad a Heroe

Agrega una propiedad llamada hero a HeroesComponent con el valor de "Windstorm".

```
hero = 'Windstorm';
```

### Mostrar el hero

Abra el archivo *heroes.component.html* de la plantilla. Elimine el texto predeterminado generado por el CLI angular y reemplácelo con un enlace de datos a la nueva propiedad hero.
```
{{hero}}
```

## Mostrar la vista HeroesComponent

Para mostrar el HeroesComponent, debe agregarlo a la plantilla de AppComponent.

Recuerda que app-heroes es el elemento selector para el HeroesComponent. Así que agregue un <app-heroes> elemento al archivo AppComponent de plantilla, justo debajo del título.

```
<h1>{{title}}</h1>
<app-heroes></app-heroes>
```

Suponiendo que el comando ng serve todavía se está ejecutando, el navegador debería actualizar y mostrar tanto el título de la aplicación como el nombre del héroe.

## Crear una clase Hero.

Un verdadero héroe es más que un nombre.

Crear una clase Hero en su propio archivo en la carpeta *src/app* llamado **hero.ts**. Dales las propiedades id y name.
```
export class Hero {
  id: number;
  name: string;
}
```

Regresa a la clase HeroesComponent e importa la clase Hero.

```
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit() {
  }

}
```
> La página ya no se muestra correctamente porque cambiaste el héroe de una cadena a un objeto.

## Mostrar el objeto Hero

Actualice el enlace en la plantilla para anunciar el nombre del héroe y muestre ambos id y name en un diseño de detalles como este:
```
<h2>{{hero.name}} Details</h2>
<div><span>id: </span>{{hero.id}}</div>
<div><span>name: </span>{{hero.name}}</div>
```

El navegador actualiza y muestra la información del héroe.

### Formato con el UppercasePipe

Modificar el name del hero de esta manera.

```
<h2>{{hero.name | uppercase}} Details</h2>
```
El navegador se actualiza y ahora el nombre del héroe se muestra en mayúsculas.

La palabra uppercase en el enlace de interpolación, justo después del operador de tubería (|), activa el incorporado UppercasePipe.

Las [canalizaciones](https://angular.io/guide/pipes) son una buena forma de formatear cadenas, montos de moneda, fechas y otros datos de visualización. Angular viene con varios tubos incorporados y puedes crear el tuyo propio.

## Editar el objeto Hero

Los usuarios deben poder editar el nombre del héroe en un elemento ***input***.

El cuadro de texto debe mostrar la propiedad name del héroe y actualizar esa propiedad a medida que el usuario escribe. Eso significa que el flujo de datos de la clase de componente sale a la pantalla y de la pantalla a la clase.

Para automatizar ese flujo de datos, configure un enlace de datos bidireccional entre el elemento ***input*** de formulario y la propiedad hero.name.

### Enlace bidireccional

Refactoriza el área de detalles en la plantilla HeroesComponent para que se vea así:

```
<div>
  <label>name:
    <input [(ngModel)]="hero.name" placeholder="name"/>
  </label>
</div>
```

*[(ngModel)]* es la sintaxis de enlace de datos bidireccional de Angular.

Aquí vincula la propiedad hero.name con el cuadro de texto HTML para que los datos puedan fluir en ambas direcciones: desde la propiedad hero.name al cuadro de texto y desde el cuadro de texto a la propiedad hero.name.

### El módulo de formulario faltante

Observe que la aplicación dejó de funcionar cuando agregó. *[(ngModel)]*

Para ver el error, abra las herramientas de desarrollo del navegador y busque en la consola un mensaje como: 
```
Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

Aunque ngModel es una directiva angular válida, no está disponible de forma predeterminada.

Pertenece a lo opcional [FormModule](https://angular.io/api/forms/FormsModule) y usted debe optar por usarlo.

## AppModule

Angular necesita saber cómo encajan las piezas de su aplicación y qué otros archivos y bibliotecas requiere la aplicación. Esta información se llama metadatos.

Algunos de los metadatos se encuentran en los decoradores que agregó a sus clases de componentes. Otros metadatos críticos están en los decoradores. @Component @NgModule

El decorador más importante anota la clase de nivel de aplicaciones de nivel superior .@NgModule

CLI angular generó una clase AppModule *src/app/app.module.ts* cuando creó el proyecto. Aquí es donde optas por el **FormsModule**.

### Importación de FormsModule

Abra AppModule( app.module.ts) e importe el FormsModule de la biblioteca '@angular/forms'.
```
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```

Luego, agregue FormsModule a la matriz de metadatos , que contiene una lista de módulos externos que la aplicación necesita @NgModule.imports.

```
imports: [
  BrowserModule,
  FormsModule
],
```

Cuando el navegador se actualice, la aplicación debería funcionar de nuevo. Puede editar el nombre del héroe y ver los cambios reflejados inmediatamente en <h2> el cuadro de texto anterior.

### Declarar HeroesComponent

Cada componente debe ser declarado exactamente en un NgModule.

No declaraste el HeroesComponent. Entonces, ¿por qué funcionó la aplicación?

Funcionó porque la CLI angular declaró HeroesComponent en el momento en que generó el componente en AppModule.

Abrir *src/app/app.module.ts* y encontraras HeroesComponent importados cerca de la parte superior.

```
import { HeroesComponent } from './heroes/heroes.component';
```

El HeroesComponent se declara en la matriz @NgModule.declarations
```
declarations: [
  AppComponent,
  HeroesComponent
],
```
Tenga en cuenta que AppModule declara ambos componentes de la aplicación, AppComponent y HeroesComponent.

## Resumen

- Usaste el CLI para crear un segundo HeroesComponent.
- Lo mostraste HeroesComponent agregándolo al AppComponent.
- Se aplicó el UppercasePipe para formatear el nombre.
- Se utilizó enlace de datos bidireccional con la directiva ngModel.
- Usted aprendió sobre el AppModule.
- Usted importó el código FormsModule en el AppModule que Angular reconocería y aplicaría la directiva ngModel.
- Aprendió la importancia de declarar componentes en AppModule y agradeció que CLI lo declarara por usted.

