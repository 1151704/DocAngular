---
id: servicio
title: Servicios
sidebar_label: Servicios
---

## Servicios

El Tour de los Héroes HeroesComponent actualmente está obteniendo y mostrando datos falsos.

Después de la refactorización en este tutorial, HeroesComponent será magro y se centrará en apoyar la vista. También será más fácil realizar una prueba unitaria con un servicio simulado.

## ¿Por qué servicios de?

Los componentes no deben obtener o guardar datos directamente y, ciertamente, no deben presentar datos falsos a sabiendas. Deben centrarse en presentar datos y delegar el acceso de datos a un servicio.

En este tutorial, creará una HeroService que todas las clases de aplicaciones pueden usar para obtener héroes. En lugar de crear ese servicio con new, confiará en la inyección de dependencia angular para inyectarlo en el constructor HeroesComponent.

Los servicios son una excelente manera de compartir información entre clases que no se conocen entre sí . Crearás una MessageService y la inyectarás en dos lugares:

1. En el HeroService que utiliza el servicio para enviar un mensaje.
2. En el MessagesComponent que se muestra ese mensaje.

## Cear el HeroService

Usando el CLI angular, cree un servicio llamado hero.
```
ng generate service hero
```

El comando genera una clase HeroService de esqueleto en *src/app/hero.service.ts* La clase HeroService debería verse como el siguiente ejemplo.
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / hero.service.ts (nuevo servicio)-->
```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### @Injectable() services

Observe que el nuevo servicio importa el Injectable Angular y anota la clase con el decorador. Esto marca la clase como una que participa en el sistema de inyección de dependencia . La clase proporcionará un servicio inyectable y también puede tener sus propias dependencias inyectadas. Todavía no tiene ninguna dependencia, pero lo hará pronto.

El decorador @Injectable() acepta un objeto de metadatos para el servicio, de la misma manera que lo hizo el decorador @Component() para sus clases de componentes.

### Get hero data

El HeroService podían obtener los datos desde cualquier lugar héroe-un servicio web, almacenamiento local, o una fuente de datos simulada.

Eliminar el acceso a los datos de los componentes significa que puede cambiar de opinión acerca de la implementación en cualquier momento, sin tocar ningún componente. No saben cómo funciona el servicio.

La implementación en este tutorial continuará entregando héroes simulados .

Importar el Hero y HEROES.
```
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
```

Agrega un método getHeroes para devolver a los héroes simulados .
```
getHeroes(): Hero[] {
  return HEROES;
}
```

## Proveer el HeroService

Debe ponerlo a disposición HeroService del sistema de inyección de dependencia antes de que Angular pueda inyectarlo en el HeroesComponent, como lo hará a continuación . Usted hace esto mediante el registro de un proveedor . Un proveedor es algo que puede crear o entregar un servicio; en este caso, crea una instancia de la clase HeroService para proporcionar el servicio.

Ahora, debe asegurarse de que esté HeroService registrado como el proveedor de este servicio. Lo está registrando con un inyector , que es el objeto responsable de elegir e inyectar al proveedor donde sea necesario.

De forma predeterminada, el comando de CLI angular ng generate service registra un proveedor con el inyector raíz para su servicio al incluir metadatos del proveedor en el decorador @Injectable.

Si observa la declaración @Injectable() justo antes de la definición de la clase HeroService, puede ver que el valor de los metadatos de providedIn es 'root':
```
@Injectable({
  providedIn: 'root',
})
```

Cuando proporciona el servicio en el nivel raíz, Angular crea una instancia única y compartida de HeroService e inserta en cualquier clase que lo solicite. El registro del proveedor @Injectable en los metadatos también permite que Angular optimice una aplicación eliminando el servicio si, después de todo, no se utiliza.

> Para obtener más información sobre los proveedores, consulte la sección [Proveedores](https://angular.io/guide/providers). 
> 
> Para obtener más información sobre los inyectores, consulte la guía de [inyección de dependencia](https://angular.io/guide/dependency-injection).

El HeroService está ahora listo para conectar a la HeroesComponent.

## Actualizar HeroesComponent

Elimina la importación HEROES, porque ya no la necesitarás. Importar en su lugar HeroService.
<!--DOCUSAURUS_CODE_TABS-->
<!--src / app / heroes / heroes.component.ts (importar HeroService)-->
```
import { HeroService } from '../hero.service';
```
<!--END_DOCUSAURUS_CODE_TABS-->

Reemplace la definición de la propiedad heroes con una declaración simple.
```
heroes: Hero[];
```

### Inyectar el HeroService

Agregue un parámetro heroService privado de tipo HeroService al constructor.
```
constructor(private heroService: HeroService) { }
```

El parámetro define simultáneamente una propiedad privada heroService y la identifica como un HeroService sitio de inyección.

Cuando Angular crea a HeroesComponent, el sistema de inyección de dependencias establece el parámetro heroService en la instancia de singleton de HeroService.

### Añadir getHeroes() 

Crea una función para recuperar los héroes del servicio.

```
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

