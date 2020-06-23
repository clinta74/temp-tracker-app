import React, { useEffect } from 'react';
import { Api } from '../../api';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setRoles, removeUser } from '../../stores/users/actions';
import { getUsers } from '../../stores/users/selectors';
import { Link } from 'react-router-dom';

export const Users: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);

    useEffect(() => {
        Api.User.get()
            .then(({ data, headers }) => {
                const totalReadings = headers['X-Total-Count'];
                dispatch(setUsers(data));
            })
            .catch((error: AxiosError) => {
                bootbox.alert(`There was an error attempting to get the users. ${error.message}`);
            });

        Api.Roles.get()
            .then(({ data, headers }) => {
                const totalReadings = headers['X-Total-Count'];
                dispatch(setRoles(data));
            })
            .catch((error: AxiosError) => {
                bootbox.alert(`There was an error attempting to get the roles. ${error.message}`);
            });
    }, []);

    const onClickDelete = (userId: number) => {
        Api.User.remove(userId)
            .then(() => {
                dispatch(removeUser(userId));
            })
            .catch((error: AxiosError) => {
                bootbox.alert(`There was an error attempting to delete the user. ${error.message}`);
            });
    }

    return (
        <div>
            <div className="form-group d-flex justify-content-end">
                <Link to="users/add" className="btn btn-secondary">Add</Link>
            </div>
            <table className="table">
                <colgroup>
                    <col span={3} />
                    <col width={1} />
                </colgroup>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.sort((a, b) => a.lastname > b.lastname ? 1 : -1).map(user =>
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>
                                    <div className="text-nowrap">
                                        <Link to={`users/${user.userId}`} className="btn btn-primary mx-1">Edit</Link>
                                        <button type="button" className="btn btn-danger mx-1" onClick={() => onClickDelete(user.userId)}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}