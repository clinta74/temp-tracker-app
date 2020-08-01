import React, { useState } from 'react';
import { Api } from '../../api';
import { useDispatch, batch, useSelector } from 'react-redux';
import { addReading, setCurrentPage, setTotalReadings } from '../../stores/readings/actions';
import { getTotalReadings } from '../../stores/readings/selectors';

export const AddReading: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [newReading, setNewReading] = useState<number | undefined>();
    const totalReadings = useSelector(getTotalReadings);

    const onClickAdd: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (newReading) {
            const { data } = await Api.Readings.add(newReading);
            setNewReading(undefined);

            batch(() => {
                dispatch(setTotalReadings(totalReadings + 1));
                dispatch(setCurrentPage(1));
            });
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