import { useState } from "react";
import { Button } from "@/components/ui/button";

// Navigation menu items
const navItems = [
  "ПОДБОР УХОДА",
  "НОВИНКИ",
  "АНГИОГЕНИН",
  "ДОСТАВКА",
  "БОНУСНАЯ ПРОГРАММА",
  "ДЛЯ ПАРТНЕРОВ",
];

// Product tab items
const productTabs = [
  "Описание",
  "Протоколы применения",
  "Состав",
  "Активы",
  "Документы",
  "Доставка",
];

// Volume options
const volumeOptions = [
  { value: 7, active: false },
  { value: 30, active: false },
  { value: 50, active: true },
];

// Product info rows
const _productInfoRows = [
  { label: "PH", value: "5,5 - 6,5" },
  {
    label: "Назначение",
    value: "Против признаков старения, увлажнение",
  },
  {
    label: "Активные компоненты",
    value:
      "Рекомбинантный ангиогенин, Комлекс кофеина, коэнзима А и экстракта володушки серповидной (Lipocare™)",
  },
];

// Description sections
const descriptionSections = [
  {
    title: "ЛИМФОДРЕНАЖНЫЙ КРЕМ ДЛЯ ЛИЦА",
    text: "Крем предназначен для активизации обменных процессов в клетках кожи и улучшения микроциркуляции. Активные компоненты, входящие в состав, стимулируют отток лимфы и обладают выраженным противоотечными свойствами. Крем увлажняет, оказывает липолитическое действие и обеспечивает лифтинг-эффект, снижает проницаемость сосудистой стенки и уменьшает накопление продуктов метаболизма гемоглобина для коррекции выраженности темных кругов в периорбитальной области",
  },
  {
    title: "Способ применения",
    text: "Нанести утром на очищенную кожу лица, шею и декольте. Можно использовать как основу под макияж",
  },
  {
    title: "Меры предосторожности",
    text: "Только для наружного применения. Не использовать при индивидуальной непереносимости какого-либо из компонентов",
  },
  {
    title: "Хранение и транспортировка",
    text: "Хранить при температуре от +5 °C до +25 °C",
  },
];

// Quick links
const quickLinks = [
  {
    icon: "/figmaAssets/outline---essentional--ui---box.png",
    label: "Рассчитать доставку",
  },
  {
    icon: "/figmaAssets/outline---messages--conversation---dialog.png",
    label: "Нужна консультация",
  },
  {
    icon: "/figmaAssets/outline---essentional--ui---bolt.png",
    label: "Товар участвует в акции",
  },
];

// Rating bars data
const ratingBars = [
  { star: 5, count: 4, fillWidth: "w-[271px]" },
  { star: 4, count: 1, fillWidth: "w-[19px]" },
  { star: 3, count: 0, fillWidth: null },
  { star: 2, count: 0, fillWidth: null },
  { star: 1, count: 0, fillWidth: null },
];

// Review cards data
const reviewCards = [
  {
    name: "Анастасия",
    date: "3 августа 2026",
    text: "Хорошо питает кожу",
    likes: 5,
    dislikes: 0,
    isCosmetologist: false,
    likeIcon: "/figmaAssets/outline---like---like.png",
    dislikeIcon: "/figmaAssets/outline---like---dislike.png",
  },
  {
    name: "Мария",
    date: "3 августа 2026",
    text: "Хорошо питает кожу",
    likes: 5,
    dislikes: 0,
    isCosmetologist: true,
    likeIcon: "/figmaAssets/outline---like---like-1.svg",
    dislikeIcon: "/figmaAssets/outline---like---dislike-1.svg",
  },
  {
    name: "Анастасия",
    date: "3 августа 2026",
    text: "Хорошо питает кожу",
    likes: 5,
    dislikes: 0,
    isCosmetologist: false,
    likeIcon: "/figmaAssets/outline---like---like-1.svg",
    dislikeIcon: "/figmaAssets/outline---like---dislike-1.svg",
  },
  {
    name: "Анастасия",
    date: "3 августа 2026",
    text: "Хорошо питает кожу",
    likes: 5,
    dislikes: 0,
    isCosmetologist: false,
    likeIcon: "/figmaAssets/outline---like---like-1.svg",
    dislikeIcon: "/figmaAssets/outline---like---dislike-1.svg",
  },
  {
    name: "Анастасия",
    date: "3 августа 2026",
    text: "Хорошо питает кожу",
    likes: 5,
    dislikes: 0,
    isCosmetologist: false,
    likeIcon: "/figmaAssets/outline---like---like-1.svg",
    dislikeIcon: "/figmaAssets/outline---like---dislike-1.svg",
  },
];

