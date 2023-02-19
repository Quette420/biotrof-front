<template>
    <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата создания</th>
          <th>Название товара</th>
          <th>Категория</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>1</td>
          <td>1000</td>
          <td>12.12.22</td>
          <td>Биотроф</td>
          <td>Добавка</td>
          <td>
            <span class="black-text badge red">Ожидает оплаты</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>3000</td>
          <td>01.02.23</td>
          <td>Биотроф</td>
          <td>Корм</td>
          <td>
            <span class="black-text badge orange">Подписание</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>3000</td>
          <td>01.02.23</td>
          <td>Биотроф</td>
          <td>Корм</td>
          <td>
            <span class="black-text badge yellow">Изготовление</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>3000</td>
          <td>01.02.23</td>
          <td>Биотроф</td>
          <td>Корм</td>
          <td>
            <span class="black-text badge green">Готово к отгрузке</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>3000</td>
          <td>01.02.23</td>
          <td>Биотроф</td>
          <td>Корм</td>
          <td>
            <span class="black-text badge blue">Отгружено</span>
          </td>
          <td>
            <button class="btn-small btn">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>