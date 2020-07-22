import React, { useEffect, ChangeEventHandler } from 'react';
import bootbox from 'bootbox';
import { Role } from '../../api/clients/roles';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles } from '../../stores/users/selectors';
import { Api } from '../../api';
import { setRoles } from '../../stores/users/actions';
import { AxiosError } from 'axios';

interface EditRolesProps {
    value: string[];
    onChange: (roles: string[]) => void;
}

export const EditRoles: React.FunctionComponent<EditRolesProps> = ({ value, onChange }) => {
    const dispatch = useDispatch();
    const roles = useSelector(getRoles);

    useEffect(() => {
        Api.Roles.get()
            .then(({ data }) => dispatch(setRoles(data)))
            .catch((error: AxiosError) => {
                bootbox.alert(`Error fetching roles: ${error.message}`)
            });
    }, []);

    const onChangeRole: ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.currentTarget.value;

        if (value.some(v => v === name)) {
            onChange(value.filter(v => v !== name));
        }
        else {
            onChange([...value, name]);
        }
    }

    return (
        <div className="row">
            {
                roles && roles.map(role =>
                    <div className="col-12 form-group" key={role.roleId}>
                        <div className="d-flex">
                            <div className="custom-control custom-switch">
                                <input className="custom-control-input" type="checkbox" id={`role_${role.roleId}`} value={role.name} onChange={onChangeRole} checked={value && value.some(v => v === role.name)} />
                                <label className="d-block text-capitalize custom-control-label" htmlFor={`role_${role.roleId}`}>{role.name}</label>
                                <div className="font-weight-lighter">{role.description}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}