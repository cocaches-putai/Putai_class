/**
 * 普台高級中學 教務處工作日誌手機端填報系統 (Google Apps Script 後端)
 * 對齊 115 學年度全處 16 位同仁專屬分頁與欄位結構
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('普台教務處工作日誌')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getInitialParam() {
  return '';
}

/**
 * 取得全處 4 大組專屬群組連結 ＆ 16 位同仁專屬個人連結清單（主任管理端專用）
 */
function getAllStaffLinks() {
  var baseUrl = ScriptApp.getService().getUrl();
  var staffList = getStaffList();
  
  // 4 大組專屬群組連結
  var groups = ['教學組', '註冊組', '設備組', '資訊組'];
  var groupLinks = groups.map(function(g) {
    return {
      groupName: g,
      link: baseUrl + '?g=' + encodeURIComponent(g)
    };
  });

  // 16 位同仁個人專屬連結
  var list = staffList.map(function(s) {
    return {
      name: s.id,
      title: s.title,
      group: s.group,
      link: baseUrl + '?u=' + encodeURIComponent(s.id)
    };
  });

  return {
    success: true,
    baseUrl: baseUrl,
    groupLinks: groupLinks,
    links: list
  };
}

// 16 位同仁專屬配置清單 (包含分頁名稱、組別、職稱、是否有授課、專屬業務欄位)
function getStaffList() {
  return [
    {
      id: '高雅君',
      sheetName: '1.高雅君',
      group: '教學組',
      title: '高中教學組長',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '高二三模考 (考程/監考)', type: 'check' },
        { key: 'col6', label: '彈性選修 (多元/跨校)', type: 'check' },
        { key: 'col7', label: '兼代調課人次', type: 'number', placeholder: '如: 3' },
        { key: 'col8', label: '課程計畫 (填報/鐘點)', type: 'check' }
      ]
    },
    {
      id: '李縈榛',
      sheetName: '2.李縈榛',
      group: '教學組',
      title: '國中教學組長',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '國三複習考 (排程/試務)', type: 'check' },
        { key: 'col6', label: '定期評量 (段考/補考)', type: 'check' },
        { key: 'col7', label: '兼代調課人次', type: 'number', placeholder: '如: 2' },
        { key: 'col8', label: '課程總體 (計畫/抽查)', type: 'check' }
      ]
    },
    {
      id: '李蓉蓉',
      sheetName: '3.李蓉蓉',
      group: '教學組',
      title: '高中教學幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '定期模考 (試卷/試務)', type: 'check' },
        { key: 'col5', label: '夜多才李奇 (名單/課務)', type: 'check' },
        { key: 'col6', label: '兼代課鐘點 (計算/上呈)', type: 'check' },
        { key: 'col7', label: '日誌名單 (教室/分組)', type: 'check' },
        { key: 'col8', label: '重補修課 (師資/課程)', type: 'check' }
      ]
    },
    {
      id: '周文彬',
      sheetName: '4.周文彬',
      group: '教學組',
      title: '國中教學幹事',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '國中評量 (試卷/試務)', type: 'check' },
        { key: 'col6', label: '國三複習考 (點卷/試務)', type: 'check' },
        { key: 'col7', label: '國中鐘點費 (計算/上呈)', type: 'check' },
        { key: 'col8', label: '日誌作業 (準備/抽查)', type: 'check' }
      ]
    },
    {
      id: '張朝淦',
      sheetName: '5.張朝淦',
      group: '教學組',
      title: '排課行政教師',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '教師課表異動人次', type: 'number', placeholder: '如: 4' },
        { key: 'col6', label: '班級課表異動班級', type: 'number', placeholder: '如: 2' },
        { key: 'col7', label: '缺補調代處理節數', type: 'number', placeholder: '如: 6' },
        { key: 'col8', label: '重大活動 (課務試排)', type: 'check' }
      ]
    },
    {
      id: '宋欣融',
      sheetName: '6.宋欣融',
      group: '註冊組',
      title: '國中代理副組長',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '國中學籍 (報部/異動)', type: 'check' },
        { key: 'col5', label: '會考表現 (分析/檢討)', type: 'check' },
        { key: 'col6', label: '國三直升 (說明會/志願)', type: 'check' },
        { key: 'col7', label: '直升獎學金 (申請/核算)', type: 'check' },
        { key: 'col8', label: '全誼系統 (時程/設定)', type: 'check' }
      ]
    },
    {
      id: '蔡尚汶',
      sheetName: '7.蔡尚汶',
      group: '註冊組',
      title: '國中註冊幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '新生轉學 (報名/檢測)', type: 'check' },
        { key: 'col5', label: '試讀業務 (通知/費用)', type: 'check' },
        { key: 'col6', label: '在學成績證明核發份數', type: 'number', placeholder: '如: 4' },
        { key: 'col7', label: '國中段考 (成績/獎狀)', type: 'check' },
        { key: 'col8', label: '離校轉出 (晤談/知會)', type: 'check' }
      ]
    },
    {
      id: '宋欣恩',
      sheetName: '8.宋欣恩',
      group: '註冊組',
      title: '高中註冊幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '高中學籍 (建檔/學生證)', type: 'check' },
        { key: 'col5', label: '學雜優免 (補助函報)', type: 'check' },
        { key: 'col6', label: '高中成績證明補發份數', type: 'number', placeholder: '如: 2' },
        { key: 'col7', label: '高中段考 (登錄/補考)', type: 'check' },
        { key: 'col8', label: '畢業事宜 (證書/獎項)', type: 'check' }
      ]
    },
    {
      id: '王欣怡',
      sheetName: '9.王欣怡',
      group: '註冊組',
      title: '高中註冊幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '單獨招生 (簡章/面談)', type: 'check' },
        { key: 'col5', label: '學測英聽 (考場/餐食)', type: 'check' },
        { key: 'col6', label: '多元升學 (繁星/調查)', type: 'check' },
        { key: 'col7', label: '亞昕系統 (成績/時程)', type: 'check' },
        { key: 'col8', label: '獎助學金 (直升/贊助)', type: 'check' }
      ]
    },
    {
      id: '侯全保',
      sheetName: '10.侯全保',
      group: '設備組',
      title: '設備活動副組長',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '營隊活動 (科學營/走讀)', type: 'check' },
        { key: 'col5', label: '校外競賽 (自然科技/天文)', type: 'check' },
        { key: 'col6', label: '科展培訓 (國高中科展)', type: 'check' },
        { key: 'col7', label: '專科教室 (5F+6F維護)', type: 'check' },
        { key: 'col8', label: '物料採購 (藥品/器材/美工)', type: 'check' }
      ]
    },
    {
      id: '王喆',
      sheetName: '11.王喆',
      group: '設備組',
      title: '設備組幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '全校油印令數', type: 'number', placeholder: '如: 8' },
        { key: 'col5', label: '書籍評選 (採購/書商)', type: 'check' },
        { key: 'col6', label: '書籍到校 (驗收/發放)', type: 'check' },
        { key: 'col7', label: '書籍收費 (核算/補訂)', type: 'check' },
        { key: 'col8', label: '耗材管理 (試卷紙/粉筆)', type: 'check' }
      ]
    },
    {
      id: '徐瑋倩',
      sheetName: '12.徐瑋倩',
      group: '設備組',
      title: '設備組幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '全民英檢 (報名/收費/考務)', type: 'check' },
        { key: 'col5', label: '夜輔輪值 (製表/執行)', type: 'check' },
        { key: 'col6', label: '文宣海報 (印製/請購)', type: 'check' },
        { key: 'col7', label: '專科教室 (T3/T1維護)', type: 'check' },
        { key: 'col8', label: '書籍協辦 (到書/補訂)', type: 'check' }
      ]
    },
    {
      id: '蕭仁達',
      sheetName: '13.蕭仁達',
      group: '資訊組',
      title: '資訊組組長',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '資訊採購 (設備/規劃)', type: 'check' },
        { key: 'col6', label: '網路機房 (維護/管理)', type: 'check' },
        { key: 'col7', label: '校務系統 (建置/維護)', type: 'check' },
        { key: 'col8', label: '資安推廣 (通報/宣導)', type: 'check' }
      ]
    },
    {
      id: '呂德培',
      sheetName: '14.呂德培',
      group: '資訊組',
      title: '資訊組副組長',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '系統開發 (功能/更新)', type: 'check' },
        { key: 'col6', label: '視聽教室 (管理/維護)', type: 'check' },
        { key: 'col7', label: '網路設備 (維護/架設)', type: 'check' },
        { key: 'col8', label: '教育訓練 (系統/推廣)', type: 'check' }
      ]
    },
    {
      id: '林祐群',
      sheetName: '15.林祐群',
      group: '資訊組',
      title: '資訊組幹事',
      hasTeaching: false,
      tasks: [
        { key: 'col4', label: '網路設備 (維護/巡檢)', type: 'check' },
        { key: 'col5', label: '帳號建置 (學生/教職員)', type: 'check' },
        { key: 'col6', label: '視聽教室 (設備/維護)', type: 'check' },
        { key: 'col7', label: '架設設備 (電腦/網路)', type: 'check' },
        { key: 'col8', label: '系統開發 (建置/測試)', type: 'check' }
      ]
    },
    {
      id: '王土權',
      sheetName: '16.王土權',
      group: '資訊組',
      title: '資訊行政教師',
      hasTeaching: true,
      tasks: [
        { key: 'col5', label: '電腦大屏叫修排除件數', type: 'number', placeholder: '如: 6' },
        { key: 'col6', label: '視聽教室 (設備/排解)', type: 'check' },
        { key: 'col7', label: '設備架設 (電腦/印表機)', type: 'check' },
        { key: 'col8', label: '典禮視訊 (直播/諮詢)', type: 'check' }
      ]
    }
  ];
}

