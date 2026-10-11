# GitHub repositories are now mirror only

Due to recent changes in GitHub's direction, development has migrated to: https://git.ribas89.co.uk

Have a issue/question? https://link.ribas89.co.uk/ask

# Simple Garage Sale website

Simple website for Garage Sale made with React.

## Demo

[https://jribas89.com/](https://jribas89.com/)

## Description

A lightweight static page for listing garage sale items with photos, prices, status labels, details, and a payment/contact button.

The site is configured through `data.json`, and product images are loaded from `assets/`.

## Features

- Static React page with runtime Babel
- No npm install, build step, or compilation
- Responsive layout for desktop and mobile
- Product data loaded from `data.json`
- Product images loaded from `assets/`
- Configurable title, header, price format, price labels, status labels, and payment action
- Optional original price with discount badge
- Product details can be plain text/HTML or styled links
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

```json
{
  "title": "Garage Sale - Milena & Julian",
  "header": "<header>Garage Sale<br />Milena & Julian</header><section class=\"subtitle\"><h3>We accept Nequi, Colpatria, cash, or PayPal. Bogotá only.</h3><h4>Some delivery dates may vary by a few days.</h4><p>Click or tap the photos to see more details about each item.</p></section>",
  "price": {
    "format": {
      "locale": "es-CO",
      "options": {
        "style": "currency",
        "currency": "COP",
        "maximumFractionDigits": 0
      }
    },
    "labels": {
      "from": "From",
      "to": "For"
    },
    "background": "#ffcc00"
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
    },
    {
      "name": "Cuello",
      "url": "assets/cuello.jpg",
      "imageUrl": "assets/cuello.jpg",
      "originalPrice": 33240,
      "price": 15000,
      "details": [
        "ENTREGA INMEDIATA",
        "Un uso",
        {
          "link": "https://example.com/product-page",
          "label": "Página del producto"
        }
      ],
      "state": "reserved",
      "purchaser": "id"
    }
  ]
}
```

### Root fields

- `title`: browser tab title.
- `header`: HTML rendered at the top of the page. Use regular HTML attributes like `class`, not React `className`.
- `price`: price display configuration.
- `price.format`: locale and options passed to `toLocaleString()` for price formatting.
- `price.labels.from`: label shown before the original price.
- `price.labels.to`: label shown before the current price.
- `price.background`: background color used by the price area.
- `states`: labels shown for each item state.
- `payment`: text shown on the payment/contact button.
- `paymentAction`: URL opened when the payment/contact button is clicked. `${p.name}` is replaced with the product name.
- `paymentIcon`: icon shown next to the payment/contact button.
- `products`: list of items to show.

### Product fields

- `name`: product name.
- `url`: link opened when the product image is clicked. Can be an external URL or a local image.
- `imageUrl`: image shown in the product card.
- `originalPrice`: optional original price. Used to show the original price and calculate the discount badge.
- `price`: current sale price.
- `details`: list of product details.
- `state`: item status.
- `purchaser`: optional internal tracking field. Not shown on the website.

### Product details

The `details` array supports plain strings and link objects.

Plain strings are rendered as regular list items.

Link objects are rendered as styled links that open in a new tab.

Link object shape:

    {
      "link": "https://example.com/product-page",
      "label": "Página del producto"
    }

You can mix both formats in the same `details` array.

### Price display

If a product has only `price`, the site shows the current price.

If a product has both `originalPrice` and `price`, and `originalPrice` is greater than `price`, the site shows the original price and the current price.

Example display:

    From $33.240
    For $15.000

The original price value is shown with a strikethrough, but the `from` label is not.

### Item status

Valid `state` values:

- `available`: green banner
- `reserved`: blue banner
- `sold`: red banner with a greyed image
- `notavailable`: grey banner with a greyed image

## License

MIT License

**Based on [https://github.com/julian-alarcon/simple-garage-sale](https://github.com/julian-alarcon/simple-garage-sale)**