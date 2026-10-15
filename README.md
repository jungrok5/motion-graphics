# motion-graphics

코드로 만드는 모션그래픽. 각 영상은 `renderAt(t)` 하나로 모든 프레임을 그리는 캔버스 페이지이고,
Playwright로 프레임을 뽑아 ffmpeg로 MP4를 만듭니다.

## proto-bot-pipeline (64s, 1920×1080, 30fps)

"패킷 정의 하나로, 개발부터 라이브까지" — Protobuf 기반 봇 클라이언트 파이프라인 설명 영상.

| 챕터 | 내용 |
|---|---|
| 01 패킷 정의 | `.proto` 한 파일에 모든 클라↔서버 메시지 정의 |
| 02 코드 생성 | `protoc` 한 번으로 클라 · 서버 · 봇 코드 동시 생성 |
| 03 항상 동기화 | 필드 추가 → 재생성 → 봇도 자동 갱신 (수작업 봇은 낡음) |
| 04 서버가 먼저 | 클라보다 먼저 완성된 서버 컨텐츠를, 클라 패킷 플로우를 흉내 낸 봇으로 검증 |
| 05 퍼블리셔에게 | 같은 봇으로 대규모 부하 → 장비 스펙 산정 · 라이브 인프라 테스트 |

- 온라인 플레이어 (Claude 아티팩트): https://claude.ai/artifact/FMEYiR2uH4gr3HRMzaugwH
- 결과물: `out/proto-bot-pipeline.mp4`
- 플레이어: `proto-bot-pipeline/index.html`을 브라우저로 열면 재생/일시정지, 탐색바, 챕터 이동이 됩니다
  (Space = 재생/일시정지, ←/→ = 5초 이동). MP4는 같은 페이지를 프레임별로 구운 것입니다.

## 렌더링

```bash
node scripts/render.mjs proto-bot-pipeline/index.html out/proto-bot-pipeline.mp4
# 특정 시점 스틸만 뽑기
node scripts/render.mjs proto-bot-pipeline/index.html out/stills --stills 3,20,45
```

필요: Node 18+, Playwright(Chromium), ffmpeg.
폰트: Pretendard, JetBrains Mono (둘 다 OFL) — `assets/fonts/`.