/**
 * 接收手機端送出的日誌資料，寫入試算表對應分頁與日期列
 */
function submitWorkLog(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(data.sheetName);
    if (!sheet) {
      return { success: false, message: '找不到指定工作表：' + data.sheetName };
    }

    // 自動確保該同仁工作表凍結第 7 列表頭（往下滑時欄位標題固定）
    if (sheet.getFrozenRows() !== 7) {
      sheet.setFrozenRows(7);
    }

    // 解析目標日期 (例如傳入 "2026-10-07")
    var dateParts = data.date.split('-');
    var targetMonth = parseInt(dateParts[1], 10);
    var targetDay = parseInt(dateParts[2], 10);
    var targetDateStr = targetMonth + '/' + targetDay;

    // 【極速優化】：按月切片精準定位，不再盲目掃描 150 列！
    // 9月: 列 9~38, 10月: 列 39~69, 11月: 列 70~99, 12月: 列 100~130, 1月: 列 131~161
    var monthRowConfig = {
      9: { start: 9, count: 30 },
      10: { start: 39, count: 31 },
      11: { start: 70, count: 30 },
      12: { start: 100, count: 31 },
      1: { start: 131, count: 31 }
    };

    var targetRow = -1;
    if (monthRowConfig[targetMonth]) {
      var cfg = monthRowConfig[targetMonth];
      var monthDateVals = sheet.getRange(cfg.start, 1, cfg.count, 1).getValues();
      for (var i = 0; i < monthDateVals.length; i++) {
        var cellVal = monthDateVals[i][0];
        var cellStr = (cellVal instanceof Date) ? ((cellVal.getMonth() + 1) + '/' + cellVal.getDate()) : String(cellVal).trim();
        if (cellStr === targetDateStr) {
          targetRow = cfg.start + i;
          break;
        }
      }
    }

    // 若月份切片未找到（防呆備用：動態搜尋全表）
    if (targetRow === -1) {
      var lastRow = Math.max(sheet.getLastRow(), 161);
      var allDateVals = sheet.getRange(9, 1, lastRow - 8, 1).getValues();
      for (var j = 0; j < allDateVals.length; j++) {
        var cVal = allDateVals[j][0];
        var cStr = (cVal instanceof Date) ? ((cVal.getMonth() + 1) + '/' + cVal.getDate()) : String(cVal).trim();
        if (cStr === targetDateStr) {
          targetRow = 9 + j;
          break;
        }
      }
    }

    if (targetRow === -1) {
      return { success: false, message: '在試算表中找不到對應的日期：' + targetDateStr };
    }

    // 取得該工作表總欄數
    var lastCol = sheet.getLastColumn();

    // 【極速批次寫入】：一次讀出該列 ➜ 記憶體中更新 ➜ 一次批次寫回（省去 4~5 次 API 往返延遲！）
    var rowRange = sheet.getRange(targetRow, 1, 1, lastCol);
    var rowValues = rowRange.getValues()[0];

    // 1. 更新第 3 欄 (index 2)：差勤與值勤
    var statusText = '';
    if (data.attendance && data.attendance !== '正常上班') {
      statusText = data.attendance;
      if (data.duty) statusText += '/' + data.duty;
    } else if (data.duty) {
      statusText = data.duty;
    }
    rowValues[2] = statusText;

    // 2. 若為授課教師，更新第 4 欄 (index 3)：教學節數
    if (data.hasTeaching && data.teachingPeriods !== undefined && data.teachingPeriods !== '') {
      rowValues[3] = data.teachingPeriods;
    }

    // 3. 更新各專屬業務欄位
    if (data.tasks) {
      for (var colKey in data.tasks) {
        var colIndex = parseInt(colKey.replace('col', ''), 10);
        var val = data.tasks[colKey];
        if (val !== undefined && val !== '') {
          rowValues[colIndex - 1] = val;
        }
      }
    }

    // 4. 更新倒數第 2 欄：今日專案重點速記
    var notesIdx = lastCol - 2;
    if (data.notes) {
      rowValues[notesIdx] = data.notes;
    }

    // 5. 更新最後 1 欄：需主任支援 / 卡關事項
    var supportIdx = lastCol - 1;
    if (data.support) {
      rowValues[supportIdx] = data.support;
    }

    // 一次性極速寫回試算表
    rowRange.setValues([rowValues]);

    return {
      success: true,
      message: '✅ ' + data.staffName + ' 老師，' + targetDateStr + ' 工作日誌已順利存入試算表！'
    };
  } catch (err) {
    return { success: false, message: '寫入發生錯誤：' + err.toString() };
  }
}

