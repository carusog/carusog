import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layouts/index'

const IndexPage = ({ data }) => {
    console.log(data)

    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            {posts.map(({ node: post }, index) => {
                const { frontmatter } = post

                return (
                    <div key={frontmatter.path}>
                        <h2>
                            <Link to={frontmatter.path}>
                                {frontmatter.title}
                            </Link>
                        </h2>
                        <p>{frontmatter.date}</p>
                        <p>{frontmatter.excerpt}</p>
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
