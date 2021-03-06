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

export const add_list = (data) => {
	return $http({
		url: 'add_list',
		data
	})
}

export const add_love = (data) => {
	return $http({
		url: 'add_love',
		data
	})
}

export const delete_list = (data) => {
	return $http({
		url: 'delete_list',
		data
	})
}

export const delete_love = (data) => {
	return $http({
		url: 'delete_love',
		data
	})
}

export const update_list = (data) => {
	return $http({
		url: 'update_list',
		data
	})
}

export const update_love = (data) => {
	return $http({
		url: 'update_love',
		data
	})
}