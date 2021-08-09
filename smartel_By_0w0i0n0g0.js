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



//By 0w0i0n0g0



//euckr_to_uri function
let requri = new Request("https://www.urlencoder.org/")

requri.method = "POST"

requri.headers = {
	"content-type": "application/x-www-form-urlencoded"
}

requri.body = "input=" + encodeURI(user_nm) + "&charset=EUC-KR&separator=lf"

let resuri = await requri.loadString()

let uriresult = resuri.indexOf("Result goes here...")

let uriresultend = resuri.indexOf("textarea", uriresult+1)

let uriname = resuri.substring(uriresult, uriresultend)

let urinamestart = uriname.indexOf(">")
let urinameend = uriname.indexOf("<", urinamestart+1)

uriname = uriname.substring(urinamestart+1, urinameend)



//login to smartel
let reqlogin = new Request("https://www.smartelmobile.com:5009/mobile2/m_login_proc.asp")

reqlogin.method = "POST"

reqlogin.headers = {
	"Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://www.smartelmobile.com:5009"
};

reqlogin.body = 'goUrl=' + '&hp_no=' + hp_no + '&user_nm=' + uriname + '&pwd=' + encodeURIComponent(pwd)

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



//trim usage array
let i = 0

while(i < 100)
{
	if(usage_array[i] == undefined)
	{
		i=i+1
		continue
	}
		
	usage_array[i] = usage_array[i].trim()

	i=i+1
}

i = 0



//widget start
let widget = new ListWidget()



/*
문자 통화 데이터만 표시되는 요금제
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
*/



//usage types
let message = 0
let message_left = 0

let videocall = 0
let videocall_left = 0


let call = 0
let call_left = 0


let data = 0
let data_left = 0



/*
추출된 데이터 순서
요금제 내용 / 종류 / 단위 / 제공량 / 사용량 / 비고 / 빈칸
*/



//usage variable
while(i < 100)
{
	if(usage_array[i] == "문자")
	{
		if(usage_array[i+2] == "무제한")
		{
			message = "무제한"
			message_left = message_left + parseInt(usage_array[i+3])
		}
		else
		{
			message = message + parseInt(usage_array[i+2])
			message_left = message_left + parseInt(usage_array[i+3])
		}
		console.log("문자" + "/" + i + "/" + usage_array[i] + "/" + usage_array[i+2])
	}

	if(usage_array[i] == "음성+영상")
	{
		if(usage_array[i+2] == "무제한")
		{
			videocall = "무제한"
			videocall_left = videocall_left + parseInt(usage_array[i+3])
		}
		else
		{
			videocall = videocall + parseInt(usage_array[i+2])
			videocall_left = videocall_left + parseInt(usage_array[i+3])
		}
		console.log("음성+영상" + "/" + i + "/" + usage_array[i] + "/" + usage_array[i+2])
	}

	if(usage_array[i] == "음성")
	{
		if(usage_array[i+2] == "무제한")
		{
			call = "무제한"
			call_left = call_left + parseInt(usage_array[i+3])
		}
		else
		{
			call = call + parseInt(usage_array[i+2])
			call_left = call_left + parseInt(usage_array[i+3])
		}
		console.log("음성" + "/" + i + "/" + usage_array[i] + "/" + usage_array[i+2])
	}

	if(usage_array[i] == "패킷데이터")
	{
		if(usage_array[i+2] == "무제한")
		{
			data = "무제한"
			data_left = data_left + parseInt(usage_array[i+3])
		}
		else
		{
			data = data + parseInt(usage_array[i+2])
			data_left = data_left + parseInt(usage_array[i+3])
		}
		console.log("패킷데이터" + "/" + i + "/" + usage_array[i] + "/" + usage_array[i+2])
	}

	i = i + 1

	if(usage_array[i] == undefined)
	{
		if(usage_array[i+1] == undefined)
		{
			if(usage_array[i+2] == undefined)
			{
				break
			}
		}
	}
}



console.log(message)
console.log(message_left)
console.log(videocall)
console.log(videocall_left)
console.log(call)
console.log(call_left)
console.log(data)
console.log(data_left)



//logs
console.log("한글 인코딩 결과\n" + uriname)
console.log("로그인 정보\n" + reqlogin.body)
console.log("로그인 결과\n" + reslogin)
console.log("추출된 사용량\n" + usage)
console.log("사용량 배열\n" + usage_array)



//show when widget is refreshed
var now = new Date()
var hours = now.getHours()
var minutes = now.getMinutes()



//convert scale
if(videocall == "무제한")
{
	videocall_left = (videocall_left/60).toFixed(0)
}
else
{
	videocall = (videocall/60).toFixed(0)
	videocall_left = (videocall_left/60).toFixed(0)
}

if(call == "무제한")
{
	call_left = (call_left/60).toFixed(0)
}
else
{
	call = (call/60).toFixed(0)
	call_left = (call_left/60).toFixed(0)
}

data = (data/1000000).toFixed(2)
data_left = (data_left/1000000).toFixed(2)



