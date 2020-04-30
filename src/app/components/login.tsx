import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Api } from '../api';
import { useDispatch } from 'react-redux';
import { setToken } from '../stores/auth/actions';

export const Login: React.FunctionComponent = () => {
    const usernameInput = React.createRef<HTMLInputElement>();
    const passwordInput = React.createRef<HTMLInputElement>();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const redirect = queryString.parse(location.search)?.redirect as string ?? '/';

    useEffect(() => {
        usernameInput.current?.focus();
    }, []);

    const onClickLogin: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();

        const username = usernameInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';

        if (username.trim().length && password.trim().length) {
            Api.Auth.login(username.trim(), password.trim())
                .then(({ data }) => {
                    const unblock = history.block();
                    dispatch(setToken(data.token));
                    unblock();
                    history.replace(redirect);
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

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}
