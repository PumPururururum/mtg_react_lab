# MTG React Lab

 Для запуска:
 ```bash
 npm run dev
 ```
# Задание

Это заготовка редактора колод для игры MTG на реакте.

1. Разобраться в том, как собираются колоды в MTG
2. Изучить [API](https://docs.magicthegathering.io/#documentationgetting_started) для доступа к картам в MTG.
   Можно использовать библиотеку для доступа к API или доработать заготовку, которая есть в проекте.
3. На странице приложения выводится 100 первых карт и два захардкоженных виджета со статистикой. Виджеты собраны на d3.js.
4. Нужно добавить на страницу поиск карт по названию в API. В результате поиска на левой панели должен меняться список карт.
5. Нужно добавить возможность кликнуть по карте на левой панели. После клика по карте на средней панели должно появиться
   изображение карты, описание карты и кнопка "Добавить в колоду".
6. При добавлении карты в колоду нужно пересчитывать виджеты на правой панели.
7. Колода должна отображаться на средней панели в виде изображений карт с указанием числа карт в колоде.
8. В колоду нельзя положить более 4 копий карты. Это правило не действует на Земли.
9. Из колоды можно удалять карты. Виджеты при этом тоже должны обновляться.
10. Внутри виджетов зашиты демонстрационные данные. Их нужно убрать.
11. Можно заменить виджеты на аналогичные.
12. Верстка поощряется, но не оценивается как обязательная часть лабораторной. Важно сделать корректно работающее приложение.
    Стилизация на усмотрение студента.
13. Лабораторную можно делать в одиночку или вдвоем.
14. В этот раз тесты не обязательны.