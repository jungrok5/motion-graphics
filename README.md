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
