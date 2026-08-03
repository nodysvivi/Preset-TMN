(function () {
  const SCRIPT_ID = typeof getScriptId === "function" ? getScriptId() : "silver_moon_styler";
  const STYLE_ID = `reasoning-style-${SCRIPT_ID}`;
  const DEBUG = false; // Tắt nhật ký gỡ lỗi

  function log(...args) {
    if (DEBUG) console.log("[SilverMoon]", ...args);
  }

  function getTopDocument() {
    try {
      return window.top?.document || document;
    } catch {
      return document;
    }
  }

  function getST() {
    return typeof SillyTavern !== "undefined" ? SillyTavern : null;
  }

  // Chủ động tạo và ghi đè cấu hình reasoning, đảm bảo kiểu dáng của kịch bản này có hiệu lực
  function injectConfig() {
    const context = getST()?.getContext?.();
    if (!context) return;
    const settings = context.powerUserSettings ?? (context.powerUserSettings = {});
    if (!settings.reasoning) settings.reasoning = {};
    const config = settings.reasoning;
    config.auto_parse = true;
    config.prefix = "[metacognition]";
    config.suffix = "</thinking>";
  }

  // ===================== CSS (Phiên bản tối ưu hóa & Sửa lỗi hiển thị) =====================
  const REASONING_CSS = String.raw`
/* ========================================================= */
/*  Chủ đề: Ngân Nguyệt · Vớt nước trăng trên tay (Fixed)     */
/* ========================================================= */

#chat .mes_reasoning_details[data-state="thinking"],
#chat .mes_reasoning_details[data-state="done"] {
    margin: 16px 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    position: relative !important;
    isolation: isolate !important;
    background: linear-gradient(172deg, #0b1525 0%, #0d1b30 45%, #0b1525 100%) !important;
    border: 1px solid rgba(180, 195, 215, 0.08) !important;
    border-left: 3px solid rgba(180, 195, 215, 0.20) !important;
    border-radius: 20px 6px 20px 6px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(180,195,215,0.04) !important;
    transition: border-color 0.7s ease, box-shadow 0.7s ease !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    display: block !important;
}

#chat .mes_reasoning_details[data-state="done"] {
    border-color: rgba(180, 195, 215, 0.12) !important;
    border-left-color: rgba(180, 195, 215, 0.35) !important;
    box-shadow: 0 4px 40px rgba(180,195,215,0.05), inset 0 1px 0 rgba(180,195,215,0.06) !important;
}

/* Bối cảnh bầu trời sao (Tĩnh) */
#chat .mes_reasoning_details[data-state]::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
        radial-gradient(1px 1px at 12% 8%,  rgba(255,255,255,0.65), transparent),
        radial-gradient(1px 1px at 28% 4%,  rgba(255,255,255,0.35), transparent),
        radial-gradient(1.5px 1.5px at 52% 11%, rgba(255,255,255,0.72), transparent),
        radial-gradient(1px 1px at 72% 6%,  rgba(255,255,255,0.28), transparent),
        radial-gradient(1px 1px at 88% 16%, rgba(255,255,255,0.48), transparent),
        radial-gradient(1.4px 1.4px at 18% 28%, rgba(255,255,255,0.18), transparent),
        radial-gradient(1px 1px at 82% 22%, rgba(255,255,255,0.32), transparent),
        radial-gradient(1.2px 1.2px at 6% 42%,  rgba(255,255,255,0.22), transparent),
        radial-gradient(1px 1px at 94% 38%,  rgba(255,255,255,0.3), transparent);
}

/* Dải sáng tiến độ */
#chat .mes_reasoning_details[data-state="thinking"]::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 12%;
    width: 76%;
    height: 2px;
    z-index: 5;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(180,195,215,0.35), transparent);
    border-radius: 1px;
    animation: sm-progress-slide 2.6s ease-in-out infinite;
}
@keyframes sm-progress-slide {
    0%   { transform: scaleX(0.15); opacity: 0.25; }
    50%  { transform: scaleX(1);    opacity: 0.75; }
    100% { transform: scaleX(0.15); opacity: 0.25; }
}

/* Header & Summary Container */
#chat .mes_reasoning_details[data-state] .mes_reasoning_summary,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_block,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header {
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}

#chat .mes_reasoning_details[data-state] .mes_reasoning_summary {
    position: relative;
    z-index: 10;
    padding: 16px 16px 16px 12px !important;
    min-height: 60px;
    color: rgba(180,195,220,0.65) !important;
    cursor: pointer !important;
    list-style: none !important;
    display: flex !important;
    align-items: center !important;
    transition: background 0.3s ease !important;
    user-select: none !important;
    overflow: hidden !important;
}

#chat .mes_reasoning_details[data-state] .mes_reasoning_summary:hover {
    background: rgba(180,195,215,0.03) !important;
}

#chat .mes_reasoning_details[data-state] .mes_reasoning_summary::-webkit-details-marker {
    display: none !important;
}

#chat .mes_reasoning_details[data-state] .mes_reasoning_header {
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    cursor: pointer !important;
    position: relative;
    z-index: 10;
    overflow: hidden !important;
}

/* [SỬA LỖI ĐÈ CHỮ]: ẨN TRIỆT ĐỂ TẤT CẢ PHẦN TỬ VĂN BẢN VÀ ICON GỐC CỦA SILLYTAVERN */
#chat .mes_reasoning_details[data-state] .thinking-icon,
#chat .mes_reasoning_details[data-state] .icon-svg,
#chat .mes_reasoning_details[data-state] .mes_reasoning_arrow,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_text,
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_title * {
    display: none !important;
    font-size: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;
}

/* Khối tiêu đề chính */
#chat .mes_reasoning_details[data-state] .mes_reasoning_header_title {
    padding-left: 52px !important;
    font-size: 0 !important;
    color: transparent !important;
    flex: 1 !important;
    min-width: 0 !important;
    max-width: 100% !important;
    cursor: pointer !important;
    display: flex !important;
    flex-direction: column !important; /* Xếp hàng dọc cho tiêu đề và câu thơ */
    justify-content: center !important;
    gap: 2px !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
}

/* Tiêu đề trạng thái đang suy nghĩ */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header_title::before {
    content: '\2726  Vớt nước trăng trên tay, vờn hoa hương vương áo';
    font-family: 'Noto Serif SC', serif !important;
    font-size: 0.92rem !important;
    font-weight: 500 !important;
    color: rgba(180,195,215,0.85);
    text-shadow: 0 0 18px rgba(180,195,215,0.20);
    animation: sm-title-pulse 3.2s ease-in-out infinite;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
}

@keyframes sm-title-pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.98); }
    50%      { opacity: 0.95; transform: scale(1.01); }
}

/* Tiêu đề trạng thái đã hoàn thành */
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header_title::before {
    content: '\2726  Ngân nguyệt chiếu tuyết đọng';
    font-family: 'Noto Serif SC', serif !important;
    font-size: 0.92rem !important;
    font-weight: 500 !important;
    color: #bcc8d8;
    text-shadow: 0 0 20px rgba(180,195,215,0.40);
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100% !important;
}

/* Câu thơ phụ đề (Đã xử lý chống tràn lề phải) */
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header_title::after {
    content: '\2014\2014 Ngân nguyệt chiếu tuyết đọng, lưu quang dạo loanh quanh \2014\2014';
    display: block !important;
    max-width: 100% !important;
    font-size: 0.68rem !important;
    font-family: 'Noto Serif SC', 'STKaiti', 'KaiTi', serif;
    color: rgba(180,195,215,0.55);
    letter-spacing: 0.04em;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    opacity: 0;
    animation: sm-poem-fade-in 1.5s 0.3s forwards;
}

@keyframes sm-poem-fade-in {
    from { opacity: 0; transform: translateY(2px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* Khu vực nội dung suy nghĩ */
#chat .mes_reasoning_details[data-state] .mes_reasoning {
    position: relative;
    z-index: 8;
    padding: 16px 20px 20px !important;
    margin: 0 !important;
    border: none !important;
    border-top: 1px solid rgba(180,195,215,0.08) !important;
    background: linear-gradient(to top, rgba(6,18,33,0.6), transparent) !important;
    color: rgba(220,228,242,0.92) !important;
    font-size: 0.88rem !important;
    line-height: 1.8 !important;
    max-height: 340px;
    overflow-y: auto;
    font-weight: 400;
    word-break: break-word !important;
}

#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar { width: 4px; }
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar-track { background: transparent; }
#chat .mes_reasoning_details[data-state] .mes_reasoning::-webkit-scrollbar-thumb {
    background: rgba(180,195,215,0.12);
    border-radius: 2px;
}

/* ========== Hệ thống Mặt Trăng (Căn chỉnh chuẩn) ========== */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before,
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    z-index: 12;
    flex-shrink: 0;
    transform: translateY(-50%);
}

/* Trăng khuyết khi đang suy nghĩ */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before {
    background: #0b1525;
    box-shadow:
        inset 8px -4px 3px 2px rgba(235,242,250,0.72),
        inset 7px -3px 6px 3px rgba(200,215,235,0.58),
        inset 6px -3px 12px 4px rgba(175,195,220,0.48),
        0 0 10px rgba(180,195,215,0.30);
    animation: sm-crescent-breathe 3.2s ease-in-out infinite;
}

@keyframes sm-crescent-breathe {
    0%, 100% { opacity: 0.6;  transform: translateY(-50%) scale(0.92); }
    50%      { opacity: 0.95; transform: translateY(-50%) scale(1.05); }
}

/* Trăng tròn khi đã xong */
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
    background: radial-gradient(circle at 36% 34%,
        #f4f7fa 0%, #c0cce0 32%, #9aaec4 65%, #4e5d70 100%);
    box-shadow:
        0 0 16px rgba(180,195,215,0.45),
        0 0 36px rgba(180,195,215,0.25);
}

/* Vầng sáng phía sau trăng */
#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::after,
#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    width: 60px;
    height: 60px;
    transform: translate(-12px, -50%);
    border-radius: 50%;
    z-index: 11;
    pointer-events: none;
    filter: blur(6px);
}

#chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::after {
    background: radial-gradient(circle at 36% 34%, rgba(180,200,225,0.12) 0%, transparent 62%);
}

#chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::after {
    background: radial-gradient(circle at 36% 34%, rgba(205,220,240,0.15) 0%, transparent 60%);
}

/* Thích ứng thiết bị di động (Responsive mobile) */
@media (max-width: 600px) {
    #chat .mes_reasoning_details[data-state] .mes_reasoning_summary {
        padding: 12px 10px !important;
        min-height: 52px;
    }
    #chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header::before,
    #chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header::before {
        width: 30px;
        height: 30px;
        left: 6px;
    }
    #chat .mes_reasoning_details[data-state] .mes_reasoning_header_title {
        padding-left: 44px !important;
    }
    #chat .mes_reasoning_details[data-state="thinking"] .mes_reasoning_header_title::before,
    #chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header_title::before {
        font-size: 0.84rem !important;
    }
    #chat .mes_reasoning_details[data-state="done"] .mes_reasoning_header_title::after {
        font-size: 0.62rem !important;
    }
    #chat .mes_reasoning_details[data-state] .mes_reasoning {
        padding: 12px 14px !important;
    }
}

@media (prefers-reduced-motion: reduce) {
    #chat .mes_reasoning_details[data-state] * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

  // ===================== Tiêm (Inject) và Gỡ bỏ (Uninstall) =====================
  function injectStyleOnce(doc) {
    if (!doc || !doc.head) return;
    let style = doc.getElementById(STYLE_ID);
    if (!style) {
      style = doc.createElement("style");
      style.id = STYLE_ID;
      doc.head.appendChild(style);
    }
    style.textContent = REASONING_CSS;
  }

  function injectStyle() {
    const topDoc = getTopDocument();
    injectStyleOnce(topDoc);
    if (topDoc !== document) injectStyleOnce(document);
  }

  function removeStyle() {
    const topDoc = getTopDocument();
    for (const doc of [topDoc, document]) {
      const style = doc?.getElementById?.(STYLE_ID);
      if (style) style.remove();
    }
  }

  function init() {
    injectConfig();
    injectStyle();
    window.addEventListener("pagehide", removeStyle);
    log("SilverMoon styler initialized (lightweight).");
  }

  $(() => {
    errorCatched(init)();
  });
})();