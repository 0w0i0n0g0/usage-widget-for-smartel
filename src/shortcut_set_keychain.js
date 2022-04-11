let NAME = "user_nm"
let PHONE = "hp_no"
let PASSWORD = "pwd"

Keychain.set(NAME, args.plainTexts[0].replace(/\s/gi, ''))
Keychain.set(PHONE, args.plainTexts[1].replace(/\s/gi, ''))
Keychain.set(PASSWORD, args.plainTexts[2].replace(/\s/gi, ''))

if(Keychain.contains(NAME) && Keychain.contains(PHONE) && Keychain.contains(PASSWORD))
{
    return "성공!"
} else {
    return "실패. 다시 시도해주세요."
}
