"use strict";

const SiteContext = React.createContext({});

const App = () => {
  const siteData = React.useContext(SiteContext);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: siteData.header }} />
      <ProductList products={siteData.products} />
    </div>
  );
};

const ProductList = (props) => {
  return (
    <div className="container">
      {props.products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

const ProductCard = (props) => {
  const siteData = React.useContext(SiteContext);
  const p = props.product;

  const formatPrice = (price) => price.toLocaleString(siteData.priceFormat.locale, siteData.priceFormat.options);

  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  return (
    <div className="product">
      <a href={p.url} target="_blank">
        {p.state == "sold" ? (
          <span className="product-span">
            <div className="sold">{siteData.states.sold}</div>
            <img className="product-img-filter-sold" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}

        {p.state == "reserved" ? (
          <span className="product-span">
            <div className="reserved">{siteData.states.reserved}</div>
            <img className="product-img-filter-reserved" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}

        {p.state == "notavailable" ? (
          <span className="product-span">
            <div className="notavailable">{siteData.states.notavailable}</div>
            <img className="product-img-filter-notavailable" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}

        {p.state == "available" ? (
          <span className="product-span">
            <div className="available">{siteData.states.available}</div>
            <img className="product-img" src={p.imageUrl} loading="lazy" />
          </span>
        ) : (
          ""
        )}
      </a>

      <div className="product-details">
        <h3>{p.name}</h3>
        {discount > 0 && <span className="discount">-{discount}%</span>}
        <ul>
          {p.details.map((detail, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: detail }} />
          ))}
        </ul>
      </div>

      <div className="product-footer">
        <span className="price">{formatPrice(p.price)}</span>
        {!siteData.paymentAction ? null : (
          <div className="payment-wrapper" onClick={() => window.open(siteData.paymentAction.replace("${p.name}", encodeURIComponent(p.name)), "_blank")}>
            <img className="icon" src={siteData.paymentIcon} />
            <button className="payment">{siteData.payment}</button>
          </div>
        )}
      </div>
    </div>
  );
};

fetch("./data.json")
  .then((response) => response.json())
  .then((siteData) => {
    document.title = siteData.title || "Garage Sale";

    ReactDOM.render(
      <SiteContext.Provider value={siteData}>
        <App />
      </SiteContext.Provider>,
      document.getElementById("root")
    );
  });
