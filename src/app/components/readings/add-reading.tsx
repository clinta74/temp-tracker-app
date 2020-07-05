import React, { useState } from 'react';
import { Api } from '../../api';
import { useDispatch } from 'react-redux';
import { addReading } from '../../stores/readings/actions';

export const AddReading: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [newReading, setNewReading] = useState<number | undefined>();

    const onClickAdd: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (newReading) {
            const { data } = await Api.Readings.add(newReading);
            const response = await Api.Readings.getById(data);
            setNewReading(undefined);

            dispatch(addReading(response.data));
        }
    }

    const onChangeAddValue: React.ChangeEventHandler<HTMLInputElement> = event => {
        const value = Number(event.currentTarget.value) || undefined;
        setNewReading(value);
    }

    return (
        <div className="row justify-content-center form-group">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-header">
                        <span className="font-weight-bold">Add</span>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Temp</label>
                            <input type="number" className="form-control" value={newReading ?? ''} onChange={onChangeAddValue} />
                        </div>

                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={onClickAdd}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}