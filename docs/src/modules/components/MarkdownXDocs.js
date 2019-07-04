import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MarkdownXElement from 'docs/src/modules/components/MarkdownXElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import MarkdownDocsContents from 'docs/src/modules/components/MarkdownDocsContents';
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
  chevronLeftIcon: {
    marginRight: theme.spacing(1),
  },
  chevronRightIcon: {
    marginLeft: theme.spacing(1),
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
  const {
    blog,
    classes,
    disableAd = false,
    disableToc = false,
    disableEdit,
    markdown: markdownProp = '',
    markdownLocation = '',
    reduxServerState,
    ...other
  } = props;

  const { t, userLanguage } = useSelector(state => ({
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  }));

  let demos;
  let markdown = markdownProp;

  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = 1 // pageList.findIndex(page => page.pathname === activePage.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  const headers = {title: 'test',description: 'test'} // getHeaders(markdown);
  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_UNIQUE__ = {};

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdown)} - Material-UI`}
        description={headers.description || getDescription(markdown)}
      />
      {disableToc ? null : <AppTableOfContents contents={[]} />}
      {disableAd ? null : (
        <Portal container={() => document.querySelector('.description')}>
          <Ad />
        </Portal>
      )}

      <AppContent disableToc={disableToc} className={classes.root}>
        {!disableEdit ? (
          <div className={classes.header}>
            <EditPage
              markdownLocation={markdownLocation}
              sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
            />
          </div>
        ) : null}
        <MarkdownXElement {...other} />
        <footer className={classes.footer}>
          {currentPage.displayNav === false ||
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
                    >
                      <ChevronLeftIcon fontSize="small" className={classes.chevronLeftIcon} />
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
                    >
                      {pageToTitleI18n(nextPage, t)}
                      <ChevronRightIcon fontSize="small" className={classes.chevronRightIcon} />
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
  blog: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  disableEdit: PropTypes.bool,
  disableToc: PropTypes.bool,
  markdown: PropTypes.string,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
};

export default withStyles(styles)(MarkdownXDocs);
