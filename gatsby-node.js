// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// // You can delete this file if you're not using it
// const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.createPages = async ({ graphql, actions, reporter }) => {
//     const { createPage } = actions
//     const BlogPostTemplate = path.resolve("./src/templates/post/default.js")
//     const PageTemplate = path.resolve("./src/templates/page/default.js")

//     const pages = await graphql(`
//         query pagesQuery {
//             allWpPage {
//                 edges {
//                     node {
//                         id
//                         title
//                         content
//                         contentType {
//                             node {
//                                 isFrontPage
//                                 isPostsPage
//                             }
//                         }
//                         slug
//                         status
//                         template {
//                             templateName
//                         }
//                     }
//                 }
//             }
//         }
//     `)

//     console.log('PAGES', pages)

//     if (pages.data.errors) {
//         reporter.panicOnBuild(`Error while running GraphQL query.`)
//         return
//     }

//     pages.data.allWpPage.edges.forEach(page => {

//         // Create Page
//         createPage({
//             path: `/${page.node.slug}`,
//             component: PageTemplate,
//             context: {
//                 id: page.node.wordpress_id,
//             },
//         })
//     })
// }