/**
 * 讀取同仁在指定日期的既有日誌資料（供自動回填、隨手追加或修改）
 */
function getTodayWorkLog(sheetName, dateStr) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: '找不到指定工作表：' + sheetName };
    }

    var dateParts = dateStr.split('-');
    var targetMonth = parseInt(dateParts[1], 10);
    var targetDay = parseInt(dateParts[2], 10);
    var targetDateStr = targetMonth + '/' + targetDay;

    // 【極速優化】：按月切片讀取，僅掃描當月 30 天，秒開免等待！
    var monthRowConfig = {
      9: { start: 9, count: 30 },
      10: { start: 39, count: 31 },
      11: { start: 70, count: 30 },
      12: { start: 100, count: 31 },
      1: { start: 131, count: 31 }
    };

    var targetRow = -1;
    if (monthRowConfig[targetMonth]) {
      var cfg = monthRowConfig[targetMonth];
      var monthDateVals = sheet.getRange(cfg.start, 1, cfg.count, 1).getValues();
      for (var i = 0; i < monthDateVals.length; i++) {
        var cellVal = monthDateVals[i][0];
        var cellStr = (cellVal instanceof Date) ? ((cellVal.getMonth() + 1) + '/' + cellVal.getDate()) : String(cellVal).trim();
        if (cellStr === targetDateStr) {
          targetRow = cfg.start + i;
          break;
        }
      }
    }

    // 防呆備用搜尋
    if (targetRow === -1) {
      var lastRow = Math.max(sheet.getLastRow(), 161);
      var allDateVals = sheet.getRange(9, 1, lastRow - 8, 1).getValues();
      for (var j = 0; j < allDateVals.length; j++) {
        var cVal = allDateVals[j][0];
        var cStr = (cVal instanceof Date) ? ((cVal.getMonth() + 1) + '/' + cVal.getDate()) : String(cVal).trim();
        if (cStr === targetDateStr) {
          targetRow = 9 + j;
          break;
        }
      }
    }

    if (targetRow === -1) {
      return { success: false, message: '在試算表中找不到對應的日期：' + targetDateStr };
    }

    var lastCol = sheet.getLastColumn();
    var rowValues = sheet.getRange(targetRow, 1, 1, lastCol).getValues()[0];

    // 解析第 3 欄 (差勤/輪值)
    var col3Val = String(rowValues[2] || '').trim();
    var attendance = '正常上班';
    var duty = '';

    if (col3Val) {
      if (col3Val.indexOf('整天休') !== -1) {
        attendance = '整天休';
      } else if (col3Val.indexOf('上休') !== -1) {
        attendance = '上休';
      } else if (col3Val.indexOf('下休') !== -1) {
        attendance = '下休';
      } else if (col3Val.indexOf('公假') !== -1) {
        attendance = '公假';
      }

      if (col3Val.indexOf('午休') !== -1) {
        duty = '午休';
      } else if (col3Val.indexOf('夜輔') !== -1) {
        duty = '夜輔';
      } else if (col3Val.indexOf('雙值') !== -1) {
        duty = '雙值';
      }
    }

    // 解析第 4 欄 (教學節數)
    var teachingVal = (rowValues[3] !== undefined && rowValues[3] !== null) ? String(rowValues[3]).trim() : '';

    // 解析倒數第 2 欄 (速記) 與倒數第 1 欄 (主任支援)
    var notesVal = (rowValues[lastCol - 2] !== undefined && rowValues[lastCol - 2] !== null) ? String(rowValues[lastCol - 2]).trim() : '';
    var supportVal = (rowValues[lastCol - 1] !== undefined && rowValues[lastCol - 1] !== null) ? String(rowValues[lastCol - 1]).trim() : '';

    // 業務欄位值
    var tasks = {};
    for (var c = 3; c < lastCol - 2; c++) {
      var val = rowValues[c];
      if (val !== undefined && val !== null && val !== '') {
        tasks['col' + (c + 1)] = String(val).trim();
      }
    }

    var hasData = (col3Val !== '' && col3Val !== '正常上班') ||
                  (duty !== '') ||
                  (teachingVal !== '') ||
                  (Object.keys(tasks).length > 0) ||
                  (notesVal !== '') ||
                  (supportVal !== '');

    return {
      success: true,
      hasData: hasData,
      data: {
        attendance: attendance,
        duty: duty,
        teachingPeriods: teachingVal,
        tasks: tasks,
        notes: notesVal,
        support: supportVal
      }
    };
  } catch (err) {
    return { success: false, message: '讀取既有記錄錯誤：' + err.toString() };
  }
}

