---
id: tutorial
title: Tutorial
sidebar_label: Aplicación base
---

## Aplicación base

Se comienza creando una aplicación inicial utilizando la CLI angular. A lo largo de este tutorial, modificarás y extenderás esa aplicación de inicio para crear la aplicación.

En esta parte del tutorial, harás lo siguiente:

1.  Configura tu entorno.
2.  Crear un nuevo espacio de trabajo y un proyecto de aplicación inicial.
3.  Ejecutar la aplicación.
4.  Realizar cambios en la aplicación.

## Configura tu entorno.

Para configurar su entorno de desarrollo, siga estas instrucciones en [Angular](instalacion)
> **Nota:** No es necesario que complete todo el Inicio. Después de completar las dos secciones anteriores de Introducción, se configura su entorno. Continúa abajo para crear el espacio de trabajo de Tour of Heroes y un proyecto de aplicación inicial.

## Crear un nuevo espacio de trabajo y un proyecto de aplicación inicial.

Un espacio de trabajo contiene los archivos para uno o más proyectos. Un proyecto es el conjunto de archivos que comprende una aplicación, una biblioteca o pruebas de extremo a extremo. Para este tutorial, creará un nuevo espacio de trabajo.

Para crear un nuevo espacio de trabajo y un proyecto de aplicación inicial:

1.  Asegúrese de no estar ya en una carpeta de espacio de trabajo angular. Por ejemplo, si ha creado anteriormente el espacio de trabajo de Inicio, cambie al elemento primario de esa carpeta.
2.  Ejecute el comando CLI ng new y proporcione el nombre angular-tour-of-heroes, como se muestra aquí:
```
ng new angular-tour-of-heroes
```
3.  El ng new comando le solicita información sobre las características que debe incluir en el proyecto de aplicación inicial. Acepte los valores predeterminados presionando la tecla Intro o Retorno.

Angular CLI instala los npmpaquetes angulares necesarios y otras dependencias. Esto puede tardar unos minutos.

También crea los siguientes archivos de proyecto de área de trabajo y de inicio:

- Un nuevo espacio de trabajo, con una carpeta raíz llamada angular-tour-of-heroes.
- Un proyecto inicial de aplicación de esqueleto, también llamado angular-tour-of-heroes(en la srcsubcarpeta).
- Un proyecto de prueba de extremo a extremo.
- Archivos de configuración relacionados.

El proyecto de aplicación inicial contiene una aplicación de bienvenida simple, lista para ejecutarse.

## Ejecutar la aplicación.

Vaya al directorio del área de trabajo e inicie la aplicación.

```
cd angular-tour-of-heroes
ng serve --open
```
> El ng serve comando crea la aplicación, inicia el servidor de desarrollo, observa los archivos de origen y reconstruye la aplicación a medida que realiza cambios en esos archivos.
> 
> El --open abre un navegador para http://localhost:4200/.

Debería ver la aplicación ejecutándose en su navegador.

## Components

La página que ves es la aplicación. La aplicación está controlada por un componente Angular llamado AppComponent.

Los Components son los componentes fundamentales de las aplicaciones Angular. Muestran datos en la pantalla, escuchan las acciones del usuario y toman medidas en función de esa entrada.

## Realizar cambios en la aplicación.

Abra el proyecto en su editor favorito o IDE y navegue hasta la carpeta *src/app* para realizar algunos cambios en la aplicación de inicio.

Encontrarás la implementación del aplicativo AppComponent distribuido en tres archivos:
1.  *app.component.ts* - El código de clase del componente, escrito en TypeScript.
2.  *app.component.html* - La plantilla del componente, escrita en HTML.
3.  *app.component.css* - Los estilos CSS privados del componente.

### Cambiar el título de la aplicación

Abra el archivo de clase de componente *app.component.ts* y cambie el valor de la propiedad title a 'Tour of Heroes'.
```
title = 'Tour of Heroes';
```

Abra el archivo de plantilla del componente *app.component.html* y elimine la plantilla predeterminada generada por el Angular-CLI. Reemplácelo con la siguiente línea de HTML.

```
<h1>{{title}}</h1>
```
Las llaves dobles son la sintaxis de enlace de interpolación de Angular. Este enlace de interpolación presenta el valor de la propiedad title del componente dentro de la etiqueta de encabezado HTML.

El navegador actualiza y muestra el nuevo título de la aplicación.

### Añadir estilos a la aplicación

La mayoría de las aplicaciones se esfuerzan por lograr una apariencia coherente en toda la aplicación. El CLI generó un *styles.css* vacio para este propósito. Ponga sus estilos de toda la aplicación allí.

Abra *src/styles.css* y agregue el siguiente código al archivo.

```
/* Application-wide Styles */
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[type="text"], button {
  color: #888;
  font-family: Cambria, Georgia;
}
/* everywhere else */
* {
  font-family: Arial, Helvetica, sans-serif;
}
```

## Resumen

- Usted creó la estructura inicial de la aplicación utilizando Angular CLI.
- Aprendiste que los componentes Angular muestran datos.
- Usaste las llaves dobles de interpolación para mostrar el título de la aplicación.










