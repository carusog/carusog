import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
// import './index.css'

const query = graphql`
    query SiteTitleQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
const Layout = ({ children }) => (
    <StaticQuery
        query={query}
        render={data => (
            <div className="index-wrapper">
                <Helmet
                    titleTemplate={`%s | ${data.site.siteMetadata.title}`}
                    defaultTitle={data.site.siteMetadata.title}
                    meta={[
                        { name: 'description', content: 'Sample' },
                        { name: 'keywords', content: 'sample, something' },
                    ]}
                />
                <Header siteTitle={data.site.siteMetadata.title} />
                <div
                    className="children-wrapper"
                    style={{
                        margin: '0 auto',
                        maxWidth: 960,
                        padding: '0px 1.0875rem 1.45rem',
                        paddingTop: 0,
                    }}
                >
                    {children}
                </div>
            </div>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.array
}

export default Layout;
