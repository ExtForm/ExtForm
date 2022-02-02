/*
  PROPERTY (per document)

  prefix = extform_
  
  forms = 등록된 설문지 목록 (내부 확인용) {name : 등록된 이름, id : 설문지 id}
  formlist = 등록된 설문지 목록 (웹) {name : 등록된 이름, title : 표시될 제목, description : 표시될 부제목}

  form_{name} = {name} 설문지의 id
  form_{id} = {id} 설문지의 name
  form_{id}_getitem = {id} 설문지의 아이템 목록 (stringfied JsonArray)

  formlistsheet_spreadsheetId = 설문지 목록 스프레드시트 id
  formlistsheet_sheetName = 설문지 목록 시트 이름

  // ExtForm 1.0.2 (62)~
  logsheet_spreadsheetId = 로그 스프레드시트 id
  logsheet_sheetName = 로그 시트 이름

  // ExtForm ~1.0.1 (61)
  spreadsheet_id = 설문지 목록 스프레드시트 id
  spreadsheet_name = 설문지 목록 시트 이름
  logsheet_id = 로그 스프레드시트 id
  logsheet_name = 로그 시트 이름
*/

/*
  CACHE (per document)

  prefix = extform_

  token_{token} = {token} 토큰이 사용된 설문지의 id
*/

/**
 * Get data from storage
 * 
 * @param {String} key key to data
 * @returns value from key, null if not found
 */
function getProperty(key) {
  return PropertiesService.getDocumentProperties().getProperty(key);
}
/**
 * Set data to storage
 * 
 * @param {String} key key to data
 * @param {String} value value to save
 */
function setProperty(key,value) {
  PropertiesService.getDocumentProperties().setProperty(key,value);
}

/**
 * Get temporary cache data
 * @param {String} key key to data
 * @returns {String} value from key, null if not found
 */
function getCache(key) {
  return CacheService.getDocumentCache().get(key);
}

/**
 * Set temporary cache data
 * 
 * @param {String} key key to data
 * @param {String} value value to save
 */
function putCache(key,value) {
  CacheService.getDocumentCache().put(key,value);
}

/**
 * Remove temporary cache data
 * 
 * @param {String} key key to data
 */
function removeCache(key) {
  CacheService.getDocumentCache().remove(key);
}
