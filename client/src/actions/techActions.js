import { GET_TECHS, ADD_TECH, DELETE_TECH, SET_LOADING, TECHS_ERROR } from './types';
import axios from 'axios';

export const getTechs = () => {
	return async (dispatch) => {
		try {
			setLoading();

			const res = await axios.get('/api/techs');

			dispatch({
				type: GET_TECHS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: TECHS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const addTech = (tech) => {
	return async (dispatch) => {
		try {
			setLoading();

			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const res = await axios.post('/api/techs', tech, config);

			dispatch({
				type: ADD_TECH,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: TECHS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const deleteTech = (id) => {
	return async (dispatch) => {
		try {
			setLoading();

			await axios.delete(`/api/techs/${id}`);

			dispatch({
				type: DELETE_TECH,
				payload: id
			});
		} catch (err) {
			dispatch({
				type: TECHS_ERROR,
				payload: err.response.statusText
			});
		}
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
