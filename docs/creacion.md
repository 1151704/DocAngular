---
id: creacion
title: Creación del proyecto
sidebar_label: Creación del proyecto
---

## Creación de proyecto Angular

1. Abrimos la terminal de comandos y nos localizamos en el directorio donde queremos guardar nuestro proyecto.
2. Ejecutamos el siguiente comando para crear nuestro proyecto.
```
ng new
```
3. Una vez ejecutado el comando 'ng new' Angular CLI nos preguntará como deseamos crear nuestro proyecto:
    1. ¿Qué nombre le gustaría usar para el nuevo espacio de trabajo y el proyecto inicial?
    2. ¿Te gustaría añadir enrutamiento angular?
    3. ¿Qué formato de hoja de estilo te gustaría usar?
![Preguntas](/img/ng-new.png)
4. Esperamos a que angular nos cree nuestro proyecto, nos creará una carpeta con el mismo nombre que le dimos a nuestro proyecto.
5. Cambiamos de directorio 
```
cd nombre-de-nuestro-proyecto
```
6. Iniciamos nuestro proyecto angular.
```
ng serve
```
7. Podemos tambien ejecutar el siguiente comando para que directamente nos abra el navegador
```
ng serve -o
```
8. Una vez cargado nos mostrara la url donde esta alojado nuestro proyecto, procederemos a abrir esa url en el navegador de preferencia.
![Server](/img/ng-serve.png) 
