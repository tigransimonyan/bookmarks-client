import { useContext, createContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { useCookies } from 'react-cookie';
import api from '../../api';
import jwtDecode from 'jwt-decode';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let payload = { exp: 0 };
    try {
      payload = jwtDecode(cookies.user?.accessToken);
    } catch (e) {}
    const now = new Date().getTime() / 1000;
    if (payload.exp > now) {
      const token = `Bearer ${cookies.user?.accessToken}`;
      api.defaults.headers.common['Authorization'] = token;
      setUser(cookies.user);
    } else {
      api.defaults.headers.common['Authorization'] = undefined;
      setUser(null);
    }
  }, [cookies.user]);

  const signin = (data) => {
    return api
      .post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const token = `Bearer ${response.data.accessToken}`;
        api.defaults.headers.common['Authorization'] = token;
        setUser(response.data);
        setCookie('user', response.data, { path: '/' });
      })
      .catch((response) => {
        message.error(response.message);
      });
  };

  const signup = (data) => {
    return api
      .post('/auth/register', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const token = `Bearer ${response.data.accessToken}`;
        api.defaults.headers.common['Authorization'] = token;
        setUser(response.data);
        setCookie('user', response.data, { path: '/' });
      })
      .catch((response) => {
        message.error(response.message);
      });
  };

  const signout = () => {
    removeCookie('user');
    setUser(null);
  };

  return {
    user,
    signin,
    signup,
    signout,
  };
}