// New products data
const newProducts = [
  {
    image: "/figmaAssets/image-6.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Сыворотка с ниацинамидом, 30 мл",
    price: "2 500 ₽",
    imgClass: "top-0 absolute left-0 w-[341px] h-[341px] object-cover",
  },
  {
    image: "/figmaAssets/image-7.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Энзимная очищающая пудра, 40 г",
    price: "1 870 ₽",
    imgClass: "-top-1 absolute left-0 w-[341px] h-[341px] object-cover",
  },
  {
    image: "/figmaAssets/-----------50------1--1.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Лимфодренажный крем для лица, 50 мл",
    price: "2 570 ₽",
    imgClass: "absolute top-3.5 left-2 w-[326px] h-[326px] object-cover",
  },
  {
    image: "/figmaAssets/-----------50------1--1-1.png",
    badge: "НОВИНКА",
    badgeBg: "bg-[#86b1f2]",
    name: "Очищающий гель с аминокислотами шелка, 150 мл",
    price: "2 570 ₽",
    imgClass: "absolute top-3.5 left-2 w-[326px] h-[326px] object-cover",
  },
];

// Footer columns data
const footerColumns = [
  {
    title: "ИНТЕРНЕТ-МАГАЗИН",
    links: [
      "Каталог товаров",
      "Как сделать заказ",
      "Способ оплаты",
      "Доставка",
      "Каталог (онлайн)",
      "Catalog (online)",
    ],
  },
  {
    title: "ЛИЧНЫЙ КАБИНЕТ",
    links: ["Личный кабинет", "История заказов", "Избранное", "Косметологам"],
  },
  {
    title: "ИНФОРМАЦИЯ",
    links: [
      "Производство",
      "Реквизиты компании",
      "Политика конфиденциальности",
      "Публичная оферта",
    ],
  },
  {
    title: "ДОПОЛНИТЕЛЬНО",
    links: [
      "Обучение",
      "Связаться с нами",
      "Программа лояльности",
      "Правила и условия",
      "Программы домашнего ухода (pdf)",
    ],
  },
];

// Social buttons
const socialButtons = [
  { icon: "/figmaAssets/vector-1.svg", label: "VK" },
  { icon: "/figmaAssets/max-messenger-sign-logo-1.svg", label: "MAX" },
  { icon: "/figmaAssets/vector.svg", label: "TELEGRAM" },
];

// Photo thumbnails (5 with play icon + 1 with +10)
const photoThumbnails = [
  { hasPlay: true },
  { hasPlay: true },
  { hasPlay: true },
  { hasPlay: true },
  { hasPlay: true },
  { hasPlay: false, overlay: "+10" },
];

