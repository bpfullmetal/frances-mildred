/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Frances Mildred`,
    siteUrl: `https://fullmetalworkshop.com`,
    author: 'Full Metal Workshop LLC'
  },
  // pathPrefix: "/clients/frances-mildred-staging/",
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: "https://francesmildred.wpenginepowered.com/graphql",
        develop: {
          hardCacheMediaFiles: true
        },
        verbose: true,
        // type: {
        //   MediaItem: {
        //     localFile: {
        //       excludeByMimeTypes: [`video/mp4`]
        //     }
        //   }
        // }
      }
    }, 
    {
      resolve: 'gatsby-theme-headless-wordpress',
      options: {
         templatesPath: `./src/templates`, 
         useACF: true,
         excludedRoutes: ['**/taxonomy/**', '**/category/**', '**/tag/**'],
         type: {
          __all: { 
            postsPerPage: 999
          },
          page: { 
            postsPerPage: 999
          }
        },
        createClientPages: ({ actions }) => {
          const { createPage } = actions;

          // Add a client-only route for the custom 404 page
          createPage({
            path: '/404',
            component: require.resolve(`./src/templates/page/404/default.js`),
          });
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