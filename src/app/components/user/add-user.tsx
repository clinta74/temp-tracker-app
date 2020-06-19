import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Api } from '../../api';
import { AxiosError } from 'axios';
import bootbox from 'bootbox';

import { NewUser } from '../../api/clients/user';
import { ROLES } from '../../constants';
import { checkPasswordStrength, Strength } from '../../services/password-checker';

export const AddUser: React.FunctionComponent = () => {
    const history = useHistory();
    const [user, setUser] = useState<NewUser>({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        roles: [
            ROLES.USER,
        ],
    });

    const isPasswordSecure = (password: string) => checkPasswordStrength(password, Strength.medium);

    const onChangeUser: React.ChangeEventHandler<HTMLInputElement> = event => {
        const key = event.currentTarget.name;
        if (Object.keys(user).includes(key)) {
            const newUser = {
                ...user,
                [key]: event.currentTarget.value,
            };
            setUser(newUser);
        }
    }

    const onClickAdd: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (user) {
            if (isPasswordSecure(user.password)) {
                Api.User.add(user)
                    .then(() => {
                        history.push(`/users`);
                    })
                    .catch((error: AxiosError) => {
                        bootbox.alert(`${error.message}`);
                    });
            }
            else {
                bootbox.alert('Password is not strong enough.')
            }
        }
    }

    return (
        <div className="row justify-content-center form-group">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header">
                        <span className="font-weight-bold">Add</span>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" value={user?.firstname ?? ''} onChange={onChangeUser} name="firstname" />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" value={user?.lastname ?? ''} onChange={onChangeUser} name="lastname" />
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" value={user?.username ?? ''} onChange={onChangeUser} name="username" />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={user?.password ?? ''} onChange={onChangeUser} name="password" />
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Roles</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="button" className="btn btn-primary mx-1" onClick={onClickAdd}>Add</button>
                            <Link to="/users" className="btn btn-secondary mx-1">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}