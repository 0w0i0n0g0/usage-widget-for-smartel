//set login info
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



//widget setting
let widget = new ListWidget()

let txt1 = widget.addText("문자  (건)")
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