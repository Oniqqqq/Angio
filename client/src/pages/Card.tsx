import { useState } from "react";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
// Replace image/thumbnail URLs with Bitrix CDN paths when integrating.

const PRODUCT_DATA = {
  id: "DR04",
  name: "Лимфодренажный крем для лица",
  brand: "ANGIOGENIN",
  rating: 4.9,
  reviewCount: 5,
  inStock: true,
  badges: [
    { label: "ХИТ", color: "#ef8019", hasIcon: false },
    { label: "DRAINAGE", color: "#2c3571", hasIcon: false },
    { label: "УЧАСТВУЕТ В АКЦИИ", color: "#ef4319", hasIcon: true },
  ],
  variants: {
    7: {
      volume: 7,
      price: 790,
      oldPrice: null as number | null,
      bonusPoints: 8,
      installmentAmount: 198,
      image: "/figmaAssets/656f201fc66d45dc5299392d12c724b6-1.png",
      thumbnails: [
        "/figmaAssets/656f201fc66d45dc5299392d12c724b6-1.png",
        "/figmaAssets/rectangle-81.png",
        "/figmaAssets/rectangle-82.png",
      ],
      shortDescription:
        "Миниатюра для путешествий. Активные компоненты стимулируют отток лимфы и обладают выраженным противоотечными свойствами.",
    },
    30: {
      volume: 30,
      price: 1990,
      oldPrice: null as number | null,
      bonusPoints: 20,
      installmentAmount: 498,
      image: "/figmaAssets/rectangle-81.png",
      thumbnails: [
        "/figmaAssets/rectangle-81.png",
        "/figmaAssets/656f201fc66d45dc5299392d12c724b6-1.png",
        "/figmaAssets/rectangle-82.png",
      ],
      shortDescription:
        "Активные компоненты, входящие в состав, стимулируют отток лимфы и обладают выраженным противоотечными свойствами.",
    },
    50: {
      volume: 50,
      price: 2570,
      oldPrice: 2890 as number | null,
      bonusPoints: 25,
      installmentAmount: 643,
      image: "/figmaAssets/frame-2087324701.svg",
      thumbnails: [
        "/figmaAssets/frame-2087324701.svg",
        "/figmaAssets/656f201fc66d45dc5299392d12c724b6-1.png",
        "/figmaAssets/rectangle-81.png",
      ],
      shortDescription:
        "Активные компоненты, входящие в состав, стимулируют отток лимфы и обладают выраженным противоотечными свойствами. Крем увлажняет, оказывает липолитическое действие и обеспечивает лифтинг-эффект.",
    },
  } as Record<number, {
    volume: number; price: number; oldPrice: number | null;
    bonusPoints: number; installmentAmount: number;
    image: string; thumbnails: string[]; shortDescription: string;
  }>,
  tabs: {
    "Описание": {
      sections: [
        { title: "ЛИМФОДРЕНАЖНЫЙ КРЕМ ДЛЯ ЛИЦА", text: "Крем предназначен для активизации обменных процессов в клетках кожи и улучшения микроциркуляции. Активные компоненты, входящие в состав, стимулируют отток лимфы и обладают выраженным противоотечными свойствами. Крем увлажняет, оказывает липолитическое действие и обеспечивает лифтинг-эффект, снижает проницаемость сосудистой стенки и уменьшает накопление продуктов метаболизма гемоглобина для коррекции выраженности темных кругов в периорбитальной области." },
        { title: "Способ применения", text: "Нанести утром на очищенную кожу лица, шею и декольте. Можно использовать как основу под макияж." },
        { title: "Меры предосторожности", text: "Только для наружного применения. Не использовать при индивидуальной непереносимости какого-либо из компонентов." },
        { title: "Хранение и транспортировка", text: "Хранить при температуре от +5 °C до +25 °C." },
      ],
    },
    "Протоколы применения": {
      sections: [
        { title: "БАЗОВЫЙ ПРОТОКОЛ", text: "Очистить кожу мягким очищающим средством. Нанести тоник. Распределить крем по массажным линиям лица, шеи и декольте. Применять утром ежедневно." },
        { title: "ИНТЕНСИВНЫЙ ПРОТОКОЛ", text: "Для достижения выраженного лимфодренажного эффекта рекомендуется применять крем в сочетании с ручным или аппаратным лимфодренажным массажем 2–3 раза в неделю." },
        { title: "КУРС", text: "Рекомендуемый курс — 4 недели ежедневного применения. Затем перейти на поддерживающий режим 3–4 раза в неделю." },
      ],
    },
    "Состав": {
      sections: [
        { title: "ПОЛНЫЙ СОСТАВ (INCI)", text: "Aqua, Glycerin, Cetearyl Alcohol, Recombinant Angiogenin, Lipocare™ (Caffeine, Coenzyme A, Bupleurum Falcatum Extract), Phenoxyethanol, Ethylhexylglycerin, Carbomer, Triethanolamine, Parfum." },
        { title: "ПРИМЕЧАНИЕ", text: "Состав может незначительно отличаться в зависимости от объема упаковки. Актуальный состав всегда указан на этикетке продукта." },
      ],
    },
    "Активы": {
      sections: [
        { title: "РЕКОМБИНАНТНЫЙ АНГИОГЕНИН", text: "Биотехнологический белок, стимулирующий ангиогенез и улучшающий микроциркуляцию. Активизирует клеточный метаболизм, ускоряет регенерацию кожи." },
        { title: "LIPOCARE™", text: "Запатентованный комплекс из кофеина, коэнзима А и экстракта володушки серповидной. Стимулирует липолиз, уменьшает отечность и темные круги под глазами." },
        { title: "КОФЕИН", text: "Сужает капилляры, уменьшает отечность, тонизирует кожу, повышает её упругость." },
        { title: "КОЭНЗИМ А", text: "Участвует в синтезе жирных кислот, улучшает обменные процессы в клетках кожи." },
      ],
    },
    "Документы": {
      sections: [
        { title: "СЕРТИФИКАТ СООТВЕТСТВИЯ", text: "Продукт сертифицирован и соответствует требованиям Технического регламента Таможенного союза ТР ТС 009/2011 «О безопасности парфюмерно-косметической продукции»." },
        { title: "ДЕРМАТОЛОГИЧЕСКОЕ ТЕСТИРОВАНИЕ", text: "Продукт прошёл клинические дерматологические испытания. Гипоаллергенность подтверждена. Документы предоставляются по запросу." },
      ],
    },
    "Доставка": {
      sections: [
        { title: "БЕСПЛАТНАЯ ДОСТАВКА", text: "Бесплатная доставка курьером при заказе от 5 000 ₽ по всей России." },
        { title: "СРОКИ ДОСТАВКИ", text: "Москва и МО: 1–2 рабочих дня. Регионы России: 2–7 рабочих дней. Самовывоз из пункта выдачи: в течение 1 рабочего дня." },
        { title: "СПОСОБЫ ПОЛУЧЕНИЯ", text: "Курьерская доставка по адресу, самовывоз из пунктов выдачи СДЭК и ПВЗ партнёров, Почта России." },
      ],
    },
  } as Record<string, { sections: { title: string; text: string }[] }>,
};

