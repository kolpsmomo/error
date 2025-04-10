let skinValue: number = 0; // текущая "ценность" лучшего скина в ленте
let skinPrice: number = 0; // цена лучшего скина в ленте
let timer: ReturnType<typeof setTimeout> | undefined;

type DataSource = {
  price: number;
  ttl: number;
};

/**
 * Обрабатывает данные по новому лучшему скину в ленте.
 *
 * @param {number} price - цена лучшего скина в ленте.
 * @param {number} ttl -  вес предмета, если появится предмет с
 * большим весом, то произойдет замена
 */
function processData({ price, ttl }: DataSource) {
  skinPrice = price;
  skinValue = ttl;
  postMessage(`${skinValue / skinPrice}`);
  clearTimeout(timer);
  timer = setTimeout(devalue, 1000);
}

/**
 * Обесценивает лучший скин в ленте.
 */
function devalue() {
  if (skinValue > 0) {
    skinValue -= 1;

    if (skinValue > 0) {
      timer = setTimeout(devalue, 1000);
    }
  }

  postMessage(`${skinValue / skinPrice}`);
}

onmessage = (e: MessageEvent) => processData(e.data);