/**
 * 試算表開啟時自動建立頂部專屬選單
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('🚀 教務處小工具')
      .addItem('✨ 一鍵無損擴展全學期天數（10月至隔年1月）', 'expandAllStaffSheetsSafely')
      .addSeparator()
      .addItem('📅 一鍵篩選：只看【9 月】', 'filterToSep')
      .addItem('📅 一鍵篩選：只看【10 月】', 'filterToOct')
      .addItem('📅 一鍵篩選：只看【11 月】', 'filterToNov')
      .addItem('📅 一鍵篩選：只看【12 月】', 'filterToDec')
      .addItem('📅 一鍵篩選：只看【1 月】', 'filterToJan')
      .addItem('👀 一鍵還原：展開【全學期所有日期】', 'showAllSemesterRows')
      .addSeparator()
      .addItem('❄️ 一鍵凍結全處 16 個分頁表頭（第 7 列）', 'freezeAllStaffHeaders')
      .addItem('🔄 一鍵更新全處第 3 欄為「差勤/值勤」', 'updateHeadersToOneClick')
      .addToUi();
  } catch (e) {
    // 網頁環境略過 UI 建立
  }
}

/**
 * 一鍵無損自動擴充全處 16 位同仁分頁至 116 年 1 月 31 日 (既有 9 月份記錄 100% 保留)
 */
