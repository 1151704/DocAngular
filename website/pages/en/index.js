/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
    render() {
        const {siteConfig, language = ''} = this.props;
        const {baseUrl, docsUrl} = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = props => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const Logo = props => (
            <div className="projectLogo">
                <img src={props.img_src} alt="Project Logo"/>
            </div>
        );

        const ProjectTitle = () => (
            <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
            </h2>
        );

        const PromoSection = props => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = props => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
        );

        return (
            <SplashContainer>
                <Logo img_src={`${baseUrl}img/angular.svg`}/>
                <div className="inner">
                    <ProjectTitle siteConfig={siteConfig}/>
                    <PromoSection>
                    <Button href="#documentado">Autores</Button>
                    <Button href={docUrl('angular.html')}>Documentación</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const {config: siteConfig, language = ''} = this.props;
        const {baseUrl} = siteConfig;

        const Caracteristicas = () => (
            <GridBlock
                align="center"
                layout="oneColumn"
                className="grid-block--column"
                contents={
                [
                    {
                        content: 'Aprenda una forma de crear aplicaciones con Angular y reutilizar su código y habilidades para crear aplicaciones para cualquier destino de implementación. Para web, web móvil, móvil nativo y escritorio nativo.',
                        image: `${baseUrl}img/responsive-framework.svg`,
                        imageAlign: 'left',
                        title: '\n' +
                            'DESARROLLAR EN TODAS LAS PLATAFORMAS',
                    },
                    {
                        content: 'Consiga la velocidad máxima posible en la plataforma web hoy, y continúe, a través de los trabajadores web y la representación del lado del servidor.\n' +
                            '\n' +
                            'Angular te pone en control sobre la escalabilidad. Satisface requerimientos enormes de data construyendo modelos de data en RxJS, Immutable.js o algún otro modelo-de-empuje.',
                        image: `${baseUrl}img/speed-performance.svg`,
                        imageAlign: 'right',
                        title: 'VELOCIDAD Y RENDIMIENTO',
                    },
                    {
                        content: 'Construye características rápidamente con plantillas simples y declarativas. Amplíe el idioma de la plantilla con sus propios componentes y utilice una amplia gama de componentes existentes. Obtenga ayuda y comentarios inmediatos específicos para Angular con casi todos los IDE y editores. Todo esto se une para que pueda concentrarse en crear aplicaciones sorprendentes en lugar de intentar que el código funcione.',
                        image: `${baseUrl}img/joyful-development.svg`,
                        imageAlign: 'left',
                        title: 'HERRAMIENTAS INCREIBLES',
                    }, {
                        content: 'Desde el prototipo hasta la implementación global, Angular ofrece la productividad y la infraestructura escalable que admite las aplicaciones más grandes de Google.',
                        image: `${baseUrl}img/loved-by-millions.svg`,
                        imageAlign: 'right',
                        title: 'AMADO POR MILLONES',
                    }
                ]}
                />
        );

        const Documentacion = () => {
            if ((siteConfig.users || []).length === 0) {
                return null;
            }

            const showcase = siteConfig.users
                .filter(user => user.pinned)
                .map(user => (
                    <a href={user.infoLink} key={user.infoLink}>
                        <img src={user.image} alt={user.caption} title={user.caption}/>
                    </a>
                ));

            const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

            return (
                <div className="productShowcaseSection paddingBottom" id="documentado">
                    <h2>Documentación</h2>
                    <p>Este proyecto fue documentado por </p>
                    <div className="logos">{showcase}</div>
                </div>
            );
        };

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language}/>
                <div className="mainContainer">
                    <Caracteristicas/>
                    <Documentacion />
                </div>
            </div>
        );
    }
}

module.exports = Index;
