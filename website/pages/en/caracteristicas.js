/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Caracteristica(props) {
    const {config: siteConfig, language = ''} = props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const PLATAFORMA_CRUZADA = () => (
        <GridBlock
            align="center"
            layout="threeColumn"
            className="grid-block--column"
            contents={
                [
                    {
                        content: 'Utilice las capacidades modernas de la plataforma web para ofrecer experiencias similares a las aplicaciones. Instalación de alto rendimiento, fuera de línea y paso cero.',
                        title: 'Aplicaciones Web Progresivas',
                    },
                    {
                        content: 'Cree aplicaciones móviles nativas con estrategias de Cordova, Ionic o NativeScript.',
                        title: 'Nativo',
                    },
                    {
                        content: 'Desde el prototipo hasta la implementación global, Angular ofrece la productividad y la infraestructura escalable que admite las aplicaciones más grandes de Google.',
                        title: 'Escritorio',
                    }
                ]}
        />
    );

    const VELOCIDAD_Y_RENDIMIENTO = () => (
        <GridBlock
            align="center"
            layout="threeColumn"
            className="grid-block--column"
            contents={
                [
                    {
                        content: 'Angular convierte sus plantillas en un código que está altamente optimizado para las máquinas virtuales de JavaScript de hoy en día, y le brinda todos los beneficios del código escrito a mano con la productividad de un marco.',
                        title: 'Codigo de GENERACION',
                    },
                    {
                        content: 'Cree aplicaciones móviles nativas con estrategias de Cordova, Ionic o NativeScript.',
                        title: 'Universal',
                    },
                    {
                        content: 'Las aplicaciones angulares se cargan rápidamente con el nuevo enrutador de componentes, que ofrece división automática de códigos para que los usuarios solo carguen el código requerido para representar la vista que solicitan.',
                        title: 'División de código',
                    }
                ]}
        />
    );

    const PRODUCTIVIDAD = () => (
        <GridBlock
            align="center"
            layout="threeColumn"
            className="grid-block--column"
            contents={
                [
                    {
                        content: 'Cree rápidamente vistas de la interfaz de usuario con una sintaxis de plantilla simple y potente.',
                        title: 'Plantillas',
                    },
                    {
                        content: 'Herramientas de línea de comandos: comience a construir rápidamente, agregue componentes y pruebas, y luego implemente instantáneamente.',
                        title: 'Angular CLI',
                    },
                    {
                        content: 'Obtenga código inteligente, errores instantáneos y otros comentarios en editores e IDE populares.',
                        title: 'IDEs',
                    }
                ]}
        />
    );

    const HISTORIA_COMPLETA_DEL_DESARROLLO = () => (
        <GridBlock
            align="center"
            layout="threeColumn"
            className="grid-block--column"
            contents={
                [
                    {
                        content: 'Con Karma para pruebas unitarias, puedes saber si has roto cosas cada vez que ahorras. Y Protractor hace que sus pruebas de escenarios se ejecuten más rápido y de manera estable.',
                        title: 'Pruebas',
                    },
                    {
                        content: 'Cree coreografías complejas y de alto rendimiento y líneas de tiempo de animación con muy poco código a través de la API intuitiva de Angular.',
                        title: 'Animación',
                    },
                    {
                        content: 'Cree aplicaciones accesibles con componentes habilitados para ARIA, guías para desarrolladores y una infraestructura de prueba integrada.',
                        title: 'Accesibilidad',
                    }
                ]}
        />
    );

    return (
        <div className="docMainWrapper wrapper">
            <Container className="mainContainer documentContainer postContainer">
                <div className="post">
                    <header className="postHeader">
                        <h1 className="center">Caracteristicas</h1>
                    </header>
                    <p className="center">Estas son algunas de las principales del framework angular.</p>
                    <div className="center">
                        <h2>Plataforma Cruzada</h2>
                        <img className="title-icon" src="img/feature-icon.svg" alt=""/>
                    </div>

                    <PLATAFORMA_CRUZADA/>
                    <div className="center">
                        <h2>VELOCIDAD Y RENDIMIENTO</h2>
                        <img className="title-icon" src="img/feature-icon.svg" alt=""/>
                    </div>
                    <VELOCIDAD_Y_RENDIMIENTO/>
                    <div className="center">
                        <h2>PRODUCTIVIDAD</h2>
                        <img className="title-icon" src="img/feature-icon.svg" alt=""/>
                    </div>
                    <PRODUCTIVIDAD/>
                    <div className="center">
                        <h2>HISTORIA COMPLETA DEL DESARROLLO</h2>
                        <img className="title-icon" src="img/feature-icon.svg" alt=""/>
                    </div>
                    <HISTORIA_COMPLETA_DEL_DESARROLLO/>
                </div>
            </Container>
        </div>
    );
}

module.exports = Caracteristica;
