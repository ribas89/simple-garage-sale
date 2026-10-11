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
  const sortProducts = (a, b) => {
    const aAvailable = a.status === "available";
    const bAvailable = b.status === "available";

    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;

    return a.name.localeCompare(b.name);
  };

  return (
    <div className="container">
      {props.products.sort(sortProducts).map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

const ProductCard = (props) => {
  const siteData = React.useContext(SiteContext);
  const p = props.product;

  const formatPrice = (price) => price.toLocaleString(siteData.price.format.locale, siteData.price.format.options);

  const discount = Math.round(100 - (p.price / p.originalPrice) * 100);

  return (
    <div className="product">
      <a href={p.url} target="_blank" rel="noopener noreferrer">
        <ProductHeader product={p} discount={discount} />
      </a>
      <div className="product-line" />
      <div className="product-details">
        <h3>{p.name}</h3>
        <ul>
          {p.details.map((detail, i) => (
            <li key={i}>
              <ProductLink detail={detail} />
            </li>
          ))}
        </ul>
      </div>

      <div className="product-footer">
        <span className="price" style={{ backgroundColor: siteData.price.bgprice }}>
          {p.originalPrice && p.originalPrice > p.price ? (
            <>
              <span className="original-price">
                <span className="price-label">{siteData.price.labels.from}</span> <span className="original-price-value">{formatPrice(p.originalPrice)}</span>
              </span>

              <span className="current-price">
                <span className="price-label">{siteData.price.labels.to}</span> <span className="current-price-value">{formatPrice(p.price)}</span>
              </span>
            </>
          ) : (
            <span className="current-price">
              <span className="current-price-value">{formatPrice(p.price)}</span>
            </span>
          )}
        </span>
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

const ProductHeader = ({ product, discount }) => {
  const siteData = React.useContext(SiteContext);

  const p = product;
  const cStatus = p.status || "notavailable";
  const stateLabel = siteData.status[cStatus];

  const imageClassName = cStatus === "available" ? "product-img" : `product-img product-img-filter-${cStatus}`;

  return (
    <div className="product-header">
      <div className={cStatus}>{stateLabel}</div>
      {discount > 0 && (
        <div className="discount" style={{ backgroundColor: siteData.price.bgdiscount }}>
          <div>-{discount}%</div>
        </div>
      )}
      <img className={imageClassName} src={p.coverURL} loading="lazy" />
    </div>
  );
};

const ProductLink = ({ detail }) => {
  const isLinkObject = typeof detail === "object" && detail !== null && "link" in detail;

  if (isLinkObject) {
    return (
      <a href={detail.link} target="_blank" rel="noopener noreferrer" className="product-link">
        {detail.label || detail.link}
      </a>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: detail }} />;
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
