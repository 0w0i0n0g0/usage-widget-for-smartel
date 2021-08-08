/*
This widget is for "Smartel" among South Korea's MVNO mobile carriers, so README is written in Korean.
이 위젯은 한국의 알뜰폰 통신사 중 "스마텔"을 대상으로 만들어졌으므로 한국어로 README가 쓰여졌습니다.

이 위젯은 해당 통신사와 어떠한 관계없이, 소비자의 편의를 위해 만들었습니다.
로그인 시 필요한 전화번호, 이름, 비밀번호는 이 파일에만 저장되고 로그인과 로그인에 필요한 인코딩에만 사용됩니다.
scriptable의 파일은 기본설정으로 iCloud에 저장됩니다. 개인정보를 저장한 파일을 공유하지 마십시오.



밑의 코드에 순서대로

전화번호 ex) let hp_no = "01012345678"
이름 ex) let user_nm = "가나다"
비밀번호 ex) let pwd = "password"

형식으로 작성해주십시오.
*/
let hp_no = ""
let user_nm = ""
let pwd = ""



//login to smartel
let reqlogin = new Request("https://www.smartelmobile.com:5009/mobile2/m_login_proc.asp")

reqlogin.method = "POST"

reqlogin.headers = {
	"Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://www.smartelmobile.com:5009"
};

reqlogin.body = 'goUrl=' + '&hp_no=' + hp_no + '&user_nm=' + encodeURI(user_nm) + '&pwd=' + encodeURI(pwd)

reqlogin.onRedirect = function (request)
	{
		return null;
	}

let reslogin = await reqlogin.loadString()



//load usage
let req = new Request("https://www.smartelmobile.com:5009/mobile2/m_realTimePay_info_lg.asp")

let res = await req.loadString()



//extract usage
let tbody = res.indexOf("<tbody>")
let td = res.indexOf("<td>", tbody+1)
let end = res.indexOf("</table>", td+1)

let usage = res.substring(td, end)

usage = usage.replace(/<td>/g,"");
usage = usage.replace(/<\/td>/g,"");
usage = usage.replace(/<tr bgcolor='#FFFFFF'>/g,"");
usage = usage.replace(/<\/tr>/g,"");

usage.replace(/\t/g, '');
let usage_array = usage.split("\n");

console.log(usage)



//extracted usage
let message =  parseInt(usage_array[3])
let message_left =  parseInt(usage_array[4])

let call =  parseInt(usage_array[10])
call = (call/60).toFixed(0)
let call_left =  parseInt(usage_array[11])
call_left = (call_left/60).toFixed(0)

let data =  parseInt(usage_array[17])
data = (data/1000000).toFixed(2)
let data_left =  parseInt(usage_array[18])
data_left = (data_left/1000000).toFixed(2)



//logs
console.log(reslogin)
console.log(usage)
console.log(uriname)



//show when widget is refreshed
var now = new Date()
var hours = now.getHours()
var minutes = now.getMinutes()



//widget setting
let widget = new ListWidget()

let txt1 = widget.addText("문자  (건)" + "            " + hours + ":" + minutes)
let txt1_1 = widget.addText(message_left + " / " + message)
let txt2 = widget.addText("전화  (분)")
let txt2_1 = widget.addText(call_left + " / " + call)
let txt3 = widget.addText("데이터  (GB)")
let txt3_1 = widget.addText(data_left + " / " + data)

txt1.font = Font.footnote()
txt2.font = Font.footnote()
txt3.font = Font.footnote()

txt1_1.font = Font.boldSystemFont(25)
txt2_1.font = Font.boldSystemFont(25)
txt3_1.font = Font.boldSystemFont(25)

widget.refreshAfterDate = new Date(Date.now() + 1000 * 120) 
Script.setWidget(widget)
Script.complete()