import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const Template = ({ data, location, pathContext }) => {
    const { markdownRemark: post } = data
    const { frontmatter, html } = post
    const { title, date } = frontmatter
    const { next, prev } = pathContext

    console.log('data is:', data);
    console.log('post is:', post);
    console.log('frontmatter is:', frontmatter);
    console.log('pathContext is:', pathContext);

    return (
        <div>
            <Helmet title={`${title} - My Blog`} />

            <div className="blog-post">
                <h1 className="blog-post--title">{title}</h1>
                <h3 className="blog-post--date">{date}</h3>

                <div
                    className="blog-post--content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

                {prev && (
                    <p className="blog-post--prev">
                        <Link to={prev.frontmatter.path}>
                            Previous: {prev.frontmatter.title}
                        </Link>
                    </p>
                )}
                {next && (
                    <p className="blog-post--next">
                        <Link to={next.frontmatter.path}>
                            Next: {next.frontmatter.title}
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                title
                date
                path
                tags
                excerpt
            }
        }
    }
`

export default Template
