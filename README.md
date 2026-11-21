# 실습과제 #3 : 살아 움직이는 영화 보드
- 이름 / 학번 : 김기송/25
- 사이트 주소 : https://kimkisongasd7-droid.github.io/web-hw3/
- 출발점 : 내 #1, #2 저장소
- 사용한 API : TMDB(포스터, 영화 정보)
1. <img class="poster" src="https://image.tmdb.org/t/p/w342/5TMyytCI5Pfc9c1eNsljiCdiB05.jpg" alt="극장판 치이카와: 인어 섬의 비밀 포스터">
2. <img class="poster" src="https://image.tmdb.org/t/p/w342/w5OX3u2SpMVRU0sol0mtIaf4LSI.jpg" alt="타짜: 벨제붑의 노래 포스터">
3. <img class="poster" src="https://image.tmdb.org/t/p/w342/uL4cIrNi2uaUnWIOQQ28EVnkETG.jpg" alt="클레이페이스 포스터">
4. <img class="poster" src="https://image.tmdb.org/t/p/w342/8Qybglcd5IqksU7rNRvpvodtrpQ.jpg" alt="실낙원 포스터">
5. <img class="poster" src="https://image.tmdb.org/t/p/w342/mCUZLymzVjfYJXEON4wg8ilx2H8.jpg" alt="암살자(들) 포스터">
6. <img class="poster" src="https://image.tmdb.org/t/p/w342/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg" alt="인터스텔라 포스터">
7. <img class="poster" src="https://image.tmdb.org/t/p/w342//e7ABYg2KnI0QBBYSrLYiTljtmpd.jpg" alt="미션 임파서블 포스터">
8. <img class="poster" src="https://image.tmdb.org/t/p/w342//s2426EIW0arpjN0R0qErJfXQxZD.jpg" alt="미션 임파서블: 로그네이션">
9. <img class="poster" src="https://image.tmdb.org/t/p/w342/iNJsojTGQoOWL9f9U23jsibONVu.jpg" alt="미션 임파서블: 파이널 레코닝">
10. <img class="poster" src="https://image.tmdb.org/t/p/w342/5jnoAA74Qwb5w6B9FMvnc20n6Ie.jpg" alt="미션 임파서블: 폴아웃">
- 사용한 API 2 : KOBIS 일별 박스오피스 (기준일 2026-10-24)
## 구현 항목 체크(기능 체크표)
| 요구사항 | 상태 | 한 줄 메모 |
|---|---|---|
| 1 렌더링 | 구현함 | 렌더링 부분에서 카드 10개가 구현되지 않아 당황했으나 renderCards부분에서 전 과제의 updateLikeCount()부분을 그대로 남겨두어 그렇다는 것을 알게 된 후 해결함. |
| 2 검색 | 구현함 | search 함수로 대소문자와 앞뒤 공백을 무시해 제목 기준으로 필터링 |
| 3 정렬 3종 | 구현함 | sortBy로 평점순·최신 개봉순·제목 가나다순 정렬 구현 |
| 4 보기 필터와 getView | 구현함 | getView()가 검색→보기 필터→정렬 순서로 처리하며 refresh()를 통해 렌더링 |
| 5 찜과 저장 | 구현함 | 보드 이벤트 위임으로 .like 토글, localStorage 저장 및 likeCount 갱신 구현 |
| 6 빈 결과 | 구현함 | list.length === 0일 때 .is-empty 토글 구현됨 |
| 7 상세 대화상자 | 구현함 | 카드 클릭 시 openDetail로 w500 포스터·제목·개봉일·평점·줄거리 채우고 showModal() 호출 |
| 8 인라인 이벤트 속성 없음, 콘솔 오류 0 | 구현함 | 리스너를 app.js 하단에 배치함(index.html 내 on* 속성 0개 및 콘솔 무오류 직접 확인 필요) |
| 보너스(했다면 이름) | x | |
## 어려웠던 점 3가지와 해결
1. 렌더링 부분에서 카드 10개가 구현되지 않아 당황했으나 renderCards부분에서 전 과제의 updateLikeCount()부분을 그대로 남겨두어 그렇다는 것을 알게 된 후 해결함.
2. 렌더링 부분에서 포스터가 ${m.title} 글자로 보이는 이유: 작은따옴표 ' 문제. poster 변수 선언 줄에 백틱(`)이 아니라 작은따옴표(')가 들어가서 ${...}가 변수로 계산되지 않고 일반 문자로 표기됨.
3. 교수님께서 올려주신 영상의 도움을 받아 같이 해보니 이번 수업은 혼자 진행하는부분에 있어서 막힘없이 잘 진행한 듯 합니다.
## 참고한 자료 (교재 절, MDN 페이지 제목, 검색어)
생성형 ai(제미나이), 교재
## 생성형 AI 사용 내역 (없으면 "없음")
- 질문 요지 : `renderCards`에서 카드가 1개만 표시되고 포스터의 `${m.title}` 문자열이 그대로 출력되는 원인과 해결 방법 질문
- 답변 요약 : 아직 정의되지 않은 `updateLikeCount()` 호출로 인한 오류를 주석 처리하고, `poster` 템플릿 문자열에 작은따옴표(`'`) 대신 백틱을 사용하도록 안내받음
- 채택 여부 : 채택(미정의 함수 호출 주석 처리 및 백틱 수정 반영)