const navItems = ["ПОДБОР УХОДА", "НОВИНКИ", "АНГИОГЕНИН", "ДОСТАВКА", "БОНУСНАЯ ПРОГРАММА", "ДЛЯ ПАРТНЕРОВ"];
const productTabs = ["Описание", "Протоколы применения", "Состав", "Активы", "Документы", "Доставка"];

const quickLinks = [
  { icon: "/figmaAssets/outline---essentional--ui---box.png", label: "Рассчитать доставку" },
  { icon: "/figmaAssets/outline---messages--conversation---dialog.png", label: "Нужна консультация" },
  { icon: "/figmaAssets/outline---essentional--ui---bolt.png", label: "Товар участвует в акции" },
];

const ratingBars = [
  { star: 5, count: 4, percent: 82 },
  { star: 4, count: 1, percent: 6 },
  { star: 3, count: 0, percent: 0 },
  { star: 2, count: 0, percent: 0 },
  { star: 1, count: 0, percent: 0 },
];

const reviewCards = [
  { name: "Анастасия", date: "3 августа 2026", text: "Хорошо питает кожу, заметно уменьшилась отечность уже после первой недели.", likes: 5, dislikes: 0, isCosmetologist: false },
  { name: "Мария", date: "3 августа 2026", text: "Рекомендую всем своим клиентам. Выраженный дренажный эффект, кожа становится упругой.", likes: 8, dislikes: 0, isCosmetologist: true },
  { name: "Екатерина", date: "15 июля 2026", text: "Отличный крем, легкая текстура, быстро впитывается.", likes: 5, dislikes: 0, isCosmetologist: false },
  { name: "Ольга", date: "10 июля 2026", text: "Использую второй месяц, результат заметен: кожа подтянулась, исчезли мешки под глазами.", likes: 3, dislikes: 0, isCosmetologist: false },
  { name: "Наталья", date: "2 июля 2026", text: "Пробовала много дренажных кремов — этот лучший. Видимый эффект.", likes: 6, dislikes: 0, isCosmetologist: false },
];

const photoThumbnails = [
  { hasPlay: true }, { hasPlay: true }, { hasPlay: true },
  { hasPlay: true }, { hasPlay: true }, { hasPlay: false, overlay: "+10" },
];

const newProducts = [
  { image: "/figmaAssets/image-6.png", badge: "НОВИНКА", badgeBg: "bg-[#86b1f2]", name: "Сыворотка с ниацинамидом, 30 мл", price: "2 500 ₽" },
  { image: "/figmaAssets/image-7.png", badge: "НОВИНКА", badgeBg: "bg-[#86b1f2]", name: "Энзимная очищающая пудра, 40 г", price: "1 870 ₽" },
  { image: "/figmaAssets/-----------50------1--1.png", badge: "НОВИНКА", badgeBg: "bg-[#86b1f2]", name: "Лимфодренажный крем для лица, 50 мл", price: "2 570 ₽" },
  { image: "/figmaAssets/-----------50------1--1-1.png", badge: "НОВИНКА", badgeBg: "bg-[#86b1f2]", name: "Очищающий гель с аминокислотами шелка, 150 мл", price: "2 570 ₽" },
];

const footerColumns = [
  { title: "ИНТЕРНЕТ-МАГАЗИН", links: ["Каталог товаров", "Как сделать заказ", "Способ оплаты", "Доставка", "Каталог (онлайн)", "Catalog (online)"] },
  { title: "ЛИЧНЫЙ КАБИНЕТ", links: ["Личный кабинет", "История заказов", "Избранное", "Косметологам"] },
  { title: "ИНФОРМАЦИЯ", links: ["Производство", "Реквизиты компании", "Политика конфиденциальности", "Публичная оферта"] },
  { title: "ДОПОЛНИТЕЛЬНО", links: ["Обучение", "Связаться с нами", "Программа лояльности", "Правила и условия", "Программы домашнего ухода (pdf)"] },
];

