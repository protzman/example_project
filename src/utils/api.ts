import { useDispatch, useSelector } from 'react-redux';
const url = `http://localhost:8080`;
import {
  TokenRequest,
  TokenResponse,
  AcquisitionResponse,
  //TODO RENAME USER OBJECT TO SOMETHING LIKE AUTH'D USER / BASIC USER - EXTEND BASIC USER FOR USER RESPONSE?
  User,
  UserResponse,
} from './types';

interface HttpResponse<T> extends Response {
  data?: T;
}

const fetchAsync = async <T>(
  request: RequestInfo
): Promise<HttpResponse<T>> => {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.data = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response;
};

// TODO REVISIT AND RENAME
export const fetchToken = async ({
  user_id,
  password,
}: TokenRequest): Promise<HttpResponse<TokenResponse>> => {
  const response = await fetchAsync<TokenResponse>(
    new Request(`${url}/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        password,
      }),
    })
  );
  return response;
};

export const fetchAcquisitions = async (
  token: string
): Promise<HttpResponse<AcquisitionResponse[]>> => {
  const response = await fetchAsync<AcquisitionResponse[]>(
    new Request(`${url}/acquisitions`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  return response;
};

export const fetchUsers = async (
  token: string
): Promise<HttpResponse<User[]>> => {
  return await fetchAsync<User[]>(
    new Request(`${url}/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};

export const fetchUser = async (
  token: string,
  user_id: string
): Promise<HttpResponse<UserResponse>> => {
  return await fetchAsync<UserResponse>(
    new Request(`${url}/users/${user_id}`, {
      method: `GET`,
      headers: { Authorization: `Bearer ${token}` },
    })
  );
};
