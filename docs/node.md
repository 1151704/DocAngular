---
id: node
title: Instalación de nodejs
sidebar_label: Nodejs
---

## Instalación 

Instalar NodeJS en su última versión, para eso entraremos a su web oficial y descargaremos el instalador más actualizado [Nodejs](https://nodejs.org/es/)

### Descargar archivo de instalación de nodejs
![Instalación](/img/node1.png)

### Ejecutar el archivo de instalación
![Instalación](/img/node2.png)

### Comprobación de instalación
![Instalación](/img/node3.png)

### Aceptar los terminos de licencia
![Instalación](/img/node4.png)

### Empezar instalación de nodejs
![Instalación](/img/node5.png)

1. Comprobar versión de nodejs, utilizando la terminal de windows CMD
```
node -v
```

2. Instalar las actualizaciones de todas las dependencias de npm
```
npm install -g npm@latest
```

3. Limpiamos la cache NPM
```
npm cache clean –force
```

4. Desactivar las auditorias de NPM para evitar fallos
```
npm set audit false
```



