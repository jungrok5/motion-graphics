# motion-graphics

코드로 만드는 기술 설명 모션그래픽. 각 영상은 `renderAt(t)` 하나로 모든 프레임을 그리는 캔버스 페이지이고,
브라우저에서 바로 재생됩니다. MP4가 필요하면 같은 페이지를 Playwright로 프레임별로 찍어 ffmpeg로 굽습니다.

- **웹에서 보기 (GitHub Pages):** https://jungrok5.github.io/motion-graphics/
- **Claude 아티팩트 플레이어:** https://claude.ai/artifact/FMEYiR2uH4gr3HRMzaugwH

## proto-bot-pipeline (64s)

"패킷 정의 하나로, 개발부터 라이브까지" — Protobuf 기반 봇 클라이언트 파이프라인 설명 영상.

| 챕터 | 내용 |
|---|---|
| 01 패킷 정의 | `.proto` 한 파일에 모든 클라↔서버 메시지 정의 |
| 02 코드 생성 | `protoc` 한 번으로 클라 · 서버 · 봇 코드 동시 생성 |
| 03 항상 동기화 | 필드 추가 → 재생성 → 봇도 자동 갱신 (수작업 봇은 낡음) |
| 04 서버가 먼저 | 클라보다 먼저 완성된 서버 컨텐츠를, 클라 패킷 플로우를 흉내 낸 봇으로 검증 |
| 05 퍼블리셔에게 | 같은 봇으로 대규모 부하 → 장비 스펙 산정 · 라이브 인프라 테스트 |

