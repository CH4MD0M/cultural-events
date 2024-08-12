# cultural-events

# getEvents

### 엔드포인트

```
GET /events
```

## 요청 파라미터

| 파라미터 | 타입    | 필수 | 설명                                                          | 기본값 |
| -------- | ------- | ---- | ------------------------------------------------------------- | ------ |
| page     | Integer | 선택 | 조회할 페이지 번호                                            | 1      |
| limit    | Integer | 선택 | 한 페이지당 반환할 이벤트 수                                  | 10     |
| genre    | String  | 선택 | 필터링할 이벤트 장르                                          | -      |
| status   | String  | 선택 | 필터링할 이벤트 상태 ("upcoming", "ongoing", "closed", "all") | -      |

<br/>

## 응답

### 성공 응답 (200 OK)

```json
{
  "events": [
    {
      "_id": "String",
      "TITLE": "String",
      "CNTC_INSTT_NM": "String",
      "COLLECTED_DATE": "String",
      "ISSUED_DATE": "String",
      "DESCRIPTION": "String",
      "IMAGE_OBJECT": "String",
      "LOCAL_ID": "String",
      "URL": "String",
      "VIEW_COUNT": "Number",
      "SUB_DESCRIPTION": "String",
      "SPATIAL_COVERAGE": "String",
      "EVENT_SITE": "String",
      "GENRE": "String",
      "DURATION": "String",
      "NUMBER_PAGES": "Number",
      "TABLE_OF_CONTENTS": "String",
      "AUTHOR": "String",
      "CONTACT_POINT": "String",
      "ACTOR": "String",
      "CONTRIBUTOR": "String",
      "AUDIENCE": "String",
      "CHARGE": "String",
      "PERIOD": "String"
    }
  ],
  "currentPage": "Number",
  "totalPages": "Number",
  "totalEvents": "Number"
}
```

| 필드        | 타입   | 설명               |
| ----------- | ------ | ------------------ |
| events      | Array  | 조회된 이벤트 목록 |
| currentPage | Number | 현재 페이지 번호   |
| totalPages  | Number | 전체 페이지 수     |
| totalEvents | Number | 전체 이벤트 수     |

### 에러 응답 (500 Internal Server Error)

```json
{
  "message": "String"
}
```

<br/>

## 예시

### 요청

```
GET /events?page=1&limit=5&genre=음악&status=ongoing
```

### 성공 응답

```json
{
  "events": [
    {
      "_id": "60d5ecb6f85cf21234c88b01",
      "TITLE": "여름 재즈 페스티벌",
      "GENRE": "음악",
      "PERIOD": "2023-07-15 ~ 2023-07-17",
      ...
    },
    ...
  ],
  "currentPage": 1,
  "totalPages": 3,
  "totalEvents": 15
}
```

<br/><br/>

# getEventById

### 엔드포인트

```
GET /events/:id
```

## 요청 파라미터

| 파라미터 | 타입   | 필수 | 설명                    |
| -------- | ------ | ---- | ----------------------- |
| id       | String | 필수 | 조회할 이벤트의 고유 ID |

<br/>

## 응답

### 성공 응답 (200 OK)

```json
{
  "_id": "String",
  "TITLE": "String",
  "CNTC_INSTT_NM": "String",
  "COLLECTED_DATE": "String",
  "ISSUED_DATE": "String",
  "DESCRIPTION": "String",
  "IMAGE_OBJECT": "String",
  "LOCAL_ID": "String",
  "URL": "String",
  "VIEW_COUNT": "Number",
  "SUB_DESCRIPTION": "String",
  "SPATIAL_COVERAGE": "String",
  "EVENT_SITE": "String",
  "GENRE": "String",
  "DURATION": "String",
  "NUMBER_PAGES": "Number",
  "TABLE_OF_CONTENTS": "String",
  "AUTHOR": "String",
  "CONTACT_POINT": "String",
  "ACTOR": "String",
  "CONTRIBUTOR": "String",
  "AUDIENCE": "String",
  "CHARGE": "String",
  "PERIOD": "String"
}
```

### 에러 응답

#### 404 Not Found

```json
{
  "message": "이벤트를 찾을 수 없습니다."
}
```

#### 500 Internal Server Error

```json
{
  "message": "String"
}
```

<br/>

## 예시

### 요청

```
GET /api/events/60d5ecb6f85cf21234c88b01
```

### 성공 응답

