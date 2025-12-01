import "./styles/styles.scss";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

const initMobileMenu = () => {
  const body = document.body;
  const header = body.querySelector("[data-js-header]");
  const menuButton = header.querySelector("[data-js-menu-button]");

  if (!header || !menuButton) {
    return;
  }

  let isMenuOpened = false;

  const openMenu = () => {
    header.classList.add("is-menu-opened");
    body.classList.add("overlay");
    isMenuOpened = true;
  };

  const closeMenu = () => {
    header.classList.remove("is-menu-opened");
    body.classList.remove("overlay");
    isMenuOpened = false;
  };

  menuButton.addEventListener("click", () => {
    if (isMenuOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (isMenuOpened) {
      closeMenu();
    }
  });
};

const initAllTabs = () => {
  const removeActiveClass = (collection) => {
    collection.forEach((item) => {
      item.classList.remove("is-active");
    });
  };

  const initTabs = (buttonCollection, contentCollectionArray) => {
    buttonCollection.forEach((button) => {
      const id = button.getAttribute("data-js-tab-button");

      button.addEventListener("click", () => {
        removeActiveClass(buttonCollection);

        contentCollectionArray.forEach((collection) => {
          removeActiveClass(collection);
          collection.forEach((item) => {
            if (item.getAttribute("data-js-tab-content") === id) {
              item.classList.add("is-active");
            }
          });
        });

        button.classList.add("is-active");
      });
    });
  };

  const initCatalogPreview = () => {
    const catalog = document.body.querySelector("[data-js-tab-container]");

    const tabButtonCollection = catalog.querySelectorAll("[data-js-tab-button-wrapper] > [data-js-tab-button]");
    const tabContentCollection = catalog.querySelectorAll("[data-js-tab-content-price]");
    const tabProductCollection = catalog.querySelectorAll("[data-js-tab-content-product]");

    if (!tabButtonCollection || !tabContentCollection || !tabProductCollection) {
      return;
    }

    initTabs(tabButtonCollection, [tabContentCollection, tabProductCollection]);

    tabProductCollection.forEach((product) => {
      if (product.hasAttribute("data-js-tab-product-typed")) {
        const typeButtonCollection = product.querySelectorAll("[data-js-tab-button-type]");
        const typeProductCollection = product.querySelectorAll("[data-js-tab-product-type]");

        initTabs(typeButtonCollection, [typeProductCollection]);
      }
    });
  };

  initCatalogPreview();
};

const initSalesBannerSlider = () => {
  const swiper = new Swiper("[data-js-sales-banner-swiper]", {
    loop: true,
    spaceBetween: 5,

    navigation: {
      nextEl: "[data-js-sales-banner-swiper-button-next]",
      prevEl: "[data-js-sales-banner-swiper-button-prev]",
    },

    breakpoints: {
      769: {
        spaceBetween: 15,
      },
    },
  });
};

const initTextCrop = () => {
  const textContainerCollection = document.body.querySelectorAll("[data-js-text-crop-container]");

  textContainerCollection.forEach((textContainer) => {
    const wrapper = textContainer.querySelector("[data-js-text-crop]");
    const textWrapper = wrapper.querySelector("p");
    const button = textContainer.querySelector("[data-js-text-crop-button]");
    const fullText = textWrapper.textContent;

    const cropText = () => {
      let symbolNumber = innerWidth <= 768 ? 188 : 436;
      return `${fullText.slice(0, symbolNumber)}...`;
    };

    let croppedText = cropText();
    let isSwownFull = false;

    const hideFullText = () => {
      textWrapper.textContent = croppedText;
      button.textContent = "Просмотреть полностью";
      isSwownFull = false;
    };

    const showFullText = () => {
      textWrapper.textContent = fullText;
      button.textContent = "Скрыть";
      isSwownFull = true;
    };

    button.addEventListener("click", () => {
      if (!isSwownFull) {
        showFullText();
      } else {
        hideFullText();
      }
    });

    hideFullText();

    window.addEventListener("resize", () => {
      croppedText = cropText();
      hideFullText();
    });
  });
};

initMobileMenu();
initAllTabs();
initSalesBannerSlider();
initTextCrop();
