/*
 * 한강잼 참가자 앱 설정 파일
 * ─────────────────────────────────────────────
 * 디자인(색·글꼴·모양), 화면 구성(탭·블록 순서), 모든 문구와 목록이 여기에 있어요.
 * 직접 고쳐도 되고, 앱 화면 오른쪽 아래 [디자인 편집] 버튼으로 고친 뒤
 * [저장] 탭에서 "config.js 내보내기"로 이 파일 전체를 바꿔 넣어도 됩니다.
 */
window.HGJ_CONFIG = {
  /* ===== 디자인 ===== */
  theme: {
    colors: {            // 라이트 모드 색
      yellow: "#FFC700",   // 포인트 노랑 (메인 배너·면허증)
      blue: "#1764F0",     // 포인트 파랑 (슬로건·버튼·선택된 탭)
      red: "#E8261E",      // 포인트 빨강 (정지 표지판·배틀·진행 중)
      asphalt: "#2A2C31",  // 아스팔트 (상단 안내띠·인포)
      onAccent: "#1F2024", // 노랑 위에 올라가는 글자색
      bg: "#FFF8DC",       // 화면 배경
      surface: "#FFFFFF",  // 카드 배경
      ink: "#1F2024",      // 기본 글자
      muted: "#6B6A63",    // 보조 글자
      line: "#E8DFC0",     // 구분선·테두리
      tab: "#FFFFFF"       // 하단 탭바 배경
    },
    dark: {              // 다크 모드에서 바뀌는 색
      bg: "#202226",
      surface: "#2C2F34",
      ink: "#F3F1E8",
      muted: "#A9A79E",
      line: "#3B3E44",
      tab: "#2A2C31"
    },
    fontDisplay: "Pretendard", // 제목용 글꼴
    fontBody: "Pretendard",    // 본문용 글꼴
    /* 굵기: 400 Regular · 500 Medium · 600 SemiBold · 700 Bold · 800 ExtraBold */
    weights: {
      display: 800,  // 제목 (브랜드·슬로건·섹션 제목·표지판)
      strong: 700,   // 강조 (카드 제목·버튼·탭·라벨)
      medium: 600,   // 보조 강조 (안내 라벨·장소)
      body: 400      // 본문
    },
    /* 자간: % 단위 (-2 = -0.02em) */
    tracking: {
      display: -3,
      strong: -1,
      body: -0.5
    },
    lineHeight: 1.6,  // 본문 줄간격
    radius: 16,       // 카드 모서리 둥글기(px)
    fontSize: 15,     // 기본 글자 크기(px)
    borderWidth: 2,   // 강조 테두리 굵기(px)
    appWidth: 480     // 앱 최대 너비(px)
  },

  /* ===== 화면 구성 (순서 = 표시 순서, show:false 면 숨김) ===== */
  layout: {
    tabs: [
      { id: "home", label: "홈", show: true },
      { id: "time", label: "시간표", show: true },
      { id: "fun", label: "즐길거리", show: true },
      { id: "map", label: "지도", show: true },
      { id: "me", label: "내 면허", show: true }
    ],
    home: [
      { id: "hero", label: "메인 배너", show: true },
      { id: "now", label: "지금 진행 중", show: true },
      { id: "quick", label: "바로가기 버튼", show: true },
      { id: "info", label: "오는 길·참여 안내", show: true }
    ],
    fun: [
      { id: "prog", label: "프로그램", show: true },
      { id: "line", label: "라인업", show: true },
      { id: "music", label: "음악", show: true }
    ]
  },

  /* ===== 이미지 =====
   * 빈칸("")이면 기본 그래픽을 써요. images/ 폴더에 넣은 파일 경로("images/map.png")나
   * https:// 주소를 넣거나, 편집기 [이미지] 탭에서 파일을 올리면 돼요.
   */
  images: {
    logo: "",      // 상단 브랜드 글자 대신 쓸 로고
    heroPoster: "images/poster-vol7.jpg", // 메인 배너를 통째로 대신할 포스터 (넣으면 아래 배경·그림·슬로건 대신 포스터만 보여요)
    heroBg: "",    // 메인 배너 배경
    heroDim: 0,    // 배경 이미지 어둡게 (0~70 %)
    heroArt: "",   // 메인 배너의 D-day 다이아몬드 대신 쓸 그림
    map: ""        // 행사장 지도 (실제 도면으로 교체)
  },

  /* ===== 행사 기본 정보 ===== */
  event: {
    date: "2026-11-07",
    vol: 7,
    brand: "한강잼",
    brandSub: "Vol.7 × WE STREET",
    badge: "ONLY\nDANCE",
    dateLabel: "11월 7일 토",
    slogan: "일단 춤\n추시오",
    meta: "14:00–18:00 · 뚝섬 한강공원 한강플플"
  },

  /* ===== 화면 문구 ===== */
  texts: {
    demo: "프로토타입 · 화면 구성 확인용이며, 회원 정보와 숫자는 예시입니다.",
    nowIdle: "행사 당일 이 자리에 진행 중인 순서가 표시돼요",
    titleTime: "시간표",
    timetableNote: "장르 체험과 플리마켓은 1층 자벌레 복도에서 행사 내내 열려요.",
    titleFun: "즐길거리",
    musicNote: "DJ DAMES가 세션별로 틀 음악의 분위기예요. 미리 듣고 몸을 풀어보세요.",
    playlistLabel: "플레이리스트 열기",
    playlistUrl: "",
    titleMap: "행사장 지도",
    mapNote: "개념도예요. 답사 후 실제 도면으로 바꿀 예정입니다.",
    titleMe: "내 댄스 면허",
    loginIntro: "신청서에 적은 닉네임과 연락처 뒤 4자리로 내 기록을 확인해요.",
    loginButton: "내 면허 보기",
    licenseTitle: "한강잼 댄스 면허증",
    licenseSub: "HAN GANG JAM DANCE LICENSE"
  },

  /* ===== 목록 내용 ===== */
  content: {
    quick: [
      { label: "시간표", desc: "무엇이 언제 열리나요", go: "time" },
      { label: "즐길거리", desc: "프로그램·라인업·음악", go: "fun" },
      { label: "행사장 지도", desc: "어디로 가면 되나요", go: "map" },
      { label: "내 댄스 면허", desc: "참여 기록 확인", go: "me" }
    ],
    info: [
      { label: "오는 길", value: "7호선 자양역 → 한강플플(자벌레)" },
      { label: "참여", value: "현장 누구나 참여 가능. 사전 신청자는 웰컴 기프트와 개인 영상을 받아요." },
      { label: "문의", value: "인스타그램 @be.onlit" }
    ],
    kinds: [
      { id: "jam", label: "JAM", color: "blue" },
      { id: "show", label: "공연", color: "yellow" },
      { id: "battle", label: "배틀", color: "red" }
    ],
    timetable: [
      { t: "13:30", end: "14:00", name: "HOUSE OPEN", sub: "인포데스크 오픈 · 기프트 수령", k: "", side: "" },
      { t: "14:00", end: "15:00", name: "JAM SESSION 1", sub: "MC 유경", k: "jam", side: "장르 체험 30분 (1층 복도)" },
      { t: "15:00", end: "15:30", name: "위스트릿 무대 1부", sub: "MC 혁준", k: "show", side: "" },
      { t: "15:30", end: "16:00", name: "EVENT BATTLE 8강", sub: "2:2 랜덤 매칭", k: "battle", side: "" },
      { t: "16:00", end: "16:30", name: "JAM SESSION 2", sub: "MC 유경", k: "jam", side: "장르 체험 30분 (1층 복도)" },
      { t: "16:30", end: "16:45", name: "EVENT BATTLE 4강", sub: "", k: "battle", side: "" },
      { t: "16:45", end: "17:15", name: "위스트릿 무대 2부", sub: "MC 혁준", k: "show", side: "" },
      { t: "17:15", end: "17:20", name: "EVENT BATTLE 결승", sub: "스페셜 저지 판정", k: "battle", side: "" },
      { t: "17:20", end: "17:50", name: "시상식", sub: "MC 유경 · 혁준", k: "", side: "" },
      { t: "17:50", end: "18:00", name: "AFTER JAM", sub: "마지막 자유 잼", k: "jam", side: "" }
    ],
    programs: [
      { sign: "circ", mark: "JAM", where: "야외 메인", title: "JAM 세션", img: "", desc: "정해진 안무 없이 음악이 흐르면 원 안으로 들어와 자유롭게 춤춰요. 구경만 해도 좋아요." },
      { sign: "oct", mark: "VS", where: "야외 메인", title: "이벤트 배틀", img: "", desc: "2:2 랜덤 매칭 8강 토너먼트. 현장에서 뽑힌 시민 스페셜 저지가 승패를 정해요." },
      { sign: "dia", mark: "★", where: "야외 메인", title: "위스트릿 무대", img: "", desc: "대학생·청년 스트릿댄스 팀의 공연을 15:00, 16:45 두 번 볼 수 있어요." },
      { sign: "tri", mark: "!", where: "1층 자벌레 복도", title: "장르 체험", img: "", desc: "브레이킹·왁킹 중 골라 레벨 1–3 동작에 도전해요. 성공하면 럭키드로우 추첨권이나 굿즈를 드려요." },
      { sign: "circ", mark: "M", where: "1층 자벌레 복도", title: "플리마켓", img: "", desc: "스트릿 브랜드 3–4팀이 의류·잡화·아트워크를 직접 소개해요." },
      { sign: "dia", mark: "Z", where: "무대 바깥", title: "DANCE ZONE", img: "", desc: "무대 안이 부담스럽다면 원 바깥 DANCE ZONE에서 편하게 춤춰요." }
    ],
    lineup: [
      { av: "DJ", img: "", name: "DAMES", tag: "", role: "DJ · 하루 종일 음악 담당" },
      { av: "유", img: "", name: "유경", tag: "", role: "MC · JAM·배틀 진행" },
      { av: "혁", img: "", name: "혁준", tag: "", role: "MC · 위스트릿 무대 진행" },
      { av: "B", img: "", name: "브레이킹 강사", tag: "공개 예정", role: "장르 체험" },
      { av: "W", img: "", name: "왁킹 강사", tag: "공개 예정", role: "장르 체험" },
      { av: "WS", img: "", name: "위스트릿 공연팀", tag: "10/26 공개", role: "공연 1부·2부" }
    ],
    music: [
      { title: "JAM SESSION 1", desc: "힙합 · 펑크 · 올드스쿨" },
      { title: "JAM SESSION 2", desc: "브레이크비트 · 하우스" },
      { title: "이벤트 배틀", desc: "배틀 브레이크 · 펑크" },
      { title: "AFTER JAM", desc: "신청곡 위주 자유 플레이" }
    ],
    zones: [
      { n: "1", color: "red", title: "장르 체험", desc: "스태프 안내에 따라 장르를 고르고 바로 시작해요." },
      { n: "2", color: "blue", title: "플리마켓", desc: "행사 내내 열려 있어요." },
      { n: "3", color: "yellow", title: "메인 무대", desc: "JAM, 공연, 배틀이 모두 여기서 열려요." },
      { n: "4", color: "yellow", title: "DANCE ZONE", desc: "무대를 둘러싼 원 바깥, 누구나 춤출 수 있는 곳." },
      { n: "5", color: "asphalt", title: "인포데스크", desc: "사전 신청자는 여기서 웰컴 기프트를 받아요." }
    ],
    levels: [
      { min: 1, name: "연습면허" },
      { min: 2, name: "2종 보통" },
      { min: 4, name: "1종 보통" },
      { min: 6, name: "1종 대형" }
    ],
    genres: [
      { name: "힙합", count: 12 },
      { name: "브레이킹", count: 9 },
      { name: "코레오", count: 8 },
      { name: "왁킹", count: 6 },
      { name: "락킹", count: 4 },
      { name: "팝핀", count: 3 }
    ],
    /* 예시 회원 데이터: 실제 운영 시 구글시트에서 본인 것만 불러오도록 교체 */
    members: [
      { nick: "바운스", pin: "1234", genre: "브레이킹", first: 2023, no: "0007", photo: "", vols: [1, 2, 3, 4, 6, 7],
        videos: [{ vol: 6, title: "Vol.6 JAM 참가 영상", url: "#" }, { vol: 6, title: "Vol.6 이벤트 배틀 결승", url: "#" }, { vol: 4, title: "Vol.4 JAM 참가 영상", url: "#" }] },
      { nick: "킥스텝", pin: "5678", genre: "왁킹", first: 2025, no: "0052", photo: "", vols: [4, 6, 7],
        videos: [{ vol: 6, title: "Vol.6 JAM 참가 영상", url: "#" }] },
      { nick: "웨이브", pin: "0000", genre: "힙합", first: 2026, no: "0131", photo: "", vols: [7], videos: [] }
    ]
  }
};
