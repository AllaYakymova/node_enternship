<h3>Home work middlewares</h3>
<ol>
    <li>Созданы dtos: orderProducts (проверка полей body), user(проверка наличия необхаодимых полей и валидация данных юзера). Для валидации использованы joi и express-joi-validation</li> 
    <li>Создана auth_middleware для проверки наличия данных юзера (телефон и пароль) в бд. При их наличии – в res.locals.user заносится объект {user: phone, isAuthenticated: true}. Для данной реализации, а также дальнейшего расширения функционала, созданы user модель, контроллер и внесен доп метод setResLocalData()  во view.js.</li>
    <li>Созданы exceptions: класс defaultError. Также для отлавливания ошибок в контроллерах есть отдельные методы во view.js</li>
    <li>Все middleware, связанные с поставленной задачей, вызываются в роуте /orders/router.js.</li>
    <li>Подключен sequelize, созданы модели для всех таблиц бд /sequelize_models</li>
    <li>Запросы связанные с авторизацией и заказом переписаны под sequelize</li>
</ol>