### Llamanlo en ngOnInit()

Si bien puede llamar getHeroes() al constructor, esa no es la mejor práctica.

Reserve el constructor para una inicialización simple, como los parámetros del constructor de cableado a las propiedades. El constructor no debe hacer nada . Ciertamente, no debería llamar a una función que realiza solicitudes HTTP a un servidor remoto como lo haría un servicio de datos real .

En su lugar, llame getHeroes() dentro del gancho del ciclo de vida de ngOnInit y deje que Angular realice la llamada ngOnInit en el momento adecuado después de crear una instancia HeroesComponent.
```
ngOnInit() {
  this.getHeroes();
}
```

### Verlo correr

Después de que el navegador se actualice, la aplicación debería ejecutarse como antes, mostrando una lista de héroes y una vista detallada del héroe al hacer clic en el nombre de un héroe.

## Datos observables

El método HeroService.getHeroes() tiene una firma síncrona, lo que implica que los héroes de HeroService pueden obtener sincrónicamente. El HeroesComponent consume getHeroes() el resultado como si los héroes pudieran ser buscados sincrónicamente.

```
this.heroes = this.heroService.getHeroes();
```

Esto no funcionará en una aplicación real. Te estás saliendo con la tuya ahora porque el servicio actualmente devuelve simulacros de héroes . Pero pronto la aplicación buscará héroes desde un servidor remoto, que es una operación inherentemente asíncrona .

El HeroService debe esperar a que el servidor responda, getHeroes() no se puede volver inmediatamente con los datos de héroe, y el navegador no bloqueará mientras que los espera el servicio.

HeroService.getHeroes() Debe tener una firma asíncrona de algún tipo.

Puede tomar una devolución de llamada. Podría volver a Promise. Podría devolver un Observable.

En este tutorial, HeroService.getHeroes() devolverá una Observable parte porque eventualmente usará el medodos HttpClient Angular para buscar a los héroes y HttpClient.get() devolver un Observable .

### Observable HeroService

