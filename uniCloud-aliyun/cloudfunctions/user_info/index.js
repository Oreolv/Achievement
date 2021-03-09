const uniID = require('uni-id')
exports.main = async function(event,context) {
	const{uid} = event
	const res = await uniID.getUserInfo({
    uid: uid,
    field: ['count','des']
  })
	return res
}