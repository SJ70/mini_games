## **날짜 별 변동사항**

### 2023.01.02.

- **[Avoid_Rects](./avoid_rects.md#20230102) 개발**

### 2023.01.03.

- **[Avoid_Rects](./avoid_rects.md#20230103) 개발**

### 2023.01.05.

- **[Shoot_Balls](./shoot_balls.md#20230105) 개발**

### 2023.01.06.

- **[Essential](./essential.md#20230106) 리팩토링**
- [Avoid_Rects](./avoid_rects.md#20230106) 리팩토링
- [Shoot_Balls](./shoot_balls.md#20230106) 적용

### 2023.01.09.

- **[Essential](./essential.md#20230106) 리팩토링**
- [Avoid_Rects](./avoid_rects.md#20230109) 리팩토링
- [Shoot_Balls](./shoot_balls.md#20230109) 적용

### 2023.01.10.

- **[Essential](./essential.md#20230110) 리팩토링**
- [Avoid_Rects](./avoid_rects.md#20230110) 리팩토링
- [Shoot_Balls](./shoot_balls.md#20230110) 적용 및 리팩토링

### 2023.01.11.

- **[Select_Game](./select_game.md#20230111) 구축**
- [Avoid_Rects](./avoid_rects.md#20230111) 메소드화
- [Shoot_Balls](./shoot_balls.md#20230111) 메소드화

### 2023.01.15.

- **[Essential](./essential.md#20230115) 비주얼 업데이트**
- [Avoid_Rects](./avoid_rects.md#20230115) 적용
- [Shoot_Balls](./shoot_balls.md#20230115) 적용

### 2023.01.17.

- **[Essential](./essential.md#20230117) 리팩토링**
- [Avoid_Rects](./avoid_rects.md#20230117) 적용
- [Shoot_Balls](./shoot_balls.md#20230117) 적용

### 2023.01.18.

- **[Bounce_Ball](./bounce_ball.md#20230118) 개발**
- [Essential](./essential.md#20230118) 버그 픽스
- [Select_Game](./select_game.md#20230118) 개선

### 2023.01.19.

- **[Jump_Ahead](./jump_ahead.md#20230119) 개발**

### 2023.01.20.

- **[Light_Switch](./light_switch.md#20230120) 개발**
- [Essential](./essential.md#20230120) 비주얼 업데이트
- [Jump_Ahead](./jump_ahead.md#20230120) 적용

### 2023.01.25.

- **[Inside_Out](./inside_out.md#20230125) 개발**
- [Essential](./essential.md#20230125) 비주얼 업데이트

### 2023.07.21.

- 6개월만에 실행시켜보았는데 **게임 속도가 너무 빠르다.**  
개발할 때와는 다른 PC환경에서 실행하였기에, PC의 사양에 따라 속도가 달라지는 것으로 보인다.  
- 이러한 문제에 대해 간단히 알아보았다.  
  현재 이 프로그램은 오브젝트의 이동을 **현재 좌표, 방향, 속도, 가속도** 를 통해 기준을 잡는다.  
이러한 방식은 PC의 사양에 따라 다른 경험이 발생하게 된다.  
문제를 해결하기 위해선 **시간**을 기준으로 해당 오브젝트의 다음 위치를 예측한다.  
- [reference](https://www.developer.com/design/unity-game-programming-normalizing-game-speed-across-devices/)  
![image](https://github.com/SJ70/mini_games/assets/50670730/deeef2a6-abb6-430b-a09f-fd2ac99bab20)  
