import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import bootbox from 'bootbox';
import { AxiosError } from 'axios';
import { Pager, pageItems } from 'react-ts-pager';

import { Api } from '../../api';

import { getReadings, getCurrentPage, getTotalReadings } from '../../stores/readings/selectors';
import { setReadings, removeReading, setCurrentPage } from '../../stores/readings/actions';
import { AddReading } from './add-reading';

export const Readings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const readings = useSelector(getReadings);
    const currentPage = useSelector(getCurrentPage);
    const totalReadings = useSelector(getTotalReadings)
    const itemsPerPage = 5;

    useEffect(() => {
        Api.Readings.get()
            .then(({ data, headers }) => {
                const totalReadings = headers['X-Total-Count'] || data.length;
                dispatch(setReadings(data));
                dispatch(setCurrentPage(1));
            })
            .catch((error: AxiosError) => {
                bootbox.alert(`There was an error attempting to get the readings. ${error.message}`);
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

    const pagedReadings = pageItems(readings.sort((a, b) => moment(a.taken).isBefore(b.taken) ? 1 : -1), currentPage, itemsPerPage);

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
                        pagedReadings.map(reading =>
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
            <div className="d-flex justify-content-end">
                <div>
                    <Pager
                        currentPage={currentPage}
                        total={totalReadings}
                        itemsPerPage={itemsPerPage}
                        visiblePages={4} // Number of page numbered buttons to show.
                        onPageChanged={(currentPage) => dispatch(setCurrentPage(currentPage))} // Callback that receivce the page number that has been clicked.
                    />
                </div>
            </div>
        </div>
    )
}