const your_phone_number = ""
const your_name = ""
const your_password = ""



/*Don't touch here!*/
var code = await new Request("").loadString()
eval("async function fn(hp_no, user_nm, pwd) {" + code + "}")
await fn(your_phone_number, your_name, your_password)