//login to smartel
let reqlogin = new Request("https://www.smartelmobile.com:5009/mobile2/m_login_proc.asp")

reqlogin.method = "POST"

reqlogin.headers = {
	"Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://www.smartelmobile.com:5009"
};

//reqlogin.body = 'goUrl=' + '&hp_no=' + encodeURIComponent(hp_no) + '&user_nm=' + encodeURIComponent(user_nm) + '&pwd=' + encodeURIComponent(pwd)
reqlogin.body = "POST data"
reqlogin.onRedirect = function (request)
	{
		return null;
	}

let reslogin = await reqlogin.loadString()

//console.log(reslogin)

//load usage
let req = new Request("https://www.smartelmobile.com:5009/mobile2/m_realTimePay_info_lg.asp")

let res = await req.loadString()

//console.log(res)

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


let message =  parseInt(usage_array[3])
let message_left =  parseInt(usage_array[4])

let call =  parseInt(usage_array[10])
let call_left =  parseInt(usage_array[11])

let data =  parseInt(usage_array[17])
data = (data/1000000).toFixed(2)
let data_left =  parseInt(usage_array[18])
data_left = (data_left/1000000).toFixed(2)

let widget = new ListWidget()
let txt1 = widget.addText("문자  (건)")
let txt1_1 = widget.addText(message + " / " + message_left)
let txt2 = widget.addText("전화  (초)")
let txt2_1 = widget.addText(call + " / " + call_left)
let txt3 = widget.addText("데이터  (GB)")
let txt3_1 = widget.addText(data + " / " + data_left)

txt1.font = Font.footnote()

widget.refreshAfterDate = new Date(Date.now() + 1000 * 120) 
Script.setWidget(widget)
Script.complete()