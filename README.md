# motion-graphics

코드로 모션그래픽을 만드는 실험 레포입니다. 여러 그림체(2D 설명형, 빛 입자, 3D 유리 패널, 연속 줌인 등)와
사운드 같은 표현 방식을 시험하고, 그 시험 주제로 MMO 게임 서버와 네트워크에서 생기는 일
(렉, 틱, 브로드캐스트, TCP 재전송처럼 서버 · 네트워크 · 클라이언트가 함께 얽힌 주제)을 씁니다.

영상은 동영상 파일이 아니라 코드로 그리는 웹 페이지입니다. 브라우저에서 바로 재생되고,
필요하면 같은 페이지를 MP4로 구울 수 있습니다. 주제마다 **영상 · 설명 · 용어집** 세 페이지가 한 세트입니다.

- **전체 목록 (GitHub Pages):** https://jungrok5.github.io/motion-graphics/
- 새 영상은 레포에 들어 있는 Claude Code 스킬로 같은 형식과 품질로 만듭니다 ([새 영상 만들기](#새-영상-만들기)).

## 영상 목록

각 주제의 링크는 영상 · 설명(챕터별 글) · 용어집 순서입니다. 화면의 수치는 이해를 돕기 위한 예시이며, 영상과 설명에 그렇게 표시되어 있습니다.

**패킷과 개발 파이프라인**

| 주제 | 길이 | 다루는 내용 | 보기 |
|---|---|---|---|
| 패킷 정의 하나로, 개발부터 라이브까지 | 1:04 | 프로토버퍼로 패킷을 정의하고 클라 · 서버 · 봇 코드를 생성해, 서버 선개발 테스트와 퍼블리셔 부하 테스트까지 잇는 흐름 | [영상](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline/) · [설명](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/proto-bot-pipeline.mp4) |
| 이동 패킷, 바이트를 줄이면 무슨 일이? | 1:37 | 같은 이동 정보를 34B · 24B · 19B · 8B로 담을 때 송신 트래픽 · 비용 · 서버 대수 · 수용 인원이 얼마나 달라지는지, 프로토버퍼는 어떻게 쓰는지 | [영상](https://jungrok5.github.io/motion-graphics/one-byte/) · [설명](https://jungrok5.github.io/motion-graphics/one-byte/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/one-byte/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/one-byte.mp4) |

**서버 안에서**

| 주제 | 길이 | 다루는 내용 | 보기 |
|---|---|---|---|
| 서버 안의 50ms, 무슨 일이 일어날까? | 1:21 | 스레드 구조와 틱 루프, 큐 적체 · AOI 브로드캐스트 · DB · 락 · GC가 틱을 늦추는 방식과 볼 지표 | [영상](https://jungrok5.github.io/motion-graphics/server-tick/) · [설명](https://jungrok5.github.io/motion-graphics/server-tick/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/server-tick/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/server-tick.mp4) |
| 보스가 뜨면 왜 렉이 걸릴까? | 1:22 | 인원이 몰리면 갱신이 N×(N−1)로 늘고, 시야가 넓으면 더 나빠지는 이유와 서버 · 망 · 클라에서 터지는 지점 | [영상](https://jungrok5.github.io/motion-graphics/boss-lag/) · [설명](https://jungrok5.github.io/motion-graphics/boss-lag/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/boss-lag/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/boss-lag.mp4) |
| 클라가 느리면 서버도 느려진다 | 1:49 | 클라 수신 큐 → Zero Window → 서버 송신 큐로 압력이 올라오는 과정, 송신 큐 상한의 역할, 클라 · 서버 쪽 해결 방법 | [영상](https://jungrok5.github.io/motion-graphics/slow-client/) · [설명](https://jungrok5.github.io/motion-graphics/slow-client/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/slow-client/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/slow-client.mp4) |

**네트워크와 TCP**

| 주제 | 길이 | 다루는 내용 | 보기 |
|---|---|---|---|
| 50ms와 RTT, 렉은 어디서 생길까? | 1:23 | 서버 틱 처리시간이 50ms를 넘을 때와 RTT가 느릴 때 각각 무엇이 달라지는지 | [영상](https://jungrok5.github.io/motion-graphics/tick-and-rtt/) · [설명](https://jungrok5.github.io/motion-graphics/tick-and-rtt/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/tick-and-rtt/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/tick-and-rtt.mp4) |
| 사라진 패킷 하나가 전부를 멈춘다 | 1:21 | TCP 재전송이 언제 생기는지(빠른 재전송 · RTO · HOL 블로킹), 클라 · 서버 · 인프라에서 보이는 현상과 지표 | [영상](https://jungrok5.github.io/motion-graphics/tcp-retransmission/) · [설명](https://jungrok5.github.io/motion-graphics/tcp-retransmission/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/tcp-retransmission/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/tcp-retransmission.mp4) |
| Nagle과 TCP_NODELAY | 1:41 | 작은 게임 패킷이 Nagle · Delayed ACK 때문에 늦어지고 손실 때 RTO까지 기다리는 이유, TCP_NODELAY와 틱 배칭 | [영상](https://jungrok5.github.io/motion-graphics/nagle-nodelay/) · [설명](https://jungrok5.github.io/motion-graphics/nagle-nodelay/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/nagle-nodelay/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/nagle-nodelay.mp4) |

**클라이언트와 체감**

| 주제 | 길이 | 다루는 내용 | 보기 |
|---|---|---|---|
| 앞으로 달렸는데, 왜 뒤로 끌려갈까? | 1:07 | 러버밴딩이 생기는 구조(클라 예측 · 서버 판정)와 원인, 줄이는 방법 | [영상](https://jungrok5.github.io/motion-graphics/rubber-banding/) · [설명](https://jungrok5.github.io/motion-graphics/rubber-banding/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/rubber-banding/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/rubber-banding.mp4) |
| 렉 걸렸다. 서버 탓일까, 내 탓일까? | 1:13 | 클라렉 · 네트워크렉 · 서버렉을 프레임타임 · 전송 핑 · 앱 핑 · 영향 범위로 가르는 순서 | [영상](https://jungrok5.github.io/motion-graphics/lag-diagnosis/) · [설명](https://jungrok5.github.io/motion-graphics/lag-diagnosis/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/lag-diagnosis/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/lag-diagnosis.mp4) |
| 내 스킬 하나가 상대 화면에 뜨기까지 | 1:25 | 입력부터 네트워크 · 서버 틱 · 다운링크 · 상대 클라 보간과 렌더까지 단계별 지연과 합계 | [영상](https://jungrok5.github.io/motion-graphics/skill-journey/) · [설명](https://jungrok5.github.io/motion-graphics/skill-journey/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/skill-journey/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/skill-journey.mp4) |
| 언리얼 클라의 스레드와 렉 | 1:52 | 게임 · 렌더 · GPU 스레드와 자체 리시브 · 센드 스레드, FPS가 패킷 적용과 화면 지연에 주는 영향, 보스전 GPU 대기와 히치 | [영상](https://jungrok5.github.io/motion-graphics/ue-client-threads/) · [설명](https://jungrok5.github.io/motion-graphics/ue-client-threads/article.html) · [용어집](https://jungrok5.github.io/motion-graphics/ue-client-threads/terms.html) · [MP4](https://jungrok5.github.io/motion-graphics/out/ue-client-threads.mp4) |

**모바일 세로 영상**

휴대폰에서 보기 좋게 만든 9:16 세로 버전입니다. 본편의 핵심 장면만 세로 화면에 맞게 다시 그렸고, 끝에서 본편으로 이어집니다.

| 주제 | 길이 | 다루는 내용 | 보기 |
|---|---|---|---|
| 보스가 뜨면 왜 렉이 걸릴까? | 0:50 | 인원 10배 → 갱신 약 100배, 시야 2배 → 보이는 인원 약 4배, 줄이는 방법 | [세로 영상](https://jungrok5.github.io/motion-graphics/boss-lag-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/boss-lag-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/boss-lag/) |
| 서버 안의 50ms | 0:55 | 틱 예산, 큐 적체, 브로드캐스트 N×(N−1), 틱을 막는 DB · 락 · GC | [세로 영상](https://jungrok5.github.io/motion-graphics/server-tick-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/server-tick-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/server-tick/) |
| 클라가 느리면 서버도 느려진다 | 0:56 | 처리 감소 → Zero Window → 서버 송신 큐, 큐 상한, 클라 · 서버 해결법 | [세로 영상](https://jungrok5.github.io/motion-graphics/slow-client-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/slow-client-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/slow-client/) |
| 언리얼 클라의 스레드와 FPS | 0:56 | 리시브 · 게임 · 렌더 · GPU 스레드, 다음 틱 적용, 60fps ≈ 88ms vs 15fps ≈ 263ms | [세로 영상](https://jungrok5.github.io/motion-graphics/ue-client-threads-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/ue-client-threads-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/ue-client-threads/) |
| 앞으로 달렸는데, 왜 뒤로 끌려갈까? | 0:55 | 예측과 판정, 원인 두 가지(네트워크 · 판정 불일치), 재조정 · 스무딩 | [세로 영상](https://jungrok5.github.io/motion-graphics/rubber-banding-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/rubber-banding-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/rubber-banding/) |
| 렉 걸렸다. 서버 탓일까, 내 탓일까? | 0:55 | 렉의 세 구간, 클라 · 네트워크 · 서버 렉의 신호, 전송 핑 vs 앱 핑, 판별 순서 | [세로 영상](https://jungrok5.github.io/motion-graphics/lag-diagnosis-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/lag-diagnosis-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/lag-diagnosis/) |
| 내 스킬 하나가 상대 화면에 뜨기까지 | 0:54 | 다섯 구간, 네트워크 편도, 내 화면 ~25ms vs 상대 화면 ~221ms, 보간 버퍼 | [세로 영상](https://jungrok5.github.io/motion-graphics/skill-journey-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/skill-journey-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/skill-journey/) |
| 50ms와 RTT, 렉은 어디서 생길까? | 0:54 | 틱 50ms 예산, 과부하 시 응답 70→180ms, RTT 30 vs 200ms, 누가 늦어지나 | [세로 영상](https://jungrok5.github.io/motion-graphics/tick-and-rtt-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/tick-and-rtt-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/tick-and-rtt/) |
| 패킷 정의 하나로, 개발부터 라이브까지 | 0:57 | .proto → 클라 · 서버 · 봇 코드 생성, 필드 추가, 서버 먼저 봇 테스트, 부하 테스트로 장비 산정 | [세로 영상](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/proto-bot-pipeline-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline/) |
| 이동 패킷, 바이트를 줄이면 무슨 일이? | 0:54 | 34/24/19/8B 인코딩, 1바이트 = 월 6.5TB, 34B → 8B면 −168TB/월, 프로토버퍼 비교 | [세로 영상](https://jungrok5.github.io/motion-graphics/one-byte-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/one-byte-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/one-byte/) |
| 사라진 패킷 하나가 전부를 멈춘다 | 0:55 | Fast Retransmit vs RTO, HOL 블로킹, ss -ti · nstat 확인, 줄이는 법 | [세로 영상](https://jungrok5.github.io/motion-graphics/tcp-retransmission-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/tcp-retransmission-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/tcp-retransmission/) |
| Nagle과 TCP_NODELAY | 0:56 | Nagle 보류 규칙, delayed ACK +60ms, 손실 시 RTO 245ms vs 75ms, NODELAY + 틱 배칭 | [세로 영상](https://jungrok5.github.io/motion-graphics/nagle-nodelay-shorts/) · [MP4](https://jungrok5.github.io/motion-graphics/out/nagle-nodelay-shorts.mp4) · [본편](https://jungrok5.github.io/motion-graphics/nagle-nodelay/) |

## 스타일 실험

같은 주제를 다른 그림체로 다시 만든 20초 안팎의 영상입니다. 3D(WebGL, three.js)로 그려 브라우저에서 실시간으로 재생되고,
가로(PC)와 세로(모바일) 페이지가 따로 있습니다. 수치와 내용은 검수를 마친 본편과 같습니다.
스타일별 만드는 법은 스킬의 [`styles/`](.claude/skills/tech-motion-explainer/styles/)에 정리했습니다.

| 스타일 | 주제 | 보기 |
|---|---|---|
| 빛 입자 | 내 스킬 하나가 상대 화면에 뜨기까지 | [가로 (PC)](https://jungrok5.github.io/motion-graphics/skill-journey-glow-wide/) · [세로 (모바일)](https://jungrok5.github.io/motion-graphics/skill-journey-glow/) · [세로 MP4](https://jungrok5.github.io/motion-graphics/out/skill-journey-glow.mp4) · [본편](https://jungrok5.github.io/motion-graphics/skill-journey/) |
| 3D 유리 패널 | 내 스킬 하나가 상대 화면에 뜨기까지 | [가로 (PC)](https://jungrok5.github.io/motion-graphics/skill-journey-glass-wide/) · [세로 (모바일)](https://jungrok5.github.io/motion-graphics/skill-journey-glass/) · [세로 MP4](https://jungrok5.github.io/motion-graphics/out/skill-journey-glass.mp4) · [본편](https://jungrok5.github.io/motion-graphics/skill-journey/) |
| 빛 입자 | 보스가 뜨면 렉이 생기는 이유 | [가로 (PC)](https://jungrok5.github.io/motion-graphics/boss-lag-glow-wide/) · [세로 (모바일)](https://jungrok5.github.io/motion-graphics/boss-lag-glow/) · [세로 MP4](https://jungrok5.github.io/motion-graphics/out/boss-lag-glow.mp4) · [본편](https://jungrok5.github.io/motion-graphics/boss-lag/) |
| 3D 유리 패널 | 보스가 뜨면 렉이 생기는 이유 | [가로 (PC)](https://jungrok5.github.io/motion-graphics/boss-lag-glass-wide/) · [세로 (모바일)](https://jungrok5.github.io/motion-graphics/boss-lag-glass/) · [세로 MP4](https://jungrok5.github.io/motion-graphics/out/boss-lag-glass.mp4) · [본편](https://jungrok5.github.io/motion-graphics/boss-lag/) |
| 연속 줌인 | 이동 패킷 하나를 끝까지 따라가기 (데이터센터 → DRAM 셀) | [가로 (PC)](https://jungrok5.github.io/motion-graphics/packet-zoom/) · [본편](https://jungrok5.github.io/motion-graphics/one-byte/) |

## 한 주제의 세 페이지

| 페이지 | 파일 | 내용 |
|---|---|---|
| 영상 | `<주제>/index.html` | 1~2분짜리 캔버스 애니메이션. 재생 · 탐색 · 챕터 이동 · 재생 속도(1× · 0.75× · 0.5×) · 전체 화면 |
| 설명 | `<주제>/article.html` | 요약, 목차, 챕터별 글. 챕터마다 "▶ 이 장면 보기"를 누르면 영상이 그 챕터에서 열린다(`index.html#ch03`) |
| 용어집 | `<주제>/terms.html` | 그 주제에 나온 용어만 모은 목록, 검색 가능 |

설명과 용어집의 원본은 영상 페이지 안에 숨겨 둔 `<section class="notes">`입니다. 글을 고칠 때는 이 원본만 고치고
`node scripts/build-articles.mjs`로 두 페이지를 다시 만듭니다.

키보드: 스페이스 재생/정지, ←/→ 5초 이동, `,` `.` 재생 속도.

## 어떻게 만들어지나

- 영상 하나가 HTML 파일 하나입니다. 1920×1080 캔버스에 모든 프레임을 `renderAt(t)`라는 시간의 순수 함수로 그립니다.
  랜덤도 시드를 고정해서, 같은 시각이면 언제나 같은 화면이 나옵니다.
- 그래서 탐색바로 아무 시점으로 바로 이동할 수 있고, 같은 페이지를 프레임별로 찍어 MP4로 만들 수 있습니다.
- 외부 라이브러리 없이 동작합니다. 폰트(Pretendard, JetBrains Mono)만 `assets/fonts/`에서 불러옵니다.

## 새 영상 만들기

`.claude/skills/tech-motion-explainer/`에 스킬이 있습니다. Claude Code에서 이 레포를 열고 기술 내용을 주면서
"이걸로 모션그래픽 만들어줘"라고 하면 다음 순서로 영상 · 설명 · 용어집 세트를 만듭니다.

1. **내용 정리:** 등장 요소, 흐름, 핵심 메시지, 그 주제에만 있는 구체적인 이름과 지표를 뽑는다.
2. **스토리보드:** 4~8개 챕터, 챕터마다 생각 하나와 그림 하나.
3. **구현:** 템플릿을 복사해 장면을 쓰고, 설명과 용어집 원본을 쓴다.
4. **검증:** 스틸을 렌더해 겹침과 잘림을 고치고, 플레이어를 헤드리스로 점검한다.
5. **전문가 검수:** 별도 에이전트가 그 주제의 시니어 전문가로서 화면과 글을 읽는다.
   틀린 내용은 반드시 고치고, 오해 소지는 짧게 고칠 수 있을 때 고친다. 설명을 위한 단순화와 예시 수치는 허용한다.
6. **배포:** 설명 · 용어집 페이지를 생성하고, 목록과 README에 추가한 뒤 푸시한다.

세로 영상은 "이 주제로 세로 영상 만들어줘"라고 하면 됩니다. 본편의 핵심 3~4장면을 1080×1920으로 다시 그리고, 업로드용 MP4까지 굽습니다.

문구 규칙도 스킬에 들어 있습니다. 짧은 평서문으로 쓰고, "~의 길" 같은 비유나 대구로 끝나는 표어는 쓰지 않으며,
같은 수준끼리 비교하고, 효과를 부풀리지 않습니다.

| 파일 | 역할 |
|---|---|
| `SKILL.md` | 작업 순서, 화면 · 문구 · 정확성 규칙, 연출 카탈로그(어떤 장면은 어느 영상의 어느 함수를 참고할지) |
| `template.html` | 엔진(그리기 헬퍼, 배경, 챕터 헤더, 진행바) + 플레이어 + 설명 원본 자리 + 예시 장면 |
| `expert-review.md` | 전문가 검수 에이전트에게 주는 지시문(틀림 / 오해 소지 / 단순화 기준) |

### 원샷 프롬프트

스킬 없이 처음부터 만들 때 쓰는 요청 예시입니다. `[내용]`만 바꿔 쓰면 됩니다.

````text
아래 기술 내용을 1920×1080, 1~2분짜리 모션그래픽 설명 영상으로 만들어줘.

[내용]
(설명할 기술 내용. 등장 요소, 흐름, 꼭 전달하고 싶은 메시지)

[구성]
- 인트로 5초(제목 단어별 등장 + 흐름을 요약한 점 스트립), 챕터 4~8개(각 10~15초), 아웃트로 5.5초(요약 노드 + 표어).
- 챕터마다 생각 하나와 그림 하나: 코드 패널, 노드 흐름, 시간 레인, 시퀀스 다이어그램, 막대 · 그래프, 버퍼 탱크 등.
- 실제 이름(메시지 · 필드 · 명령 · 지표)을 쓰고, 지어낸 수치는 "예시"로 표시.

[문구]
- 짧은 평서문. 비유 · 대구로 끝나는 표어 · "~의 길" 같은 표현은 쓰지 말고 요점을 그대로 쓴다.
- 같은 수준끼리 비교하고, 조건이 있는 효과는 조건을 함께 쓴다. 효과를 부풀리지 않는다.

[스타일]
- 다크 네이비 배경, 역할별 색 고정(실패 · 대기는 빨강), Pretendard + JetBrains Mono, 좌상단 챕터 헤더, 하단 진행바.

[구현]
- 단일 HTML 캔버스, 모든 프레임은 renderAt(t)의 순수 함수(랜덤은 시드 고정).
- 플레이어: 재생/일시정지, 드래그 탐색바(챕터 눈금), 챕터 버튼, 재생 속도 1× · 0.75× · 0.5×, 전체 화면, 키보드.
- 영상 · 설명(챕터별 글, 장면 바로가기) · 용어집(이 주제의 용어만) 세 페이지를 한 세트로.
- 챕터마다 스틸을 뽑아 겹침 · 잘림을 고치고, 별도 에이전트로 시니어 전문가 검수를 거친 뒤 보여줘.
````

## 레포 구조

```
<주제>/index.html          영상 (설명 · 용어집 원본 포함)
<주제>/article.html        설명 (생성됨)
<주제>/terms.html          용어집 (생성됨)
<주제>-shorts/index.html   세로 영상 (본편의 설명 · 용어집을 같이 씀)
index.html                 전체 목록 페이지 (VIDEOS 배열에 주제 추가)
assets/fonts/              Pretendard, JetBrains Mono (둘 다 OFL)
scripts/                   렌더 · 점검 · 페이지 생성 스크립트
out/                       구운 MP4 (가로 · 세로)
.claude/skills/tech-motion-explainer/   영상 제작 스킬
.github/workflows/pages.yml             GitHub Pages 배포
```

## 스크립트

```bash
# 특정 시점 스틸 (t003.6.png처럼 시간순으로 정렬되는 이름)
node scripts/render.mjs <주제>/index.html <폴더> --stills 3,20,45
# MP4 굽기 (영상 1분에 약 3.5분)
node scripts/render.mjs <주제>/index.html out/<주제>.mp4
# 플레이어 점검: 에러, 재생, 챕터 이동, 재생 속도, 설명 원본, 모바일 폭 (--shots <폴더>면 전체 화면 캡처)
node scripts/check-player.mjs <주제>/index.html
# 설명 · 용어집 페이지 생성 (모든 주제)
node scripts/build-articles.mjs
```

필요: Node 18+, Playwright(Chromium), ffmpeg(MP4를 구울 때만).

## 배포

`.github/workflows/pages.yml`이 푸시마다 레포 전체를 GitHub Pages로 배포합니다.
처음 한 번은 레포 Settings → Pages → Source를 **GitHub Actions**로 설정해야 합니다.
