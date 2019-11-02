import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import useMarkdownDocsContents from 'docs/src/modules/components/useMarkdownDocsContents';
import PageContext from 'docs/src/modules/components/PageContext';
import {
  getHeaders,
  getTitle,
  getDescription,
  demoRegexp,
} from 'docs/src/modules/utils/parseMarkdown';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import Link from 'docs/src/modules/components/Link';
import { MDXProvider } from '@mdx-js/react';

function Wrapper(props) {
  const { children, title } = props;
  return (
    <React.Fragment>
      <Head title={title} description={'TODO_INSERT_DESCRIPTION_OR_YOU_WILL_BE_FIRED'} />
      {children}
    </React.Fragment>
  );
}

const components = {
  wrapper: Wrapper,
};

const styles = theme => ({
  header: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
  markdownElementBlog: {
    maxWidth: 700,
    margin: 'auto',
    padding: 0,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: `Roboto Slab, ${theme.typography.fontFamily}`,
    fontWeight: 300,
    '& p, & ul, & ol': {
      lineHeight: 1.7,
    },
    '& strong': {
      fontWeight: 400,
      fontFamily: theme.typography.fontFamily,
    },
    '& img': {
      display: 'block',
      margin: 'auto',
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
    },
  },
  footer: {
    marginTop: theme.spacing(12),
  },
  pagination: {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageLinkButton: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master/docs/src';

function flattenPages(pages, current = []) {
  return pages.reduce((items, item) => {
    if (item.children && item.children.length > 1) {
      items = flattenPages(item.children, items);
    } else {
      items.push(item.children && item.children.length === 1 ? item.children[0] : item);
    }
    return items;
  }, current);
}

function MarkdownXDocs(props) {
  const { classes, disableAd = false, disableEdit, disableToc = false, translatedPages } = props;

  const userLanguage = useSelector(state => state.options.userLanguage) || 'en';
  const Page = translatedPages[userLanguage];

  const t = useSelector(state => state.options.t);

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = pageList.findIndex(page => page.pathname === activePage.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_UNIQUE__ = {};

  return (
    <AppFrame>
      {disableToc ? null : null}
      {disableAd ? null : null}
      <AppContent disableAd={disableAd} disableToc={disableToc}>
        {!disableEdit ? null : null}
        <MDXProvider components={components}>
          <Page />
        </MDXProvider>
        <footer className={classes.footer}>
          {!currentPage ||
          currentPage.displayNav === false ||
          (nextPage.displayNav === false && !prevPage) ? null : (
            <React.Fragment>
              <Divider />
              <div className={classes.pagination}>
                {prevPage ? (
                  <Button
                    component={Link}
                    naked
                    href={prevPage.pathname}
                    size="large"
                    className={classes.pageLinkButton}
                    startIcon={<ChevronLeftIcon />}
                  >
                    {pageToTitleI18n(prevPage, t)}
                  </Button>
                ) : (
                  <div />
                )}
                {nextPage.displayNav === false ? null : (
                  <Button
                    component={Link}
                    naked
                    href={nextPage.pathname}
                    size="large"
                    className={classes.pageLinkButton}
                    endIcon={<ChevronRightIcon />}
                  >
                    {pageToTitleI18n(nextPage, t)}
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </footer>
      </AppContent>
    </AppFrame>
  );
}

MarkdownXDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  disableEdit: PropTypes.bool,
  disableToc: PropTypes.bool,
  translatedPages: PropTypes.object.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
};

export default withStyles(styles)(MarkdownXDocs);
