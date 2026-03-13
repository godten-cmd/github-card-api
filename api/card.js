const projects = {
    finfolio: {
      name: "FinFolio",
      tag: "진행 중",
      tagColor: "#1D9E75",
      tagBg: "#E1F5EE",
      desc: "투자 포트폴리오 공유 플랫폼.\n거래 반응, 리마인더, GitHub식 기여 그래프",
      stack: ["Spring Boot", "PostgreSQL", "Redis", "WebSocket", "Firebase FCM"],
    },
    safeon: {
      name: "SafeOn",
      tag: "LG전자 산학",
      tagColor: "#185FA5",
      tagBg: "#E6F1FB",
      desc: "실시간 IoT 이상 감지 시스템.\nMQTT → ML → Spring → Flutter 파이프라인",
      stack: ["Spring Boot", "Flutter", "MQTT", "ML"],
    },
    bodyclick: {
      name: "BodyClick",
      tag: null,
      desc: "Three.js 기반 3D 헬스케어 플랫폼.\n인체 모델 인터랙션 UX 설계",
      stack: ["React", "Three.js", "Zustand"],
    },
    iveread: {
      name: "IVEread",
      tag: null,
      desc: "독서 기록 · 공유 커뮤니티 앱.\nFE 담당",
      stack: ["TypeScript", "React"],
    },
    zerosumgame: {
      name: "ZeroSumGame",
      tag: null,
      desc: "금융 · 경제 개념을\n게임으로 학습하는 프로젝트",
      stack: ["TypeScript"],
    },
    goemotion: {
      name: "GoEmotion",
      tag: "ML",
      tagColor: "#854F0B",
      tagBg: "#FAEEDA",
      desc: "텍스트 기반\n감정 분석 모델",
      stack: ["Python", "NLP"],
    },
    hyblock: {
      name: "Hyblock",
      tag: "블록체인 학회",
      tagColor: "#534AB7",
      tagBg: "#EEEDFE",
      desc: "한양대 블록체인 학회 비즈니스팀.\n디지털 자산 스터디 및 프로젝트 기획",
      stack: ["Blockchain", "Web3"],
    },
  };
  
  function stackBadge(label) {
    const w = label.length * 7.5 + 20;
    return `<rect x="0" y="0" width="${w}" height="22" rx="4" fill="#F1EFE8"/>
      <text x="${w / 2}" y="14" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#5F5E5A">${label}</text>`;
  }
  
  function buildStackRow(stack) {
    let x = 0;
    const badges = stack.map((s) => {
      const w = s.length * 7.5 + 20;
      const badge = `<g transform="translate(${x}, 0)">${stackBadge(s)}</g>`;
      x += w + 6;
      return badge;
    });
    return { svg: badges.join(""), totalWidth: x };
  }
  
  function wrapText(text) {
    return text.split("\n");
  }
  
  module.exports = (req, res) => {
    const id = (req.query.id || "").toLowerCase();
    const theme = req.query.theme || "light";
  
    const p = projects[id];
    if (!p) {
      res.status(404).send("Project not found. Available: " + Object.keys(projects).join(", "));
      return;
    }
  
    const W = 420;
    const H = 160;
    const bg = theme === "dark" ? "#161b22" : "#ffffff";
    const border = theme === "dark" ? "#30363d" : "#e5e7eb";
    const textPrimary = theme === "dark" ? "#e6edf3" : "#1a1a1a";
    const textSecondary = theme === "dark" ? "#8b949e" : "#6b7280";
  
    const lines = wrapText(p.desc);
    const { svg: stackSvg } = buildStackRow(p.stack);
  
    const tagSvg = p.tag
      ? `<rect x="0" y="0" width="${p.tag.length * 7 + 16}" height="18" rx="3" fill="${p.tagBg}"/>
         <text x="${(p.tag.length * 7 + 16) / 2}" y="12.5" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="600" fill="${p.tagColor}">${p.tag}</text>`
      : "";
  
    const tagWidth = p.tag ? p.tag.length * 7 + 16 + 8 : 0;
  
    const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
  
    <!-- title -->
    <text x="20" y="38" font-family="'Segoe UI',sans-serif" font-size="15" font-weight="700" fill="${textPrimary}">${p.name}</text>
  
    <!-- tag -->
    ${p.tag ? `<g transform="translate(${20 + p.name.length * 9 + 8}, 24)">${tagSvg}</g>` : ""}
  
    <!-- desc -->
    ${lines.map((l, i) => `<text x="20" y="${66 + i * 18}" font-family="'Segoe UI',sans-serif" font-size="12" fill="${textSecondary}">${l}</text>`).join("\n  ")}
  
    <!-- stack badges -->
    <g transform="translate(20, ${H - 36})">${stackSvg}</g>
  </svg>`;
  
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(svg);
  };