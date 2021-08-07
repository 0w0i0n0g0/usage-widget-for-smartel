# [scriptable] smartel_MVNO_mobile_plan_usage_widget
# [scriptable] 스마텔_알뜰폰_사용량_위젯

<br>
<br>

<p align="center">
  <img src="./img/logo.png" width="200"/>
</p>

## Alert
- This widget is for "Smartel" among South Korea's MVNO mobile carriers, so README is written in Korean.

- 이 위젯은 한국의 알뜰폰 통신사 중 "스마텔"을 대상으로 만들어졌으므로 한국어로 README가 쓰여졌습니다.

<br>
<br>
<br>
<br>

## Table of Contents
[알림](#alert)

[설명](#description)

[특징](#feature)

[주의](#warning)

[설치](#installation)


<br>
<br>
<br>
<br>

## Description
과점시장인 통신업에서 2010년 3월 정부가 전기통신사업법을 통해 알뜰폰(MVNO)사업자가 요구할시, 망을 임대를 거부할 수 없게 하여 소비자가 이전보다 저렴하게 사용할 수 있도록 하였다.

그러나, 알뜰폰은 저렴한 가격대신 부실한 고객대응과 사용자 편의기능 부족이 단점으로 꼽히고 있다.

내가 알뜰폰 사업자 중 "스마텔"을 사용할 때, 없어서 정말 불편하다고 느꼈던 사용량 위젯을 만들어보았다.

<br>
<br>
<br>
<br>

## Feature
- 2 X 2 사이즈의 가장 작은 위젯에 맞는 크기
- 아이폰의 라이트 모드 / 다크 모드에 맞게 변화
- 우측 상단에 새로고침된 시간 표시

<br>
<br>
<br>
<br>

## Warning
- 이 위젯은 해당 통신사와 어떠한 관계없이, 소비자의 편의를 위해 만들었습니다.

- 스마텔의 "실시간 제공량"을 제공하는 서버가 진짜 "실시간"으로 확인할 수 없게 되어있습니다. 실제 사용량과 최대 10분 정도 차이날 수 있습니다.
[테스트 결과 보기](#tests)

- 로그인 시 필요한 전화번호, 이름, 비밀번호는 이 파일에만 저장되고 로그인에만 사용됩니다.

- scriptable의 파일은 기본설정으로 iCloud에 저장됩니다. 개인정보를 저장한 파일을 공유하지 마십시오.

<br>
<br>
<br>
<br>

## Installation
---
1. 앱스토어에서 scriptable을 다운
    - https://apps.apple.com/us/app/scriptable/id1405459188?ign-mpt=uo%3D4

<p align="center">
  <img src="./img/1.png" width="300"/>
</p>

---
2. 링크를 클릭하여 파일 설치
---
3. scriptable 앱을 열고, smartel 옆의 점 세개를 눌러 편집

<p align="center">
  <img src="./img/3.png" width="300"/>
</p>

- 
    - 제일 위의 코드에 순서대로

    - 전화번호 ex) let hp_no = "01012345678"

    - 이름 ex) let user_nm = "가나다"

    - 비밀번호 ex) let pwd = "password"

    - 형식으로 작성해주십시오.
---
4. 위젯 추가에서 scriptable 선택
    - 위젯 선택

<p align="center">
  <img src="./img/5.png" width="300"/><img src="./img/6.png" width="300"/>
</p>

---

5. 위젯을 꾹 눌러 위젯 편집 선택

<p align="center">
  <img src="./img/7.png" width="300"/>
</p>

- 
    - script에서 smartel 선택
    - When Interacting에서 Run Script 선택
        - 이 설정을 하면 위젯을 클릭하여 새로고침할 수 있습니다.

<p align="center">
  <img src="./img/8.png" width="300"/><img src="./img/9.png" width="300"/>
</p>

---

<br>
<br>
<br>
<br>


## Todo

- [ ] 3가지 크기에 맞춰 구현
- [X] 새로고침된 시간 표시

## Tests
>1차 테스트 결과
>>3시 8분 : 문자 1건 보냄.

>>3시 15분 : 실시간 제공량 페이지에서 문자 1건 차감됨.

>2차 테스트 결과
>>3시 18분 : 문자 1건 보냄.

>>3시 25분 : 실시간 제공량 페이지에서 문자 1건 차감됨.

>가설
>>실시간 제공량이 서버에서 매 x5분 기준으로 새로고침 되는 것으로 보임. 

