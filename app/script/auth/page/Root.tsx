/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import * as React from 'react';
import * as LanguageSelector from '../module/selector/LanguageSelector';
import {StyledApp} from '@wireapp/react-ui-kit';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Index from './Index';
import InitialInvite from './InitialInvite';
import Login from './Login';
import TeamName from './TeamName';
import CreateAccount from './CreateAccount';
import CreatePersonalAccount from './CreatePersonalAccount';
import ConversationJoin from './ConversationJoin';
import ChooseHandle from './ChooseHandle';
import ClientManager from './ClientManager';
import ConversationJoinInvalid from './ConversationJoinInvalid';
import Verify from './Verify';
import HistoryInfo from './HistoryInfo';
import {IntlProvider, addLocaleData} from 'react-intl';
import {connect} from 'react-redux';
import * as de from 'react-intl/locale-data/de';
import {ROUTE} from '../route';
const SUPPORTED_LOCALE = require('../supportedLocales');
import * as CookieSelector from '../module/selector/CookieSelector';
import {APP_INSTANCE_ID} from '../config';
import SingleSignOn from './SingleSignOn';
import {ThunkDispatch} from 'redux-thunk';
import {Api, RootState} from '../module/reducer';
import {AnyAction} from 'redux';
import ROOT_ACTIONS from '../module/action/';

addLocaleData([...de]);

interface Props extends React.HTMLAttributes<Root> {}

interface ConnectedProps {
  language: string;
}

interface DispatchProps {
  startPolling: (name?: string, interval?: number, asJSON?: boolean) => Promise<void>;
  safelyRemoveCookie: (name: string, value: string) => Promise<void>;
  stopPolling: (name?: string) => Promise<void>;
}

interface State {}

class Root extends React.Component<Props & ConnectedProps & DispatchProps, State> {
  componentDidMount = () => {
    this.props.startPolling();
    window.onbeforeunload = () => {
      this.props.safelyRemoveCookie(CookieSelector.COOKIE_NAME_APP_OPENED, APP_INSTANCE_ID);
      this.props.stopPolling();
    };
  };

  loadLanguage = language => {
    return SUPPORTED_LOCALE.includes(language) ? require(`../../../i18n/webapp-${language}.json`) : {};
  };

  render = () => {
    const {language} = this.props;
    return (
      <IntlProvider locale={language} messages={this.loadLanguage(language)}>
        <StyledApp>
          <Router hashType="noslash">
            <Switch>
              <Route exact path={ROUTE.INDEX} component={Index} />
              <Route path={ROUTE.CLIENTS} component={ClientManager} />
              <Route path={ROUTE.LOGIN} component={Login} />
              <Route path={ROUTE.CONVERSATION_JOIN} component={ConversationJoin} />
              <Route path={ROUTE.CONVERSATION_JOIN_INVALID} component={ConversationJoinInvalid} />
              <Route path={ROUTE.CREATE_TEAM} component={TeamName} />
              <Route path={ROUTE.CREATE_TEAM_ACCOUNT} component={CreateAccount} />
              <Route path={ROUTE.CREATE_ACCOUNT} component={CreatePersonalAccount} />
              <Route path={`${ROUTE.INVITE}/:invitationCode?`} component={CreatePersonalAccount} />
              <Route path={ROUTE.VERIFY} component={Verify} />
              <Route path={ROUTE.INITIAL_INVITE} component={InitialInvite} />
              <Route path={ROUTE.CHOOSE_HANDLE} component={ChooseHandle} />
              <Route path={ROUTE.HISTORY_INFO} component={HistoryInfo} />
              <Route path={ROUTE.SSO} component={SingleSignOn} />
              <Redirect to={ROUTE.INDEX} />
            </Switch>
          </Router>
        </StyledApp>
      </IntlProvider>
    );
  };
}

export default connect(
  (state: RootState) => ({language: LanguageSelector.getLanguage(state)}),
  (dispatch: ThunkDispatch<RootState, Api, AnyAction>): DispatchProps => ({
    startPolling: (name?: string, interval?: number, asJSON?: boolean) =>
      dispatch(ROOT_ACTIONS.cookieAction.startPolling(name, interval, asJSON)),
    safelyRemoveCookie: (name: string, value: string) =>
      dispatch(ROOT_ACTIONS.cookieAction.safelyRemoveCookie(name, value)),
    stopPolling: (name?: string) => dispatch(ROOT_ACTIONS.cookieAction.stopPolling(name)),
  })
)(Root);