function expandAllStaffSheetsSafely() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var staffList = getStaffList();
  
  // 建立 10/1 ~ 1/31 的 123 天日期與星期清單
  var daysToAdd = [];
  var startDate = new Date(2026, 9, 1); // 2026-10-01 (JS 0-indexed: 9 是 10月)
  var endDate = new Date(2027, 0, 31);   // 2027-01-31 (JS 0-indexed: 0 是 1月)
  var cur = new Date(startDate.getTime());
  var weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  while (cur <= endDate) {
    var m = cur.getMonth() + 1;
    var d = cur.getDate();
    var wStr = weekdays[cur.getDay()];
    daysToAdd.push({
      dateStr: m + '/' + d,
      weekday: wStr,
      isWeekend: (cur.getDay() === 0 || cur.getDay() === 6),
      isMonthStart: (d === 1)
    });
    cur.setDate(cur.getDate() + 1);
  }

  var processedCount = 0;

  staffList.forEach(function(staff) {
    var sheet = ss.getSheetByName(staff.sheetName);
    if (!sheet) {
      sheet = ss.getSheetByName(staff.id);
    }
    if (!sheet) return;

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();

    // 檢查是否已經有 10/1 以後的日期，避免重複添加
    var hasExpanded = false;
    if (lastRow >= 39) {
      var checkVal = sheet.getRange(39, 1).getValue();
      if (checkVal && String(checkVal).indexOf('10/') !== -1) {
        hasExpanded = true;
      }
    }

    if (!hasExpanded) {
      var startRowNum = Math.max(lastRow + 1, 39);
      var rowsCount = daysToAdd.length; // 123 天

      var dateVals = [];
      var bgColors = [];

      for (var i = 0; i < rowsCount; i++) {
        var item = daysToAdd[i];
        dateVals.push([item.dateStr, item.weekday]);

        var rowBg = [];
        var color = item.isWeekend ? '#F2F2F2' : '#FFFFFF';
        for (var c = 0; c < lastCol; c++) {
          rowBg.push(color);
        }
        bgColors.push(rowBg);
      }

      // 寫入日期與星期 (第 1、2 欄)
      var dateRange = sheet.getRange(startRowNum, 1, rowsCount, 2);
      dateRange.setValues(dateVals);
      dateRange.setHorizontalAlignment('center');
      dateRange.setVerticalAlignment('middle');

      // 設定週末底色
      var allNewRange = sheet.getRange(startRowNum, 1, rowsCount, lastCol);
      allNewRange.setBackgrounds(bgColors);
      allNewRange.setFontFamily('微軟正黑體');
      allNewRange.setFontSize(10);

      // 對齊與格式
      sheet.getRange(startRowNum, 3, rowsCount, 1).setHorizontalAlignment('center');
      sheet.getRange(startRowNum, 4, rowsCount, lastCol - 5).setHorizontalAlignment('center');
      sheet.getRange(startRowNum, lastCol - 1, rowsCount, 2).setHorizontalAlignment('left').setWrap(true);

      // 更新第 5 列公式至 161 列
      for (var c = 1; c <= lastCol; c++) {
        var fCell = sheet.getRange(5, c);
        var f = fCell.getFormula();
        if (f && f.indexOf('38') !== -1) {
          fCell.setFormula(f.replace(/38/g, '161'));
        }
      }

      processedCount++;
    }
  });

  SpreadsheetApp.getUi().alert('🎉 恭喜主任！全處 ' + processedCount + ' 位同仁分頁已全數自動無損擴充至 116 年 1 月 31 日（共 153 天）！\n\n所有同仁原本 9 月份填寫的內容 100% 完整保留，頂端統計公式也已自動升級！');
}

