import $http from '../http.js'

export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}

export const get_love = (data) => {
	return $http({
		url: 'get_love',
		data
	})
}

export const update_movie = (data) => {
	return $http({
		url: 'update_movie',
		data
	})
}
