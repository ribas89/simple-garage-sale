# GitHub repositories are now mirror only

Due to recent changes in GitHub's direction, development has migrated to: https://git.ribas89.co.uk

Have a issue/question? https://link.ribas89.co.uk/ask

# Simple Garage Sale website

Simple website for Garage Sale made with React.

## Demo
[https://julian-alarcon.github.io/simple-garage-sale/](https://julian-alarcon.github.io/simple-garage-sale/)

## Description

A lightweight static page for listing garage sale items with photos, prices, status labels, details, and a payment/contact button.

The site is configured through `data.json`, and product images are loaded from `assets/`.

## Features
- Static React page with runtime Babel
- No npm install, build step, or compilation
- Responsive layout for desktop and mobile
- Product data loaded from `data.json`
- Product images loaded from `assets/`
- Configurable title, header, price format, status labels, and payment action
- Self-hosted assets: React, ReactDOM, Babel, and Roboto are served locally
- Dockerized with BusyBox `httpd`

## Dockerized with self hosted local assets

This repository includes a minimal Compose setup:

[docker-compose.yml](./docker-compose.yml)

Run it with:

    docker compose up -d --build

After starting the container, open:

    http://localhost:3000

If running on a server, replace `localhost` with the server IP or domain.

## Configuration

The site is configured through `data.json`.

### Example

```json
{
  "title": "Garage Sale - Milena & Julian",
  "header": "<header>Garage Sale<br />Milena & Julian</header><section class=\"subtitle\"><h3>We accept Nequi, Colpatria, cash, or PayPal. Bogotá only.</h3><h4>Some delivery dates may vary by a few days.</h4><p>Click or tap the photos to see more details about each item.</p></section>",
  "priceFormat": {
    "locale": "es-CO",
    "options": {
      "style": "currency",
      "currency": "COP",
      "maximumFractionDigits": 0
    }
  },
  "states": {
    "available": "DISPONIBLE",
    "reserved": "RESERVADO",
    "sold": "VENDIDO",
    "notavailable": "NO DISPONIBLE"
  },
  "payment": "Comprar",
  "paymentAction": "https://api.whatsapp.com/send?phone=+573006815916&text=Hola%2C%20estoy interesado en%20${p.name}",
  "paymentIcon": "whatsapp-icon.png",
  "products": [
    {
      "name": "Sacacorchos",
      "url": "https://www.homesentry.co/p/sacacorchos-ilko-metalico/",
      "imageUrl": "assets/sacacorchos.jpg",
      "price": 40000,
      "details": [
        "ENTREGA INMEDIATA",
        "Sacacorchos/destapador",
        "Como nuevo"
      ],
      "state": "available",
      "purchaser": "id"
    }
  ]
}
```

### Root fields

- `title`: browser tab title.
- `header`: HTML rendered at the top of the page. Use regular HTML attributes like `class`, not React `className`.
- `priceFormat`: locale and options passed to `toLocaleString()` for price formatting.
- `states`: labels shown for each item state.
- `payment`: text shown on the payment/contact button.
- `paymentAction`: URL opened when the payment/contact button is clicked. `${p.name}` is replaced with the product name.
- `paymentIcon`: icon shown next to the payment/contact button.
- `products`: list of items to show.

### Product fields

- `name`: product name.
- `url`: link opened when the product image is clicked. Can be an external URL or a local image.
- `imageUrl`: image shown in the product card.
- `originalPrice`: optional original price. Used to calculate the discount badge.
- `price`: current sale price.
- `details`: list of product details.
- `state`: item status.
- `purchaser`: optional internal tracking field. Not shown on the website.

### Item status

Valid `state` values:

- `available`: green banner on top
- `reserved`: blue banner in the middle
- `sold`: red banner on top with a greyed image
- `notavailable`: grey banner in the middle with a greyed image

## Credits

* [Jonathan Ribas](https://profile.ribas89.co.uk/)

## License

MIT License

**Based on [https://github.com/julian-alarcon/simple-garage-sale](https://github.com/julian-alarcon/simple-garage-sale)**