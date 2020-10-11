import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import moment from 'moment';
import bootbox from 'bootbox';
import { AxiosError } from 'axios';
import { Pager } from 'react-ts-pager';
import classNames from 'classnames';

import { Api } from '../../api';

import { getReadings, getCurrentPage, getTotalReadings } from '../../stores/readings/selectors';
import { setReadings, removeReading, setCurrentPage, setTotalReadings } from '../../stores/readings/actions';
import { AddReading } from './add-reading';

export const Readings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const readings = useSelector(getReadings);
    const currentPage = useSelector(getCurrentPage);
    const totalReadings = useSelector(getTotalReadings)
    const itemsPerPage = 10;

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (currentPage) {
            setIsLoading(true);
            Api.Readings.get(currentPage, itemsPerPage)
                .then(({ data, headers }) => {
                    const totalReadings = Number(headers['x-total-count']) || data.length;
                    batch(() => {
                        dispatch(setReadings(data));
                        dispatch(setTotalReadings(totalReadings));
                    });
                })
                .catch((error: AxiosError) => {
                    bootbox.alert(`There was an error attempting to get the readings. ${error.message}`);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [currentPage, totalReadings, itemsPerPage]);

    // Set the current page to on on first page load triggering a data fetch
    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, []);

    const onClickDelete = (readingId: string) => {
        bootbox.confirm('Are you sure you want to remove this reading?', async (result: boolean) => {
            if (result) {
                try {
                    await Api.Readings.remove(readingId);
                    dispatch(removeReading(readingId));
                    dispatch(setTotalReadings(totalReadings - 1));
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
            <div className="position-relative">
                <div className={classNames('position-absolute loading-position d-none', {
                    'd-inline-block': isLoading
                })} >
                    <div className="spinner-border loading-size" role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>
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
                            readings.map(reading =>
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
        </div>
    )
}