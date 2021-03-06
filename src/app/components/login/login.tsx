import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import bootbox from 'bootbox';
import { Api } from '../../api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../stores/auth/actions';

export const Login: React.FunctionComponent = () => {
    const usernameInput = React.createRef<HTMLInputElement>();
    const passwordInput = React.createRef<HTMLInputElement>();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const redirect = queryString.parse(location.search)?.redirect as string ?? '/';

    useEffect(() => {
        usernameInput.current?.focus();
    }, []);

    const onClickLogin: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        const username = usernameInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';

        if (username.trim().length && password.trim().length) {
            setLoading(true);
            Api.Auth.login(username.trim(), password.trim())
                .then(({ data }) => {
                    const unblock = history.block();
                    dispatch(setToken(data));
                    unblock();
                    history.replace(redirect);
                })
                .catch(() => {
                    bootbox.alert('There was an error with your login.');
                    setLoading(false);
                });
        }
    }

    return (
        <div className="d-flex justify-content-center w-100">
            <div className="login-card">
                <div className="card shadow-sm">
                    <div className="card-header">
                        <span className="font-weight-bold">Login</span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onClickLogin}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" name="username" ref={usernameInput} autoFocus />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" ref={passwordInput} />
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block w-50" disabled={loading}>
                                    {
                                        loading &&
                                        <>
                                            <span>Loading</span>
                                            <span className="spinner-border spinner-border-sm ml-1" role="status" aria-hidden="true"></span>
                                        </>
                                        ||
                                        <span>Login</span>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
