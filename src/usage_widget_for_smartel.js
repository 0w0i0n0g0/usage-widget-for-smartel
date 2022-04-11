let your_phone_number = "" //예시 : 홍길동
let your_name = "" //예시 : 01012345678
let your_password = "" //예시 : qwer1234@



/*Don't touch here!*/
let NAME = "user_nm"
let PHONE = "hp_no"
let PASSWORD = "pwd"
if(your_phone_number == "" && your_name == "" && your_password == "" && Keychain.contains(NAME) && Keychain.contains(PHONE) && Keychain.contains(PASSWORD))
{
    your_name = Keychain.get(NAME)
    your_phone_number = Keychain.get(PHONE)
    your_password = Keychain.get(PASSWORD)
}
let code = await new Request("https://raw.githubusercontent.com/0w0i0n0g0/usage_widget_for_smartel/main/src/usage_widget_for_smartel_script.js").loadString()
eval("async function fn(hp_no, user_nm, pwd) {" + code + "}")
await fn(your_phone_number, your_name, your_password)