export const Card = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Описание");
  const [activeVolume, setActiveVolume] = useState(50);

  return (
    <div className="bg-white w-full min-w-[1600px] min-h-[3884px] relative">
      {/* Logo */}
      <img
        className="absolute top-[13px] left-[calc(50.00%_-_59px)] w-[118px] h-[30px]"
        alt="Element"
        src="/figmaAssets/--------07-1.svg"
      />
      {/* Top bar - location and phone */}
      <div className="inline-flex items-center gap-5 absolute top-[21px] left-20">
        <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
          <img
            className="relative w-2.5 h-2.5"
            alt="Bold map location"
            src="/figmaAssets/bold---map---location---map-arrow-right.svg"
          />
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
            МОСКВА
          </div>
        </div>
        <div className="inline-flex items-center gap-0.5 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
            8 800 800 88 88
          </div>
          <img
            className="relative w-[4.33px] h-[3.75px]"
            alt="Polygon"
            src="/figmaAssets/polygon-2.svg"
          />
        </div>
      </div>
      {/* Cosmetologist login */}
      <div className="inline-flex items-center justify-end gap-2.5 absolute top-2 left-[1335px]">
        <img
          className="relative flex-[0_0_auto]"
          alt="Frame"
          src="/figmaAssets/frame-2087324801.svg"
        />
        <div className="inline-flex items-center gap-2.5 px-[15px] py-2.5 relative flex-[0_0_auto] bg-[#f8f8fc] rounded-[10px]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
            ВХОД КОСМЕТОЛОГИ
          </div>
        </div>
      </div>
      {/* Main navigation */}
      <nav className="flex w-[1440px] items-center justify-between absolute top-[67px] left-[calc(50.00%_-_720px)]">
        {navItems.map((item) => (
          <div
            key={item}
            className="inline-flex items-center gap-1 relative flex-[0_0_auto] cursor-pointer"
          >
            <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
              {item}
            </div>
          </div>
        ))}
      </nav>
      {/* Separator line */}
      <img
        className="absolute top-[88px] left-0 w-[1520px] h-px"
        alt="Line"
        src="/figmaAssets/line-1.svg"
      />
      {/* Menu icon */}
      <img
        className="absolute top-[111px] left-[81px] w-6 h-6"
        alt="Menu"
        src="/figmaAssets/menu.svg"
      />
      {/* Catalog button */}
      <div className="inline-flex h-10 items-center gap-2.5 px-10 py-2.5 absolute top-[101px] left-[118px] bg-[#3c3c50] rounded-[50px]">
        <img
          className="relative w-3.5 h-3.5"
          alt="Bold settings fine"
          src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg"
        />
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
          КАТАЛОГ
        </div>
      </div>
      {/* Search bar */}
      <div className="flex w-[372px] h-10 items-center justify-between pl-[27px] pr-[19px] py-2.5 absolute top-[101px] left-72 bg-[#3c3c501a] rounded-[30px]">
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c5033] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
          СЫВОРОТКА ...
        </div>
        <img
          className="relative w-5 h-5"
          alt="Search"
          src="/figmaAssets/search.svg"
        />
      </div>
      {/* Filter tags */}
      <div className="inline-flex items-center gap-[7px] absolute top-[119px] left-[670px]">
        <div className="flex w-[114px] h-[21px] items-center gap-2.5 px-[17px] py-0 relative bg-[#f8f8fc] rounded-[10px]">
          <div className="relative w-fit mr-[-7.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
            ПО НАЗНАЧЕНИЮ
          </div>
        </div>
        <div className="flex w-[114px] h-[21px] items-center gap-2.5 px-[17px] py-0 relative bg-[#f8f8fc] rounded-[10px]">
          <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
            ТИП СРЕДСТВА
          </div>
        </div>
        <div className="inline-flex h-[21px] items-center gap-2.5 px-[17px] py-0 relative flex-[0_0_auto] bg-[#f8f8fc] rounded-[10px]">
          <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[10px] text-center tracking-[0] leading-[11.5px] whitespace-nowrap">
            АКТИВЫ
          </div>
        </div>
      </div>
      {/* Wishlist and cart icons */}
      <div className="inline-flex items-center gap-5 absolute top-[111px] left-[1442px]">
        <img
          className="relative w-5 h-5"
          alt="Wishlist"
          src="/figmaAssets/wishlist.svg"
        />
        <div className="inline-flex items-center gap-px relative flex-[0_0_auto]">
          <img
            className="relative w-5 h-5"
            alt="Shopping bag"
            src="/figmaAssets/shopping-bag-4.svg"
          />
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <div className="relative w-3 h-3">
              <div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 relative -top-5 left-[-3px] bg-[#3c3c50] rounded-[500px]">
                <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-xs text-center tracking-[0] leading-[13.8px] whitespace-nowrap">
                    20
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-2.5 absolute top-[200px] left-20">
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-0.5 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
            Главная
          </div>
        </div>
        <div className="relative w-0.5 h-0.5 bg-bababa rounded-[1px]" />
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-0.5 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
            Каталог
          </div>
        </div>
        <div className="relative w-0.5 h-0.5 bg-bababa rounded-[1px]" />
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-0.5 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
            Новинки
          </div>
        </div>
        <div className="relative w-0.5 h-0.5 bg-bababa rounded-[1px]" />
        <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
          Лимфодренажный крем для лица
        </div>
      </div>
      {/* Product image - main */}
      <img
        className="absolute top-[294px] left-[136px] w-[559px] h-[553px]"
        alt="Frame"
        src="/figmaAssets/frame-2087324701.svg"
      />
      {/* Product thumbnails */}
      <img
        className="absolute top-[294px] left-[81px] w-[42px] h-[42px]"
        alt="Img"
        src="/figmaAssets/656f201fc66d45dc5299392d12c724b6-1.png"
      />
      <img
        className="absolute top-[343px] left-[81px] w-[42px] h-[42px]"
        alt="Rectangle"
        src="/figmaAssets/rectangle-81.png"
      />
      <img
        className="absolute top-[392px] left-[81px] w-[42px] h-[42px]"
        alt="Rectangle"
        src="/figmaAssets/rectangle-82.png"
      />
      {/* Arrow left for product images */}
      <img
        className="absolute top-[383px] left-20 w-[34px] h-[34px]"
        alt="Arrow right"
        src="/figmaAssets/arrow-right-1.svg"
      />
      {/* Arrow right for product images */}
      <img
        className="absolute top-[1451px] left-[1506px] w-[34px] h-[34px]"
        alt="Arrow right"
        src="/figmaAssets/arrow-right.svg"
      />
      {/* Product details panel */}
      <div className="flex flex-col w-[531px] items-end gap-[30px] absolute top-[294px] left-[814px]">
        {/* Badges row */}
        <div className="flex flex-col items-start gap-[15px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
            <div className="relative flex-[0_0_auto] bg-[#ef8019] inline-flex items-center justify-center gap-[3px] px-[9px] py-1 rounded-[5px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                ХИТ
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-[3px] px-[9px] py-1 relative flex-[0_0_auto] bg-[#2c3571] rounded-[5px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                DRAINAGE
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-1 px-[9px] py-1 relative flex-[0_0_auto] bg-[#ef4319] rounded-[5px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                УЧАСТВУЕТ В АКЦИИ
              </div>
              <img
                className="relative w-[11px] h-[11px]"
                alt="Subtract"
                src="/figmaAssets/subtract.svg"
              />
            </div>
          </div>
          {/* Rating */}
          <div className="inline-flex items-center gap-[7px] px-[9px] py-1 relative flex-[0_0_auto] bg-[#f7f7f7] rounded-[5px]">
            <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <img
                  className="relative w-3 h-3"
                  alt="Vuesax bold ranking"
                  src="/figmaAssets/vuesax-bold-ranking.svg"
                />
              </div>
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                4.9
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">
                5 отзывов
              </div>
            </div>
          </div>
          {/* Product name and price */}
          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-[3px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                <img
                  className="relative w-3.5 h-3.5"
                  alt="Bold essentional UI"
                  src="/figmaAssets/bold---essentional--ui---check-circle.svg"
                />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  В наличии
                </div>
              </div>
              <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6">
                Лимфодренажный крем для лица, 50 мл
              </div>
              <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px]">
                Арт. DR04
              </div>
            </div>
            <div className="inline-flex items-center gap-[9px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[22px] tracking-[0] leading-[25.3px] whitespace-nowrap">
                2570₽
              </div>
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] line-through whitespace-nowrap">
                2570₽
              </div>
              <div className="inline-flex items-center gap-px px-0 py-0.5 relative flex-[0_0_auto] bg-white rounded-[60px]">
                <img
                  className="relative flex-[0_0_auto]"
                  alt="Frame"
                  src="/figmaAssets/frame-2087324734.svg"
                />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-black text-base text-right tracking-[0] leading-[19.2px] whitespace-nowrap">
                  +25
                </div>
              </div>
            </div>
          </div>
          {/* Volume selector */}
          <div className="flex flex-col w-[145px] items-start gap-[9px] relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              Объем, мл
            </div>
            <div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
              {volumeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveVolume(opt.value)}
                  className={`flex w-[45px] items-center justify-center gap-[7px] px-[13px] py-[7px] rounded-[20px] ${
                    activeVolume === opt.value
                      ? "bg-[#f9f9ff]"
                      : "border border-solid border-[#f2f2f2]"
                  }`}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-sm text-center tracking-[0] leading-[16.1px] whitespace-nowrap ${
                      activeVolume === opt.value
                        ? "text-[#3c3c50]"
                        : "text-bababa"
                    }`}
                  >
                    {opt.value}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Description and specs */}
        <div className="flex flex-col items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
            Активные компоненты, входящие в состав, стимулируют отток лимфы и
            обладают выраженным противоотечными свойствами.
          </div>
          <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
            {/* PH row */}
            <div className="flex w-[306px] items-end justify-between relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                PH
              </div>
              <div className="relative w-[218px] h-px mb-[-0.50px] bg-[url(/figmaAssets/line-4.svg)] bg-[100%_100%]" />
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                5,5 - 6,5
              </div>
            </div>
            {/* Назначение row */}
            <div className="flex flex-wrap items-end justify-between gap-[1px_234px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                Назначение
              </div>
              <img
                className="relative w-[158px] h-px mb-[-0.50px]"
                alt="Line"
                src="/figmaAssets/line-2.svg"
              />
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                Против признаков старения, увлажнение
              </div>
            </div>
            {/* Активные компоненты row */}
            <div className="flex flex-wrap items-start justify-between gap-[0px_234px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                Активные компоненты
              </div>
              <div className="relative w-[89px] h-px">
                <img
                  className="absolute top-3 left-0 w-[89px] h-px"
                  alt="Line"
                  src="/figmaAssets/line-3.svg"
                />
              </div>
              <div className="relative w-[274px] mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                Рекомбинантный ангиогенин, Комлекс кофеина, коэнзима А и
                экстракта володушки серповидной (Lipocare™)
              </div>
            </div>
          </div>
        </div>
        {/* Payment and cart */}
        <div className="flex flex-col items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
          {/* Installment banner */}
          <div className="flex items-center justify-between pl-[15px] pr-2.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#f9f8ff] rounded-[10px]">
            <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
              <img
                className="relative w-4 h-4"
                alt="Bold settings fine"
                src="/figmaAssets/bold---settings--fine-tuning---widget-3.svg"
              />
              <div className="relative w-[345px] mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                  Разбейте платеж{" "}
                </span>
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium">
                  на 4 части по 643 ₽
                </span>
                <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                  {" "}
                  без переплат
                </span>
              </div>
            </div>
            <img
              className="relative w-3 h-3"
              alt="Outline arrows arrow"
              src="/figmaAssets/outline---arrows---arrow-right.svg"
            />
          </div>
          {/* Add to cart */}
          <div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
            <Button className="flex w-[476px] items-center justify-center gap-2.5 px-[27px] py-4 bg-[#3c3c50] rounded-[10px] h-auto hover:bg-[#3c3c50]/90">
              <span className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-sm text-center tracking-[0] leading-[16.1px] whitespace-nowrap">
                В КОРЗИНУ
              </span>
            </Button>
            <img
              className="relative w-12 h-12"
              alt="Wishlist"
              src="/figmaAssets/wishlist-1.svg"
            />
          </div>
        </div>
      </div>
      {/* Quick links below product */}
      <div className="flex w-[530px] items-center justify-between absolute top-[870px] left-36">
        {quickLinks.map((link) => (
          <div
            key={link.label}
            className="inline-flex gap-2 flex-[0_0_auto] items-center relative cursor-pointer"
          >
            <img
              className="relative w-3.5 h-3.5"
              alt={link.label}
              src={link.icon}
            />
            <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#3c3c50]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                {link.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Product tabs */}
      <div className="flex w-[557px] items-center justify-between absolute top-[1005px] left-[138px]">
        {productTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative w-fit [font-family:'Cera_Pro-${activeTab === tab ? "Medium" : "Regular"}',Helvetica] font-${activeTab === tab ? "medium" : "normal"} text-black text-xs tracking-[0] leading-[13.8px] whitespace-nowrap ${
              activeTab === tab
                ? "border-b [border-bottom-style:solid] border-black pb-0.5"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Product description sections */}
      <div className="flex flex-col w-[561px] items-end gap-[25px] absolute top-[1049px] left-[136px]">
        {descriptionSections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
          >
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {section.title}
            </div>
            <div className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {section.text}
            </div>
          </div>
        ))}
      </div>
      {/* Reviews section header */}
      <div className="absolute top-[1516px] left-[126px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
        отзывы
      </div>
      <div className="absolute top-[1523px] left-[220px] opacity-40 [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
        15
      </div>
      {/* Photos and videos section */}
      <div className="absolute top-[1584px] left-[124px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Фото и видео покупателей
      </div>
      {/* Rating section */}
      <div className="absolute top-[1584px] left-[810px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Рейтинг товара
      </div>
      {/* Photo thumbnails */}
      <div className="flex gap-[10px] absolute top-[1628px] left-[124px]">
        {photoThumbnails.map((thumb, index) => (
          <div
            key={index}
            className="relative flex w-20 h-20 bg-[#d9d9d9] rounded-[10px] items-center justify-center overflow-hidden"
          >
            {thumb.hasPlay && (
              <img
                className="w-[19.5px] h-[22.52px]"
                alt="Polygon"
                src="/figmaAssets/polygon-1.svg"
              />
            )}
            {thumb.overlay && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="[font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-sm tracking-[0] leading-[16.1px]">
                  {thumb.overlay}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Rating badge 4.9 */}
      <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1628px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
        <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <img
              className="relative w-3 h-3"
              alt="Vuesax bold ranking"
              src="/figmaAssets/vuesax-bold-ranking.svg"
            />
          </div>
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
            4.9
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">
            5 отзывов
          </div>
        </div>
      </div>
      {/* Rating badge 98% */}
      <div className="inline-flex items-center gap-[7px] px-[9px] py-1 absolute top-[1656px] left-[810px] bg-[#f7f7f7] rounded-[5px]">
        <div className="inline-flex items-center gap-[3px] relative flex-[0_0_auto]">
          <div className="inline-flex items-center relative flex-[0_0_auto]">
            <img
              className="relative w-3 h-3"
              alt="Vuesax bold ranking"
              src="/figmaAssets/vuesax-bold-ranking.svg"
            />
          </div>
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
            98%
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5 px-0 py-px relative flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#bababa]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[-0.12px] leading-[13.8px] whitespace-nowrap">
            Нравится
          </div>
        </div>
      </div>
      {/* Rating bars */}
      <div className="flex flex-col w-[373px] items-start gap-[5px] absolute top-[1625px] left-[968px]">
        {ratingBars.map((bar) => (
          <div
            key={bar.star}
            className="inline-flex items-center gap-[15px] relative flex-[0_0_auto]"
          >
            <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
              {bar.star}
            </div>
            <div className="relative w-[330px] h-[3px] bg-[#d9d9d9] rounded-[500px]">
              {bar.fillWidth && (
                <div
                  className={`absolute top-0 left-0 ${bar.fillWidth} h-[3px] bg-[#f9b429] rounded-[70px]`}
                />
              )}
            </div>
            <div className="relative w-[7px] mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-[10px] text-right tracking-[-0.10px] leading-[11.5px]">
              {bar.count}
            </div>
          </div>
        ))}
      </div>
      {/* Reviews section title */}
      <div className="absolute top-[1778px] left-[124px] w-[532px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-lg tracking-[-0.90px] leading-[17.3px]">
        Отзывы покупателей
      </div>
      {/* Review cards */}
      <div className="flex w-[1410px] items-start gap-2.5 absolute top-[1818px] left-[124px]">
        {reviewCards.map((review, index) => (
          <div
            key={index}
            className={`flex flex-col w-[270px] items-start gap-[70px] p-[25px] relative rounded-[10px] border border-solid ${
              review.isCosmetologist
                ? "border-[#e40646] h-[213px] justify-between gap-0"
                : "border-[#bababa]"
            }`}
          >
            <div
              className={`flex flex-col items-start gap-[21px] relative ${review.isCosmetologist ? "self-stretch w-full" : ""} flex-[0_0_auto]`}
            >
              <div
                className={`flex flex-col items-start gap-[11px] relative ${review.isCosmetologist ? "self-stretch w-full" : ""} flex-[0_0_auto]`}
              >
                {review.isCosmetologist && (
                  <div className="inline-flex items-center gap-[5px] px-2.5 py-[3px] relative flex-[0_0_auto] bg-[#e40646] rounded-[10px]">
                    <img
                      className="relative w-[15px] h-[15px]"
                      alt="Bold like medal"
                      src="/figmaAssets/bold---like---medal-ribbons-star.svg"
                    />
                    <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-ffffff text-[10px] tracking-[0] leading-[11.5px] whitespace-nowrap">
                      Косметолог рекомендует
                    </div>
                  </div>
                )}
                <div
                  className={`flex items-center justify-between relative ${review.isCosmetologist ? "self-stretch w-full" : "self-stretch w-full"} flex-[0_0_auto]`}
                >
                  <div className="relative w-[118px] mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
                    {review.name}
                  </div>
                  <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                    {review.date}
                  </div>
                </div>
                {/* Stars */}
                <div className="inline-flex items-center relative flex-[0_0_auto]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="inline-flex items-center relative flex-[0_0_auto]"
                    >
                      <img
                        className="relative w-[15px] h-[15px]"
                        alt="Vuesax bold ranking"
                        src="/figmaAssets/vuesax-bold-ranking.svg"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-fit [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                {review.text}
              </div>
            </div>
            <div className="inline-flex items-center gap-[17px] relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <img
                  className="relative w-[13px] h-[13px]"
                  alt="Outline like like"
                  src={review.likeIcon}
                />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  {review.likes}
                </div>
              </div>
              <div className="inline-flex items-end gap-1 relative flex-[0_0_auto]">
                <img
                  className="relative w-[13px] h-[13px]"
                  alt="Outline like dislike"
                  src={review.dislikeIcon}
                />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-bababa text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
                  {review.dislikes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* All reviews button */}
      <div className="flex w-[181px] items-center justify-between pl-6 pr-[18px] py-[15px] absolute top-[2080px] left-[124px] bg-[#ececec] rounded-[10px] cursor-pointer">
        <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#3c3c50] text-[13px] tracking-[0] leading-[14.9px] whitespace-nowrap">
          ВСЕ ОТЗЫВЫ
        </div>
        <img
          className="relative w-5 h-5"
          alt="Arrow right"
          src="/figmaAssets/arrow-right-6.svg"
        />
      </div>
      {/* Новинки section */}
      <div className="inline-flex items-center gap-[15px] absolute top-[2307px] left-20">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6 whitespace-nowrap">
          Новинки
        </div>
      </div>
      {/* See all products link */}
      <div className="inline-flex items-center gap-[3px] absolute top-[2311px] left-[1338px]">
        <div className="justify-center gap-2.5 px-0 py-0.5 border-b [border-bottom-style:solid] border-black inline-flex items-center relative flex-[0_0_auto] cursor-pointer">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px] whitespace-nowrap">
            СМОТРЕТЬ ВСЕ ТОВАРЫ
          </div>
        </div>
        <img
          className="relative w-4 h-4"
          alt="Arrow right"
          src="/figmaAssets/arrow-right-4.svg"
        />
      </div>
      {/* New products grid */}
      <div className="flex gap-[13px] absolute top-[2400px] left-20">
        {newProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col w-[340px] items-center gap-1.5 bg-white"
          >
            <div className="relative self-stretch w-full h-[341px]">
              <img
                className={product.imgClass}
                alt={product.name}
                src={product.image}
              />
              <div
                className={`absolute top-0 left-0 ${product.badgeBg} inline-flex items-center justify-center gap-[3px] px-[9px] py-1 rounded-[5px]`}
              >
                <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                  {product.badge}
                </div>
              </div>
              <img
                className="absolute top-[276px] left-[276px] w-[50px] h-[50px]"
                alt="Shopping bag"
                src="/figmaAssets/shopping-bag.svg"
              />
            </div>
            <div className="flex flex-col items-start gap-[15px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-[7px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                  <img
                    className="relative w-3.5 h-3.5"
                    alt="Bold essentional UI"
                    src="/figmaAssets/bold---essentional--ui---check-circle.svg"
                  />
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#78b72a] text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
                    В наличии
                  </div>
                </div>
                <div className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base tracking-[0] leading-[18.4px]">
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
      {/* Arrow right for new products */}
      <img
        className="absolute top-[2560px] left-[1506px] w-[34px] h-[34px]"
        alt="Arrow right"
        src="/figmaAssets/arrow-right.svg"
      />
      {/* Arrow left for new products */}
      <img
        className="absolute top-[2560px] left-[63px] w-[34px] h-[34px]"
        alt="Arrow right"
        src="/figmaAssets/arrow-right-1.svg"
      />
      {/* Benefits banner */}
      <img
        className="absolute top-[2974px] left-[calc(50.00%_-_567px)] w-[1134px] h-[122px]"
        alt="Frame"
        src="/figmaAssets/frame-71.svg"
      />
      <div className="absolute top-[3128px] left-[212px] w-[164px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base text-center tracking-[-0.80px] leading-[17.6px]">
        Пробники <br />с каждой покупкой
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
      {/* Social media section background */}
      <div className="absolute top-[3290px] left-[462px] w-[1118px] h-[207px] rounded-[10px] bg-[linear-gradient(128deg,rgba(248,248,251,1)_0%,rgba(229,229,235,1)_100%)]" />
      {/* Footer dark panel */}
      <div className="absolute top-[3290px] left-5 w-[427px] h-[573px] bg-[#3c3c50] rounded-[10px]" />
      {/* Footer light panel */}
      <div className="absolute top-[3510px] left-[462px] w-[1118px] h-[353px] bg-[#f7f7fb] rounded-[10px]" />
      {/* Social section text */}
      <div className="absolute top-[3363px] left-[514px] w-[445px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-[25px] tracking-[-1.25px] leading-6">
        Следите за спец предложениями, новостями и акциями в наших социальных
        сетях
      </div>
      {/* Phone image */}
      <img
        className="absolute top-[3290px] left-[832px] w-[253px] h-[207px]"
        alt="Ntktajy d hert"
        src="/figmaAssets/ntktajy-d-hert-1.png"
      />
      {/* Social buttons */}
      <div className="inline-flex items-start justify-center gap-[9px] absolute top-[3375px] left-[1113px]">
        {socialButtons.map((btn) => (
          <div
            key={btn.label}
            className="gap-[15px] pl-[25px] pr-[33px] py-3 bg-white rounded-[500px] inline-flex items-center relative flex-[0_0_auto] cursor-pointer"
          >
            <img
              className="relative w-[23px] h-[23px]"
              alt={btn.label}
              src={btn.icon}
            />
            <div className="relative w-fit [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-x-3c-3c-50 text-[13px] tracking-[0] leading-[14.9px] whitespace-nowrap">
              {btn.label}
            </div>
          </div>
        ))}
      </div>
      {/* Footer logo */}
      <img
        className="absolute top-[3349px] left-[54px] w-[212px] h-[54px]"
        alt="Element"
        src="/figmaAssets/--------07-2.svg"
      />
      {/* Footer professional cosmetics text */}
      <div className="absolute top-[3431px] left-[79px] w-[163px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-sm tracking-[0] leading-[16.1px]">
        ПРОФЕССИОНАЛЬНАЯ КОСМЕТИКА
      </div>
      {/* Footer phone */}
      <div className="absolute top-[3648px] left-[78px] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-ffffff text-[21px] tracking-[0] leading-[24.1px] whitespace-nowrap">
        8 (800) 600-73-82
      </div>
      {/* Footer address label */}
      <div className="absolute top-[3697px] left-[81px] w-[200px] opacity-30 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-ffffff text-sm tracking-[0] leading-[16.1px]">
        АДРЕС
      </div>
      {/* Footer address text */}
      <div className="absolute top-[3726px] left-[calc(50.00%_-_720px)] w-[303px] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-ffffff text-xs tracking-[0] leading-[13.8px]">
        <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[13.8px]">
          630559, Новосибирская область, р.п. Кольцово, пр-кт Академика
          Сандахчиева, зд.13. E-mail:{" "}
        </span>
        <a
          href="mailto:web@angiopharm.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="underline">web@angiopharm.com</span>
        </a>
        <span className="[font-family:'Cera_Pro-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[13.8px]">
          . ОГРН: 1175476080900
        </span>
      </div>
      {/* Footer navigation columns */}
      <div className="flex w-[1006px] items-start justify-between absolute top-[3558px] left-[514px]">
        {footerColumns.map((col) => (
          <div
            key={col.title}
            className="flex flex-col w-[200px] items-start gap-[23px] relative"
          >
            <div className="relative self-stretch mt-[-1.00px] opacity-50 [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-sm tracking-[0] leading-[16.1px]">
              {col.title}
            </div>
            {col.links.map((link) => (
              <div
                key={link}
                className="relative self-stretch [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-[#3c3c50] text-base tracking-[0] leading-[18.4px] cursor-pointer"
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Footer copyright */}
      <div className="absolute top-[3835px] left-[calc(50.00%_-_719px)] [font-family:'Cera_Pro-Regular',Helvetica] font-normal text-ffffff text-xs tracking-[0] leading-[13.8px] whitespace-nowrap">
        <a
          href="http://angiopharm.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="text-white underline">Ангиофарм</span>
        </a>
        <span className="text-white"> © ООО ЛАБОРАТОРИЯ АНГИОФАРМ, 2026</span>
      </div>
      {/* Payment icons */}
      <div className="inline-flex items-center gap-3.5 absolute top-[3784px] left-[79px]">
        <div className="relative w-[52.16px] h-[35.69px]">
          <img
            className="absolute w-[81.07%] h-[32.32%] top-[35.00%] left-[8.62%]"
            alt="Combined shape"
            src="/figmaAssets/combined-shape-1.svg"
          />
          <img
            className="absolute w-[23.83%] h-[13.35%] top-[35.01%] left-[66.49%]"
            alt="Path"
            src="/figmaAssets/path24.svg"
          />
        </div>
        <div className="relative w-[52.16px] h-[35.69px]">
          <img
            className="absolute w-[10.82%] h-[35.00%] top-[33.58%] left-[37.74%]"
            alt="Polygon"
            src="/figmaAssets/polygon9.svg"
          />
          <img
            className="absolute w-[19.97%] h-[36.16%] top-[32.95%] left-[48.56%]"
            alt="Path"
            src="/figmaAssets/path11.svg"
          />
          <img
            className="absolute w-[23.89%] h-[35.00%] top-[33.58%] left-[67.08%]"
            alt="Path"
            src="/figmaAssets/path13.svg"
          />
          <img
            className="absolute w-[30.44%] h-[34.96%] top-[33.58%] left-[8.78%]"
            alt="Combined shape"
            src="/figmaAssets/combined-shape.svg"
          />
        </div>
        <div className="relative w-[52.16px] h-[35.69px]">
          <img
            className="absolute top-[5px] left-2.5 w-[33px] h-[25px]"
            alt="Group"
            src="/figmaAssets/group.png"
          />
        </div>
        <img
          className="relative w-[50.33px] h-[20.13px]"
          alt="Sbp logo"
          src="/figmaAssets/sbp-logo-1.svg"
        />
        <div className="relative w-[47.58px] h-[24.71px] overflow-hidden">
          <img
            className="absolute w-[37.66%] h-[70.00%] top-[15.00%] left-0"
            alt="Vector"
            src="/figmaAssets/vector-2.svg"
          />
          <div className="absolute w-[60.94%] h-[40.47%] top-[45.00%] left-[46.75%] [font-family:'Cera_Pro-Medium',Helvetica] font-medium text-[#d7d7d7] text-[5.5px] tracking-[0] leading-[5.5px]">
            Расчетный
            <br />
            счет
          </div>
        </div>
      </div>
      {/* Arrow right at bottom */}
      <img
        className="absolute top-[3863px] left-[1506px] w-[34px] h-[21px]"
        alt="Arrow right"
        src="/figmaAssets/arrow-right.svg"
      />
    </div>
  );
};
