/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Frances Mildred`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": "https://fullmetalworkshop.com/clients/francesmildred/graphql"
      }
    }, 
    {
      resolve: 'gatsby-theme-headless-wordpress',
      options: {
         templatesPath: `./src/templates`, 
         useACF: true,
         excludedNodeTypes: [`MediaItem`], // excludes creating pages for individual media items
         excludedRoutes: ['**/category/**', '**/tag/**'],
         type: {
          __all: { 
            postsPerPage: 999
          },
          page: { 
            postsPerPage: 999
          }
        }
      }
    },
    "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-postcss", /*"gatsby-plugin-google-gtag", */"gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/assets/images/icon.png"
      }
    }, "gatsby-plugin-mdx", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/assets/images/"
      },
      __key: "images"
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "pages",
        path: "./src/pages/"
      },
      __key: "pages"
    }
  ]
};