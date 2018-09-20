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

import {Self} from "@wireapp/api-client/dist/commonjs/self";

export const CONSENT_GET_START = 'CONSENT_GET_START';
export const CONSENT_GET_SUCCESS = 'CONSENT_GET_SUCCESS';
export const CONSENT_GET_FAILED = 'CONSENT_GET_FAILED';

export const CONSENT_SET_START = 'CONSENT_SET_START';
export const CONSENT_SET_SUCCESS = 'CONSENT_SET_SUCCESS';
export const CONSENT_SET_FAILED = 'CONSENT_SET_FAILED';

export const HANDLE_SET_START = 'HANDLE_SET_START';
export const HANDLE_SET_SUCCESS = 'HANDLE_SET_SUCCESS';
export const HANDLE_SET_FAILED = 'HANDLE_SET_FAILED';

export const SELF_FETCH_START = 'SELF_FETCH_START';
export const SELF_FETCH_SUCCESS = 'SELF_FETCH_SUCCESS';
export const SELF_FETCH_FAILED = 'SELF_FETCH_FAILED';

export const startSetHandle = (params?: any) => ({
  params,
  type: HANDLE_SET_START,
});

export const successfulSetHandle = (selfUser: Self) => ({
  payload: selfUser,
  type: HANDLE_SET_SUCCESS,
});

export const failedSetHandle = (error?: any) => ({
  payload: error,
  type: HANDLE_SET_FAILED,
});

export const startFetchSelf = (params?: any) => ({
  params,
  type: SELF_FETCH_START,
});

export const successfulFetchSelf = (selfUser: Self) => ({
  payload: selfUser,
  type: SELF_FETCH_SUCCESS,
});

export const failedFetchSelf = (error?: any) => ({
  payload: error,
  type: SELF_FETCH_FAILED,
});

export const startGetConsents = (params?: any) => ({
  params,
  type: CONSENT_GET_START,
});

export const successfulGetConsents = consents => ({
  payload: consents,
  type: CONSENT_GET_SUCCESS,
});

export const failedGetConsents = (error?: any) => ({
  payload: error,
  type: CONSENT_GET_FAILED,
});

export const startSetConsent = (params?: any) => ({
  params,
  type: CONSENT_SET_START,
});

export const successfulSetConsent = consent => ({
  payload: consent,
  type: CONSENT_SET_SUCCESS,
});

export const failedSetConsent = (error?: any) => ({
  payload: error,
  type: CONSENT_SET_FAILED,
});
