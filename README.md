# avoid_rects

### 기획

> HTML5 Canvas를 공부하고 싶어 유튜브 튜토리얼을 찾던 중 다수의 원이 화면을 배회하는 프로그램 강좌 영상을 찾았다.  
> 이를 통해 공부하던 중 이를 응용하여 게임을 만들 수 있겠다는 생각을 하였고 바로 실행에 옮겼다.

## 2023.01.02.

> 화면에는 도형들이 배회하고 마우스로 이들을 피하는 게임이다.  
> 시간이 지날수록 난이도를 높이기 위해 도형이 초마다 늘어나도록 하며 이를 점수의 기준으로 삼는다.  
> 미적 개선를 위해 장애물의 도형에 원이 아닌 회전하는 사각형을 사용하였다.
>
> ##### 문제
>
> > 각 사각형을 회전 시 모든 도형과 캔버스가 동시에 회전하였다.
>
> ##### 해결
>
> > HTML5 캔버스의 개념에 대한 미숙함에 의해 발생한 문제였다.  
> > 각 도형들을 그릴 때마다 캔버스의 위치를 변경 및 복구하여 해결하였다.
>
> #####
>
> 화면 중앙에 점수가 텍스트로 표기된다.  
> 마우스의 위치에 따라 텍스트의 위치가 변하여 입체감을 표현하였다.

## 2023.01.03.

> ##### 문제
>
> > 프로그램에서 측정하는 마우스 위치와 실제 마우스 위치의 딜레이 차이가 있다.  
> > 마우스가 화면 밖을 나갔다 들어오는 등 반칙적인 조작이 가능하다.
>
> ##### 해결
>
> > 마우스를 따라오는 플레이어 오브젝트를 생성하였다.  
> > 이는 모바일로도 플레이가 가능토록 만들어주었다.
>
> #####
>
> 플레이어 오브젝트의 생성 모션을 제작하던 중, 이를 게임 시작 및 종료 애니메이션으로 응용하면 좋겠다고 생각하였다.  
> 게임 시작 시 흰 화면이 축소되며 플레이어 오브젝트로 변하고, 게임 종료 시 플레이어 오브젝트가 확대되며 화면을 대체한다.
>
> #####
>
> 화면의 크기가 변할 시 게임을 재시작한다.
>
> ##### 문제
>
> > 화면의 가장자리에서 생존이 극히 유리해진다.
>
> ##### 해결
>
> > 화면의 모서리를 배회하는 사각형을 추가하였다.

# shoot_balls

## 2023.01.05.

> 무작위의 위치에 공들이 튀어오르고 사용자는 우측의 총을 조준하여 공들을 맞추는 게임
> 시간이 지날수록 공의 생성 주기가 짧아진다.
> 가변적인 dy를 이용해 중력을 구현하였다.
>
> ##### 문제
>
> > 대포가 마우스를 바라보도록 각도를 돌리는 데에 어려움이 있었다.
>
> ##### 해결
>
> > 마우스와 대포의 dx,dy로 그려지는 직각삼각형에 역삼각함수를 사용함으로써 해결할 수 있었다.

## 2023.01.06.

### 모듈화

> ##### 문제
>
> > avoid_rects에서 사용했던 점수 표기가 shoot_balls에서도 필요하였다.
>
> ##### 해결
>
> > Score.js라는 class를 작성하여 import하였다.

## 2023.01.09.

### 모듈화

> ##### 문제
>
> > Score.js 이외에도 avoid_rects에 있던 플레이어 캐릭터를 활용한 화면전환 기능을 shoot_balls에도 적용을 해보면 좋겠다고 생각하였다.
>
> ##### 해결
>
> > Dot.js를 작성하여 모듈화하였다.
>
> 해당 모듈화 과정 중 Rect 또한 모듈화 및 리펙터링이 가능하겠다고 생각하였고, 상속을 이용하여 Rect.js, RectInsider.js, RectOutsider.js로 추가로 분리하였다.
>
> ##### 문제
>
> > Rect를 상속받은 RectInsider과 RectOutsider의 생성자를 호출 시 문제가 있었다.
>
> ##### 해결
>
> > 부모 클래스의 매개변수를 갖는 생성자를 호출할 수 없기 때문이었다. Rect의 생성자를 호출함으로써 해결할 수 있었다.

> >
