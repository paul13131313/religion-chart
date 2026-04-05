import { useState, useEffect } from "react";

const RELIGIONS = [
  {
    id: "christianity",
    name: "キリスト教",
    nameEn: "Christianity",
    color: "#C41E3A",
    symbol: "✝",
    founded: "1世紀",
    foundedYear: 30,
    founder: "イエス・キリスト",
    followers: "約25億人",
    followersNum: 2500,
    scripture: "聖書（旧約・新約）",
    godConcept: "一神教（三位一体）",
    coreTeaching: "神の愛と赦し。信仰による救済",
    afterlife: "天国と地獄",
    worship: "教会（チャーチ）",
    dietary: "宗派により異なる（断食など）",
    holyDay: "日曜日",
    branches: "カトリック / プロテスタント / 正教会",
    region: "全世界（欧米中心）",
    practice: "祈り・礼拝・聖餐",
  },
  {
    id: "islam",
    name: "イスラム教",
    nameEn: "Islam",
    color: "#006633",
    symbol: "☪",
    founded: "7世紀",
    foundedYear: 610,
    founder: "ムハンマド",
    followers: "約19億人",
    followersNum: 1900,
    scripture: "クルアーン（コーラン）",
    godConcept: "一神教（アッラー）",
    coreTeaching: "神への絶対的帰依。五行の実践",
    afterlife: "天国（ジャンナ）と地獄",
    worship: "モスク",
    dietary: "ハラール食。豚肉・酒の禁止",
    holyDay: "金曜日",
    branches: "スンナ派 / シーア派 / スーフィズム",
    region: "中東・北アフリカ・東南アジア",
    practice: "礼拝（1日5回）・断食・巡礼",
  },
  {
    id: "hinduism",
    name: "ヒンドゥー教",
    nameEn: "Hinduism",
    color: "#FF6600",
    symbol: "🕉",
    founded: "紀元前15世紀頃",
    foundedYear: -1500,
    founder: "特定の創始者なし",
    followers: "約12億人",
    followersNum: 1200,
    scripture: "ヴェーダ / ウパニシャッド / バガヴァッド・ギーター",
    godConcept: "多神教（ブラフマン＝宇宙の根本原理）",
    coreTeaching: "ダルマ（法）・カルマ（業）・輪廻転生",
    afterlife: "輪廻転生（モークシャ＝解脱が最終目標）",
    worship: "寺院（マンディル）",
    dietary: "菜食主義が理想。牛は神聖",
    holyDay: "各神に応じた祭日",
    branches: "ヴィシュヌ派 / シヴァ派 / シャクティ派",
    region: "インド・ネパール・東南アジア",
    practice: "プージャ（礼拝）・瞑想・ヨーガ",
  },
  {
    id: "buddhism",
    name: "仏教",
    nameEn: "Buddhism",
    color: "#FFB300",
    symbol: "☸",
    founded: "紀元前5世紀",
    foundedYear: -500,
    founder: "釈迦（ゴータマ・シッダールタ）",
    followers: "約5億人",
    followersNum: 500,
    scripture: "三蔵（経・律・論）",
    godConcept: "無神論的（創造神を想定しない）",
    coreTeaching: "四諦・八正道。苦からの解放",
    afterlife: "輪廻転生（涅槃＝解脱が目標）",
    worship: "寺院",
    dietary: "宗派により異なる（不殺生）",
    holyDay: "ウェーサーカ祭など",
    branches: "上座部 / 大乗 / 密教（チベット）",
    region: "東・東南アジア",
    practice: "瞑想・読経・修行",
  },
  {
    id: "judaism",
    name: "ユダヤ教",
    nameEn: "Judaism",
    color: "#0038B8",
    symbol: "✡",
    founded: "紀元前20世紀頃",
    foundedYear: -2000,
    founder: "アブラハム / モーセ",
    followers: "約1500万人",
    followersNum: 15,
    scripture: "タナハ（トーラー＝モーセ五書）",
    godConcept: "一神教（ヤハウェ）",
    coreTeaching: "神との契約。律法の遵守",
    afterlife: "諸説あり（オラム・ハバ＝来世）",
    worship: "シナゴーグ",
    dietary: "カシュルート（コーシャ食）",
    holyDay: "安息日（シャバット・土曜）",
    branches: "正統派 / 保守派 / 改革派",
    region: "イスラエル・アメリカ",
    practice: "祈り・トーラー学習・祭日の遵守",
  },
  {
    id: "sikhism",
    name: "シク教",
    nameEn: "Sikhism",
    color: "#1E90FF",
    symbol: "☬",
    founded: "15世紀",
    foundedYear: 1469,
    founder: "グル・ナーナク",
    followers: "約3000万人",
    followersNum: 30,
    scripture: "グル・グラント・サーヒブ",
    godConcept: "一神教（イク・オンカール）",
    coreTeaching: "平等・奉仕・誠実な生活",
    afterlife: "輪廻転生（神との合一が目標）",
    worship: "グルドワーラー",
    dietary: "宗派により異なる（多くは肉食可）",
    holyDay: "グルプラブ（師の記念日）",
    branches: "カールサー / ナームダーリー / ニルマラー",
    region: "インド（パンジャーブ地方）",
    practice: "瞑想・奉仕活動・ランガル（共同食事）",
  },
  {
    id: "taoism",
    name: "道教",
    nameEn: "Taoism",
    color: "#2E8B57",
    symbol: "☯",
    founded: "紀元前4世紀頃",
    foundedYear: -400,
    founder: "老子（体系化）",
    followers: "約1200万人",
    followersNum: 12,
    scripture: "道徳経 / 荘子",
    godConcept: "多神教（道＝万物の根源）",
    coreTeaching: "無為自然。道に従い調和して生きる",
    afterlife: "不老不死・仙人思想",
    worship: "道観（道教寺院）",
    dietary: "五葷を避ける（菜食傾向）",
    holyDay: "各種道教祭日",
    branches: "全真教 / 正一教",
    region: "中国・台湾・東南アジア",
    practice: "瞑想・気功・太極拳・風水",
  },
  {
    id: "shinto",
    name: "神道",
    nameEn: "Shinto",
    color: "#DC143C",
    symbol: "⛩",
    founded: "有史以前（体系化は7世紀頃）",
    foundedYear: -500,
    founder: "特定の創始者なし",
    followers: "約1億人",
    followersNum: 100,
    scripture: "古事記 / 日本書紀",
    godConcept: "多神教（八百万の神）",
    coreTeaching: "自然崇拝。清浄と穢れ。和の精神",
    afterlife: "黄泉の国（明確な教義は少ない）",
    worship: "神社",
    dietary: "特になし（神饌＝神への供え物）",
    holyDay: "元旦・例大祭など",
    branches: "神社神道 / 教派神道 / 国家神道（歴史的）",
    region: "日本",
    practice: "参拝・祭り・お祓い・御朱印",
  },
];

