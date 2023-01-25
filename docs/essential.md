# essential

모든 게임이 사용하게 되는 클래스 및 메소드들의 모음

<br/>

## Index

> - [2023.01.06.](#20230106)
> - [2023.01.09.](#20230109)
> - [2023.01.10.](#20230110)
> - [2023.01.11.](#20230111)
> - [2023.01.15.](#20230115)
> - [2023.01.17.](#20230117)
> - [2023.01.18.](#20230118)
> - [2023.01.20.](#20230120)
> - [2023.01.25.](#20230120)

<br/>

## 2023.01.06.

> **Score.js**  
> 화면 중앙에 점수 및 'click to start' 문구를 띄워주는 클래스 [[자세히]](./shoot_balls.md#20230106)

<br/>

## 2023.01.09.

> **Dot.js**  
> 화면 전환의 기능을 하는 원형 이펙터 클래스 [[자세히]](./avoid_rects.md#20230109)

<br/>

## 2023.01.10.

> **CircleEffector.js**  
> [Dot.js](#20230109)에서 파생되었다.  
> 게임 시작 및 종료 애니메이션으로 사용되는 원형 이펙터 클래스 [[자세히]](./avoid_rects.md#20230103)
>
> **MouseFollower.js**
> 마우스의 현재 위치를 따라오는 오브젝트 클래스  
> 프로그램이 측정하는 마우스의 좌표와 실제 마우스의 좌표의 오차 및 기타 오류들을 보완하기 위하여 작성되었다. [[자세히]](./avoid_rects.md#20230103)

> **Score.js**  
> 기존의 점수 좌표는 마우스의 위치에 따라 좌표가 즉각적으로 변하였다.  
> Score.js에 MouseFollower 객체를 적용하여 점수가 마우스의 위치에 따라 다른 위치로 부드럽게 움직임을 구현하였다.

<br/>

## 2023.01.11.

> **ReturnButton.js**
> 게임 선택 페이지로 돌아오기 위한 버튼 클래스  
> 창의 크기에 맞게 일정 좌표에서 버튼 역할을 할 삼각형을 그린다.

<br/>

## 2023.01.15.

> **Score.js**  
> 게임 실행 시 점수 표기가 화면 밖에서부터 나타나는 애니메이션을 추가하였다.
>
> 기존의 essential 클래스들은 메소드 실행 시마다 canvas와 ctx를 인수로 불러왔다. canvas와 ctx를 this.canvas와 this.ctx에 저장시켜 인수 호출을 줄였다. [[연쇄]](./avoid_rects.md#20230115) [[연쇄]](./shoot_balls.md#20230115)

<br/>

## 2023.01.17.

> **Game.js**
> 모든 게임이 갖게 되는 메소드 및 변수들을 클래스로 정리하였다.  
> 게임마다 상속받아 사용하려고 하였으나, 각 게임들은 클래스 형태가 아닌 메소드 형태를 띄고 있었다. [[참조]](./select_game.md#20230111)  
> 따라서 각 게임은 Game 객체를 생성해 사용하도록 하였다.
>
> **문제**
>
> > Game이 가지는 메소드들은 게임마다 조금씩 수정(오버라이딩)이 필요한 경우도 있었다.  
> > 이에 따라 이미 작성한 코드를 똑같이 재작성해야 하는 상황이 발생했다.
>
> **해결**
>
> > 아래와 같은 형태로 항상 사용하는 코드(essential)는 따로 메소드로 작성한 후, 사용될 코드에서 이를 호출한다.  
> > Game 객체에서 click을 사용
> >
> > ```
> > // override when needed
> > gamestart(){
> >     this.gamestart_essential();
> > }
> > gameover(){
> >     this.gameover_essential();
> > }
> >
> > gamestart_essential(){
> >     this.on_game = true;
> >     this.score.setScore(0);
> > }
> > gameover_essential(){
> >     this.on_game = false;
> > }
> > ```
> >
> > 필요 시 게임 메소드 코드에서 해당 메소드를 오버라이드한다.
> >
> > ```
> > // overriding
> > game.gamestart = function(){
> >     game.gamestart_essential();
> >     _spawnCounter = 0;
> > }
> > game.gameover = function(){
> >     game.gamesover_essential();
> >     rects = [];
> > }
> > ```
>
> avoid_rects score.js에서는 mousefollower를 사용하고, 플레이어 오브젝트 또한 mousefollower를 사용한다.  
> mousefollower는 마우스 좌표를 저장하는데, 속도가 다른 mousefollower를 2개 이상 사용한다면 이는 낭비를 발생시킨다.  
> 게임 객체에 마우스값을 저장하여 그 값을 불러오도록 대체하였다.  
> 이제 마우스의 좌표값은 오직 게임 객체만이 다루게 된다.
>
> ClickToStart와 점수를 모두 표기하던 Score.js를 ClickToStart.js와 Score.js로 분할하였다.  
> 공통되는 변수 및 메소드들을 Text.js에 작성하여 이를 상속받아 사용하였다.

<br/>

## 2023.01.18.

> **문제**
>
> > 마우스 좌표 값이 화면 경계에 있는 상태에서 화면 크기를 축소할 경우 마우스 좌표 값이 화면 밖으로 나가게 된다.  
> > 이는 CircleEffector의 원이 화면을 가득 채우지 못 하는 작은 버그를 발생시킨다.
>
> **해결**
>
> > CircleEffector는 개별적인 좌표값을 저장하지 않는다.  
> > 마우스 좌표값을 따라가는 mouseFollower의 좌표값을 인수로 받아와 해당 위치에 원을 그리는 형태이다.  
> > 화면의 크기가 변할 때 마우스의 좌표값을 화면의 중앙으로 초기화하도록 하였다.  
> > 이러한 변경은 화면 축소 시 CircleEffector의 버그 뿐 아니라 Score과 ClickToStart 또한 자연스럽게 이동하도록 해주었다.

<br/>

## 2023.01.20.

> **Text.js**  
> 텍스트의 색상을 변경하는 메소드를 추가하였다.  
> 텍스트의 위치값에 추가 좌표값 및 추가 좌표값 설정 메소드를 넣어주었다.  
> 해당 추가 좌표값에 레벨을 적용시켜 추가 좌표값을 얼마나 받을지를 설정하였다.  
> 아래와 같은 수식으로 부드러운 움직임 또한 적용하였다.
>
> ```
> PlusLevel(onPlaying){
>     if(onPlaying && this.plusLv<100){
>         this.plusLv+=(100-this.plusLv)/10;
>     }
>     if(!onPlaying && this.plusLv>0){
>         this.plusLv-=(this.plusLv)/10;
>     }
> }
>
> ```
>
> **CircleEffector.js**
> 색상을 변경하는 메소드를 추가하였다.
>
> [[왜?]](/docs/light_switch.md/#20230120)

<br/>

## 2023.01.25.

> **Score.js**  
> 비주얼 업데이트 : 점수 추가 시 박동 효과 추가
>
> **CircleEffector.js**  
> 원의 현재 지름을 가져오는 함수 추가 [[왜?]](./inside_out.md/#20230125)
