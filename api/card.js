const projects = {
    finfolo: {
      name: "FinFolo",
      tag: "진행 중",
      tagColor: "#1D9E75",
      tagBg: "#E1F5EE",
      desc: "투자 포트폴리오 공유 플랫폼.\n거래 반응, 리마인더, GitHub식 기여 그래프",
      stack: ["Spring Boot", "PostgreSQL", "Redis", "WebSocket", "FCM"],
      url: "https://github.com/folo-app",
    },
    safeon: {
      name: "SafeOn",
      tag: "LG전자 산학",
      tagColor: "#185FA5",
      tagBg: "#E6F1FB",
      desc: "실시간 IoT 이상 감지 시스템.\nMQTT → ML → Spring → Flutter 파이프라인",
      stack: ["Spring Boot", "Flutter", "MQTT", "ML"],
      url: "https://github.com/SWE-SafeOn",
    },
    bodyclick: {
      name: "BodyClick",
      tag: null,
      desc: "Three.js 기반 3D 헬스케어 플랫폼.\n인체 모델 인터랙션 UX 설계",
      stack: ["React", "Three.js", "Zustand"],
      url: "https://github.com/madcamp-BodyClick",
    },
    iveread: {
      name: "IVEread",
      tag: null,
      desc: "독서 기록 · 공유 커뮤니티 앱.\nFE 담당",
      stack: ["TypeScript", "React"],
      url: "https://github.com/IVEread/",
    },
    zerosumgame: {
      name: "ZeroSumGame",
      tag: null,
      desc: "금융 · 경제 개념을\n게임으로 학습하는 프로젝트",
      stack: ["TypeScript"],
      url: "https://github.com/ZeroSum-Game",
    },
    goemotion: {
      name: "GoEmotion",
      tag: "ML",
      tagColor: "#854F0B",
      tagBg: "#FAEEDA",
      desc: "텍스트 기반 감정 분석 모델.\nNLP 기반 다중 감정 분류",
      stack: ["Python", "NLP"],
      url: "https://github.com/godten-cmd/GoEmotions",
    },
    hyblock: {
      name: "Hyblock",
      tag: "블록체인 학회",
      tagColor: "#534AB7",
      tagBg: "#EEEDFE",
      desc: "한양대 블록체인 학회 비즈니스팀.\n디지털 자산 스터디 및 프로젝트 기획",
      stack: ["Blockchain", "Web3"],
      url: "https://github.com/godten-cmd",
    },
    kbo: {
      name: "STATIZ KBO 2026",
      tag: "대회",
      tagColor: "#993C1D",
      tagBg: "#FAECE7",
      desc: "스탯티즈 KBO 2026 승부예측 대회.\n머신러닝 기반 경기 결과 이진 분류",
      stack: ["Python", "Random Forest", "scikit-learn"],
      url: "https://github.com/godten-cmd/STATIZ-KBO2026",
    },
  };
  
  function buildStackRow(stack, maxWidth) {
    let x = 0;
    const badges = [];
    for (const s of stack) {
      const w = s.length * 7.2 + 18;
      if (x + w > maxWidth) break;
      const badge = `<g transform="translate(${x}, 0)">
        <rect x="0" y="0" width="${w}" height="20" rx="4" fill="#F1EFE8"/>
        <text x="${w / 2}" y="13.5" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" fill="#5F5E5A">${s}</text>
      </g>`;
      badges.push(badge);
      x += w + 6;
    }
    return badges.join("");
  }
  
  module.exports = (req, res) => {
    const id = (req.query.id || "").toLowerCase();
    const theme = req.query.theme || "light";
  
    const p = projects[id];
    if (!p) {
      res.status(404).send("Project not found. Available: " + Object.keys(projects).join(", "));
      return;
    }
  
    const W = 460;
    const H = 185;
    const PAD = 22;
    const bg = theme === "dark" ? "#161b22" : "#ffffff";
    const border = theme === "dark" ? "#30363d" : "#e5e7eb";
    const textPrimary = theme === "dark" ? "#e6edf3" : "#1a1a1a";
    const textSecondary = theme === "dark" ? "#8b949e" : "#6b7280";
  
    const lines = p.desc.split("\n");
    const stackSvg = buildStackRow(p.stack, W - PAD * 2);
  
    const nameWidth = p.name.length * 8.5;
    const tagSvg = p.tag
      ? `<g transform="translate(${PAD + nameWidth + 10}, 23)">
          <rect x="0" y="0" width="${p.tag.length * 6.8 + 14}" height="17" rx="3" fill="${p.tagBg}"/>
          <text x="${(p.tag.length * 6.8 + 14) / 2}" y="11.5" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="600" fill="${p.tagColor}">${p.tag}</text>
        </g>`
      : "";
  
    const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <text x="${PAD}" y="36" font-family="'Segoe UI',sans-serif" font-size="18" font-weight="700" fill="${textPrimary}">${p.name}</text>
    ${tagSvg}
    ${lines.map((l, i) => `<text x="${PAD}" y="${62 + i * 19}" font-family="'Segoe UI',sans-serif" font-size="13" fill="${textSecondary}">${l}</text>`).join("\n  ")}
    <g transform="translate(${PAD}, ${H - 34})">${stackSvg}</g>
  </svg>`;
  
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  };