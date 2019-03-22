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

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Obtenga más información utilizando la [documentación de este sitio.](${docUrl(
        'angular',
      )})`,
      title: 'Examinar documentación',
    },
    {
      content: 'Mira todas las caracteristicas de Angular',
      title: '¡Que me ofrece Angular?',
    },
    {
      content: "Visita nuestro sitio [web oficial](https://angular.io) y mantente al día con todos nuestros servicios",
      title: 'Estar al día',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>¿Necesitas ayuda?</h1>
          </header>
          <p>Este proyecto fue creado en la clase de Programación Web, en la Universidad Francisco de Paula Santander</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
