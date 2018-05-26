import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => {
    console.log(data)

    const { edges: posts } = data.allMarkdownRemark
    return (
        <div>
            {posts.map(({ node: post }) => {
                const { frontmatter } = post

                return (
                    <div key="{frontmatter.path}">
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
        </div>
    )
}

// for some reason (formatString: "MMMM DD, YYYY") doesn't work
export const query = graphql`
    query IndexQuery {
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date
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
