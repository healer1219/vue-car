import axios from 'axios'
let baseURL = 'http://localhost:8083/'

let httpForm = axios.create({
	baseURL: baseURL,
	withCredentials: false,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	},
	transformRequest: [function(data, headers) {
		let newData = '';
		for(let k in data) {
			if(data.hasOwnProperty(k) === true) {
				newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
			}
		}
		return newData;
	}]
});

let httpJson = axios.create({
	baseURL: baseURL,
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json'
	}
});

function apiAxiosForm(method, url, params, response) {
	httpForm({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
	}).then(function(res) {
		response(res);
	}).catch(function(err) {
		response(err);
	})
}

function apiAxiosJson(method, url, params, response) {
	httpJson({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
	}).then(function(res) {
		response(res);
	}).catch(function(err) {
		response(err);
	})
}

export default {
	get: function(url, params, response) {
		return apiAxiosForm('GET', url, params, response)
	},
	post: function(isJson, url, params, response) {
		if(isJson===true) {
			return apiAxiosJson('POST', url, params, response)
		}
		return apiAxiosForm('POST', url, params, response)
	},
	put: function(isJson, url, params, response) {
		if(isJson===true) {
			return apiAxiosJson('PUT', url, params, response)
		}
		return apiAxiosForm('PUT', url, params, response)
	},
	delete: function(url, params, response) {
		return apiAxiosForm('DELETE', url, params, response)
	}
}