```json
{
  "_id": "60d5ecb6f85cf21234c88b01",
  "TITLE": "여름 재즈 페스티벌",
  "GENRE": "음악",
  "PERIOD": "2023-07-15 ~ 2023-07-17",
  "DESCRIPTION": "도심 속에서 즐기는 여름밤의 재즈 축제",
  "EVENT_SITE": "시민공원 야외무대",
  "CHARGE": "무료",
  ...
}
```

<br/><br/>

# getUniqueGenres

### 엔드포인트

```
GET /events/genres
```

<br/>

## 응답

### 성공 응답 (200 OK)

```json
{
  "genres": ["String"],
  "totalGenres": "Number"
}
```

| 필드        | 타입            | 설명                  |
| ----------- | --------------- | --------------------- |
| genres      | Array of String | 고유한 장르 목록      |
| totalGenres | Number          | 고유한 장르의 총 개수 |

### 에러 응답 (500 Internal Server Error)

```json
{
  "message": "String"
}
```

<br/>

## 예시

### 요청

```
GET /api/events/genres
```

### 성공 응답

```json
{
  "genres": [
    "교향곡",
    "기타",
    "독주",
    "무용",
    "뮤지컬",
    "발레",
    "복합장르",
    "성악",
    "실내악",
    "연극",
    "오페라",
    "재즈",
    "전시",
    "체험",
    "콘서트",
    "크로스오버",
    "클래식",
    "합창"
  ],
  "totalGenres": 18
}
```

<br/><br/>

# searchEvents

### 엔드포인트

```
GET /events/search
```

## 요청 파라미터

| 파라미터 | 타입    | 필수 | 설명                         | 기본값 |
| -------- | ------- | ---- | ---------------------------- | ------ |
| query    | String  | 필수 | 검색할 키워드                | -      |
| page     | Integer | 선택 | 조회할 페이지 번호           | 1      |
| limit    | Integer | 선택 | 한 페이지당 반환할 이벤트 수 | 10     |
| genre    | String  | 선택 | 필터링할 이벤트 장르         | -      |

<br/>

## 응답

### 성공 응답 (200 OK)

```json
{
  "events": [
    {
      "_id": "String",
      "TITLE": "String",
      "DESCRIPTION": "String",
      "GENRE": "String",
      "ISSUED_DATE": "Date"
      // 기타 이벤트 필드...
    }
  ],
  "currentPage": "Number",
  "totalPages": "Number",
  "totalEvents": "Number"
}
```

| 필드        | 타입   | 설명                  |
| ----------- | ------ | --------------------- |
| events      | Array  | 검색된 이벤트 목록    |
| currentPage | Number | 현재 페이지 번호      |
| totalPages  | Number | 전체 페이지 수        |
| totalEvents | Number | 검색된 전체 이벤트 수 |

### 에러 응답

#### 400 Bad Request

```json
{
  "message": "검색어를 입력해주세요."
}
```

#### 500 Internal Server Error

```json
{
  "message": "String"
}
```

<br/>

## 예시

### 요청

```
GET /events/search?query=콘서트&page=1&limit=5&genre=음악
```

### 성공 응답

```json
{
  "events": [
    {
      "_id": "60d5ecb6f85cf21234c88b01",
      "TITLE": "여름 재즈 콘서트",
      "DESCRIPTION": "도심 속에서 즐기는 여름밤의 재즈 축제",
      "GENRE": "음악",
      "ISSUED_DATE": "2023-06-01T00:00:00.000Z"
    }
    // 추가 이벤트...
  ],
  "currentPage": 1,
  "totalPages": 3,
  "totalEvents": 15
}
```

1. `query` 파라미터는 필수입니다. 제공되지 않으면 400 에러가 반환됩니다.
2. 검색은 제목(TITLE)과 설명(DESCRIPTION) 필드에서 수행됩니다.
3. 검색은 대소문자를 구분하지 않습니다.
4. 결과는 `ISSUED_DATE`를 기준으로 내림차순 정렬됩니다 (최신 항목이 먼저).
5. `genre` 파라미터가 제공되면, 해당 장르의 이벤트만 반환됩니다.
6. 페이지네이션은 1부터 시작합니다. 유효하지 않은 페이지 번호는 첫 페이지로 처리됩니다.
7. 서버 내부 오류 발생 시 500 에러가 반환되며, 오류 메시지가 포함됩니다.
