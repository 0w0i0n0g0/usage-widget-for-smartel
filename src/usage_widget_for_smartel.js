const your_phone_number = ""
const your_name = ""
const your_password = ""



/*Don't touch here!*/
let code = await new Request("https://raw.githubusercontent.com/0w0i0n0g0/usage_widget_for_smartel/main/src/usage_widget_for_smartel_script.js").loadString()
eval("async function fn(hp_no, user_nm, pwd) {" + code + "}")
await fn(your_phone_number, your_name, your_password)