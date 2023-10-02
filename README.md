# node.js 게시판

> node.js express 라이브러리를 활용한 CRUD 기능을 구현한 게시판입니다.

## 목차

- [들어가며](#들어가며)

  - [프로젝트 소개](#1-프로젝트-소개)

  - [프로젝트 기능](#2-프로젝트-기능)

  - [사용기술](#3-사용기술)
  - [실행화면](#4-실행화면)

- [구조 및 설계](#구조-및-설계)

  - [프로젝트 구조](#1-프로젝트-구조)

  - [DB 설계](#2-db-설계)

- [추후 업데이트](#추후-업데이트)

## 들어가며

### 1. 프로젝트 소개

이 프로젝트는 node.js의 express 라이브러리를 사용해서 CRUD 게시판을 구현한 프로젝트로

자유도가 높은 express에서 Spring의 MVC 패턴을 직접 만들어서 구현해보았습니다.

### 2. 프로젝트 기능

프로젝트의 기능은 다음과 같습니다.

- 게시판

  - 게시글 작성 및 수정

  - 하나의 게시글에는 최대 5개까지 파일 첨부

  - 게시글 수정 시 첨부파일도 수정 가능 (구현중)

  - 게시글 삭제 및 삭제 시 비밀번호 입력 필수

  - 게시글에 대한 좋아요 기능

  - 게시글 제목 옆에 댓글수와 첨부파일이 있을 경우 첨부파일 표시

  - 게시글 세부페이지에서 좋아요수, 댓글수, 조회수 보여주기

  - 제목 검색을 통한 게시글 조회

- 댓글

  - 댓글 작성 및 삭제

  - 댓글 삭제 시 비밀번호 입력 필수

- 페이징 처리

  - 게시글 조회 시 페이징 처리 후 게시글 보여주기

- 유효성 검증

  - 게시글 작성 시 필수값 (작성자, 비밀번호, 제목, 내용) 작성 여부 확인

  - 댓글 작성 시 필수값 (작성자, 비밀번호, 내용) 작성 여부 확인

### 3. 사용기술

- 프론트엔드

  - HTML

  - Handlebars

  - Javascript

  - Tailwind CSS

- 백엔드

  - 프레임워크 및 라이브러리

    - Javascript

    - Express

    - Express-handlebars

  - 데이터베이스

    - MySQL

### 4. 실행화면

<details>
<summary>메인 페이지</summary>

![image](https://github.com/jeehwan-lee/springboot-crud-board/assets/26796099/98b6351b-80aa-4559-99c7-36a854776977)

</details>

<details>
<summary>게시글 등록 페이지</summary>

![image](https://github.com/jeehwan-lee/node_crud_1/assets/26796099/447e5b27-6559-40f1-afa7-0dfc7399fa5b)

</details>

<details>
<summary>게시글 상세 페이지</summary>

![image](https://github.com/jeehwan-lee/springboot-crud-board/assets/26796099/4c5b4a10-bc68-4494-be34-e061d132f191)

</details>

## 구조 및 설계

### 1. 프로젝트 구조

프로젝트의는 다음과 같이 post와 refly에 대한 router로 분리하고 각각의 controller와 service를 통해

클라이언트로부터 받은 요청을 처리하고 views 디렉토리에서 클라이언트에 필요한 페이지를 전송하는 방식으로

구조를 설계했습니다.

```bash
├── app.js
├── config
│   ├── db.js
│   └── handlebars_helpers.js
├── controllers
│   ├── post_controller.js
│   └── refly_controller.js
├── routes
│   ├── post.js
│   └── refly.js
├── services
│   ├── post_service.js
│   └── refly_service.js
├── views
│   ├── layouts
│       └── main.handlebars
│   ├── detail.handlebars
│   ├── home.handlebars
│   ├── modify.handlebars
│   └── write.handlebars
└── public
```

### 2. DB 설계

- POST 테이블

|   칼럼명    |    타 입     | Null |     Key     |  설 명   |
| :---------: | :----------: | :--: | :---------: | :------: |
|     id      |     int      |  No  | Primary Key |    id    |
|    title    | varchar(45)  | Yes  |      -      |   제목   |
|   content   | varchar(200) | Yes  |      -      |   내용   |
|   writer    | varchar(45)  | Yes  |      -      |  작성자  |
|  password   | varchar(45)  | Yes  |      -      | 비밀번호 |
|    hits     |     int      | Yes  |      -      |  조회수  |
|   hearts    |     int      | Yes  |      -      | 좋아요수 |
| create_date |   datetime   |  No  |      -      | 생성일자 |
|  fileGrId   | varchar(100) |  No  |      -      | 파일그룹 |

- REFLY 테이블

|   칼럼명    |    타 입     | Null |     Key     |  설 명   |
| :---------: | :----------: | :--: | :---------: | :------: |
|     id      |     int      |  No  | Primary Key |    id    |
|   postId    |     int      |  No  | Foreign Key |  외래키  |
|   comment   | varchar(200) | Yes  |      -      | 댓글내용 |
|   writer    | varchar(45)  | Yes  |      -      |  작성자  |
|  password   | varchar(45)  | Yes  |      -      | 비밀번호 |
| create_date |   datetime   |  No  |      -      | 생성일자 |

- FILES 테이블

|  칼럼명   |    타 입     | Null |     Key     |  설 명   |
| :-------: | :----------: | :--: | :---------: | :------: |
| fileGrId  | varchar(100) | Yes  | Primary Key | 파일그룹 |
|  fileId   | varchar(100) | Yes  | Primary Key |  파일ID  |
| fileName  | varchar(100) | Yes  |      -      | 파일이름 |
| savedPath | varchar(100) | Yes  |      -      | 저장경로 |
