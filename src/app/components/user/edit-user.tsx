import React, { useState, useEffect } from 'react';
import { ROLES } from '../../constants';
import { EditUserModel } from '../../api/clients/user';
import { Api } from '../../api';
import { useParams, Link } from 'react-router-dom';
import bootbox from 'bootbox';

export const EditUser: React.FunctionComponent = () => {
    const [user, setUser] = useState<EditUserModel>({
        username: '',
        firstname: '',
        lastname: '',
        roles: [],
    });

    const params = useParams<{ userid?: string }>()

    useEffect(() => {
        const userid = Number(params.userid);
        if (userid) {
            Api.User.getUser(userid)
                .then(response => {
                    setUser({
                        ...response.data,
                        roles: [],
                    });
                })
                .catch(error => {
                    bootbox.alert('Error in loading user.');
                })
        }

    }, []);

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
        }
    }

    return (
        <div className="row justify-content-center form-group">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header">
                        <span className="font-weight-bold">Edit</span>
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

                            <div className="col">
                                <div className="form-group">
                                    <label>Roles</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="button" className="btn btn-primary mx-1" onClick={onClickAdd}>Save</button>
                            <Link to="/users" className="btn btn-secondary mx-1">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}