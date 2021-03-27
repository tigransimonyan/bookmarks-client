import { useContext, createContext, useReducer } from 'react';
import { message } from 'antd';
import api from '../../api';
import reducer from './reducer';

const bookmarkContext = createContext();

export function ProvideBookmark({ children }) {
  const context = useProvideBookmark();
  return <bookmarkContext.Provider value={context}>{children}</bookmarkContext.Provider>;
}

export function useBookmarks() {
  return useContext(bookmarkContext);
}

const initialState = {
  limit: 0,
  total: 0,
  tags: [],
  docs: [],
  page: 1,
};

function useProvideBookmark() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const list = (params) => {
    return api
      .get('/bookmarks', { params })
      .then((response) => dispatch({ type: 'list', payload: response.data }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const add = (payload) => {
    return api
      .post('/bookmarks', payload)
      .then((response) => dispatch({ type: 'add', payload: response.data }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const update = (id, payload) => {
    return api
      .put('/bookmarks/'.concat(id), payload)
      .then((response) => dispatch({ type: 'update', payload: response.data }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const remove = (id) => {
    return api
      .delete('/bookmarks/'.concat(id))
      .then(() => dispatch({ type: 'remove', payload: { _id: id } }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const drop = () => {
    return api
      .delete('/bookmarks/')
      .then(() => dispatch({ type: 'drop' }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const getTags = () => {
    return api
      .get('/bookmarks/tags')
      .then((response) => dispatch({ type: 'getTags', payload: response.data }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const bulkRemove = (ids) => {
    return api
      .post('/bookmarks/bulk/delete', { ids })
      .then(() => dispatch({ type: 'bulkRemove', payload: { ids } }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  const bulkUpdate = (ids, data) => {
    return api
      .post('/bookmarks/bulk/update', { ids, data })
      .then(() => dispatch({ type: 'bulkUpdate', payload: { ids, data } }))
      .catch((response) => {
        message.error(response.message);
      });
  };

  return {
    data: state,
    bulkRemove,
    bulkUpdate,
    getTags,
    drop,
    add,
    list,
    update,
    remove,
  };
}