function filterToSep() { filterCurrentSheetByMonth(9); }
function filterToOct() { filterCurrentSheetByMonth(10); }
function filterToNov() { filterCurrentSheetByMonth(11); }
function filterToDec() { filterCurrentSheetByMonth(12); }
function filterToJan() { filterCurrentSheetByMonth(1); }

function filterCurrentSheetByMonth(targetMonth) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(), 161);
  if (lastRow < 9) return;

  sheet.showRows(9, lastRow - 8);
  var dateVals = sheet.getRange(9, 1, lastRow - 8, 1).getValues();

  for (var i = 0; i < dateVals.length; i++) {
    var val = dateVals[i][0];
    var m = -1;
    if (val instanceof Date) {
      m = val.getMonth() + 1;
    } else if (val) {
      var str = String(val).trim();
      var slashIdx = str.indexOf('/');
      if (slashIdx !== -1) {
        m = parseInt(str.substring(0, slashIdx), 10);
      }
    }
    if (m !== -1 && m !== targetMonth) {
      sheet.hideRows(9 + i);
    }
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('已為您聚焦至【' + targetMonth + ' 月份】！', '📅 月份篩選完成');
}

function showAllSemesterRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(), 161);
  if (lastRow >= 9) {
    sheet.showRows(9, lastRow - 8);
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('已展開全學期所有日期！', '👀 檢視完成');
}

/**
 * 一鍵將全處 16 位同仁分頁全面凍結前 7 列表頭
 */
function freezeAllStaffHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var staffList = getStaffList();
  var count = 0;
  staffList.forEach(function(staff) {
    var sheet = ss.getSheetByName(staff.sheetName);
    if (sheet) {
      sheet.setFrozenRows(7);
      count++;
    }
  });
  try {
    SpreadsheetApp.getUi().alert('✅ 太棒了！全處 ' + count + ' 位同仁分頁已全數完成「凍結前 7 列表頭」！往下滑動標題都不會消失了。');
  } catch (e) {
    Logger.log('凍結完成：' + count + ' 個分頁');
  }
}

/**
 * 一鍵更新全處 16 位同仁試算表第 3 欄表頭為「差勤/值勤」
 */
