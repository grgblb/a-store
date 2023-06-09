type AStoreRoute = {
    readonly path: string,
    readonly title: string
}

export const mainPage: AStoreRoute = {
    path: "",
    title: "Главная"
};

export const madeInAlfa: AStoreRoute = {
    path: "sdelano-v-alfe",
    title: "Сделано в Альфе"
};

export const ownDesign: AStoreRoute = {
    path: "svoy-dizain",
    title: "Свой дизайн"
};

export const product: AStoreRoute = {
    path: "product",
    title: "Товар"
};

export const contactUs: AStoreRoute = {
    path: "contact-us",
    title: "Контакты"
};

export const policy: AStoreRoute = {
    path: "policy",
    title: "Политика в отношении обработки персональных данных"
};

export const ORDER_HASH = "#tcart";
