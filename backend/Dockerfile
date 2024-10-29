# Используем официальный образ Node.js версии 18
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
RUN npm install
COPY . .

RUN [ "npx", "prisma", "generate" ]

RUN [ "npx", "prisma", "db push" ]

# Собираем проект
RUN npm run build

# Указываем команду запуска
CMD ["npm", "run", "start:prod"]

# Открываем порт
EXPOSE 4000
