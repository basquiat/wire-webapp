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

import authReducer from './authReducer';
import clientReducer from './clientReducer';
import cookieReducer from './cookieReducer';
import conversationReducer from './conversationReducer';
import inviteReducer from './inviteReducer';
import languageReducer from './languageReducer';
import runtimeReducer from './runtimeReducer';
import selfReducer from './selfReducer';
import {ThunkAction as ReduxThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {APIClient} from '@wireapp/api-client';
import {Account} from '@wireapp/core';
import {CookiesStatic} from 'js-cookie';

export type Api = {
  apiClient: APIClient,
  cookieStore: CookiesStatic,
  localStorage: Storage;
  core: Account;
};

export interface RootState {
}

export type ThunkAction<T = Promise<void>> = ReduxThunkAction<T, RootState, Api, AnyAction>;

const reducers = {
  authState: authReducer,
  clientState: clientReducer,
  conversationState: conversationReducer,
  cookieState: cookieReducer,
  inviteState: inviteReducer,
  languageState: languageReducer,
  runtimeState: runtimeReducer,
  selfState: selfReducer,
};

export default reducers;