function updateHeadersToOneClick() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var staffList = getStaffList();
  staffList.forEach(function(staff) {
    var sheet = ss.getSheetByName(staff.sheetName);
    if (sheet) {
      sheet.getRange(7, 3).setValue('差勤/值勤\n(休假/輪值)');
      sheet.setFrozenRows(7); // 自動凍結前 7 列表頭
    }
  });
  try {
    SpreadsheetApp.getUi().alert('✅ 全處 16 位同仁分頁之第 3 欄表頭已更新為「差勤/值勤」，且表頭已全數凍結！');
  } catch (e) {
    Logger.log('更新完成！');
  }
}

/**
 * 取得試算表或指定同仁分頁之直接跳轉網址
 */
function getSpreadsheetUrl(sheetName) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (sheetName) {
      // 1. 先精確尋找 (例如 "1.高雅君")
      var sheet = ss.getSheetByName(sheetName);
      // 2. 若找不到，嘗試純人名尋找 (例如 "高雅君")
      if (!sheet) {
        var cleanName = sheetName.replace(/^\d+\./, '');
        sheet = ss.getSheetByName(cleanName);
      }
      // 3. 若還是找不到，遍歷比對包含人名
      if (!sheet) {
        var allSheets = ss.getSheets();
        for (var i = 0; i < allSheets.length; i++) {
          if (allSheets[i].getName().indexOf(sheetName.replace(/^\d+\./, '')) !== -1) {
            sheet = allSheets[i];
            break;
          }
        }
      }

      if (sheet) {
        return {
          success: true,
          url: ss.getUrl() + '#gid=' + sheet.getSheetId()
        };
      }
    }
    return {
      success: true,
      url: ss.getUrl()
    };
  } catch (err) {
    return { success: false, message: '取得試算表網址失敗：' + err.toString() };
  }
}

/**
 * 取得指定同仁與月份的 PDF 匯出下載網址
 * 橫向 A4、配合頁寬、含格線，排版極正式美觀
 */
function getExportPdfUrl(sheetName, dateStr) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: '找不到指定工作表：' + sheetName };
    }

    // 解析查詢的月份 (例如傳入 "2026-09-16" -> targetMonth = 9)
    var dateParts = dateStr.split('-');
    var targetMonth = parseInt(dateParts[1], 10);

    // 搜尋該月份在試算表中的起始列與結束列
    var maxRow = Math.max(sheet.getLastRow(), 38);
    var numRows = maxRow - 8;
    var dateColumnValues = sheet.getRange(9, 1, numRows, 1).getValues();

    var startRow = -1;
    var endRow = -1;

    for (var i = 0; i < dateColumnValues.length; i++) {
      var cellVal = dateColumnValues[i][0];
      var m = -1;
      if (cellVal instanceof Date) {
        m = cellVal.getMonth() + 1;
      } else if (cellVal) {
        var str = String(cellVal).trim();
        var slashIdx = str.indexOf('/');
        if (slashIdx !== -1) {
          m = parseInt(str.substring(0, slashIdx), 10);
        }
      }

      if (m === targetMonth) {
        if (startRow === -1) {
          startRow = 9 + i;
        }
        endRow = 9 + i;
      }
    }

    if (startRow === -1) {
      startRow = 9;
      endRow = 38;
    }

    // 表頭從第 7 列開始 (0-based r1=6)，結束列為 endRow
    var r1 = 6;
    var r2 = endRow;
    var c1 = 0;
    var c2 = sheet.getLastColumn();

    var ssId = ss.getId();
    var sheetId = sheet.getSheetId();

    var exportUrl = 'https://docs.google.com/spreadsheets/d/' + ssId + '/export?' +
      'exportFormat=pdf&format=pdf' +
      '&size=A4' +
      '&portrait=false' +      // 橫向，最適合多欄日誌
      '&fitw=true' +          // 配合寬度
      '&gridlines=true' +     // 顯示格線
      '&printtitle=false' +
      '&sheetnames=false' +
      '&fzr=false' +
      '&gid=' + sheetId +
      '&r1=' + r1 +
      '&c1=' + c1 +
      '&r2=' + r2 +
      '&c2=' + c2;

    return {
      success: true,
      url: exportUrl,
      month: targetMonth,
      staffName: sheetName.replace(/^\d+\./, '')
    };
  } catch (err) {
    return { success: false, message: '產生 PDF 失敗：' + err.toString() };
  }
}
