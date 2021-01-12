import {
	GET_LOGS,
	SET_LOADING,
	LOGS_ERROR,
	ADD_LOG,
	DELETE_LOG,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOG,
	SEARCH_LOGS
} from './types';
import axios from 'axios';

export const getLogs = () => {
	return async (dispatch) => {
		try {
			setLoading();

			const res = await axios.get('/api/logs');

			dispatch({
				type: GET_LOGS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: LOGS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const addLog = (log) => {
	return async (dispatch) => {
		try {
			setLoading();

			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const res = await axios.post('/api/logs', log, config);

			dispatch({
				type: ADD_LOG,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: LOGS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};
export const deleteLog = (id) => {
	return async (dispatch) => {
		try {
			setLoading();

			await axios.delete(`/api/logs/${id}`);

			dispatch({
				type: DELETE_LOG,
				payload: id
			});
		} catch (err) {
			dispatch({
				type: LOGS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const updateLog = (log) => {
	return async (dispatch) => {
		try {
			setLoading();

			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const res = await axios.put(`/api/logs/${log._id}`, log, config);

			dispatch({
				type: UPDATE_LOG,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: LOGS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const searchLogs = (text) => {
	return async (dispatch) => {
		try {
			setLoading();

			dispatch({
				type: SEARCH_LOGS,
				payload: text
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: LOGS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const setCurrent = (log) => {
	return {
		type: SET_CURRENT,
		payload: log
	};
};
export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