const CATEGORIES = [
  { key: "founded", label: "成立時期", icon: "📅" },
  { key: "founder", label: "創始者", icon: "👤" },
  { key: "followers", label: "信者数", icon: "👥" },
  { key: "scripture", label: "聖典", icon: "📖" },
  { key: "godConcept", label: "神の概念", icon: "✧" },
  { key: "coreTeaching", label: "主な教え", icon: "💡" },
  { key: "afterlife", label: "死後の世界観", icon: "∞" },
  { key: "worship", label: "礼拝場所", icon: "🏛" },
  { key: "dietary", label: "食事の決まり", icon: "🍽" },
  { key: "holyDay", label: "聖なる日", icon: "📿" },
  { key: "branches", label: "主な宗派", icon: "🌿" },
  { key: "region", label: "主な地域", icon: "🌍" },
  { key: "practice", label: "主な実践", icon: "🙏" },
];

const GOD_TYPES = [
  { label: "一神教", religions: ["christianity", "islam", "judaism", "sikhism"], color: "#4ECDC4" },
  { label: "多神教", religions: ["hinduism", "taoism", "shinto"], color: "#FF6B6B" },
  { label: "無神論的", religions: ["buddhism"], color: "#FFE66D" },
];

export default function ReligionChart() {
  const [selectedReligions, setSelectedReligions] = useState(
    RELIGIONS.map((r) => r.id)
  );
  const [viewMode, setViewMode] = useState("chart");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimReady(true), 100);
  }, []);

  const toggleReligion = (id: string) => {
    setSelectedReligions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filtered = RELIGIONS.filter((r) => selectedReligions.includes(r.id));

  const maxFollowers = Math.max(...RELIGIONS.map((r) => r.followersNum));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#E8E4DC",
      fontFamily: "'Noto Sans JP', 'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Cormorant+Garamond:wght@300;400;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .bar-animate {
          animation: growBar 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes growBar {
          from { width: 0; }
        }

        .symbol-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .tab-btn {
          padding: 10px 24px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: #999;
          font-size: 13px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
        }
        .tab-btn:first-child { border-radius: 6px 0 0 6px; }
        .tab-btn:last-child { border-radius: 0 6px 6px 0; }
        .tab-btn.active {
          background: rgba(255,255,255,0.1);
          color: #E8E4DC;
          border-color: rgba(255,255,255,0.3);
        }
        .tab-btn:hover:not(.active) {
          background: rgba(255,255,255,0.05);
          color: #ccc;
        }

        .religion-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 13px;
          color: #999;
          font-family: inherit;
        }
        .religion-toggle.active {
          border-color: var(--rc);
          background: color-mix(in srgb, var(--rc) 12%, transparent);
          color: #E8E4DC;
        }
        .religion-toggle:hover {
          background: rgba(255,255,255,0.06);
        }

        .chart-row {
          transition: background 0.2s;
        }
        .chart-row:hover {
          background: rgba(255,255,255,0.03);
        }

        .timeline-dot {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .timeline-dot:hover {
          transform: scale(1.4);
          box-shadow: 0 0 20px var(--tc);
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* Decorative background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 20% 0%, rgba(120,80,40,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(60,40,100,0.06) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <header className="fade-in" style={{
          padding: "60px 0 40px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            fontSize: 12, letterSpacing: 6, textTransform: "uppercase",
            color: "#666", marginBottom: 16,
          }}>
            WORLD RELIGIONS — COMPARATIVE CHART
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
            letterSpacing: 2,
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            世界の宗教
          </h1>
          <p style={{ fontSize: 15, color: "#777", fontWeight: 300, maxWidth: 500, margin: "0 auto" }}>
            8つの宗教を13の観点から比較する
          </p>
        </header>

        {/* Religion toggles */}
        <div className="fade-in" style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          justifyContent: "center", padding: "28px 0",
          animationDelay: "0.1s",
        }}>
          {RELIGIONS.map((r) => (
            <button
              key={r.id}
              className={`religion-toggle ${selectedReligions.includes(r.id) ? "active" : ""}`}
              style={{ "--rc": r.color } as React.CSSProperties}
              onClick={() => toggleReligion(r.id)}
            >
              <span style={{ fontSize: 16 }}>{r.symbol}</span>
              <span>{r.name}</span>
            </button>
          ))}
        </div>

        {/* View mode tabs */}
        <div className="fade-in" style={{
          display: "flex", justifyContent: "center", marginBottom: 32,
          animationDelay: "0.2s",
        }}>
          <button className={`tab-btn ${viewMode === "chart" ? "active" : ""}`} onClick={() => setViewMode("chart")}>
            比較チャート
          </button>
          <button className={`tab-btn ${viewMode === "followers" ? "active" : ""}`} onClick={() => setViewMode("followers")}>
            信者数
          </button>
          <button className={`tab-btn ${viewMode === "timeline" ? "active" : ""}`} onClick={() => setViewMode("timeline")}>
            タイムライン
          </button>
          <button className={`tab-btn ${viewMode === "godtype" ? "active" : ""}`} onClick={() => setViewMode("godtype")}>
            神の分類
          </button>
        </div>

        {/* CHART VIEW */}
        {viewMode === "chart" && (
          <div className="fade-in" style={{ overflowX: "auto", paddingBottom: 40 }}>
            <table style={{
              width: "100%", minWidth: filtered.length > 4 ? 1200 : 800,
              borderCollapse: "separate", borderSpacing: 0,
            }}>
              <thead>
                <tr>
                  <th style={{
                    position: "sticky", left: 0, zIndex: 2,
                    background: "#0A0A0F",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontSize: 11,
                    letterSpacing: 2,
                    color: "#555",
                    textTransform: "uppercase",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    minWidth: 140,
                  }}>
                    カテゴリ
                  </th>
                  {filtered.map((r) => (
                    <th key={r.id} style={{
                      padding: "16px 16px 20px",
                      textAlign: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      minWidth: 140,
                    }}>
                      <div className="symbol-float" style={{
                        fontSize: 28,
                        marginBottom: 8,
                        filter: `drop-shadow(0 0 8px ${r.color}40)`,
                      }}>
                        {r.symbol}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{r.nameEn}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((cat) => (
                  <tr
                    key={cat.key}
                    className="chart-row"
                    onMouseEnter={() => setHoveredRow(cat.key)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{
                      position: "sticky", left: 0, zIndex: 1,
                      background: hoveredRow === cat.key ? "#111118" : "#0A0A0F",
                      padding: "14px 20px",
                      fontSize: 13,
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      whiteSpace: "nowrap",
                      transition: "background 0.2s",
                    }}>
                      <span style={{ marginRight: 8 }}>{cat.icon}</span>
                      {cat.label}
                    </td>
                    {filtered.map((r) => (
                      <td key={r.id} style={{
                        padding: "14px 16px",
                        fontSize: 12.5,
                        lineHeight: 1.6,
                        color: "#BBB",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        borderLeft: `2px solid ${r.color}15`,
                        verticalAlign: "top",
                      }}>
                        {r[cat.key as keyof typeof r]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOLLOWERS VIEW */}
        {viewMode === "followers" && (
          <div className="fade-in" style={{ padding: "0 0 60px", maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 24, fontSize: 12, color: "#555", textAlign: "right" }}>
              単位: 百万人
            </div>
            {[...filtered].sort((a, b) => b.followersNum - a.followersNum).map((r, i) => (
              <div key={r.id} style={{
                display: "flex", alignItems: "center", gap: 16,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 36, textAlign: "center", fontSize: 22,
                  filter: `drop-shadow(0 0 6px ${r.color}50)`,
                }}>
                  {r.symbol}
                </div>
                <div style={{ width: 90, fontSize: 13, fontWeight: 500 }}>
                  {r.name}
                </div>
                <div style={{ flex: 1, position: "relative", height: 32 }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 4,
                  }} />
                  <div
                    className={animReady ? "bar-animate" : ""}
                    style={{
                      position: "absolute",
                      top: 0, left: 0, bottom: 0,
                      width: `${(r.followersNum / maxFollowers) * 100}%`,
                      background: `linear-gradient(90deg, ${r.color}CC, ${r.color}88)`,
                      borderRadius: 4,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                </div>
                <div style={{
                  width: 90, textAlign: "right",
                  fontSize: 14, fontWeight: 500, color: r.color,
                  fontFamily: "'Cormorant Garamond', serif",
                }}>
                  {r.followers}
                </div>
              </div>
            ))}
            <p style={{
              marginTop: 32, fontSize: 11, color: "#444",
              lineHeight: 1.8, textAlign: "center",
            }}>
              ※ 信者数は推定値であり、調査機関や定義により異なります
            </p>
          </div>
        )}

        {/* TIMELINE VIEW */}
        {viewMode === "timeline" && (
          <div className="fade-in" style={{ padding: "20px 0 60px" }}>
            <div style={{
              position: "relative",
              height: 400,
              margin: "0 40px",
            }}>
              {/* Timeline axis */}
              <div style={{
                position: "absolute",
                bottom: 60, left: 0, right: 0,
                height: 1,
                background: "rgba(255,255,255,0.12)",
              }} />

              {/* Era labels */}
              {[
                { label: "紀元前2000年", x: "0%" },
                { label: "紀元前1000年", x: "20%" },
                { label: "紀元前後", x: "40%" },
                { label: "500年", x: "50%" },
                { label: "1000年", x: "60%" },
                { label: "1500年", x: "70%" },
                { label: "2000年", x: "80%" },
              ].map((era) => (
                <div key={era.label} style={{
                  position: "absolute",
                  bottom: 30,
                  left: era.x,
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  color: "#444",
                  whiteSpace: "nowrap",
                }}>
                  <div style={{
                    width: 1, height: 8,
                    background: "rgba(255,255,255,0.15)",
                    margin: "0 auto 6px",
                  }} />
                  {era.label}
                </div>
              ))}

              {/* Religion dots */}
              {filtered.map((r, i) => {
                const minYear = -2200;
                const maxYear = 2000;
                const range = maxYear - minYear;
                const xPercent = ((r.foundedYear - minYear) / range) * 80;
                const yOffset = 80 + (i % 3) * 70;

                return (
                  <div
                    key={r.id}
                    style={{
                      position: "absolute",
                      left: `${xPercent}%`,
                      bottom: yOffset,
                      transform: "translateX(-50%)",
                      textAlign: "center",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      fontSize: 10,
                      color: "#888",
                      marginBottom: 4,
                      whiteSpace: "nowrap",
                    }}>
                      {r.founded}
                    </div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 500,
                      marginBottom: 6,
                      whiteSpace: "nowrap",
                    }}>
                      {r.name}
                    </div>
                    <div
                      className="timeline-dot"
                      style={{
                        "--tc": r.color,
                        width: 18, height: 18,
                        borderRadius: "50%",
                        background: r.color,
                        margin: "0 auto",
                        boxShadow: `0 0 12px ${r.color}60`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                      } as React.CSSProperties}
                    />
                    {/* Connector line */}
                    <div style={{
                      width: 1,
                      height: yOffset - 60,
                      background: `linear-gradient(to bottom, ${r.color}60, transparent)`,
                      margin: "0 auto",
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GOD TYPE VIEW */}
        {viewMode === "godtype" && (
          <div className="fade-in" style={{
            padding: "20px 0 60px",
            maxWidth: 800,
            margin: "0 auto",
          }}>
            {GOD_TYPES.map((type) => {
              const matching = filtered.filter((r) => type.religions.includes(r.id));
              if (matching.length === 0) return null;
              return (
                <div key={type.label} style={{
                  marginBottom: 40,
                  padding: "28px 32px",
                  background: `linear-gradient(135deg, ${type.color}08, ${type.color}03)`,
                  border: `1px solid ${type.color}20`,
                  borderRadius: 12,
                }}>
                  <h3 style={{
                    fontSize: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: type.color,
                    marginBottom: 4,
                  }}>
                    {type.label}
                  </h3>
                  <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>
                    {type.label === "一神教" && "唯一の神を信仰する"}
                    {type.label === "多神教" && "複数の神々または根源的原理を信仰する"}
                    {type.label === "無神論的" && "創造神を前提としない哲学的体系"}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {matching.map((r) => (
                      <div key={r.id} style={{
                        flex: "1 1 200px",
                        padding: "20px",
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: 8,
                        borderLeft: `3px solid ${r.color}`,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <span style={{ fontSize: 22 }}>{r.symbol}</span>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                            <div style={{ fontSize: 11, color: "#666" }}>{r.nameEn}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>
                          {r.godConcept}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <p style={{ fontSize: 11, color: "#444", lineHeight: 1.8, textAlign: "center", marginTop: 20 }}>
              ※ 分類は学術的な一般分類であり、各宗教内部の多様な解釈を含みきれません
            </p>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          padding: "40px 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          fontSize: 11,
          color: "#333",
          letterSpacing: 1,
        }}>
          <p>RELIGION CHART — A Comparative Overview of World Religions</p>
          <p style={{ marginTop: 8 }}>
            ※ 本サイトは情報提供を目的としたものであり、特定の宗教を推奨・批判するものではありません
          </p>
        </footer>
      </div>
    </div>
  );
}
