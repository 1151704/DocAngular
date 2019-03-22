/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'Omar Ramón Montes',
//     image: 'https://avatars3.githubusercontent.com/u/44126200?v=4',
//     infoLink: 'https://github.com/1151704',
//     pinned: true,
//   },
//   {
//     caption: 'Anderson',
//     image: 'anderson.jpg',
//     infoLink: 'https://github.com',
//     pinned: true,
//   }
// ];

const siteConfig = {
  title: 'Angular Doc',
  tagline: 'Framework Front-end',
  url: 'https://angular.io/',
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
     url: 'https://1151704.github.io',
  baseUrl: '/',

  // Used for publishing and more
  projectName: 'DocAngular',
  organizationName: '1151704',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'angular', label: 'Docs'},
    {page : 'caracteristicas', label: 'Caracteristicas'},
    {page: 'help', label: 'Help'}
  ],

  // If you have users set above, you add it here:
  users: [
    {
      caption: 'Omar Ramón Montes',
      image: 'https://avatars3.githubusercontent.com/u/44126200?v=4',
      infoLink: 'https://github.com/1151704',
      pinned: true,
    },
    {
      caption: 'Anderson',
      image: 'img/anderson.jpg',
      infoLink: 'https://github.com/AndersonF11',
      pinned: true,
    }
  ],

  /* path to images for header/footer */
  headerIcon: 'img/angular.svg',
  footerIcon: 'img/angular.svg',
  favicon: 'img/favicon/favicon-32x32.png',

  /* Colors for website */
  colors: {
    primaryColor: '#0d47a1',
    secondaryColor: '#42a5f5',
  },

  fonts: {
    myFont: [
        "sans-serif"
    ],
    myOtherFont: [
    ]
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} UFPS / Programación web`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'zenburn',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-block-buttons.js'
  ],
  stylesheets: ['/css/code-block-buttons.css'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/angular.png',
  twitterImage: 'img/angular.png',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
