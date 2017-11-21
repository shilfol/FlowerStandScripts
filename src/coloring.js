// Enum
var Status = {
  FINISHED: '完了',
  PROCESSING: '未振り込み',
  HTOHREADY: '手渡し保留',
  PASSREADY: 'PASS保留',
  CANCELED: '対応しない'
};

var Color = {
  FINISHED:   '#fce5cd',
  PROCESSING: '#f4cccc',
  HTOHREADY: '#cfe2f3',
  PASSREADY: '#d9ead3',
  CANCELED: '#999999'
};

var STATUS_COL = 9;
var METHOD_ARRAY_COL = 3;
var DONEBOOL_ARRAY_COL = 7;

/**
 * @param {sheet} sheet activespreadsheet
 * @param {Integer} rownum selected row
 */
function ColoringByStatus(sheet,rownum) {
  //var sheet = SpreadsheetApp.getActiveSheet();
  var setrow = sheet.getRange(rownum, 1, 1, STATUS_COL).getValues()[0];
  var rowstatus;
  
  Logger.log(setrow[METHOD_ARRAY_COL].indexOf("passmarket") && !setrow[DONEBOOL_ARRAY_COL]);
  // judge status
  
  // 空(未払い)だとtrue
  if(!setrow[DONEBOOL_ARRAY_COL]) {
    if(setrow[METHOD_ARRAY_COL].indexOf("手渡し") > -1){
      rowstatus = Status.HTOHREADY;
    } else if(setrow[METHOD_ARRAY_COL].indexOf("passmarket") > -1){
      rowstatus = Status.PASSREADY;
    } else {
      rowstatus = Status.PROCESSING;
    }
  } else {
    rowstatus = Status.FINISHED;
  }
  
  switch (rowstatus) {
    case Status.FINISHED:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground(Color.FINISHED);
      break;
    case Status.PROCESSING:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground(Color.PROCESSING);
      break;
    case Status.HTOHREADY:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground(Color.HTOHREADY);
      break;
    case Status.PASSREADY:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground(Color.PASSREADY);
      break;
    case Status.CANCELED:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground(Color.CANCELED);
      break;
    default:
      sheet.getRange(rownum, 1, 1, STATUS_COL * 2).setBackground('white');
      break;
  }
}

function ColoringAllRow(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastrow = sheet.getLastRow();
  
  for(var i = 2; i <= lastrow; i++){
    ColoringByStatus(sheet,i);
  }
  
}

/**
 * @param e events {@see https://developers.google.com/apps-script/understanding_events?hl=ja}
 */
function onEdit(e) {
  var sheet = SpreadsheetApp.getActiveSheet(),
      row = e.range.getRow();

  ColoringByStatus(sheet,row);
  
}