import React, { useState, useEffect, HtmlHTMLAttributes } from 'react';
import moment from 'moment';
import bootbox from 'bootbox';
import { Reading } from '../api/clients/readings';
import { Api } from '../api';

export const Dashboard: React.FunctionComponent = () => {
    const [readings, setReadings] = useState<Reading[]>([]);
    const [newReading, setNewReading] = useState<number | undefined>();

    useEffect(() => {
        Api.Readings.get()
            .then(({ data }) => {
                setReadings(data);
            });
    }, []);

    const onClickAdd: React.MouseEventHandler<HTMLButtonElement> = async event => {
        if (newReading) {
            const { data } = await Api.Readings.add(newReading);
            const response = await Api.Readings.getById(data);
            setNewReading(undefined);

            setReadings([response.data, ...readings]);
        }
    }

    const onChangeAddValue: React.ChangeEventHandler<HTMLInputElement> = event => {
        const value = Number(event.currentTarget.value) || undefined;
        setNewReading(value);
    }

    const onClickDelete = (readingId: string) => {
        bootbox.confirm('Are you sure you want to remove this reading?', async (result: boolean) => {
            if (result) {
                const response = await Api.Readings.remove(readingId);
                setReadings([...readings.filter(reading => reading.readingId !== readingId)]);
            }
        })
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="card shadow-sm w-50">
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
            <table className="table my-4">
                <colgroup>
                    <col span={2} />
                    <col width={1} />
                </colgroup>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        readings.sort((a, b) => moment(a.taken).isBefore(b.taken) ? 1 : -1).map(reading =>
                            <tr key={reading.readingId}>
                                <td>{moment(`${reading.taken}Z`).format('lll')}</td>
                                <td>{reading.value}</td>
                                <td>
                                    <div className="btn btn-danger" onClick={() => onClickDelete(reading.readingId)}>Remove</div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}