ObservableEs una de las clases clave en la biblioteca [RxJS](https://rxjs-dev.firebaseapp.com/).

En un tutorial posterior sobre HTTP , aprenderá que los HttpClientmétodos de Angular devuelven RxJS Observables. En este tutorial, simulará obtener datos del servidor con la of() función RxJS .

Abra el archivo HeroService e importe los Observable y of desde RxJS.

```
import { Observable, of } from 'rxjs';
```

Reemplace el método getHeroes con este.
```
getHeroes(): Observable<Hero[]> {
  return of(HEROES);
}
```

of(HEROES)devuelve un Observable<Hero[]>que emite un solo valor , la matriz de héroes simulados.

> En el tutorial de HTTP , llamarás, HttpClient.get<Hero[]>()que también devuelve un valor Observable<Hero[]>que emite un solo valor , una serie de héroes del cuerpo de la respuesta HTTP.

### Surcríbete en el HeroesComponent

El método HeroService.getHeroes() utilizado para devolver un Hero[]. Ahora vuelve un Observable<Hero[]>.

Tendrás que adaptarte a esa diferencia en HeroesComponent.

Encuentre el método getHeroes y reemplácelo con el siguiente código (se muestra lado a lado con la versión anterior para comparación)

<!--DOCUSAURUS_CODE_TABS-->
<!--heroes.component.ts (observable)-->
```
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}
```
<!--heroes.component.ts (Original)-->
```
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Observable.subscribe() Es la diferencia crítica.

La versión anterior asigna una serie de héroes a la propiedad heroes del componente . La asignación se realiza de forma sincrónica , como si el servidor pudiera devolver héroes al instante o el navegador pudiera congelar la interfaz de usuario mientras esperaba la respuesta del servidor.

Eso no funcionará cuando en realidad HeroService está realizando solicitudes de un servidor remoto.

La nueva versión espera a que Observable emita la serie de héroes, lo que podría suceder ahora o dentro de unos minutos. Luego pasa subscribe la matriz emitida a la devolución de llamada, que establece la propiedad heroes del componente .

Este enfoque asíncrono funcionará cuando los héroes HeroService solicitados desde el servidor.


## Mostrar mensajes

En esta sección podrás: 
-   agregue una MessagesComponent que muestre los mensajes de la aplicación en la parte inferior de la pantalla.
-   crear un inyectable, en toda la aplicación MessageService para enviar mensajes que se mostrarán
-   inyectar MessageService en el HeroService.
-   mostrar un mensaje cuando se obtiene HeroService héroes con éxito.

### Crear MessagesComponent

Utilice el CLI para crear el MessagesComponent.
```
ng generate component messages
```

La CLI crea los archivos de componentes en la carpeta y declara que está en *.src/app/messagesMessagesComponentAppModule*

Modificar la plantilla AppComponent para visualizar el generado MessagesComponent.
```
<h1>{{title}}</h1>
<app-heroes></app-heroes>
<app-messages></app-messages>
```
Debería ver el párrafo predeterminado MessagesComponent en la parte inferior de la página.

### Crear el MessageService

Use el CLI para crear el MessageService en src/app.
```
ng generate service message
```

Abra MessageService y reemplace su contenido con lo siguiente.
```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
```

El servicio expone su caché de messages y dos métodos: uno a add() un mensaje al caché y otro al clear() caché.

### Inyectar en el HeroService

Vuelva a abrir el HeroService e importar el MessageService.
```
import { MessageService } from './message.service';
```

Modificar el constructor con un parámetro que declara una propiedad privada messageService . Angular inyectará el singleton MessageService en esa propiedad cuando cree el HeroService.

> Este es un escenario típico de " servicio en servicio ": se inyecta MessageService en el HeroService que se inyecta en el HeroesComponent.

### Enviar un mensaje desde el HeroService

Modifica el método getHeroes() para enviar un mensaje cuando los héroes son buscados.
```
getHeroes(): Observable<Hero[]> {
  // TODO: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}
```

### Mostrar mensaje de HeroService
El MessagesComponent debe mostrar todos los mensajes, incluyendo el mensaje enviado por el HeroService cuando se obtiene héroes.

Abra MessagesComponente importe el MessageService.
```
import { MessageService } from '../message.service';
```

Modificar el constructor con un parámetro que declara una propiedad pública messageService . Angular inyectará el singleton MessageService en esa propiedad cuando cree el MessagesComponent.
```
constructor(public messageService: MessageService) {}
```

La propiedad messageService debe ser pública porque está a punto de unirse a ella en la plantilla.

> Angular solo se enlaza a las propiedades de los componentes públicos .

### Enlace al MessageService

Reemplace la plantilla MessagesComponent generada por CLI con lo siguiente.

Esta plantilla se enlaza directamente a los componentes messageService.
-   La instrucción Angular *ngIf muestra el área de mensajes si hay mensajes para mostrar.
-   La instrucción Angular *ngFor presenta la lista de mensajes en elementos **div** repetidos
-   Un enlace de evento Angular vincula el evento de clic del botón a MessageService.clear().

Los mensajes se verán mejor cuando agregue los estilos de CSS privados messages.component.css como se muestra a comtinuación.
```
/* MessagesComponent's private CSS styles */
h2 {
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[text], button {
  color: crimson;
  font-family: Cambria, Georgia;
}

button.clear {
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
  color: #aaa;
  cursor: auto;
}
button.clear {
  color: #888;
  margin-bottom: 12px;
}
```

El navegador se actualiza y la página muestra la lista de héroes. Desplácese hasta la parte inferior para ver el mensaje HeroServiceen el área de mensajes. Haga clic en el botón "Borrar" y el área de mensaje desaparecerá.


## Resumen

-   Usted refactorizó el acceso de datos a la HeroServiceclase.
-   Usted registró HeroServicecomo proveedor de su servicio en el nivel raíz para que pueda ser inyectado en cualquier lugar de la aplicación.
-   Usó la inyección de dependencia angular para inyectarla en un componente.
-   Usted le dio al método de HeroService obtención de datos una firma asíncrona.
-   Usted descubrió Observable y la biblioteca RxJS Observable .
-   Usaste RxJS of()para devolver un observable de héroes simulados ( Observable<Hero[]>).
-   El ngOnInit gancho del ciclo de vida del componente llama al método HeroService, no al constructor.
-   Usted creó una MessageServicecomunicación entre clases de forma holgada.
-   El HeroService inyectado en un componente se crea con otro servicio inyectado, MessageService.




