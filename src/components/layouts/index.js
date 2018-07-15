import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql} from 'gatsby'

import Header from '../header'
// FIXME: see gatsby config for issues with sass plugin
import './index.scss'
// import './index.css'

const Layout = ({ children }) => {
    // const layoutQuery = graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //                 title
    //             }
    //         }
    //     }
    // `
    return (
    <StaticQuery
        // query={layoutQuery}
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
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
    />)
 }

Layout.propTypes = {
    children: PropTypes.array
}

export default Layout;
