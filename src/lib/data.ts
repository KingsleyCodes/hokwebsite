export const testimonials = [
  {
    name: "Orlando Diggs",
    role: "Position, Company name",
    image: "/testimonial-img.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
  },
  {
    name: "Mollie Hall",
    role: "Position, Company name",
    image: "/testimonial-img.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
  },
  {
    name: "Lori Bryson",
    role: "Position, Company name",
    image: "/testimonial-img.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
  },
  {
    name: "Lori Bryson",
    role: "Position, Company name",
    image: "/testimonial-img.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
  },
  {
    name: "Lori Bryson",
    role: "Position, Company name",
    image: "/testimonial-img.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
  },
];

export const AccordionContentList = [
  {
    id: "1",
    title: "How do i place an order?",
    content:
      "Simply browse our products, add your favorites to your cart, and check out! You’ll receive a confirmation email once your order is placed.",
  },
  {
    id: "2",
    title: " Can I change or cancel my order after placing it?",
    content:
      "If your order hasn’t been shipped yet, you can request changes or cancellations. Please contact us ASAP!",
  },
  {
    id: "3",
    title: " How can I track my order?",
    content:
      "Once your order is shipped, you’ll receive a tracking link via email/SMS. You can also track it from your Order History in your account.",
  },
  {
    id: "4",
    title: " Do you offer wholesale pricing?",
    content:
      " Yes! We have a dedicated Wholesale Section with special bulk pricing for B2B buyers. Contact us for details.",
  },
  {
    id: "5",
    title: "Where do you deliver?",
    content: "We deliver nationwide across Nigeria! 🚀",
  },
  {
    id: "6",
    title: " How long does delivery take?",
    content: "Lagos: 1-3 working days\nOther states: 3-7 working days",
  },
  {
    id: "7",
    title: " How much is delivery?",
    content: "Delivery fees depend on your location and will be calculated at checkout.",
  },
  {
    id: "8",
    title: "Can I pay on delivery?",
    content:
      "Currently, we only offer prepaid orders to ensure a smooth and secure shopping experience.",
  },
  {
    id: "9",
    title: "What payment options do you accept?",
    content:
      "We accept debit/credit cards, bank transfers, mobile money, and Flutterwave/Paystack payments.",
  },
  {
    id: "10",
    title: " Do you accept returns?",
    content:
      "For hygiene reasons, we do not accept returns on opened skincare products. However, if you receive a damaged or incorrect item, please contact us within 24 hours for a resolution.",
  },
  {
    id: "11",
    title: "Are your products 100% authentic?",
    content:
      "Yes! We source directly from Korean brands & authorized distributors—no fakes, no shortcuts.",
  },
  {
    id: "12",
    title: "How do I know which products are right for my skin?",
    content:
      "Take our Personalized Skin Quiz to get the best recommendations for your skin type and concerns!",
  },
  {
    id: "13",
    title: " Do you sell skin-lightening products?",
    content:
      "No. We believe in healthy, radiant skin, not bleaching. Our products focus on hydration, repair, and glow—not altering your natural skin tone.",
  },
  {
    id: "14",
    title: "Can I purchase an HOK Gift Card?",
    content:
      "Yes! We offer digital Gift Cards in different amounts, perfect for birthdays or skincare lovers..",
  },
];

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    emoji: string;
  }[];
}

export const Questions: Question[] = [
  {
    id: 1,
    question:
      "How does your skin feel after washing with a gentle cleanser (before applying moisturizer)?",
    options: [
      { text: "Tight & dry", emoji: "🍂" },
      { text: "Comfortable, neither oily nor dry", emoji: "😌" },
      { text: "Oily all over the face", emoji: "" },
    ],
  },
  {
    id: 2,
    question: "How often does your skin get shiny throughout the day?",
    options: [
      { text: "Rarely, mostly feels dry", emoji: "🌿" },
      { text: "Only my T-zone gets shiny", emoji: "✨" },
      { text: "Always shiny everywhere", emoji: "💦" },
    ],
  },
  {
    id: 3,
    question: "Do you experience flakiness or rough patches?",
    options: [
      { text: "Yes, often", emoji: "😔" },
      { text: "Occasionally", emoji: "😕" },
      { text: "Never", emoji: "🚀" },
    ],
  },
  {
    id: 4,
    question: "How visible are your pores?",
    options: [
      { text: "Small and barely visible", emoji: "🔍" },
      { text: "Medium-sized, noticeable in T-zone", emoji: "" },
      { text: "Large and noticeable everywhere", emoji: "" },
    ],
  },
  {
    id: 5,
    question: "How does your skin react to new products?",
    options: [
      { text: "Often sensitive, gets irritated easily", emoji: "" },
      { text: "Usually fine, but occasional breakouts", emoji: "" },
      { text: "Rarely reacts to anything", emoji: "" },
    ],
  },
];
