/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

    return graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
                limit: 10
            ) {
                edges {
                    node {
                        html
                        id
                        frontmatter {
                            title
                            date
                            path
                            excerpt
                            tags
                        }
                    }
                }
            }
        }
    `)
    .then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(({ node }, index) => {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {
                    // prev and next seem inverted but we must consider that being posts sorted
                    // by date, DESC, last one is actually first post and vice versa
                    next: index === 0 ? null : posts[index - 1].node,
                    prev: index === (posts.length - 1) ? null : posts[index + 1].node
                }
            })
        });
    })
}
