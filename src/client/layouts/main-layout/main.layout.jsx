import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { Route, Switch } from 'react-router-dom';

import { Divider, Header } from 'semantic-ui-react';

import ContentContainer from 'containers/content-container/content-container';
import ItemPage from 'components/item-page/item-page';
import Navbar from 'components/navbar/navbar';

import styles from './main.layout.scss';

const MainLayout = props => (
  <div styleName="wrapper">
    <Navbar user={props.currentUser} />
    <div styleName="content">
      <Switch>
        <Route exact path="/browse">
          <div>
            <Header inverted>Recent</Header>
            <Divider inverted />
            <ContentContainer by="recent" />
            <Header inverted>Popular</Header>
            <Divider inverted />
            <ContentContainer by="popular" />
          </div>
        </Route>
        <Route path="/browse/bikes">
          <div styleName="content">
            <Header inverted>Bikes</Header>
            <ContentContainer categories={['bike']} />
          </div>
        </Route>
        <Route path="/browse/gear">
          <div styleName="content">
            <Header inverted>Gear</Header>
            <ContentContainer categories={['gear']} />
          </div>
        </Route>
        <Route path="/browse/tracks">
          <div styleName="content">
            <Header inverted>Tracks</Header>
            <ContentContainer categories={['track']} />
          </div>
        </Route>
        <Route path="/browse/id/:id" component={ItemPage} />
      </Switch>
    </div>
  </div>
);

MainLayout.defaultProps = {
  currentUser: null,
};

MainLayout.propTypes = {
  currentUser: PropTypes.object,
};

export default cssModules(MainLayout, styles);
