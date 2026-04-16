import { useState } from "react";
import { Button } from "@/components/ui/button";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
// Replace `image` / `thumbnails` with actual Bitrix CDN URLs when integrating.

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
        {
          title: "ЛИМФОДРЕНАЖНЫЙ КРЕМ ДЛЯ ЛИЦА",
          text: "Крем предназначен для активизации обменных процессов в клетках кожи и улучшения микроциркуляции. Активные компоненты, входящие в состав, стимулируют отток лимфы и обладают выраженным противоотечными свойствами. Крем увлажняет, оказывает липолитическое действие и обеспечивает лифтинг-эффект, снижает проницаемость сосудистой стенки и уменьшает накопление продуктов метаболизма гемоглобина для коррекции выраженности темных кругов в периорбитальной области.",
        },
        {
          title: "Способ применения",
          text: "Нанести утром на очищенную кожу лица, шею и декольте. Можно использовать как основу под макияж.",
        },
        {
          title: "Меры предосторожности",
          text: "Только для наружного применения. Не использовать при индивидуальной непереносимости какого-либо из компонентов.",
        },
        {
          title: "Хранение и транспортировка",
          text: "Хранить при температуре от +5 °C до +25 °C.",
        },
      ],
    },
    "Протоколы применения": {
      sections: [
        {
          title: "БАЗОВЫЙ ПРОТОКОЛ",
          text: "Очистить кожу мягким очищающим средством. Нанести тоник. Распределить крем по массажным линиям лица, шеи и декольте. Применять утром ежедневно.",
        },
        {
          title: "ИНТЕНСИВНЫЙ ПРОТОКОЛ",
          text: "Для достижения выраженного лимфодренажного эффекта рекомендуется применять крем в сочетании с ручным или аппаратным лимфодренажным массажем 2–3 раза в неделю.",
        },
        {
          title: "КУРС",
          text: "Рекомендуемый курс — 4 недели ежедневного применения. Затем перейти на поддерживающий режим 3–4 раза в неделю.",
        },
      ],
    },
    "Состав": {
      sections: [
        {
          title: "ПОЛНЫЙ СОСТАВ (INCI)",
          text: "Aqua, Glycerin, Cetearyl Alcohol, Recombinant Angiogenin, Lipocare™ (Caffeine, Coenzyme A, Bupleurum Falcatum Extract), Phenoxyethanol, Ethylhexylglycerin, Carbomer, Triethanolamine, Parfum.",
        },
        {
          title: "ПРИМЕЧАНИЕ",
          text: "Состав может незначительно отличаться в зависимости от объема упаковки. Актуальный состав всегда указан на этикетке продукта.",
        },
      ],
    },
    "Активы": {
      sections: [
        {
          title: "РЕКОМБИНАНТНЫЙ АНГИОГЕНИН",
          text: "Биотехнологический белок, стимулирующий ангиогенез и улучшающий микроциркуляцию. Активизирует клеточный метаболизм, ускоряет регенерацию кожи.",
        },
        {
          title: "LIPOCARE™",
          text: "Запатентованный комплекс из кофеина, коэнзима А и экстракта володушки серповидной (Bupleurum falcatum). Стимулирует липолиз, уменьшает отечность и темные круги под глазами.",
        },
        {
          title: "КОФЕИН",
          text: "Сужает капилляры, уменьшает отечность, тонизирует кожу, повышает её упругость.",
        },
        {
          title: "КОЭНЗИМ А",
          text: "Участвует в синтезе жирных кислот, улучшает обменные процессы в клетках кожи.",
        },
      ],
    },
    "Документы": {
      sections: [
        {
          title: "СЕРТИФИКАТ СООТВЕТСТВИЯ",
          text: "Продукт сертифицирован и соответствует требованиям Технического регламента Таможенного союза ТР ТС 009/2011 «О безопасности парфюмерно-косметической продукции».",
        },
        {
          title: "ДЕРМАТОЛОГИЧЕСКОЕ ТЕСТИРОВАНИЕ",
          text: "Продукт прошёл клинические дерматологические испытания. Гипоаллергенность подтверждена. Документы предоставляются по запросу.",
        },
      ],
    },
    "Доставка": {
      sections: [
        {
          title: "БЕСПЛАТНАЯ ДОСТАВКА",
          text: "Бесплатная доставка курьером при заказе от 5 000 ₽ по всей России.",
        },
        {
          title: "СРОКИ ДОСТАВКИ",
          text: "Москва и МО: 1–2 рабочих дня. Регионы России: 2–7 рабочих дней. Самовывоз из пункта выдачи: в течение 1 рабочего дня после подтверждения заказа.",
        },
        {
          title: "СПОСОБЫ ПОЛУЧЕНИЯ",
          text: "Курьерская доставка по адресу, самовывоз из пунктов выдачи СДЭК и ПВЗ партнёров, Почта России.",
        },
      ],
    },
  } as Record<string, { sections: { title: string; text: string }[] }>,
  productInfo: [
    { label: "PH", value: "5,5 - 6,5" },
    { label: "Назначение", value: "Против признаков старения, увлажнение" },
    {
      label: "Активные компоненты",
      value: "Рекомбинантный ангиогенин, Комлекс кофеина, коэнзима А и экстракта володушки серповидной (Lipocare™)",
    },
  ],
};

