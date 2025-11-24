import "./styles/styles.scss";

const useMobileMenu = () => {
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

const useAllTabs = () => {
  const removeActiveClass = (collection) => {
    collection.forEach((item) => {
      item.classList.remove("is-active");
    });
  };

  const useTabs = (buttonCollection, contentCollectionArray) => {
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

  const useCatalogPreview = () => {
    const catalog = document.body.querySelector("[data-js-tab-container]");

    const tabButtonCollection = catalog.querySelectorAll("[data-js-tab-button-wrapper] > [data-js-tab-button]");
    const tabContentCollection = catalog.querySelectorAll("[data-js-tab-content-price]");
    const tabProductCollection = catalog.querySelectorAll("[data-js-tab-content-product]");

    if (!tabButtonCollection || !tabContentCollection || !tabProductCollection) {
      return;
    }

    useTabs(tabButtonCollection, [tabContentCollection, tabProductCollection]);

    tabProductCollection.forEach((product) => {
      if (product.hasAttribute("data-js-tab-product-typed")) {
        const typeButtonCollection = product.querySelectorAll("[data-js-tab-button-type]");
        const typeProductCollection = product.querySelectorAll("[data-js-tab-product-type]");

        useTabs(typeButtonCollection, [typeProductCollection]);
      }
    });
  };

  useCatalogPreview();
};

useMobileMenu();
useAllTabs();
