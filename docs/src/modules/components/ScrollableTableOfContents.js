/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import PageContext from 'docs/src/modules/components/PageContext';

const useStyles = makeStyles(theme => ({
  root: {
    top: 70,
    // Fix IE 11 position sticky issue.
    marginTop: 70,
    width: 175,
    flexShrink: 0,
    position: 'sticky',
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    padding: theme.spacing(2, 2, 2, 0),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  item: {
    fontSize: 13,
    padding: theme.spacing(0.5, 0, 0.5, 1),
    borderLeft: '4px solid transparent',
    boxSizing: 'content-box',
    '&:hover': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
    '&$active,&:active': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
      }`,
    },
  },
  secondaryItem: {
    paddingLeft: theme.spacing(2.5),
  },
  active: {},
}));

const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(() => (callback ? throttle(callback, delay) : noop), [
    callback,
    delay,
  ]);

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

export default function ScrollableTableOfContents(props) {
  const { items } = props;
  const classes = useStyles();
  const t = useSelector(state => state.options.t);

  const [activeState, setActiveState] = React.useState(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = items[i];

      if (process.env.NODE_ENV !== 'production') {
        if (!item.node) {
          console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
        }
      }

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, items]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166);

  const handleClick = hash => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  const { activePage } = React.useContext(PageContext);

  const itemLink = (item, secondary) => (
    <Link
      display="block"
      color={activeState === item.hash ? 'textPrimary' : 'textSecondary'}
      href={`${activePage.pathname}#${item.hash}`}
      underline="none"
      onClick={handleClick(item.hash)}
      className={clsx(
        classes.item,
        { [classes.secondaryItem]: secondary },
        activeState === item.hash ? classes.active : undefined,
      )}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </Link>
  );

  return (
    <nav className={classes.root} aria-label={t('pageTOC')}>
      <Typography gutterBottom className={classes.contents}>
        {t('tableOfContents')}
      </Typography>
      <Typography component="ul" className={classes.ul}>
        {items.map(item2 => (
          <li key={item2.text}>
            {itemLink(item2)}
            {item2.children.length > 0 ? (
              <ul className={classes.ul}>
                {item2.children.map(item3 => (
                  <li key={item3.text}>{itemLink(item3, true)}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </Typography>
    </nav>
  );
}

ScrollableTableOfContents.propTypes = {
  items: PropTypes.array.isRequired,
};