// Navigation items
const navItems = [
  "ПОДБОР УХОДА", "НОВИНКИ", "АНГИОГЕНИН", "ДОСТАВКА",
  "БОНУСНАЯ ПРОГРАММА", "ДЛЯ ПАРТНЕРОВ",
];

// Product tabs
const productTabs = [
  "Описание", "Протоколы применения", "Состав",
  "Активы", "Документы", "Доставка",
];

// Quick links
const quickLinks = [
  { icon: "/figmaAssets/outline---essentional--ui---box.png", label: "Рассчитать доставку" },
  { icon: "/figmaAssets/outline---messages--conversation---dialog.png", label: "Нужна консультация" },
  { icon: "/figmaAssets/outline---essentional--ui---bolt.png", label: "Товар участвует в акции" },
];

// Rating bars
const ratingBars = [
  { star: 5, count: 4, percent: 82 },
  { star: 4, count: 1, percent: 6 },
  { star: 3, count: 0, percent: 0 },
  { star: 2, count: 0, percent: 0 },
  { star: 1, count: 0, percent: 0 },
];

// Review cards
const reviewCards = [
  { name: "Анастасия", date: "3 августа 2026", text: "Хорошо питает кожу, заметно уменьшилась отечность уже после первой недели применения.", likes: 5, dislikes: 0, isCosmetologist: false },
  { name: "Мария", date: "3 августа 2026", text: "Рекомендую всем своим клиентам. Выраженный дренажный эффект, кожа становится более упругой.", likes: 8, dislikes: 0, isCosmetologist: true },
  { name: "Екатерина", date: "15 июля 2026", text: "Отличный крем, легкая текстура, быстро впитывается.", likes: 5, dislikes: 0, isCosmetologist: false },
  { name: "Ольга", date: "10 июля 2026", text: "Использую второй месяц, результат заметен: кожа подтянулась, исчезли мешки под глазами.", likes: 3, dislikes: 0, isCosmetologist: false },
  { name: "Наталья", date: "2 июля 2026", text: "Пробовала много дренажных кремов — этот лучший. Натуральный состав и видимый эффект.", likes: 6, dislikes: 0, isCosmetologist: false },
];

// Photo thumbnails for buyers section
const photoThumbnails = [
  { hasPlay: true }, { hasPlay: true }, { hasPlay: true },
  { hasPlay: true }, { hasPlay: true }, { hasPlay: false, overlay: "+10" },
];

// New products from angiopharm.ru
const newProducts = [
  {
    image: "/figmaAssets/image-6.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Сыворотка с ниацинамидом, 30 мл",
    price: "2 500 ₽",
  },
  {
    image: "/figmaAssets/image-7.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Энзимная очищающая пудра, 40 г",
    price: "1 870 ₽",
  },
  {
    image: "/figmaAssets/-----------50------1--1.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Лимфодренажный крем для лица, 50 мл",
    price: "2 570 ₽",
  },
  {
    image: "/figmaAssets/-----------50------1--1-1.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Очищающий гель с аминокислотами шелка, 150 мл",
    price: "2 570 ₽",
  },
];

// Footer columns
const footerColumns = [
  {
    title: "ИНТЕРНЕТ-МАГАЗИН",
    links: ["Каталог товаров", "Как сделать заказ", "Способ оплаты", "Доставка", "Каталог (онлайн)", "Catalog (online)"],
  },
  {
    title: "ЛИЧНЫЙ КАБИНЕТ",
    links: ["Личный кабинет", "История заказов", "Избранное", "Косметологам"],
  },
  {
    title: "ИНФОРМАЦИЯ",
    links: ["Производство", "Реквизиты компании", "Политика конфиденциальности", "Публичная оферта"],
  },
  {
    title: "ДОПОЛНИТЕЛЬНО",
    links: ["Обучение", "Связаться с нами", "Программа лояльности", "Правила и условия", "Программы домашнего ухода (pdf)"],
  },
];