//widget setting
let txt = widget.addText(hours + ":" + minutes)
let txt1 = widget.addText("문자  (건)")
let txt1_1 = widget.addText(message_left + " / " + message)

let txt2 = widget.addText("음성 + 영상  (분)")
let txt2_1 = widget.addText(videocall_left + " / " + videocall)

let txt3
let txt3_1

let txt4 = widget.addText("데이터  (GB)")
let txt4_1 = widget.addText(data_left + " / " + data)



//widget sizing
//txt3 depends on call is exist or not
if(call == 0)
{
	if (config.widgetFamily === "small") 
	{
		txt.minimumScaleFactor = 0.1
		txt1.minimumScaleFactor = 0.2
		txt2.minimumScaleFactor = 0.2
		txt4.minimumScaleFactor = 0.2
		txt1_1.minimumScaleFactor = 0.8
		txt2_1.minimumScaleFactor = 0.8
		txt4_1.minimumScaleFactor = 0.8
		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		/*
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt4_1.centerAlignText()
		*/
		txt1_1.font = Font.boldSystemFont(30)
		txt2_1.font = Font.boldSystemFont(30)
		txt4_1.font = Font.boldSystemFont(30)
	}

if (config.widgetFamily === "medium") 
	{
		txt.minimumScaleFactor = 0.6
		txt1.minimumScaleFactor = 0.6
		txt2.minimumScaleFactor = 0.6
		txt4.minimumScaleFactor = 0.6
		txt1_1.minimumScaleFactor = 0.8
		txt2_1.minimumScaleFactor = 0.8
		txt4_1.minimumScaleFactor = 0.8
		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt4_1.centerAlignText()
		
		txt1_1.font = Font.boldSystemFont(30)
		txt2_1.font = Font.boldSystemFont(30)
		txt4_1.font = Font.boldSystemFont(30)
	}

if (config.widgetFamily === "large") 
	{
		txt.minimumScaleFactor = 0.4
		txt1.minimumScaleFactor = 0.4
		txt2.minimumScaleFactor = 0.4
		txt4.minimumScaleFactor = 0.4

		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt4_1.centerAlignText()
		
		txt1_1.font = Font.boldSystemFont(40)
		txt2_1.font = Font.boldSystemFont(40)
		txt4_1.font = Font.boldSystemFont(40)
	}
}
else
{
	txt3 = widget.addText("음성  (분)")
	txt3_1 = widget.addText(call_left + " / " + call)

	if (config.widgetFamily === "small") 
	{
		txt.minimumScaleFactor = 0.1
		txt1.minimumScaleFactor = 0.3
		txt2.minimumScaleFactor = 0.3
		txt3.minimumScaleFactor = 0.3
		txt4.minimumScaleFactor = 0.3
		txt1_1.minimumScaleFactor = 0.6
		txt2_1.minimumScaleFactor = 0.6
		txt3_1.minimumScaleFactor = 0.6
		txt4_1.minimumScaleFactor = 0.6
		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt3.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		/*
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt4_1.centerAlignText()
		*/
		txt1_1.font = Font.boldSystemFont(30)
		txt2_1.font = Font.boldSystemFont(30)
		txt3_1.font = Font.boldSystemFont(30)
		txt4_1.font = Font.boldSystemFont(30)
	}

	if (config.widgetFamily === "medium") 
	{
		txt.minimumScaleFactor = 0.4
		txt1.minimumScaleFactor = 0.4
		txt2.minimumScaleFactor = 0.4
		txt3.minimumScaleFactor = 0.4
		txt4.minimumScaleFactor = 0.4
		txt1_1.minimumScaleFactor = 0.7
		txt2_1.minimumScaleFactor = 0.7
		txt3_1.minimumScaleFactor = 0.7
		txt4_1.minimumScaleFactor = 0.7
		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt3.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt3_1.centerAlignText()
		txt4_1.centerAlignText()
		
		txt1_1.font = Font.boldSystemFont(30)
		txt2_1.font = Font.boldSystemFont(30)
		txt3_1.font = Font.boldSystemFont(30)
		txt4_1.font = Font.boldSystemFont(30)
	}

	if (config.widgetFamily === "large") 
	{
		txt.minimumScaleFactor = 0.4
		txt1.minimumScaleFactor = 0.4
		txt2.minimumScaleFactor = 0.4
		txt3.minimumScaleFactor = 0.4
		txt4.minimumScaleFactor = 0.4

		
		txt.font = Font.body()
		txt1.font = Font.body()
		txt2.font = Font.body()
		txt3.font = Font.body()
		txt4.font = Font.body()
		
		txt.rightAlignText()
		
		txt1_1.centerAlignText()
		txt2_1.centerAlignText()
		txt3_1.centerAlignText()
		txt4_1.centerAlignText()
		
		txt1_1.font = Font.boldSystemFont(35)
		txt2_1.font = Font.boldSystemFont(35)
		txt3_1.font = Font.boldSystemFont(35)
		txt4_1.font = Font.boldSystemFont(35)
	}

}

widget.refreshAfterDate = new Date(Date.now() + 1000 * 120) 
Script.setWidget(widget)
Script.complete()