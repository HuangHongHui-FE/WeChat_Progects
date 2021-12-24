const Base64 = require('./Base64.js');

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');
function myfunc() {
  let date = new Date();
  date.setHours(date.getHours() + 87677);
  let srcT = date.toISOString();
  console.log(srcT);
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };
  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  const accesskey = 'QSZYr****CIP98V1DW';
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64,    accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);
  console.log(policyBase64);
  console.log("myfunc....");
  console.log(signature);
}
module.exports.myfunc = myfunc; 