// Social buttons
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

  const toggleLike = (index: number) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="bg-white w-full min-w-[1600px] min-h-[3884px] relative overflow-x-auto">

      {/* ── HEADER ── */}
      {/* Logo */}
      <img
        className="absolute top-[13px] left-[calc(50.00%_-_59px)] w-[118px] h-[30px]"
        alt="Angiopharm logo"
        src="/figmaAssets/--------07-1.svg"
      />

      {/* Top bar — location + phone */}
      <div className="inline-flex items-center gap-5 absolute top-[21px] left-20">
        <div className="inline-flex items-center gap-1 relative flex-[0_0_auto] cursor-pointer group">
          <img className="relative w-2.5 h-2.5" alt="Location" src="/figmaAssets/bold---map---location---map-arrow-right.svg" />
          <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
            МОСКВА
          </div>
        </div>
        <div className="inline-flex items-center gap-0.5 relative flex-[0_0_auto] cursor-pointer group">
          <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
            8 800 800 88 88
          </div>
          <img className="relative w-[4.33px] h-[3.75px]" alt="Expand" src="/figmaAssets/polygon-2.svg" />
        </div>
      </div>

      {/* Cosmetologist login */}
      <div className="inline-flex items-center justify-end gap-2.5 absolute top-2 left-[1335px]">
        <img className="relative flex-[0_0_auto]" alt="User" src="/figmaAssets/frame-2087324801.svg" />
        <button className="inline-flex items-center gap-2.5 px-[15px] py-2.5 relative flex-[0_0_auto] bg-[#f8f8fc] rounded-[10px] cursor-pointer transition-all hover:bg-[#ebebf7] active:scale-[0.98]">
          <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
            ВХОД КОСМЕТОЛОГИ
          </div>
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex w-[1440px] items-center justify-between absolute top-[67px] left-[calc(50.00%_-_720px)]">
        {navItems.map((item) => (
          <button
            key={item}
            className="inline-flex items-center gap-1 relative flex-[0_0_auto] cursor-pointer group"
          >
            <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap transition-opacity group-hover:opacity-60">
              {item}
            </div>
          </button>
        ))}
      </nav>

      {/* Separator line */}
      <img className="absolute top-[88px] left-0 w-[1520px] h-px" alt="" src="/figmaAssets/line-1.svg" />

      {/* Menu icon */}
      <button className="absolute top-[111px] left-[81px] w-6 h-6 transition-opacity hover:opacity-60 active:opacity-40">
        <img className="w-full h-full" alt="Menu" src="/figmaAssets/menu.svg" />
      </button>

      {/* Catalog button */}
      <button className="inline-flex h-10 items-center gap-2.5 px-10 py-2.5 absolute top-[101px] left-[118px] bg-[#3c3c50] rounded-[50px] transition-all hover:bg-[#2e2e40] active:scale-[0.98] cursor-pointer">
        <img className="relative w-3.5 h-3.5" alt="Settings" src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg" />
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
          КАТАЛОГ
        </div>
      </button>

      {/* Search bar */}
      <div className="flex w-[372px] h-10 items-center justify-between pl-[27px] pr-[19px] py-2.5 absolute top-[101px] left-72 bg-[#3c3c501a] rounded-[30px] cursor-text transition-all hover:bg-[#3c3c5026] focus-within:ring-1 focus-within:ring-[#3c3c5040]">
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c5033] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
          СЫВОРОТКА ...
        </div>
        <img className="relative w-5 h-5 opacity-40 transition-opacity hover:opacity-60" alt="Search" src="/figmaAssets/search.svg" />
      </div>

      {/* Filter tags */}
      <div className="inline-flex items-center gap-[7px] absolute top-[119px] left-[670px]">
        {["ПО НАЗНАЧЕНИЮ", "ТИП СРЕДСТВА", "АКТИВЫ"].map((tag) => (
          <button key={tag} className="inline-flex h-[21px] items-center gap-2.5 px-[17px] py-0 relative flex-[0_0_auto] bg-[#f8f8fc] rounded-[10px] cursor-pointer transition-all hover:bg-[#ebebf7] active:scale-[0.98]">
            <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
              {tag}
            </div>
          </button>
        ))}
      </div>

      {/* Wishlist + cart icons */}
      <div className="inline-flex items-center gap-5 absolute top-[111px] left-[1442px]">
        <button
          className="transition-all hover:opacity-60 active:scale-90 cursor-pointer"
          onClick={() => setWishlistActive(!wishlistActive)}
        >
          <img className="relative w-5 h-5" alt="Wishlist" src="/figmaAssets/wishlist.svg" />
        </button>
        <div className="inline-flex items-center gap-px relative flex-[0_0_auto] cursor-pointer group">
          <img className="relative w-5 h-5 transition-opacity group-hover:opacity-60" alt="Cart" src="/figmaAssets/shopping-bag-4.svg" />
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <div className="relative w-3 h-3">
              <div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 relative -top-5 left-[-3px] bg-[#3c3c50] rounded-[500px]">
                <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
                  20
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="inline-flex items-center gap-2.5 absolute top-[200px] left-20">
        {["Главная", "Каталог", "Новинки"].map((crumb, i) => (
          <div key={crumb} className="inline-flex items-center gap-2.5">
            <button className="inline-flex items-center justify-center gap-2.5 px-0 py-0.5 relative flex-[0_0_auto] border-b border-[#bababa] cursor-pointer transition-opacity hover:opacity-60">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
                {crumb}
              </div>
            </button>
            <div className="relative w-0.5 h-0.5 bg-[#bababa] rounded-[1px]" />
          </div>
        ))}
        <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
          Лимфодренажный крем для лица
        </div>
      </div>

      {/* ── GALLERY ── */}
      {/* Main product image */}
      <div className="absolute top-[294px] left-[136px] w-[559px] h-[553px] overflow-hidden rounded-[4px]">
        <img
          className="w-full h-full object-contain transition-opacity duration-300"
          key={currentVariant.thumbnails[activeThumb]}
          alt={PRODUCT_DATA.name}
          src={currentVariant.thumbnails[activeThumb]}
        />
      </div>

      {/* Thumbnail strip */}
      <div className="absolute top-[294px] left-[81px] flex flex-col gap-[5px]">
        {currentVariant.thumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setActiveThumb(idx)}
            className={`w-[42px] h-[42px] overflow-hidden rounded-[4px] transition-all ${
              activeThumb === idx
                ? "ring-2 ring-[#3c3c50] opacity-100"
                : "ring-1 ring-[#e0e0e0] opacity-60 hover:opacity-90"
            }`}
          >
            <img src={thumb} alt={`Фото ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Arrow prev (thumb scroll) */}
      <button className="absolute top-[383px] left-20 w-[34px] h-[34px] transition-all hover:opacity-60 active:scale-90">
        <img className="w-full h-full" alt="Prev" src="/figmaAssets/arrow-right-1.svg" />
      </button>

      {/* ── PRODUCT DETAILS ── */}
      <div className="flex flex-col w-[531px] items-end gap-[30px] absolute top-[294px] left-[814px]">

        {/* Badges row */}
        <div className="flex flex-col items-start gap-[15px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
            {PRODUCT_DATA.badges.map((badge) => (
              <div
                key={badge.label}
                style={{ backgroundColor: badge.color }}
                className="inline-flex items-center justify-center gap-1 px-[9px] py-1 relative flex-[0_0_auto] rounded-[5px] cursor-default transition-transform hover:scale-[1.03]"
              >
                <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                  {badge.label}
                </div>
                {badge.hasIcon && (
                  <img className="relative w-[11px] h-[11px]" alt="" src="/figmaAssets/subtract.svg" />
                )}
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="inline-flex items-center gap-[7px] px-[9px] py-1 relative flex-[0_0_auto] bg-[#f7f7f7] rounded-[5px] cursor-pointer transition-all hover:bg-[#ebebeb]">
            <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
              <img className="relative w-3 h-3" alt="Star" src="/figmaAssets/vuesax-bold-ranking.svg" />
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                {PRODUCT_DATA.rating}
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b border-[#bababa]">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">
                {PRODUCT_DATA.reviewCount} отзывов
              </div>
            </div>
          </div>

          {/* Product name + price */}
          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-[3px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                <img className="relative w-3.5 h-3.5" alt="In stock" src="/figmaAssets/bold---essentional--ui---check-circle.svg" />
                <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  В наличии
                </div>
              </div>
              <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6">
                {PRODUCT_DATA.name}, {activeVolume} мл
              </div>
              <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px]">
                Арт. {PRODUCT_DATA.id}
              </div>
            </div>

            {/* Price row */}
            <div className="inline-flex items-center gap-[9px] relative flex-[0_0_auto] transition-all duration-300">
              <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[22px] tracking-[0] leading-[25.3px] whitespace-nowrap">
                {currentVariant.price.toLocaleString("ru-RU")} ₽
              </div>
              {currentVariant.oldPrice && (
                <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] line-through whitespace-nowrap">
                  {currentVariant.oldPrice.toLocaleString("ru-RU")} ₽
                </div>
              )}
              <div className="inline-flex items-center gap-px px-0 py-0.5 relative flex-[0_0_auto] bg-white rounded-[60px]">
                <img className="relative flex-[0_0_auto]" alt="Bonus" src="/figmaAssets/frame-2087324734.svg" />
                <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-black text-base text-right tracking-[0] leading-[19.2px] whitespace-nowrap">
                  +{currentVariant.bonusPoints}
                </div>
              </div>
            </div>
          </div>

          {/* Volume selector */}
          <div className="flex flex-col w-[145px] items-start gap-[9px] relative flex-[0_0_auto]">
            <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              Объем, мл
            </div>
            <div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
              {[7, 30, 50].map((vol) => (
                <button
                  key={vol}
                  onClick={() => handleVolumeChange(vol)}
                  className={`flex w-[45px] items-center justify-center gap-[7px] px-[13px] py-[7px] rounded-[20px] transition-all duration-200 cursor-pointer ${
                    activeVolume === vol
                      ? "bg-[#f9f9ff] ring-1 ring-[#3c3c50]/20"
                      : "border border-solid border-[#f2f2f2] hover:border-[#3c3c50]/30 hover:bg-[#fafafa]"
                  }`}
                >
                  <div className={`relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-sm text-center tracking-[0] leading-[16.1px] whitespace-nowrap transition-colors ${
                    activeVolume === vol ? "text-[#3c3c50]" : "text-[#bababa]"
                  }`}>
                    {vol}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description + specs */}
        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] transition-all duration-300">
            {currentVariant.shortDescription}
          </div>
          <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
            {/* PH */}
            <div className="flex w-[306px] items-end justify-between relative flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">PH</div>
              <div className="relative w-[218px] h-px mb-[-0.50px] bg-[url(/figmaAssets/line-4.svg)] bg-[100%_100%]" />
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">5,5 – 6,5</div>
            </div>
            {/* Назначение */}
            <div className="flex flex-wrap items-end justify-between gap-[1px_234px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">Назначение</div>
              <img className="relative w-[158px] h-px mb-[-0.50px]" alt="" src="/figmaAssets/line-2.svg" />
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">Против признаков старения, увлажнение</div>
            </div>
            {/* Активные компоненты */}
            <div className="flex flex-wrap items-start justify-between gap-[0px_234px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">Активные компоненты</div>
              <div className="relative w-[89px] h-px">
                <img className="absolute top-3 left-0 w-[89px] h-px" alt="" src="/figmaAssets/line-3.svg" />
              </div>
              <div className="relative w-[274px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                Рекомбинантный ангиогенин, Комлекс кофеина, коэнзима А и экстракта володушки серповидной (Lipocare™)
              </div>
            </div>
          </div>
        </div>

        {/* Payment + cart */}
        <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          {/* Installment banner */}
          <button className="flex items-center justify-between pl-[15px] pr-2.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f8ff] rounded-[10px] cursor-pointer transition-all hover:bg-[#f0eff9] group">
            <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
              <img className="relative w-4 h-4" alt="" src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg" />
              <div className="relative w-[345px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                Разбейте платеж <span className="font-medium">на 4 части по {currentVariant.installmentAmount} ₽</span> без переплат
              </div>
            </div>
            <img className="relative w-3 h-3 transition-transform group-hover:translate-x-[2px]" alt="" src="/figmaAssets/outline---arrows---arrow-right.svg" />
          </button>

          {/* Add to cart row */}
          <div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
            <Button
              onClick={handleAddToCart}
              className={`flex w-[476px] items-center justify-center gap-2.5 px-[27px] py-4 rounded-[10px] h-auto cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                cartAdded
                  ? "bg-[#78b72a] hover:bg-[#6aaa22]"
                  : "bg-[#3c3c50] hover:bg-[#2e2e40]"
              }`}
            >
              <span className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[16.1px] whitespace-nowrap">
                {cartAdded ? "ДОБАВЛЕНО ✓" : "В КОРЗИНУ"}
              </span>
            </Button>
            <button
              onClick={() => setWishlistActive(!wishlistActive)}
              className={`relative w-12 h-12 cursor-pointer transition-all hover:scale-110 active:scale-90 ${wishlistActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
            >
              <img className="w-full h-full" alt="Wishlist" src="/figmaAssets/wishlist.svg" />
            </button>
          </div>
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className="flex w-[530px] items-center justify-between absolute top-[870px] left-36">
        {quickLinks.map((link) => (
          <button
            key={link.label}
            className="inline-flex gap-2 flex-[0_0_auto] items-center relative cursor-pointer group"
          >
            <img className="relative w-3.5 h-3.5 transition-opacity group-hover:opacity-60" alt={link.label} src={link.icon} />
            <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] border-b border-[#3c3c50] transition-opacity group-hover:opacity-60">
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                {link.label}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── CONTENT TABS ── */}
      <div className="flex w-[557px] items-center justify-between absolute top-[1005px] left-[138px]">
        {productTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative w-fit [font-family:'Cera_Pro-${activeTab === tab ? "Medium" : "Regular"}',Helvetica] font-${activeTab === tab ? "medium" : "normal"} text-black text-xs tracking-[0] leading-[13.8px] whitespace-nowrap transition-all ${
              activeTab === tab
                ? "border-b border-black pb-0.5 opacity-100"
                : "opacity-40 hover:opacity-70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-col w-[561px] items-end gap-[25px] absolute top-[1049px] left-[136px]">
        {tabContent?.sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto] animate-in fade-in duration-300"
          >
            <div className="relative self-stretch [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {section.title}
            </div>
            <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {section.text}
            </div>
          </div>
        ))}
      </div>

      {/* ── REVIEWS ── */}
      {/* Section header */}
      <div className="absolute top-[1516px] left-[126px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
        отзывы
      </div>
      <div className="absolute top-[1523px] left-[220px] opacity-40 [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
        {reviewCards.length}
      </div>

      {/* Photos & Videos */}
      <div className="absolute top-[1584px] left-[124px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Фото и видео покупателей
      </div>

      {/* Rating title */}
      <div className="absolute top-[1584px] left-[810px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Рейтинг товара
      </div>

      {/* Photo thumbnails */}
      <div className="flex gap-[10px] absolute top-[1628px] left-[124px]">
        {photoThumbnails.map((thumb, index) => (
          <button
            key={index}
            className="relative flex w-20 h-20 bg-[#d9d9d9] rounded-[10px] items-center justify-center overflow-hidden cursor-pointer transition-all hover:brightness-90 active:scale-95"
          >
            {thumb.hasPlay && (
              <img className="w-[19.5px] h-[22.52px]" alt="Play" src="/figmaAssets/polygon-1.svg" />
            )}
            {thumb.overlay && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[16.1px]">
                  {thumb.overlay}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Rating badges */}
      <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1628px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
        <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
          <img className="relative w-3 h-3" alt="Star" src="/figmaAssets/vuesax-bold-ranking.svg" />
          <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
            {PRODUCT_DATA.rating}
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b border-[#bababa]">
          <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">
            {PRODUCT_DATA.reviewCount} отзывов
          </div>
        </div>
      </div>
      <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1656px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
        <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
          <img className="relative w-3 h-3" alt="Star" src="/figmaAssets/vuesax-bold-ranking.svg" />
          <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">98%</div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b border-[#bababa]">
          <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">Нравится</div>
        </div>
      </div>

      {/* Rating bars */}
      <div className="flex flex-col w-[373px] items-start gap-[5px] absolute top-[1625px] left-[968px]">
        {ratingBars.map((bar) => (
          <div key={bar.star} className="inline-flex items-center gap-[15px] relative flex-[0_0_auto]">
            <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
              {bar.star}
            </div>
            <div className="relative w-[330px] h-[3px] bg-[#d9d9d9] rounded-[500px]">
              {bar.percent > 0 && (
                <div
                  style={{ width: `${bar.percent}%` }}
                  className="absolute top-0 left-0 h-[3px] bg-[#f9b429] rounded-[70px] transition-all duration-500"
                />
              )}
            </div>
            <div className="relative w-[7px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-[10px] text-right tracking-[-0.10px] leading-[11.5px]">
              {bar.count}
            </div>
          </div>
        ))}
      </div>

      {/* Reviewer cards */}
      <div className="absolute top-[1778px] left-[124px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Отзывы покупателей
      </div>
      <div className="flex w-[1410px] items-start gap-2.5 absolute top-[1818px] left-[124px]">
        {reviewCards.map((review, index) => (
          <div
            key={index}
            className={`flex flex-col w-[270px] items-start gap-[70px] p-[25px] relative rounded-[10px] border border-solid cursor-pointer transition-all duration-200 ${
              review.isCosmetologist
                ? "border-[#e40646] h-[213px] justify-between gap-0 hover:shadow-[0_4px_20px_rgba(228,6,70,0.12)]"
                : "border-[#bababa] hover:border-[#3c3c50]/40 hover:shadow-[0_4px_16px_rgba(60,60,80,0.08)]"
            }`}
          >
            <div className={`flex flex-col items-start gap-[21px] relative ${review.isCosmetologist ? "self-stretch w-full" : ""} flex-[0_0_auto]`}>
              <div className={`flex flex-col items-start gap-[11px] relative ${review.isCosmetologist ? "self-stretch w-full" : ""} flex-[0_0_auto]`}>
                {review.isCosmetologist && (
                  <div className="inline-flex items-center gap-[5px] px-2.5 py-[3px] relative flex-[0_0_auto] bg-[#e40646] rounded-[10px]">
                    <img className="relative w-[15px] h-[15px]" alt="" src="/figmaAssets/bold---like---medal-ribbons-star.svg" />
                    <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
                      Косметолог рекомендует
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-[118px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                    {review.name}
                  </div>
                  <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                    {review.date}
                  </div>
                </div>
                <div className="inline-flex items-center relative flex-[0_0_auto]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img key={star} className="relative w-[15px] h-[15px]" alt="★" src="/figmaAssets/vuesax-bold-ranking.svg" />
                  ))}
                </div>
              </div>
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs tracking-[0] leading-[13.8px]">
                {review.text}
              </div>
            </div>
            <div className="inline-flex items-center gap-[17px] relative flex-[0_0_auto]">
              <button
                onClick={() => toggleLike(index)}
                className={`inline-flex items-center gap-1 relative flex-[0_0_auto] cursor-pointer transition-all hover:scale-110 active:scale-90 ${likedReviews.has(index) ? "opacity-100" : "opacity-60"}`}
              >
                <img className="relative w-[13px] h-[13px]" alt="Like" src="/figmaAssets/outline---like---like-1.svg" />
                <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  {likedReviews.has(index) ? review.likes + 1 : review.likes}
                </div>
              </button>
              <div className="inline-flex items-end gap-1 relative flex-[0_0_auto] cursor-pointer opacity-60 hover:opacity-80 transition-opacity">
                <img className="relative w-[13px] h-[13px]" alt="Dislike" src="/figmaAssets/outline---like---dislike-1.svg" />
                <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#bababa] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  {review.dislikes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All reviews button */}
      <button className="flex w-[181px] items-center justify-between pl-6 pr-[18px] py-[15px] absolute top-[2080px] left-[124px] bg-[#ececec] rounded-[10px] cursor-pointer transition-all hover:bg-[#e0e0e0] active:scale-[0.98] group">
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[13px] tracking-[0] leading-[14.9px] whitespace-nowrap">
          ВСЕ ОТЗЫВЫ
        </div>
        <img className="relative w-5 h-5 transition-transform group-hover:translate-x-[2px]" alt="→" src="/figmaAssets/arrow-right-6.svg" />
      </button>

      {/* ── НОВИНКИ ── */}
      <div className="inline-flex items-center gap-[15px] absolute top-[2307px] left-20">
        <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
          Новинки
        </div>
      </div>

      {/* See all */}
      <button className="inline-flex items-center gap-[3px] absolute top-[2311px] left-[1338px] group cursor-pointer">
        <div className="justify-center gap-2.5 px-0 py-0.5 border-b border-black inline-flex items-center relative flex-[0_0_auto] transition-opacity group-hover:opacity-60">
          <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
            СМОТРЕТЬ ВСЕ ТОВАРЫ
          </div>
        </div>
        <img className="relative w-4 h-4 transition-transform group-hover:translate-x-[2px]" alt="→" src="/figmaAssets/arrow-right-4.svg" />
      </button>

      {/* Product cards */}
      <div className="flex gap-[13px] absolute top-[2400px] left-20">
        {newProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col w-[340px] items-center gap-1.5 bg-white cursor-pointer group transition-all"
          >
            <div className="relative self-stretch w-full h-[341px] overflow-hidden rounded-[4px]">
              <img
                className="absolute top-0 left-0 w-[341px] h-[341px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                alt={product.name}
                src={product.image}
              />
              <div className={`absolute top-0 left-0 ${product.badgeBg} inline-flex items-center justify-center gap-[3px] px-[9px] py-1 rounded-[5px]`}>
                <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                  {product.badge}
                </div>
              </div>
              <div className="absolute top-[276px] left-[276px] w-[50px] h-[50px] transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-[4px] group-hover:translate-y-0">
                <img className="w-full h-full" alt="Add to cart" src="/figmaAssets/shopping-bag.svg" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-[15px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[7px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                  <img className="relative w-3.5 h-3.5" alt="" src="/figmaAssets/bold---essentional--ui---check-circle.svg" />
                  <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">В наличии</div>
                </div>
                <div className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base tracking-[0] leading-[18.4px] transition-colors group-hover:text-[#3c3c50]/70">
                    {product.name}
                  </div>
                </div>
              </div>
              <div className="relative self-stretch [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-base tracking-[0] leading-[18.4px]">
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel arrows for new products */}
      <button className="absolute top-[2560px] left-[1506px] w-[34px] h-[34px] transition-all hover:opacity-60 active:scale-90">
        <img className="w-full h-full" alt="Next" src="/figmaAssets/arrow-right.svg" />
      </button>
      <button className="absolute top-[2560px] left-[63px] w-[34px] h-[34px] transition-all hover:opacity-60 active:scale-90">
        <img className="w-full h-full" alt="Prev" src="/figmaAssets/arrow-right-1.svg" />
      </button>

      {/* ── BENEFITS BANNER ── */}
      <img
        className="absolute top-[2974px] left-[calc(50.00%_-_567px)] w-[1134px] h-[122px]"
        alt="Benefits"
        src="/figmaAssets/frame-71.svg"
      />
      <div className="absolute top-[3128px] left-[212px] w-[164px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base text-center tracking-[-0.80px] leading-[17.6px]">
        Пробники<br />с каждой покупкой
      </div>
      <div className="absolute top-[3128px] left-[569px] w-[123px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base text-center tracking-[-0.80px] leading-[17.6px]">
        Бонусная программа
      </div>
      <div className="absolute top-[3128px] left-[904px] w-[151px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base text-center tracking-[-0.80px] leading-[17.6px]">
        Бесплатная доставка от 5000р
      </div>
      <div className="absolute top-[3125px] left-[1254px] w-[107px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base text-center tracking-[-0.80px] leading-[17.6px]">
        Рассрочка платежа
      </div>

      {/* ── SOCIAL / FOOTER ── */}
      {/* Social gradient panel */}
      <div className="absolute top-[3290px] left-[462px] w-[1118px] h-[207px] rounded-[10px] bg-[linear-gradient(128deg,rgba(248,248,251,1)_0%,rgba(229,229,235,1)_100%)]" />
      {/* Dark footer panel */}
      <div className="absolute top-[3290px] left-5 w-[427px] h-[573px] bg-[#3c3c50] rounded-[10px]" />
      {/* Light footer panel */}
      <div className="absolute top-[3510px] left-[462px] w-[1118px] h-[353px] bg-[#f7f7fb] rounded-[10px]" />

      {/* Social text */}
      <div className="absolute top-[3363px] left-[514px] w-[445px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6">
        Следите за спец предложениями, новостями и акциями в наших социальных сетях
      </div>

      {/* Phone image */}
      <img className="absolute top-[3290px] left-[832px] w-[253px] h-[207px]" alt="Social preview" src="/figmaAssets/ntktajy-d-hert-1.png" />

      {/* Social buttons */}
      <div className="inline-flex items-start justify-center gap-[9px] absolute top-[3375px] left-[1113px]">
        {socialButtons.map((btn) => (
          <button
            key={btn.label}
            className="gap-[15px] pl-[25px] pr-[33px] py-3 bg-white rounded-[500px] inline-flex items-center relative flex-[0_0_auto] cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <img className="relative w-[23px] h-[23px]" alt={btn.label} src={btn.icon} />
            <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[13px] tracking-[0] leading-[14.9px] whitespace-nowrap">
              {btn.label}
            </div>
          </button>
        ))}
      </div>

      {/* Footer logo */}
      <img className="absolute top-[3349px] left-[54px] w-[212px] h-[54px]" alt="Angiopharm" src="/figmaAssets/--------07-2.svg" />

      {/* Footer pro cosmetics */}
      <div className="absolute top-[3431px] left-[79px] w-[163px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[16.1px]">
        ПРОФЕССИОНАЛЬНАЯ КОСМЕТИКА
      </div>

      {/* Footer phone */}
      <div className="absolute top-[3648px] left-[78px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-[21px] tracking-[0] leading-[24.1px] whitespace-nowrap">
        8 (800) 600-73-82
      </div>

      {/* Footer address */}
      <div className="absolute top-[3697px] left-[81px] w-[200px] opacity-30 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-sm tracking-[0] leading-[16.1px]">
        АДРЕС
      </div>
      <div className="absolute top-[3726px] left-[calc(50.00%_-_720px)] w-[303px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[13.8px]">
        630559, Новосибирская область, р.п. Кольцово, пр-кт Академика Сандахчиева, зд.13. E-mail:{" "}
        <a href="mailto:web@angiopharm.com" rel="noopener noreferrer" target="_blank" className="underline hover:opacity-80">
          web@angiopharm.com
        </a>
        . ОГРН: 1175476080900
      </div>

      {/* Footer navigation columns */}
      <div className="flex w-[1006px] items-start justify-between absolute top-[3558px] left-[514px]">
        {footerColumns.map((col) => (
          <div key={col.title} className="flex flex-col w-[200px] items-start gap-[23px] relative">
            <div className="relative self-stretch opacity-50 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {col.title}
            </div>
            {col.links.map((link) => (
              <button
                key={link}
                className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base tracking-[0] leading-[18.4px] cursor-pointer text-left transition-opacity hover:opacity-60"
              >
                {link}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer copyright */}
      <div className="absolute top-[3835px] left-[calc(50.00%_-_719px)] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
        <a href="http://angiopharm.com/" rel="noopener noreferrer" target="_blank" className="underline hover:opacity-80">
          Ангиофарм
        </a>
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
        <img className="relative w-[50.33px] h-[20.13px]" alt="SBP" src="/figmaAssets/sbp-logo-1.svg" />
        <div className="relative w-[47.58px] h-[24.71px] overflow-hidden">
          <img className="absolute w-[37.66%] h-[70.00%] top-[15.00%] left-0" alt="" src="/figmaAssets/vector-2.svg" />
          <div className="absolute w-[60.94%] h-[40.47%] top-[45.00%] left-[46.75%] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#d7d7d7] text-[5.5px] tracking-[0] leading-[5.5px]">
            Расчетный<br />счет
          </div>
        </div>
      </div>

      {/* Bottom arrow */}
      <button className="absolute top-[3863px] left-[1506px] w-[34px] h-[21px] transition-opacity hover:opacity-60">
        <img className="w-full h-full" alt="→" src="/figmaAssets/arrow-right.svg" />
      </button>
    </div>
  );
};
