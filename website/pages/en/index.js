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
        <img src={props.img_src} alt="Project Logo" />
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
        <Logo img_src={`${baseUrl}img/angular.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          {/*<PromoSection>*/}
            {/*/!*<Button href="#showcase">ShowCase</Button>*!/*/}
            {/*/!*<Button href={docUrl('doc1.html')}>Example </Button>*!/*/}
            {/*/!*<Button href={docUrl('doc2.html')}>Example Link 2</Button>*!/*/}
          {/*</PromoSection>*/}
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="oneColumn">
        {[
          {
            content: 'Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.',
            image: `https://angular.io/generated/images/marketing/home/responsive-framework.svg`,
            imageAlign: 'left',
            title: 'DEVELOP ACROSS ALL PLATFORMS',
          },
          {
            content: 'Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.\n' +
                '\n' +
                'Angular puts you in control over scalability. Meet huge data requirements by building data models on RxJS, Immutable.js or another push-model.',
            image: `https://angular.io/generated/images/marketing/home/speed-performance.svg`,
            imageAlign: 'right',
            title: 'SPEED & PERFORMANCE',
          },
            {
            content: 'Build features quickly with simple, declarative templates. Extend the template language with your own components and use a wide array of existing components. Get immediate Angular-specific help and feedback with nearly every IDE and editor. All this comes together so you can focus on building amazing apps rather than trying to make the code work.',
            image: `https://angular.io/generated/images/marketing/home/joyful-development.svg`,
            imageAlign: 'left',
            title: 'INCREDIBLE TOOLING',
          },  {
            content: 'From prototype through global deployment, Angular delivers the productivity and scalable infrastructure that supports Google\'s largest applications.',
            image: `https://angular.io/generated/images/marketing/home/loved-by-millions.svg`,
            imageAlign: 'right',
            title: 'LOVED BY MILLIONS',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom" id="showcase">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
            <Features />
            <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
