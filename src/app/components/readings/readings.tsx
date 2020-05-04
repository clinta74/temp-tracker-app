import React, { useEffect } from 'react';
import moment from 'moment';
import bootbox from 'bootbox';
import { Api } from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { getReadings } from '../../stores/readings/selectors';
import { setReadings, removeReading } from '../../stores/readings/actions';
import { AddReading } from './add-reading';

export const Readings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const readings = useSelector(getReadings);

    useEffect(() => {
        Api.Readings.get()
            .then(({ data }) => {
                dispatch(setReadings(data));
            });
    }, []);

    const onClickDelete = (readingId: string) => {
        bootbox.confirm('Are you sure you want to remove this reading?', async (result: boolean) => {
            if (result) {
                try {
                    await Api.Readings.remove(readingId);
                    dispatch(removeReading(readingId));
                }
                catch (error) {
                    bootbox.alert('There was an error attempting to remove this reading.');
                }
            }
        })
    }

    return (
        <div>
            <AddReading />
            <table className="table">
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