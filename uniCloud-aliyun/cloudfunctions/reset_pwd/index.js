const uniID = require('uni-id')
exports.main = async function(event,context) {
	const encResult = await uniID.encryptPwd('Eve')
	return {
    encResult
  }
}