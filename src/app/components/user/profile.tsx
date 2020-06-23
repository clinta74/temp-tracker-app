import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import bootbox from 'bootbox';

import { getDecoded, getUserId } from '../../stores/auth/selectors';
import { Api } from '../../api';
import { checkPasswordStrength, Strength } from '../../services/password-checker';

interface ChangePassword {
    old: string;
    new: string;
    confirm: string;
}

export const Profile: React.FunctionComponent = () => {
    const decoded = useSelector(getDecoded);
    const userId = useSelector(getUserId);

    const [ changePassword, setChangePassword ] = useState<ChangePassword>({
        old: '',
        new: '',
        confirm: '',
    });

    const onChangeField: React.ChangeEventHandler<HTMLInputElement> = event => {
        const { value, name } = event.currentTarget;
        setChangePassword({
            ...changePassword,
            [name]: value,
        });
    }

    const onClickUpdatePassword: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (changePassword.old.trim().length == 0 || changePassword.new.trim().length == 0 || changePassword.confirm.trim().length == 0) {
            return;
        }
        if (changePassword.new !== changePassword.confirm) {
            bootbox.alert('Your new password does not match', () =>{
                setChangePassword({
                    ...changePassword,
                    new: '',
                    confirm: '',
                });
            })
        }
        else if (!checkPasswordStrength(changePassword.new, Strength.medium)) {
            bootbox.alert('Your new password is not strong enough.  Please use atleast 8 characters, a capital letter with a number or symbol.', () =>{
                setChangePassword({
                    ...changePassword,
                    new: '',
                    confirm: '',
                });
            })
        }
        else {
            try {
                await Api.User.changePassword(userId, changePassword.new, changePassword.old);
                bootbox.alert('Your password has been updated.');
                setChangePassword({
                    old: '',
                    new: '',
                    confirm: '',
                });
            }
            catch (error) {
                bootbox.alert('There was a problem updating your password. Please make sure your old password was correct.');
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <div className="card">
                            <div className="card-header">
                                My Profile
                            </div>
                            <div className="card-body">
                                <label className="font-weight-bold">Username</label>
                                <div>{decoded.sub}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="form-group">
                        <div className="card">
                            <div className="card-header">
                                Change Password
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Old Password</label>
                                    <input type="password" name="old" required className="form-control" value={changePassword.old} onChange={onChangeField} />
                                </div>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" name="new" required className="form-control" value={changePassword.new} onChange={onChangeField} />
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirm" required className="form-control" value={changePassword.confirm} onChange={onChangeField} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={onClickUpdatePassword}>Update Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}