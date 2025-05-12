import { Telegraf } from 'telegraf';

const bot = new Telegraf('7912158076:AAHClxRiNqxP8l0plBK19BhJSrna1RpzWik'); // Токен твоего бота

// URL мини-аппа
const webAppUrl = 'https://weather-five-sage.vercel.app/';

// Обработка команды /start
bot.start((ctx) => {
  ctx.reply('Hello! This bot show weather in the world.\n\nPress "To know weather" 👇', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'To know weather',
            web_app: {
              url: webAppUrl, // Ссылка на мини-апп
            },
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

// Слушаем данные из мини-аппа (если отправляются через sendData)
bot.on('message', (ctx) => {
  if (ctx.message.web_app_data) {
    const data = ctx.message.web_app_data.data;
    ctx.reply(`Получено из мини-аппа: ${data}`);
  }
});

// Запуск бота
bot.launch();

console.log('Бот запущен и готов к работе');