const socialButtons = [
  { icon: "/figmaAssets/vector-1.svg", label: "VK" },
  { icon: "/figmaAssets/max-messenger-sign-logo-1.svg", label: "MAX" },
  { icon: "/figmaAssets/vector.svg", label: "TELEGRAM" },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export const Card = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Описание");
  const [activeVolume, setActiveVolume] = useState<number>(50);
  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [oneClickDone, setOneClickDone] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const currentVariant = PRODUCT_DATA.variants[activeVolume];
  const tabContent = PRODUCT_DATA.tabs[activeTab];

  const handleVolumeChange = (vol: number) => {
    setActiveVolume(vol);
    setActiveThumb(0);
  };

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleOneClick = () => {
    setOneClickDone(true);
    setTimeout(() => setOneClickDone(false), 2500);
  };

  const toggleLike = (index: number) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    /* Scroll wrapper */
    <div className="bg-white w-full overflow-x-auto">
      {/* Fixed-width centered canvas — matches Figma artboard */}
      <div className="relative w-[1520px] min-h-[3884px] mx-auto bg-white">

        {/* ══ HEADER ══════════════════════════════════════════════════════ */}

        {/* Logo */}
        <img
          className="absolute top-[13px] left-[calc(50%_-_59px)] w-[118px] h-[30px]"
          alt="Angiopharm"
          src="/figmaAssets/--------07-1.svg"
        />

        {/* Location + phone */}
        <div className="inline-flex items-center gap-5 absolute top-[21px] left-20">
          <button className="inline-flex items-center gap-1 group cursor-pointer">
            <img className="w-2.5 h-2.5" alt="Location" src="/figmaAssets/bold---map---location---map-arrow-right.svg" />
            <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              МОСКВА
            </span>
          </button>
          <button className="inline-flex items-center gap-0.5 group cursor-pointer">
            <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              8 800 800 88 88
            </span>
            <img className="w-[4.33px] h-[3.75px]" alt="" src="/figmaAssets/polygon-2.svg" />
          </button>
        </div>

        {/* Cosmetologist login */}
        <div className="inline-flex items-center gap-2.5 absolute top-2 right-[25px]">
          <img className="flex-shrink-0" alt="User" src="/figmaAssets/frame-2087324801.svg" />
          <button className="inline-flex items-center gap-2.5 px-[15px] h-[34px] bg-[#f8f8fc] rounded-[10px] cursor-pointer transition-all hover:bg-[#ebebf7] active:scale-[0.98]">
            <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] leading-[11.5px] whitespace-nowrap">
              ВХОД КОСМЕТОЛОГИ
            </span>
          </button>
        </div>

        {/* Main navigation */}
        <nav className="flex w-[1440px] items-center justify-between absolute top-[67px] left-[40px]">
          {navItems.map((item) => (
            <button key={item} className="group cursor-pointer">
              <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
                {item}
              </span>
            </button>
          ))}
        </nav>

        {/* Separator */}
        <img className="absolute top-[88px] left-0 w-full h-px" alt="" src="/figmaAssets/line-1.svg" />

        {/* Menu icon */}
        <button className="absolute top-[111px] left-[81px] w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-60">
          <img className="w-6 h-6" alt="Menu" src="/figmaAssets/menu.svg" />
        </button>

        {/* Catalog button */}
        <button className="inline-flex h-10 items-center justify-center gap-[7px] px-[22px] absolute top-[101px] left-[118px] bg-[#3c3c50] rounded-[50px] transition-all hover:bg-[#2e2e40] active:scale-[0.98] cursor-pointer">
          <img className="w-3.5 h-3.5 flex-shrink-0 brightness-0 invert" alt="" src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg" />
          <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-[11px] leading-[13px] whitespace-nowrap tracking-[0.5px]">
            КАТАЛОГ
          </span>
        </button>

        {/* Search bar */}
        <div className="flex w-[372px] h-10 items-center justify-between pl-[27px] pr-[19px] absolute top-[101px] left-[272px] bg-[#3c3c501a] rounded-[30px] cursor-text transition-all hover:bg-[#3c3c5026]">
          <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c5033] text-[10px] leading-[11.5px] whitespace-nowrap">
            СЫВОРОТКА ...
          </span>
          <img className="w-5 h-5 opacity-40" alt="Search" src="/figmaAssets/search.svg" />
        </div>

        {/* Filter tags */}
        <div className="inline-flex items-center gap-[7px] absolute top-[111px] left-[670px]">
          {["ПО НАЗНАЧЕНИЮ", "ТИП СРЕДСТВА", "АКТИВЫ"].map((tag) => (
            <button key={tag} className="inline-flex h-[21px] items-center justify-center px-[17px] bg-[#f8f8fc] rounded-[10px] cursor-pointer transition-all hover:bg-[#ebebf7] active:scale-[0.98]">
              <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] leading-[11.5px] whitespace-nowrap">
                {tag}
              </span>
            </button>
          ))}
        </div>

        {/* Header wishlist + cart */}
        <div className="inline-flex items-center gap-5 absolute top-[111px] right-[38px]">
          <button
            className="flex items-center justify-center w-5 h-5 transition-all hover:opacity-60 active:scale-90"
            onClick={() => setWishlistActive(!wishlistActive)}
          >
            <img className="w-5 h-5" alt="Wishlist" src="/figmaAssets/wishlist.svg" />
          </button>
          <button className="relative flex items-center cursor-pointer group">
            <img className="w-5 h-5 transition-opacity group-hover:opacity-60" alt="Cart" src="/figmaAssets/shopping-bag-4.svg" />
            <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-[#3c3c50] rounded-full">
              <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-[9px] leading-none">
                20
              </span>
            </div>
          </button>
        </div>

        {/* ══ BREADCRUMB ══════════════════════════════════════════════════ */}
        <div className="inline-flex items-center gap-2.5 absolute top-[200px] left-20">
          {["Главная", "Каталог", "Новинки"].map((crumb) => (
            <div key={crumb} className="inline-flex items-center gap-2.5">
              <button className="border-b border-[#bababa] pb-px cursor-pointer transition-opacity hover:opacity-60">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[14.4px] whitespace-nowrap">
                  {crumb}
                </span>
              </button>
              <div className="w-0.5 h-0.5 bg-[#bababa] rounded-[1px]" />
            </div>
          ))}
          <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[14.4px] whitespace-nowrap">
            Лимфодренажный крем для лица
          </span>
        </div>

        {/* ══ GALLERY ═════════════════════════════════════════════════════ */}

        {/* Thumbnail strip */}
        <div className="absolute top-[294px] left-[81px] flex flex-col gap-[5px]">
          {currentVariant.thumbnails.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setActiveThumb(idx)}
              className={`w-[42px] h-[42px] overflow-hidden rounded-[4px] transition-all ${
                activeThumb === idx
                  ? "ring-[1.5px] ring-[#3c3c50] opacity-100"
                  : "ring-1 ring-[#e0e0e0] opacity-55 hover:opacity-85"
              }`}
            >
              <img src={thumb} alt={`Фото ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Arrow prev thumbnails */}
        <button className="absolute top-[383px] left-20 w-[34px] h-[34px] flex items-center justify-center transition-all hover:opacity-60 active:scale-90">
          <img className="w-[34px] h-[34px]" alt="Prev" src="/figmaAssets/arrow-right-1.svg" />
        </button>

        {/* Main product image */}
        <div className="absolute top-[294px] left-[136px] w-[559px] h-[553px] overflow-hidden">
          <img
            key={currentVariant.thumbnails[activeThumb]}
            className="w-full h-full object-contain transition-opacity duration-300"
            alt={PRODUCT_DATA.name}
            src={currentVariant.thumbnails[activeThumb]}
          />
        </div>

        {/* ══ PRODUCT DETAILS ═════════════════════════════════════════════ */}
        <div className="flex flex-col w-[531px] items-start gap-[30px] absolute top-[294px] left-[814px]">

          {/* — Badges */}
          <div className="flex flex-col items-start gap-[15px] w-full">
            <div className="inline-flex items-center gap-[5px]">
              {PRODUCT_DATA.badges.map((badge) => (
                <div
                  key={badge.label}
                  style={{ backgroundColor: badge.color }}
                  className="inline-flex items-center justify-center gap-1 px-[9px] py-1 rounded-[5px]"
                >
                  <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs leading-[13.8px] whitespace-nowrap">
                    {badge.label}
                  </span>
                  {badge.hasIcon && (
                    <img className="w-[11px] h-[11px]" alt="" src="/figmaAssets/subtract.svg" />
                  )}
                </div>
              ))}
            </div>

            {/* Rating */}
            <button className="inline-flex items-center gap-[7px] px-[9px] py-1 bg-[#f7f7f7] rounded-[5px] cursor-pointer transition-all hover:bg-[#ebebeb]">
              <div className="inline-flex items-center gap-[3px]">
                <img className="w-3 h-3" alt="★" src="/figmaAssets/vuesax-bold-ranking.svg" />
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">
                  {PRODUCT_DATA.rating}
                </span>
              </div>
              <div className="border-b border-[#bababa] pb-px">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[13.8px] whitespace-nowrap">
                  {PRODUCT_DATA.reviewCount} отзывов
                </span>
              </div>
            </button>

            {/* Name + price */}
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex flex-col items-start gap-[3px] w-full">
                <div className="inline-flex items-center gap-[5px]">
                  <img className="w-3.5 h-3.5" alt="In stock" src="/figmaAssets/bold---essentional--ui---check-circle.svg" />
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-sm leading-[16.1px] whitespace-nowrap">
                    В наличии
                  </span>
                </div>
                <div className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-[1.1]">
                  {PRODUCT_DATA.name}, {activeVolume} мл
                </div>
                <div className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px]">
                  Арт. {PRODUCT_DATA.id}
                </div>
              </div>

              {/* Price row */}
              <div className="inline-flex items-center gap-[9px]">
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[22px] leading-[25.3px] whitespace-nowrap">
                  {currentVariant.price.toLocaleString("ru-RU")} ₽
                </span>
                {currentVariant.oldPrice && (
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px] line-through whitespace-nowrap">
                    {currentVariant.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
                <div className="inline-flex items-center gap-px">
                  <img className="flex-shrink-0" alt="Bonus" src="/figmaAssets/frame-2087324734.svg" />
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-black text-base leading-[19.2px] whitespace-nowrap">
                    +{currentVariant.bonusPoints}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume selector */}
            <div className="flex flex-col items-start gap-[9px]">
              <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px]">
                Объем, мл
              </span>
              <div className="flex items-center gap-[5px]">
                {[7, 30, 50].map((vol) => (
                  <button
                    key={vol}
                    onClick={() => handleVolumeChange(vol)}
                    className={`flex w-[45px] h-[34px] items-center justify-center rounded-[20px] transition-all duration-200 cursor-pointer ${
                      activeVolume === vol
                        ? "bg-[#f9f9ff] ring-1 ring-[#3c3c50]/20"
                        : "border border-[#f2f2f2] hover:border-[#3c3c50]/30 hover:bg-[#fafafa]"
                    }`}
                  >
                    <span className={`[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-sm leading-[16.1px] transition-colors ${
                      activeVolume === vol ? "text-[#3c3c50]" : "text-[#bababa]"
                    }`}>
                      {vol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* — Description + specs */}
          <div className="flex flex-col items-start gap-5 w-full">
            <p className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px]">
              {currentVariant.shortDescription}
            </p>
            <div className="flex flex-col items-start gap-1.5 w-full">
              {/* PH */}
              <div className="flex w-[306px] items-end justify-between">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px] whitespace-nowrap">PH</span>
                <div className="flex-1 mx-3 h-px bg-[#e0e0e0] mb-[3px]" />
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">5,5 – 6,5</span>
              </div>
              {/* Назначение */}
              <div className="flex w-full items-end justify-between gap-2">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px] whitespace-nowrap">Назначение</span>
                <div className="flex-1 h-px bg-[#e0e0e0] mb-[3px] min-w-0" />
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">Против признаков старения, увлажнение</span>
              </div>
              {/* Активные компоненты */}
              <div className="flex w-full items-start justify-between gap-2">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px] whitespace-nowrap">Активные компоненты</span>
                <div className="flex-1 h-px bg-[#e0e0e0] mt-[7px] min-w-0" />
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] max-w-[274px]">
                  Рекомбинантный ангиогенин, Комлекс кофеина, коэнзима А и экстракта володушки серповидной (Lipocare™)
                </span>
              </div>
            </div>
          </div>

          {/* — Payment + cart */}
          <div className="flex flex-col items-start gap-2.5 w-full">
            {/* Installment */}
            <button className="flex items-center justify-between pl-[15px] pr-2.5 py-2.5 w-full bg-[#f9f8ff] rounded-[10px] cursor-pointer transition-all hover:bg-[#f0eff9] group">
              <div className="inline-flex items-center gap-2.5">
                <img className="w-4 h-4 flex-shrink-0" alt="" src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg" />
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] text-left">
                  Разбейте платеж <strong className="font-medium">на 4 части по {currentVariant.installmentAmount} ₽</strong> без переплат
                </span>
              </div>
              <img className="w-3 h-3 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-[2px]" alt="" src="/figmaAssets/outline---arrows---arrow-right.svg" />
            </button>

            {/* CTA group — 3-level hierarchy */}
            <div className="flex flex-col gap-[7px] w-full">

              {/* PRIMARY: Купить в 1 клик */}
              <button
                onClick={handleOneClick}
                className={`flex w-full h-[49px] items-center justify-center rounded-[10px] cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                  oneClickDone
                    ? "bg-[#78b72a]"
                    : "bg-[#3c3c50] hover:bg-[#323244]"
                }`}
              >
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm leading-[16.1px] whitespace-nowrap">
                  {oneClickDone ? "Заявка принята ✓" : "Купить в 1 клик"}
                </span>
              </button>

              {/* SECONDARY + TERTIARY row */}
              <div className="flex items-center gap-[7px] w-full">
                {/* Secondary: В корзину */}
                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 h-[44px] items-center justify-center gap-2 px-[27px] rounded-[10px] cursor-pointer border transition-all duration-200 active:scale-[0.98] ${
                    cartAdded
                      ? "border-[#78b72a] bg-[#f6fbef] text-[#5e9320]"
                      : "border-[#e0e0ec] bg-[#f8f8fc] hover:bg-[#f0eff9] hover:border-[#c8c8dc] text-[#3c3c50]"
                  }`}
                >
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-sm leading-[16.1px] whitespace-nowrap">
                    {cartAdded ? "Добавлено ✓" : "В корзину"}
                  </span>
                </button>

                {/* Tertiary: Wishlist */}
                <button
                  onClick={() => setWishlistActive(!wishlistActive)}
                  className={`w-[44px] h-[44px] flex items-center justify-center flex-shrink-0 rounded-[10px] border transition-all duration-200 active:scale-[0.95] cursor-pointer ${
                    wishlistActive
                      ? "border-[#e40646]/30 bg-[#fff5f7]"
                      : "border-[#e0e0ec] bg-[#f8f8fc] hover:bg-[#f0eff9] hover:border-[#c8c8dc]"
                  }`}
                >
                  <svg
                    width="18" height="16" viewBox="0 0 18 16" fill="none"
                    className={`transition-colors duration-200 ${wishlistActive ? "fill-[#e40646]" : "fill-none"}`}
                  >
                    <path
                      d="M9 14.5C9 14.5 1.5 9.5 1.5 4.75C1.5 3.09315 2.83579 1.75 4.5 1.75C5.98553 1.75 7.24398 2.73093 7.7 4.0625H10.3C10.756 2.73093 12.0145 1.75 13.5 1.75C15.1642 1.75 16.5 3.09315 16.5 4.75C16.5 9.5 9 14.5 9 14.5Z"
                      stroke={wishlistActive ? "#e40646" : "#3c3c50"}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ══ QUICK LINKS ═════════════════════════════════════════════════ */}
        <div className="flex w-[530px] items-center justify-between absolute top-[870px] left-[144px]">
          {quickLinks.map((link) => (
            <button key={link.label} className="inline-flex items-center gap-2 group cursor-pointer">
              <img className="w-3.5 h-3.5 transition-opacity group-hover:opacity-60" alt="" src={link.icon} />
              <div className="border-b border-[#3c3c50] pb-px transition-opacity group-hover:opacity-60">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs leading-[13.8px] whitespace-nowrap">
                  {link.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* ══ CONTENT TABS ════════════════════════════════════════════════ */}
        <div className="flex w-[557px] items-center justify-between absolute top-[1005px] left-[138px]">
          {productTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`[font-family:'Cera_Pro-${activeTab === tab ? "Medium" : "Regular"}',Helvetica] text-black text-xs leading-[13.8px] whitespace-nowrap transition-all pb-px ${
                activeTab === tab
                  ? "font-medium border-b border-black opacity-100"
                  : "font-normal opacity-40 hover:opacity-70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex flex-col w-[561px] items-start gap-[25px] absolute top-[1049px] left-[136px]">
          {tabContent?.sections.map((section) => (
            <div key={section.title} className="flex flex-col items-start gap-2 w-full">
              <div className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm leading-[16.1px]">
                {section.title}
              </div>
              <div className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px]">
                {section.text}
              </div>
            </div>
          ))}
        </div>

        {/* ══ REVIEWS HEADER ══════════════════════════════════════════════ */}
        <div className="absolute top-[1516px] left-[126px]">
          <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
            отзывы
          </span>
          <span className="ml-2 opacity-40 [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm leading-[16.1px]">
            {reviewCards.length}
          </span>
        </div>

        {/* Photos & Videos label */}
        <div className="absolute top-[1584px] left-[124px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
          Фото и видео покупателей
        </div>

        {/* Rating label */}
        <div className="absolute top-[1584px] left-[810px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
          Рейтинг товара
        </div>

        {/* Photo thumbnails */}
        <div className="flex gap-[10px] absolute top-[1628px] left-[124px]">
          {photoThumbnails.map((thumb, index) => (
            <button
              key={index}
              className="relative w-20 h-20 bg-[#d9d9d9] rounded-[10px] flex items-center justify-center overflow-hidden cursor-pointer transition-all hover:brightness-90 active:scale-95"
            >
              {thumb.hasPlay && (
                <img className="w-[19.5px] h-[22.52px]" alt="Play" src="/figmaAssets/polygon-1.svg" />
              )}
              {thumb.overlay && (
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm">
                  {thumb.overlay}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Rating badges */}
        <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1628px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
          <div className="inline-flex items-center gap-[3px]">
            <img className="w-3 h-3" alt="★" src="/figmaAssets/vuesax-bold-ranking.svg" />
            <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">{PRODUCT_DATA.rating}</span>
          </div>
          <div className="border-b border-[#bababa] pb-px">
            <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[13.8px] whitespace-nowrap">{PRODUCT_DATA.reviewCount} отзывов</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1656px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
          <div className="inline-flex items-center gap-[3px]">
            <img className="w-3 h-3" alt="★" src="/figmaAssets/vuesax-bold-ranking.svg" />
            <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">98%</span>
          </div>
          <div className="border-b border-[#bababa] pb-px">
            <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[13.8px] whitespace-nowrap">Нравится</span>
          </div>
        </div>

        {/* Rating bars */}
        <div className="flex flex-col w-[373px] items-start gap-[5px] absolute top-[1625px] left-[968px]">
          {ratingBars.map((bar) => (
            <div key={bar.star} className="inline-flex items-center gap-[15px]">
              <span className="w-[7px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[10px] leading-[11.5px] text-right">{bar.star}</span>
              <div className="relative w-[330px] h-[3px] bg-[#d9d9d9] rounded-[500px]">
                {bar.percent > 0 && (
                  <div style={{ width: `${bar.percent}%` }} className="absolute top-0 left-0 h-[3px] bg-[#f9b429] rounded-[70px]" />
                )}
              </div>
              <span className="w-[7px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-[10px] text-right leading-[11.5px]">{bar.count}</span>
            </div>
          ))}
        </div>

        {/* ══ REVIEW CARDS ════════════════════════════════════════════════ */}
        <div className="absolute top-[1778px] left-[124px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
          Отзывы покупателей
        </div>

        <div className="flex items-stretch gap-2.5 absolute top-[1818px] left-[124px]">
          {reviewCards.map((review, index) => (
            <div
              key={index}
              className={`flex flex-col w-[270px] h-[213px] justify-between p-[25px] rounded-[10px] border border-solid cursor-pointer transition-all duration-200 ${
                review.isCosmetologist
                  ? "border-[#e40646] hover:shadow-[0_4px_20px_rgba(228,6,70,0.12)]"
                  : "border-[#bababa] hover:border-[#3c3c50]/40 hover:shadow-[0_4px_16px_rgba(60,60,80,0.08)]"
              }`}
            >
              {/* Top section */}
              <div className="flex flex-col items-start gap-[11px]">
                {review.isCosmetologist && (
                  <div className="inline-flex items-center gap-[5px] px-2.5 py-[3px] bg-[#e40646] rounded-[10px]">
                    <img className="w-[15px] h-[15px]" alt="" src="/figmaAssets/bold---like---medal-ribbons-star.svg" />
                    <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-[10px] leading-[11.5px] whitespace-nowrap">
                      Косметолог рекомендует
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm leading-[16.1px]">{review.name}</span>
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs leading-[13.8px] whitespace-nowrap">{review.date}</span>
                </div>
                <div className="inline-flex items-center gap-px">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img key={star} className="w-[15px] h-[15px]" alt="★" src="/figmaAssets/vuesax-bold-ranking.svg" />
                  ))}
                </div>
                <p className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs leading-[13.8px]">
                  {review.text}
                </p>
              </div>

              {/* Bottom: likes */}
              <div className="inline-flex items-center gap-[17px]">
                <button
                  onClick={() => toggleLike(index)}
                  className={`inline-flex items-center gap-1 cursor-pointer transition-all hover:scale-110 active:scale-90 ${likedReviews.has(index) ? "opacity-100" : "opacity-60"}`}
                >
                  <img className="w-[13px] h-[13px]" alt="Like" src="/figmaAssets/outline---like---like-1.svg" />
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px]">
                    {likedReviews.has(index) ? review.likes + 1 : review.likes}
                  </span>
                </button>
                <div className="inline-flex items-center gap-1 cursor-pointer opacity-60 hover:opacity-80 transition-opacity">
                  <img className="w-[13px] h-[13px]" alt="Dislike" src="/figmaAssets/outline---like---dislike-1.svg" />
                  <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm leading-[16.1px]">
                    {review.dislikes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All reviews button */}
        <button className="flex w-[181px] h-[52px] items-center justify-between pl-6 pr-[18px] absolute top-[2080px] left-[124px] bg-[#ececec] rounded-[10px] cursor-pointer transition-all hover:bg-[#e0e0e0] active:scale-[0.98] group">
          <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[13px] leading-[14.9px] whitespace-nowrap">
            ВСЕ ОТЗЫВЫ
          </span>
          <img className="w-5 h-5 transition-transform group-hover:translate-x-[2px]" alt="→" src="/figmaAssets/arrow-right-6.svg" />
        </button>

        {/* ══ НОВИНКИ ═════════════════════════════════════════════════════ */}
        <div className="absolute top-[2307px] left-20">
          <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
            Новинки
          </span>
        </div>

        <button className="inline-flex items-center gap-[3px] absolute top-[2314px] right-[102px] group cursor-pointer">
          <div className="border-b border-black pb-px transition-opacity group-hover:opacity-60">
            <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px] whitespace-nowrap">
              СМОТРЕТЬ ВСЕ ТОВАРЫ
            </span>
          </div>
          <img className="w-4 h-4 transition-transform group-hover:translate-x-[2px]" alt="→" src="/figmaAssets/arrow-right-4.svg" />
        </button>

        {/* New product cards */}
        <div className="flex gap-[13px] absolute top-[2400px] left-20">
          {newProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col w-[340px] items-start gap-1.5 bg-white cursor-pointer group"
            >
              <div className="relative w-[340px] h-[341px] overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  alt={product.name}
                  src={product.image}
                />
                <div className={`absolute top-0 left-0 ${product.badgeBg} inline-flex items-center justify-center gap-[3px] px-[9px] py-1 rounded-[5px]`}>
                  <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs leading-[13.8px] whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute bottom-[16px] right-[16px] w-[50px] h-[50px] transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-[4px] group-hover:translate-y-0">
                  <img className="w-full h-full" alt="Add to cart" src="/figmaAssets/shopping-bag.svg" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-[15px] w-full">
                <div className="flex flex-col items-start gap-[7px] w-full">
                  <div className="inline-flex items-center gap-[5px]">
                    <img className="w-3.5 h-3.5" alt="" src="/figmaAssets/bold---essentional--ui---check-circle.svg" />
                    <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-xs leading-[13.8px] whitespace-nowrap">В наличии</span>
                  </div>
                  <div className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base leading-[18.4px] transition-colors group-hover:text-[#3c3c50]/70">
                    {product.name}
                  </div>
                </div>
                <div className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-base leading-[18.4px]">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel arrows */}
        <button className="absolute top-[2560px] right-[14px] w-[34px] h-[34px] flex items-center justify-center transition-all hover:opacity-60 active:scale-90">
          <img className="w-[34px] h-[34px]" alt="Next" src="/figmaAssets/arrow-right.svg" />
        </button>
        <button className="absolute top-[2560px] left-[63px] w-[34px] h-[34px] flex items-center justify-center transition-all hover:opacity-60 active:scale-90">
          <img className="w-[34px] h-[34px]" alt="Prev" src="/figmaAssets/arrow-right-1.svg" />
        </button>

        {/* ══ BENEFITS ════════════════════════════════════════════════════ */}
        <img
          className="absolute top-[2974px] left-[calc(50%_-_567px)] w-[1134px] h-[122px]"
          alt="Benefits"
          src="/figmaAssets/frame-71.svg"
        />
        {/* Benefits text labels — centered under each of the 4 icons */}
        <div className="absolute top-[3116px] left-[193px] w-[1134px] flex items-start justify-around">
          {["Пробники\nс каждой покупкой", "Бонусная\nпрограмма", "Бесплатная доставка\nот 5000р", "Рассрочка\nплатежа"].map((text, i) => (
            <div key={i} className="w-[160px] text-center [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base tracking-[-0.80px] leading-[19.2px] whitespace-pre-line">
              {text}
            </div>
          ))}
        </div>

        {/* ══ SOCIAL / FOOTER ═════════════════════════════════════════════ */}

        {/* Social gradient panel */}
        <div className="absolute top-[3290px] left-[462px] w-[1058px] h-[207px] rounded-[10px] bg-[linear-gradient(128deg,rgba(248,248,251,1)_0%,rgba(229,229,235,1)_100%)]" />
        {/* Dark footer panel */}
        <div className="absolute top-[3290px] left-5 w-[427px] h-[573px] bg-[#3c3c50] rounded-[10px]" />
        {/* Light footer panel */}
        <div className="absolute top-[3510px] left-[462px] w-[1058px] h-[353px] bg-[#f7f7fb] rounded-[10px]" />

        {/* Social text */}
        <div className="absolute top-[3355px] left-[514px] w-[290px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[22px] tracking-[-1.10px] leading-[26px]">
          Следите за спец предложениями, новостями и акциями в наших социальных сетях
        </div>

        {/* Phone image */}
        <img className="absolute top-[3290px] left-[820px] w-[253px] h-[207px]" alt="Social" src="/figmaAssets/ntktajy-d-hert-1.png" />

        {/* Social buttons */}
        <div className="inline-flex items-center gap-[9px] absolute top-[3378px] left-[1095px]">
          {socialButtons.map((btn) => (
            <button
              key={btn.label}
              className="inline-flex items-center gap-[15px] pl-[25px] pr-[33px] py-3 bg-white rounded-[500px] cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <img className="w-[23px] h-[23px]" alt={btn.label} src={btn.icon} />
              <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[13px] leading-[14.9px] whitespace-nowrap">
                {btn.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer logo */}
        <img className="absolute top-[3349px] left-[54px] w-[212px] h-[54px]" alt="Angiopharm" src="/figmaAssets/--------07-2.svg" />

        {/* Footer tagline */}
        <div className="absolute top-[3431px] left-[79px] w-[163px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm leading-[16.1px]">
          ПРОФЕССИОНАЛЬНАЯ КОСМЕТИКА
        </div>

        {/* Footer phone */}
        <div className="absolute top-[3648px] left-[78px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-[21px] leading-[24.1px] whitespace-nowrap">
          8 (800) 600-73-82
        </div>

        {/* Footer address */}
        <div className="absolute top-[3697px] left-[79px] opacity-30 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-sm leading-[16.1px]">
          АДРЕС
        </div>
        <div className="absolute top-[3726px] left-[79px] w-[303px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs leading-[13.8px]">
          630559, Новосибирская область, р.п. Кольцово, пр-кт Академика Сандахчиева, зд.13. E-mail:{" "}
          <a href="mailto:web@angiopharm.com" rel="noopener noreferrer" target="_blank" className="underline hover:opacity-80">
            web@angiopharm.com
          </a>
          . ОГРН: 1175476080900
        </div>

        {/* Footer nav columns */}
        <div className="flex w-[1006px] items-start justify-between absolute top-[3558px] left-[487px]">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col w-[200px] items-start gap-[18px]">
              <div className="opacity-50 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm leading-[16.1px]">
                {col.title}
              </div>
              {col.links.map((link) => (
                <button
                  key={link}
                  className="text-left [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base leading-[18.4px] cursor-pointer transition-opacity hover:opacity-60"
                >
                  {link}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Footer copyright */}
        <div className="absolute top-[3835px] left-[79px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs leading-[13.8px] whitespace-nowrap">
          <a href="http://angiopharm.com/" rel="noopener noreferrer" target="_blank" className="underline hover:opacity-80">Ангиофарм</a>
          {" "}© ООО ЛАБОРАТОРИЯ АНГИОФАРМ, 2026
        </div>

        {/* Payment icons */}
        <div className="inline-flex items-center gap-3.5 absolute top-[3784px] left-[79px]">
          <div className="relative w-[52.16px] h-[35.69px]">
            <img className="absolute w-[81.07%] h-[32.32%] top-[35.00%] left-[8.62%]" alt="" src="/figmaAssets/combined-shape-1.svg" />
            <img className="absolute w-[23.83%] h-[13.35%] top-[35.01%] left-[66.49%]" alt="" src="/figmaAssets/path24.svg" />
          </div>
          <div className="relative w-[52.16px] h-[35.69px]">
            <img className="absolute w-[10.82%] h-[35.00%] top-[33.58%] left-[37.74%]" alt="" src="/figmaAssets/polygon9.svg" />
            <img className="absolute w-[19.97%] h-[36.16%] top-[32.95%] left-[48.56%]" alt="" src="/figmaAssets/path11.svg" />
            <img className="absolute w-[23.89%] h-[35.00%] top-[33.58%] left-[67.08%]" alt="" src="/figmaAssets/path13.svg" />
            <img className="absolute w-[30.44%] h-[34.96%] top-[33.58%] left-[8.78%]" alt="" src="/figmaAssets/combined-shape.svg" />
          </div>
          <div className="relative w-[52.16px] h-[35.69px]">
            <img className="absolute top-[5px] left-2.5 w-[33px] h-[25px]" alt="" src="/figmaAssets/group.png" />
          </div>
          <img className="w-[50.33px] h-[20.13px]" alt="SBP" src="/figmaAssets/sbp-logo-1.svg" />
          <div className="relative w-[47.58px] h-[24.71px] overflow-hidden">
            <img className="absolute w-[37.66%] h-[70.00%] top-[15.00%] left-0" alt="" src="/figmaAssets/vector-2.svg" />
            <div className="absolute top-[45%] left-[47%] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#d7d7d7] text-[5.5px] leading-[5.5px]">
              Расчетный<br />счет
            </div>
          </div>
        </div>

        {/* Bottom arrow */}
        <button className="absolute top-[3863px] right-[14px] w-[34px] h-[21px] flex items-center justify-center transition-opacity hover:opacity-60">
          <img className="w-[34px] h-[21px]" alt="→" src="/figmaAssets/arrow-right.svg" />
        </button>

      </div>{/* end inner canvas */}
    </div>
  );
};
