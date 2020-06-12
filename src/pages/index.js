import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layouts/index'

const IndexPage = ({ data }) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            {posts.map(({ node: post }, index) => {
                const postMeta = post.frontmatter
                return (
                    <div key={post.id}>
                        <h2>
                            <Link to={postMeta.path}>{postMeta.title}</Link>
                        </h2>
                        <p>{postMeta.date}</p>
                        <p>{postMeta.excerpt}</p>
                    </div>
                )
            })}
        </Layout>
    )
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        tags
                        excerpt
                    }
                }
            }
        }
    }
`

export default IndexPage
