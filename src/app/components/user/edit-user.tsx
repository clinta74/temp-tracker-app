import React, { useState, useEffect } from 'react';
import { ROLES } from '../../constants';
import { EditUserModel } from '../../api/clients/user';
import { Api } from '../../api';
import { Link,  RouteComponentProps,  useHistory } from 'react-router-dom';
import bootbox from 'bootbox';
import { AxiosError } from 'axios';
import { EditRoles } from './edit-roles';

interface EditUserProps {
    userid: number;
}

export const EditUser: React.FunctionComponent<EditUserProps> = ({ userid }) => {
    const [user, setUser] = useState<EditUserModel>({
        userId: 0,
        username: '',
        firstname: '',
        lastname: '',
        roles: [],
    });

    const history = useHistory();

    useEffect(() => {
        if (userid) {
            Api.User.getUser(userid)
                .then(({data}) => {
                    setUser({
                        ...data,
                        roles: (data.roles && data.roles.map(role => role.name)) ?? [],
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

    const onClickSave: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (user) {
            Api.User.update(user)
            .then(() => {
                history.push(`/users`);
            })
            .catch((error: AxiosError) => {
                bootbox.alert(`${error.message}`);
            });;
        }
    }

    const onChangeRoles = (roles: string[]) => {
        setUser({
            ...user,
            roles,
        })
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
                                    <EditRoles value={user.roles} onChange={onChangeRoles}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="button" className="btn btn-primary mx-1" onClick={onClickSave}>Save</button>
                            <Link to="/users" className="btn btn-secondary mx-1">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}