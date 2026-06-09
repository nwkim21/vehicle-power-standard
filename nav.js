// 공통 사이드바(목차) 주입 + 현재 페이지 활성 표시. 메뉴 수정은 이 파일만 고치면 전 페이지 반영됩니다.
(function () {
  var groups = [
    { h: "규정 이해", items: [
      ["개요", "index.html#overview"],
      ["규정 구성", "index.html#structure"],
      ["적용 대상·정의", "index.html#scope"],
      ["시험 절차 (TP1·TP2)", "index.html#procedure"],
      ["시험 조건·시퀀스", "index.html#conditions"],
      ["R177 원문 (번역본)", "original.html"],
    ]},
    { h: "배경 및 논의 사항", items: [
      ["제정의 역사", "history.html"],
      ["기술 논의·쟁점", "debate.html"],
    ]},
    { h: "관련 동향", items: [
      ["유럽 현황", "europe.html"],
      ["각국 대응", "global.html"],
      ["국가별 비교", "compare.html"],
      ["최신 동향 (2026년 6월 업데이트)", "updates.html"],
    ]},
    { h: "국내 도입 적용", items: [
      ["국내 도입 시사점", "korea.html"],
      ["자료실", "library.html"],
    ]},
  ];

  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (file === "") file = "index.html";

  var html = '<a class="brand" href="index.html">' +
    '<div class="t">UN R177 정보 허브</div>' +
    '<div class="s">자동차 시스템 출력 평가 국제기준</div></a>';
  html += '<button class="toggle" onclick="document.getElementById(\'sidebar\').classList.toggle(\'open\')">☰ 목차</button>';
  html += '<div class="groups">';
  groups.forEach(function (g) {
    html += '<div class="group"><div class="h">' + g.h + "</div>";
    g.items.forEach(function (it) {
      var label = it[0], href = it[1];
      var target = href.split("#")[0].toLowerCase();
      var isAnchor = href.indexOf("#") !== -1;
      var active = (target === file && !isAnchor) ? ' class="active"' : "";
      html += '<a href="' + href + '"' + active + ">" + label + "</a>";
    });
    html += "</div>";
  });
  html += "</div>";

  var aside = document.getElementById("sidebar");
  if (aside) aside.innerHTML = html;

  // index.html: 하위 섹션 스크롤 위치에 따라 활성 표시
  if (file === "index.html") {
    var links = [].slice.call(document.querySelectorAll('aside a[href*="index.html#"]'));
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").split("#")[1];
      var s = document.getElementById(id);
      if (s) map[id] = a;
    });
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("active"); });
            if (map[e.target.id]) map[e.target.id].classList.add("active");
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
      Object.keys(map).forEach(function (id) { obs.observe(document.getElementById(id)); });
    }
  }
})();