- 플레이어: [`proto-bot-pipeline/`](https://jungrok5.github.io/motion-graphics/proto-bot-pipeline/) — 재생/일시정지, 탐색바, 챕터 이동, 전체 화면 (Space = 재생/일시정지, ←/→ = 5초 이동)
- MP4: `out/proto-bot-pipeline.mp4`

### 원샷 프롬프트

이 영상을 처음부터 다시 만들 때 쓴 요구사항을 한 번에 담은 프롬프트입니다.

````text
아래 기술 내용을 1920×1080, 약 64초짜리 모션그래픽 설명 영상으로 만들어줘.

[내용]
게임 개발에서 프로토버퍼로 패킷을 정의하고 protoc로 클라·서버 코드를 생성해 쓴다.
봇 클라이언트도 같은 생성 코드를 쓰면 패킷이 항상 동기화되어 낡지 않는다.
서버가 보통 컨텐츠를 먼저 만들기 때문에, 서버팀은 클라의 컨텐츠 패킷 플로우를 모방하는 봇 클라이언트를 만들어 컨텐츠를 테스트한다.
이 봇을 퍼블리셔에게 전달하면 장비 스펙 산정과 라이브 인프라 부하 테스트에 쓴다.

[구성]
- 인트로(5초): "패킷 정의 하나로, 개발부터 라이브까지" 단어별 등장, 아래에 .proto → Codegen → Bot → Content Test → Publisher 점 스트립.
- 01 패킷 정의: game_packet.proto 코드가 타이핑되는 에디터 패널(LoginReq, EnterDungeonReq, SkillUseReq),
  오른쪽에 "message = 패킷 하나 / 언어 중립 스키마 / Single Source of Truth" 카드 3개.
- 02 코드 생성: 왼쪽 .proto 카드 → 가운데 protoc 노드(회전 점선 링) → 오른쪽 Client(Unity C#) / Server(C++) / Bot Client(C#) 카드로
  베지어 선을 따라 점이 흐르고, 각 카드에 실제 생성 코드 스니펫이 타이핑.
- 03 항상 동기화: 같은 레이아웃에서 .proto에 `int32 difficulty = 3;`이 초록 하이라이트로 삽입 → 펄스가 protoc를 지나
  세 카드에 동시에 전달 → 각 카드에 Difficulty 줄 추가, 버전 칩 v1.3→v1.4, ✓ 배지.
  대비로 "손으로 짠 봇 패킷"(빨간 점선, v1.3, 필드 누락 → 파싱 오류, ✗) 카드.
- 04 서버가 먼저: 주차별 간트(서버팀 W3 완료, 클라팀 W7까지 작업 중) → 빈 구간에 "봇 클라이언트로 바로 컨텐츠 테스트".
  이어서 Bot Client ↔ Game Server 시퀀스 다이어그램(LoginReq/Ack, EnterWorld, EnterDungeon, SkillUseReq × N 버스트, DungeonClearNoti),
  오른쪽에 "클라 없이 검증" 체크리스트.
- 05 퍼블리셔에게: 서버팀 → 퍼블리셔로 BotClient 패키지가 호를 그리며 이동 → 부하 대시보드
  (동접 봇 도트 그리드 0→6,000, LB/Game Server/DB 게이지, CPU vs 동접 그래프와 70% 임계선, "서버 1대 ≈ 동접 5,000" 마커, RPS·p99·DB QPS 칩)
  → 결과 카드 "장비 스펙 산정", "라이브 인프라 테스트". 수치는 예시라고 표기.
- 아웃트로: 5단계 원형 노드 스트립 + "패킷 정의 하나가, 개발부터 라이브까지."

[스타일]
- 다크 네이비 배경, 은은한 그리드와 파티클, 역할별 색 고정(proto 보라, client 하늘, server 앰버, bot 초록, publisher 핑크, 실패 빨강).
- Pretendard(한글) + JetBrains Mono(코드), 코드 문법 하이라이트, 좌상단 챕터 헤더, 하단 챕터 진행바.
- 요소는 ease-out으로 30~60px 슬라이드하며 등장, 강조는 팝/글로우.

[구현]
- 단일 HTML 캔버스. 모든 프레임은 renderAt(t)의 순수 함수(랜덤은 시드 고정).
- 페이지에 플레이어: 재생/일시정지, 드래그 가능한 탐색바(챕터 눈금), 챕터 버튼, 전체 화면, 키보드.
- Playwright + ffmpeg로 같은 페이지를 30fps MP4로 굽는 스크립트도 함께.
- 각 챕터 중간 프레임을 스틸로 뽑아 겹침·잘림을 확인하고 고친 뒤 보여줘.
````

## rubber-banding (67s)

"앞으로 달렸는데, 왜 뒤로 끌려갈까?" — MMO 러버밴딩의 구조, 원인, 줄이는 방법. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 러버밴딩이란 | 클라 화면의 위치와 서버가 인정한 위치가 벌어졌다가 서버 쪽으로 되돌려지는 현상 |
| 02 예측과 판정 | 클라는 입력 즉시 이동(예측), 서버가 Move #n을 검증해 Ack · 어긋나면 Correction |
| 03 원인 ① 네트워크 | 지연 스파이크 · 패킷 손실 · TCP 재전송 대기(HOL) → 서버 캐릭터는 제자리 → 되돌림 |
| 04 원인 ② 판정 불일치 | 속도 검증(버프 만료) · 충돌/지형 · 상태이상 선적용 · 서버 틱 지연 |
| 05 줄이는 방법 | 시퀀스 번호 + Ack, 재조정, 오차 허용치, 보정 보간, 이동은 UDP, 서버 틱 여유 |

- 플레이어: [`rubber-banding/`](https://jungrok5.github.io/motion-graphics/rubber-banding/)

## lag-diagnosis (73s)

"렉 걸렸다. 서버 탓일까, 내 탓일까?" — 클라렉 · 네트워크렉 · 서버렉을 가르는 법. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 렉의 세 구간 | 한 번의 반응 = 입력 처리 + 업링크 + 서버 큐·틱 + 다운링크 + 렌더링 |
| 02 클라렉 | 프레임타임 급등(히치), 화면·UI·입력 전부 멈칫, 핑은 정상, 나만 그럼 |
| 03 네트워크렉 | RTT·손실 급등, FPS·UI는 정상, 다른 캐릭터 순간이동, 나 또는 같은 망만 |
| 04 서버렉 | 틱 처리시간 > 예산, 같은 채널 전원이 동시에, FPS·전송 핑은 정상 |
| 05 핑 두 개로 가르기 | 전송 핑(소켓에서 반사) vs 앱 핑(게임 로직 큐 경유) — 앱 핑만 높으면 서버 |
| 06 판별 순서 | 프레임타임 → 전송 핑 → 앱 핑 · 영향 범위, 비교표 |

- 플레이어: [`lag-diagnosis/`](https://jungrok5.github.io/motion-graphics/lag-diagnosis/)

## server-tick (81s)

"서버 안의 50ms, 무슨 일이 일어날까?" — MMO 게임서버의 스레드 구조, 틱 루프, 부하가 틱에 끼치는 영향. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 스레드 구조 | I/O 스레드 → 존별 메시지 큐 → 존당 로직 스레드(틱 루프) → 송신 큐 → I/O 송신, DB는 비동기 워커 |
| 02 틱 루프 | 50ms 예산: 메시지 처리 → 월드 업데이트 → AOI → 브로드캐스트 → 대기 |
| 03 큐가 밀릴 때 | 유입 > 처리 → 큐 깊이 증가 → 틱 예산 초과 → 악순환 |
| 04 AOI · 브로드캐스트 폭발 | N명이 모이면 틱당 N×(N−1) 패킷, 송신 큐 적체, 느린 클라부터 끊김 |
| 05 틱을 막는 것들 | I/O 포화 · 동기 DB 호출 · 락 경합 · GC Stop-the-world |
| 06 어디를 보나 | 구간별 지표와 이상 신호 표 |

- 플레이어: [`server-tick/`](https://jungrok5.github.io/motion-graphics/server-tick/)

## tcp-retransmission (81s)

"사라진 패킷 하나가 전부를 멈춘다" — TCP 재전송의 원인과 클라 · 서버 · 인프라에 나타나는 현상과 메트릭. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 잃으면 다시 보낸다 | Seq/ACK, 손실, Dup ACK × 3 → Fast Retransmit |
| 02 언제 생기나 | 혼잡(라우터 큐 tail drop) · 무선/핸드오버 · NIC 링 버퍼 오버플로 · ACK 유실/MTU 블랙홀 |
| 03 두 가지 재전송 | Fast Retransmit(≈1 RTT) vs RTO(최소 200ms, 2배씩 백오프), 게임 트래픽은 RTO로 빠지기 쉬움 |
| 04 Head-of-Line 블로킹 | 뒤에 도착한 세그먼트도 커널 버퍼에서 대기 → 앱에는 정지 후 몰림 |
| 05 클라 · 서버 · 인프라 | 표시 핑 급등 · 송신 큐/메모리 증가 · 재전송률 · RTO · SRTT · cwnd · drop |
| 06 확인하고 줄이기 | `ss -ti`, `nstat`, Prometheus, Wireshark 필터 / UDP · thin-stream · 송신 큐 상한 · TCP_USER_TIMEOUT |

- 플레이어: [`tcp-retransmission/`](https://jungrok5.github.io/motion-graphics/tcp-retransmission/)

## skill-journey (85s)

"내 스킬 하나가 상대 화면에 뜨기까지" — 입력부터 상대 화면까지의 경로. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 전체 지도 | 내 클라 → 네트워크 → 게임 서버 → 네트워크 → 상대 클라 |
| 02 내 클라 안에서 | 키 입력 → 게임 루프 → 예측 실행 → UseSkillReq 생성 → 직렬화 · 암호화 → send() → NIC |
| 03 네트워크 구간 | 공유기 · ISP · 백본 · 방화벽 · LB를 지나는 편도 ≈ RTT/2 |
| 04 서버 안에서 | NIC → I/O 스레드 → 세션 → 존 큐(다음 틱 대기) → 검증 · 판정 · AOI · 브로드캐스트 → 송신 |
| 05 상대 화면까지 | 다운링크 → recv → 다음 프레임 → 보간 버퍼(~100ms) → 애니 · 이펙트 → 화면 |
| 06 시간을 다 더하면 | 예시 합계 ≈ 221ms, 가장 큰 덩어리: 보간 · 네트워크 왕복 · 틱 대기 |

- 플레이어: [`skill-journey/`](https://jungrok5.github.io/motion-graphics/skill-journey/)

## tick-and-rtt (83s)

"50ms와 RTT, 렉은 어디서 생길까?" — 틱 처리시간 예산과 RTT의 영향. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 틱은 서버 세계의 시계 | 20Hz = 50ms마다 세계가 한 칸, 조건: 처리시간 < 틱 간격 |
| 02 50ms를 넘으면 | 다음 틱이 밀림 → 8Hz, 응답 = 틱 대기 + 처리: 70ms → 180ms, 존 전원이 동시에 |
| 03 끊김과 왜곡 | 스냅샷 간격 증가 → 보간 버퍼 바닥, 쿨다운 지연, 틱 몰아치기, dt 증가 |
| 04 RTT란 | 업링크 + 서버(틱 대기 · 처리) + 다운링크, RTT 30ms vs 200ms |
| 05 RTT가 느리면 | 결과 확인 지연 · 남이 보는 나는 과거 · 판정 불일치(랙 보상) · 보정 폭 증가 · 지터 |
| 06 정리 | 틱 처리시간 vs RTT vs 지터 비교표, 체감 지연 공식 |

- 플레이어: [`tick-and-rtt/`](https://jungrok5.github.io/motion-graphics/tick-and-rtt/)

## boss-lag (82s)

"보스가 뜨면 왜 렉이 걸릴까?" — 인원 집중, N² 브로드캐스트, 시야 반경. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 사람이 몰린다 | 보스 등장 → 흩어져 있던 플레이어 200명이 한곳으로 |
| 02 브로드캐스트는 N × (N − 1) | 한 명의 변화 → N−1명에게 복제, 200명 = 39,800/틱 = 796,000/초 ≈ 320Mbps |
| 03 시야가 넓으면 더 나빠진다 | 반경 2배 → 면적 · 보이는 인원 4배 → 브로드캐스트 · AOI 비용 · 클라 수신/렌더 4배 |
| 04 보스 전투가 더하는 것 | 광역기 판정(피격 × 보는 사람), 이펙트 · 버프 · 투사체, 어그로 · AI, HP · 페이즈 갱신 |
| 05 어디서 터지나 | 존 스레드 한 코어 100% → 틱 초과 → 아웃바운드 pps · 대역폭 → 클라 다운링크 → 클라 FPS |
| 06 게임은 이렇게 줄인다 | 거리별 갱신 빈도, 시야 인원 상한, 반경 자동 축소, 묶어 보내기 · 델타, 채널 분리, 클라 LOD |

- 플레이어: [`boss-lag/`](https://jungrok5.github.io/motion-graphics/boss-lag/)

## slow-client (92s)

"클라가 느리면 서버도 느려질까?" — 백프레셔와 느린 클라 격리. `tech-motion-explainer` 스킬로 제작.

| 챕터 | 내용 |
|---|---|
| 01 답: 조건부로 맞다 | 서버가 느린 클라를 기다리면 모두 느려지고, 격리하면 그 클라만 느리다 |
| 02 느린 클라의 두 종류 | 느린 회선(받는 속도 부족) · 느린 기기(읽고 처리하는 속도 부족) |
| 03 압력이 서버로 거꾸로 온다 | 클라 수신 버퍼 → Zero Window → 서버 SO_SNDBUF → send() EAGAIN/블로킹 → 앱 송신 큐 증가 |
| 04 서버가 느려지는 네 가지 경로 | 블로킹 send · 무제한 송신 큐(메모리 · GC · OOM) · 락 보유 대기 · 몰아치는 입력 |
| 05 잘 만든 서버는 격리한다 | 논블로킹 send, 세션별 큐 상한, 상태 패킷 최신값 덮어쓰기, 느린 세션 정리, 버퍼 풀 · 상한만으로 새는 곳: IOCP 대기 요청, 공유 브로드캐스트 버퍼, EAGAIN 헛돌기, 숨은 대기(락 · 로깅 · TLS) |
| 06 인프라에서 확인하는 법 | `ss` Send-Q, `tcp.analysis.zero_window`, 세션 큐 · 메모리 · 틱 p99를 함께 보고 판단 |

- 플레이어: [`slow-client/`](https://jungrok5.github.io/motion-graphics/slow-client/)

## one-byte (85s)

"이동 패킷 1바이트를 줄이면 무슨 일이?" — 곱하기 구조와 정직한 효과. `tech-motion-explainer` 스킬로 제작.
예시 가정: 동접 5,000 · 보는 사람 50 · 이동 갱신 10Hz · 이동 정보 24B.

| 챕터 | 내용 |
|---|---|
| 01 이동 정보 하나 | ID · 좌표 · 방향 · 상태 · 시각 = 24B, 1B = 약 4% |
| 02 곱하기가 붙는다 | 1B × 50 × 10Hz × 5,000 = 2.5MB/s(20Mbps) → 216GB/일 → 6.5TB/월 |
| 03 왜 브로드캐스트가 대부분인가 | 1을 받고 50을 내보낸다, 이동이 송신의 60%(예시) → 1B ≈ 전체 송신의 2.5% |
| 04 성능과 용량은 얼마나? | CPU 병목이면 거의 그대로, 대역폭 병목이면 일반 필드 +4% · 보스존(N²) +2% |
| 05 문턱을 넘을 때 | 61명 × 24B = 1,464B > MSS 1,460B → 패킷 2개, 23B면 1개 |
| 06 1바이트를 넘어서 | 양자화 · 압축 · 델타 · 묶기로 24B → 12B: −78TB/월, −$3.9k~7k/월, 대역폭 병목 시 동접 ×2 · 보스존 ×1.4 |

- 플레이어: [`one-byte/`](https://jungrok5.github.io/motion-graphics/one-byte/)

## proto-cost (84s)

"프로토버퍼 vs 직접 만든 패킷" — 크기 · 트래픽 · 서버 비용과 실무의 선택. `tech-motion-explainer` 스킬로 제작.
예시 가정은 one-byte와 동일(동접 5,000 · 보는 사람 50 · 10Hz · 이동이 송신의 60%).

| 챕터 | 내용 |
|---|---|
| 01 같은 정보, 다른 크기 | 직접 만든 24B vs 프로토버퍼 기본 스키마 34B (+42%) |
| 02 어디서 커지나 | 실제 바이트(0A 20 / 08 / 15 …): 필드 태그 · float 5B · ms varint 6B · 중첩 길이 접두. 기본값 생략 · 작은 값 압축은 커스텀도 비트 패킹으로 똑같이 가능 |
| 03 곱하기를 붙이면 | 같은 수준끼리: 기본 24B vs 34B → 송신 +25%(+$3.2k~5.8k/월), 튜닝 19B(비트 패킹) vs 26B → +20%(+$2.3k~4.1k/월) |
| 04 서버 대수는? | 대역폭 병목: 20 → 25대(기본끼리) · 24대(튜닝끼리). CPU 병목: 엔티티당 1번 직렬화면 +2~5%, 받는 사람마다 직렬화는 구현 문제 |
| 05 그래도 쓰는 이유 | 스키마 진화 · 코드 생성(클라 · 서버 · 봇 동기화) · 다언어 · 검증된 파서 · 디버깅 |
| 06 섞어 쓴다 | 메시지 종류 3%가 트래픽 85%(예시) → 이동 · 전투만 bytes 필드에 비트 패킹(≈ 커스텀 크기) 또는 튜닝 스키마, 나머지는 프로토버퍼 그대로 |

- 플레이어: [`proto-cost/`](https://jungrok5.github.io/motion-graphics/proto-cost/)

## 새 영상 만들기 (Claude Code 스킬)

이 레포에는 `.claude/skills/tech-motion-explainer/` 스킬이 있습니다. Claude Code에서 이 레포를 열고
기술 내용을 주면서 "이걸로 모션그래픽 만들어줘"라고 하면 같은 스타일의 영상을 만듭니다.

- `SKILL.md` — 스토리 추출 → 스토리보드 → 구현 → 스틸 검증 → 배포 순서와 규칙, 연출 카탈로그
- `template.html` — 엔진(헬퍼, 배경, 헤더, 진행바, 코드 하이라이터) + 플레이어 + 예시 장면 4개

## 스크립트

```bash
# MP4 굽기
node scripts/render.mjs proto-bot-pipeline/index.html out/proto-bot-pipeline.mp4
# 특정 시점 스틸만
node scripts/render.mjs proto-bot-pipeline/index.html out/stills --stills 3,20,45
# 플레이어 헤드리스 점검 (에러, 재생, 챕터 이동, 모바일 폭)
node scripts/check-player.mjs proto-bot-pipeline/index.html
```

필요: Node 18+, Playwright(Chromium), ffmpeg.
폰트: Pretendard, JetBrains Mono (둘 다 OFL) — `assets/fonts/`.

## GitHub Pages

`.github/workflows/pages.yml`이 푸시마다 레포 전체를 Pages로 배포합니다.
루트 `index.html`은 영상 목록이며, 새 영상은 그 안의 `VIDEOS` 배열에 추가합니다.
처음 한 번은 레포 Settings → Pages → Source를 **GitHub Actions**로 설정해야 합니다.
