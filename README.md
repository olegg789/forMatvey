### dev-Notes API
---
### API Находится по адресу:
    https://sab.wan-group.ru/notes
---
### Методы
* notes.getMyNotes 
  * Пример:
   ```
   sab.wan-group.ru/notes?method=notes.getMyNotes&access_token=<параметры запуска>
   ```
  * Пример того, что вернет в формате json:
   ```
   {count: 1, items:[{"id":123456, "idNote": 1 "name": 'firstName', "description": 'testerhdhdududufjr', "priority": 2, "status": 3}]}
   ```
* notes.createNote
  * Пример:
  ```
  sab.wan-group.ru/notes?method=notes.createNote&access_token=<параметры запуска>&name=имя&value=текст&priority=1&status=2
  ```
  Если все параметры корректны, то api вёрнет 200 и "message": ok
  В ином случае вернёт код ошибки из всех остальных ( коды ошибок можно посмотреть в конце)
* notes.deleteNote
  * Пример:
   ```
   sab.wan-group.ru/notes?method=notes.deleteNote&access_token=<параметры запуска>&noteId=5
   ```
  Если все параметры корректны, то api вёрнет 200 и "message": ok
  В ином случае вернёт ошибку уже без кода, что может озночать только то, что заметка не найдена
* notes.editNote
  * Пример:
  ```
  sab.wan-group.ru/notes?method=notes.editNote&access_token=<параметры запуска>&idNote=5&name=имя&value=текст&priority=1&status=2
  ```
  Если все параметры корректны, то api вёрнет 200 и "message": ok
  В ином случае вернёт код ошибки из всех остальных ( коды ошибок можно посмотреть в конце)
* notes.deleteAllNotes
  * Пример:
   ```
   sab.wan-group.ru/notes?method=notes.deleteAllNotes&access_token=<параметры запуска>
   ```
  Если все access_token корректный, то api вёрнет 200 и "message": ok
---
### Ответы на вопросы:
* Что передавать в параметры запуска?
  * при запросе в access_token мы передаем следующий код:
  ```
  window.location.search.slice(1).replace(/&/gi, '/')
  ```
