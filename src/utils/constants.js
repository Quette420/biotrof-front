export default {
    statusesLabels: ['Не оплачено', 'Подписание', 'Изготовление', 'Ожидает отгрузки', 'Отгружено'],
    statuses: [
        { label: 'Не оплачено',
          value: 'WAITING_FOR_PAYMENT',
          color: 'red'
        },
        { label: 'Подписание',
          value: 'CONTRACT_SIGNING',
          color:  'orange'
        },
        { label: 'Изготовление',
          value: 'MANUFACTURE',
          color: 'yellow'
        },
        { label: 'Готово к отгрузке',
          value: 'READY_FOR_SHIPMENT',
          color: 'green'
        },
        { label: 'Отгружено',
          value: 'DONE',
          color: 'blue'
        }
    ],
    products: [
        'Целлобактерин®+',
        'Целлобактерин®-Т:',
        'Интебио®Форте',
        'Интебио®',
        'Провитол®',
        'Ликвипро®',
        'Профорт®',
        'АнтиКлос®',
        'Натуфорт®',
        'Заслон®-Фито',
        'Заслон®',
        'Заслон®2+',
        'Биотроф®',
        'Биотроф®2',
        'Биотроф®-111',
        'Промилк®',
        'Промилк ®+',
        'Биотроф®-600',
        'Агротроф®',
        'Интесан®', 
        ],
        feedAdditives: ['Целлобактерин®+',
        'Целлобактерин®-Т:',
        'Интебио®Форте',
        'Интебио®',
        'Провитол®',
        'Ликвипро®',
        'Профорт®',
        'АнтиКлос®',
        'Натуфорт®'],
        sorbentsForMycotoxicosis: [
        'Заслон®-Фито',
        'Заслон®',
        'Заслон®2+',],
        biologicsAndSilageFermentsForForagePreparation: [
          'Биотроф®',
            'Биотроф®2',
            'Биотроф®-111',
            'Промилк®',
            'Промилк ®+',
            'Биотроф®-600',
        ],
        biologicalProductsForManureProcessingAndBiodesodorization: [
          'Агротроф®',
          'Интесан®',
        ],
    categories: [
        'Кормовые добавки',
        'Сорбенты от микотоксикозов',
        'Биопрепараты и силосные закваски для заготовки кормов',
        'Биопрепараты для переработки навоза и биодезодорации',
      ],
    productsWithTranslate: [
        {
            label: 'Целлобактерин®+',
            value: 'Cellobacterin®+'},
          {
            label: 'Целлобактерин®-Т:',
            value:  'Cellobacterin®-T:',},
          {
            label: 'Интебио®Форте',
            value: 'Intebio®Forte',},
          {
            label: 'Интебио®',
            value:  'Intebio®',
          },
          {
            label: 'Провитол®',
            value:  'Provitol®',},
          {
            label: 'Ликвипро®',
            value: 'Likvipro®',},
          {
            label: 'Профорт®',
            value:  'Profort®',},
          {
            label: 'Заслон®-Фито',
            value:  'Zaslon®-Fito',
          },
          {
            label: 'Заслон®',
            value: 'Zaslon®',},
          {
            label: 'Заслон®2+',
            value: 'Zaslon®2+'},
          {
            label: 'Биотроф®',
            value: 'Biotrof®'},
          {
            label: 'Биотроф®2',
            value: 'Biotrof®2'
          },
          {
            label: 'Биотроф®-111',
            value: 'Biotrof®-111'
          },
          {
            label: 'Промилк®',
            value: 'Promilk®'
          },
          {
            label: 'Промилк ®+',
            value: 'Promilk ®+'
          },
          {
            label: 'Биотроф®-600',
            value: 'Biotrof®-600'
          },
          {
            label: 'Агротроф®',
            value: 'Agrotrof®'
          },
          {
            label: 'Интесан®',
            value: 'Itesan®'
          },
        ],
    categoriesWithTranslate: [
        {
          label: 'Кормовые добавки',
          value: 'Feed additives'},
        {
          label: 'Сорбенты от микотоксикозов',
          value: 'Sorbents for mycotoxicosis'},
        {
          label: 'Биопрепараты и силосные закваски для заготовки кормов',
          value: 'Biologics and silage ferments for forage preparation'},
        {
          label: 'Биопрепараты для переработки навоза и биодезодорации',
          value: 'Biological products for manure processing and biodesodorization'
        }
    ],
    graphicTypes: [
      'Общая статистика',
      'Статистика по категориям',
      'Статистика по продуктам'
    ]
}