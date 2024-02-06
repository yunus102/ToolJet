import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const organizationUserService = {
  archiveAll,
  unarchiveAll,
  archive,
  unarchive,
  create,
  changeRole,
  inviteBulkUsers,
  updateOrgUser,
};

function create(id, body) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization_users`, requestOptions).then(handleResponse);
}

function inviteBulkUsers(formData) {
  const requestOptions = { method: 'POST', headers: authHeader(true), body: formData, credentials: 'include' };
  return fetch(`${config.apiUrl}/organization_users/upload_csv`, requestOptions).then(handleResponse);
}

// Deprecated
function changeRole(id, role) {
  const body = {
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization_users/${id}/change_role`, requestOptions).then(handleResponse);
}

function archiveAll(userId) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include' };
  return fetch(`${config.apiUrl}/organization_users/${userId}/archive-all`, requestOptions).then(handleResponse);
}

function unarchiveAll(userId) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include' };
  return fetch(`${config.apiUrl}/organization_users/${userId}/unarchive-all`, requestOptions).then(handleResponse);
}

function archive(id, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ ...(organizationId && { organizationId }) }),
  };
  return fetch(`${config.apiUrl}/organization_users/${id}/archive`, requestOptions).then(handleResponse);
}

function unarchive(id, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ ...(organizationId && { organizationId }) }),
  };
  return fetch(`${config.apiUrl}/organization_users/${id}/unarchive`, requestOptions).then(handleResponse);
}

function updateOrgUser(id, body) {
  const requestOptions = { method: 'PUT', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization_users/${id}`, requestOptions).then(handleResponse);
}
