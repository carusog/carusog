import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layouts/index';

const Template = ({ data, location, pageContext }) => {
    const { markdownRemark: post } = data
    const { frontmatter, html } = post
    const { title, date } = frontmatter
    const { next, prev } = pageContext
    console.log('pageContext is:', pageContext);

    return (
        <Layout>
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
        </Layout>
    )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                path
                tags
                excerpt
            }
        }
    }
`

export default Template
