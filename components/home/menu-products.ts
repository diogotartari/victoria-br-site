export type MenuProduct = {
  id: string;
  title: string;
  image: string;
  alt: string;
  whatsappLabel: string;
};

export const MENU_PRODUCTS: MenuProduct[] = [
  {
    id: "coxinha",
    title: "Coxinha Premium",
    image: "/coxinha.png",
    alt: "Coxinha premium dourada",
    whatsappLabel: "Coxinha Premium",
  },
  {
    id: "bolinha",
    title: "Bolinha de Queijo",
    image: "/bolinha.png",
    alt: "Bolinha de queijo crocante",
    whatsappLabel: "Bolinha de Queijo",
  },
  {
    id: "kibe",
    title: "Kibe Especial",
    image: "/kibe.png",
    alt: "Kibe dourado",
    whatsappLabel: "Kibe Especial",
  },
  {
    id: "pastel",
    title: "Pastel Artesanal",
    image: "/pastel.png",
    alt: "Pastel artesanal",
    whatsappLabel: "Pastel Artesanal",
  },
  {
    id: "empada",
    title: "Empada de Frango",
    image: "/empada.png",
    alt: "Empada de frango",
    whatsappLabel: "Empada de Frango",
  },
];
