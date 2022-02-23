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
   {count: 1, items:[{id:1, name: 'firstName', description: 'testerhdhdududufjr', status: 3}]}
   ```
---
### Ответы на вопросы:
* Что передавать в параметры запуска?
  * при запросе в access_token мы передаем следующий код:
  ```
  window.location.search.slice(1).replace(/&/gi, '/')
  ```
