/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Omar Ramón Montes',
    image: 'https://avatars3.githubusercontent.com/u/44126200?v=4',
    infoLink: 'https://github.com/1151704',
    pinned: true,
  },
  {
    caption: 'Anderson',
    image: 'https://static.thenounproject.com/png/17241-200.png',
    infoLink: 'https://github.com',
    pinned: true,
  }
];

const siteConfig = {
  title: 'Angular',
  tagline: 'Framework Front-end',
  url: 'https://angular.io/',
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'DocAngular',
  organizationName: 'UFPS',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    // {doc: 'doc1', label: 'Docs'},
    // {doc: 'doc4', label: 'API'},
    // {page: 'help', label: 'Help'},
    // {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/angular.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon/angular.svg',

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
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
