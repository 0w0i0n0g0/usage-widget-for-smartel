var fm = FileManager.iCloud()
var code = await new Request("https://han.gl/fTNCc").loadString()
fm.writeString(fm.joinPath(fm.documentsDirectory(), "smartel_By_0w0i0n0g0.js"), code)