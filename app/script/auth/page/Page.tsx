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

import {connect} from 'react-redux';
import {REGISTER_FLOW} from '../module/selector/AuthSelector';
import * as AuthSelector from '../module/selector/AuthSelector';
import * as React from 'react';
import {ROUTE} from '../route';
import {Redirect} from 'react-router';
import UnsupportedBrowser from '../component/UnsupportedBrowser';
import {RootState, Api} from '../module/reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {RegistrationDataState} from '../module/reducer/authReducer';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hasAccountData?: boolean;
  hasTeamData?: boolean;
  isAuthenticated?: boolean;
}

interface ConnectedProps {
  account: RegistrationDataState;
  currentFlow: string;
  isStateAuthenticated: boolean;
}

interface DispatchProps {}

const hasInvalidAccountData = account => !account.name || !account.email || !account.password;

const hasInvalidTeamData = ({team}) => !team || !team.name;

const redirects = {
  [REGISTER_FLOW.PERSONAL]: ROUTE.CREATE_ACCOUNT,
  [REGISTER_FLOW.GENERIC_INVITATION]: ROUTE.CREATE_ACCOUNT,
  [REGISTER_FLOW.TEAM]: ROUTE.CREATE_TEAM,
};

const Page: React.SFC<Props & ConnectedProps & DispatchProps> = ({
  hasAccountData,
  hasTeamData,
  currentFlow,
  isAuthenticated,
  isStateAuthenticated,
  account,
  children,
}) => {
  if (
    (hasAccountData && hasInvalidAccountData(account) && !isStateAuthenticated) ||
    (hasTeamData && hasInvalidTeamData(account) && !isStateAuthenticated) ||
    (isAuthenticated && !isStateAuthenticated)
  ) {
    return <Redirect to={redirects[currentFlow] || ROUTE.INDEX} />;
  }
  return <UnsupportedBrowser>{children}</UnsupportedBrowser>;
};

export default connect(
  (state: RootState): ConnectedProps => ({
    account: AuthSelector.getAccount(state),
    currentFlow: AuthSelector.getCurrentFlow(state),
    isStateAuthenticated: AuthSelector.isAuthenticated(state),
  }),
  (dispatch: ThunkDispatch<RootState, Api, AnyAction>): DispatchProps => ({})
)(Page);
