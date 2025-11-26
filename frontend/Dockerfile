# مرحلة البناء
FROM node:20-alpine as build

WORKDIR /app

# نسخ ملفات package
COPY package*.json ./

# تثبيت الاعتماديات
RUN npm ci

# نسخ كل الملفات
COPY . .

# بناء التطبيق
RUN npm run build

# مرحلة الإنتاج
FROM nginx:alpine

# نسخ الملفات المبنية من مرحلة البناء
COPY --from=build /app/dist /usr/share/nginx/html

# نسخ تكوين nginx مخصص
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
