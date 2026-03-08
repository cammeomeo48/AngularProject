# EX60-61: Cookie Programming

## Backend (NodeJS/Express)

Workspace backend đã implement bài 60-61 nằm tại:

- `EX58/server-fashion`

### Cài dependency

```bash
npm install
```

### Chạy server

```bash
npm run dev
# hoặc
npm start
```

Server chạy tại:

- `http://localhost:4000`

MongoDB database:

- `mongodb://localhost:27017/FashionData`

## Exercise 60 APIs

- `GET /create-cookie`
- `GET /read-cookie`
- `GET /clear-cookie`

Test nhanh trên browser:

- `http://localhost:4000/create-cookie`
- `http://localhost:4000/read-cookie`
- `http://localhost:4000/clear-cookie`

## Exercise 61 APIs

### Seed users (tự chạy khi start server nếu collection User đang rỗng)

- `admin / 123`
- `tranduythanh / 123456`

### Login

- `POST /login`

Body JSON:

```json
{ "username": "admin", "password": "123" }
```

Khi login thành công, server sẽ set cookie `login` (maxAge 7 ngày).

### Đọc cookie login (phục vụ autofill frontend)

- `GET /login-cookie`

## Frontend (Angular)

Hiện tại folder `EX58/admin-fashion` trong workspace bị thiếu source Angular (không có `src/app`, `src/main.ts`), nên chưa thể tạo `LoginComponent` đúng theo bài 61 trong folder đó.

Bạn chọn 1 project Angular có đủ source để mình tạo `LoginComponent`:

- `HelloAngular`
- `ex19`
- `Ex26`

Hoặc bạn restore đầy đủ source của `EX58/admin-fashion`, mình sẽ implement LoginComponent vào đúng project này.
