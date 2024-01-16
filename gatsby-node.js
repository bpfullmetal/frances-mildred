const path = require(`path`)

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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
  
    // Fetch category data from GraphQL
    const result = await graphql(`
        query categoriesQuery {
            allWpCategory(filter: {slug: {nin: "uncategorized"}}) {
                edges {
                    node {
                        name
                        slug
                    }
                }
            }
        }
    `);
  
    // Iterate over categories and create pages
    result.data.allWpCategory.edges.forEach((category) => {
      createPage({
        path: `/design?category=${category.node.slug}`,
        component: path.resolve('./src/templates/page/design.js'),
        context: {
          // Pass data to the template, if needed
          categorySlug: category.node.slug,
        },
      });
    });

    const projects = await graphql(`
      query {
        allWpProject {
          nodes {
            slug
            id
            date
            # ... other fields
          }
        }
      }
    `);

    // Handle errors...

    // Create pages
    projects.data.allWpProject.nodes.forEach(node => {
      createPage({
        path: `/project/${node.slug}`, // Adjust the path as needed
        component: require.resolve('./src/templates/project/default.js'), // Adjust the template file
        context: {
          id: node.id,
          currentDate: node.date, // Add the date to context
        },
      });
    })

    // createPage({
    //   path: '/404',
    //   component: require.resolve(`./src/templates/404/default.js`),
    // });

  };

  // exports.onCreatePage = async ({ page, actions, graphql }) => {
  //   console.log('graphql', graphql)
  //   const { createPage, deletePage } = actions;
  
  //   // Check if the page is the one you're interested in modifying
  //   if (page.path.includes('/work/')) {
  //     // Query for the project data
  //     const slug = path.basename(page.path);
  //     const result = await graphql(`
  //       query GetProjectData($slug: String!) {
  //         wpProject(slug: { eq: $slug }) {
  //           id
  //           title
  //           date
  //           # Add other fields you need
  //         }
  //       }
  //     `, { slug });
  
  //     if (result.errors) {
  //       throw result.errors;
  //     }
  
  //     const project = result.data.wpProject;
  //     console.log('projet', project)
  //     // Add the project data to the page context
  //     deletePage(page);
  //     createPage({
  //       ...page,
  //       context: {
  //         ...page.context,
  //         projectData: {
  //           id: project.id,
  //           title: project.title,
  //           date: project.date,
  //           // Add other fields as needed
  //         },
  //       },
  //     });
  //   }
  // };