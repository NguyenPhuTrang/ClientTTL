import { OptionGroup } from "./types";

const arrayData = [
    {
        icon: "./icons/ic-prison.svg",
        title: "4pt grid system",
        description: "Base on 4pt grid system. Our UI kit help you create perfect white space"
    },
    {
        icon: "./icons/ic-dropper.svg",
        title: "Color style",
        description: "All color in OpenArt are styled. You can change all design color with one click"
    },
    {
        icon: "./icons/ic-text_color.svg",
        title: "Free font",
        description: "OpenArt use Epilogue font family Available with open licence in gooogle font"
    },
    {
        icon: "./icons/ic-toggle_on.svg",
        title: "Darkmode avaiable",
        description: "Our UI Kit support darkmode Chage your design to dark mode with one click"
    },
    {
        icon: "./icons/ic-design.svg",
        title: "Easy to customize",
        description: "Create any design with OpenArt UI kits"
    },
    {
        icon: "./icons/ic-four_squares.svg",
        title: "Variant components",
        description: "All component art variant, easy to design, easy to control"
    }
];

const dataDropdown: OptionGroup[] = [
    {
        label: 'SORT PRICE',
        options: [
            {
                title: 'Low to high',
            },
            {
                title: 'High to low',
            }
        ]
    },
    {
        label: 'SORT RATING',
        options: [
            {
                title: '2 stars',
            },
            {
                title: '3 stars',
            },
            {
                title: '4 stars'
            },
            {
                title: '5 stars'
            }
        ]
    },
    {
        label: 'SALE SORT',
        options: [
            {
                title: 'Yes',
            },
            {
                title: 'No',
            }
        ]
    },
];

const dataProductList = [
    {
        image: "./images/product1.png",
        description: "Vintage Typewriter to post awesome stories about UI design and webdev. Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: "49.50",
        additional: "Eligible for Shipping To Mars or somewhere else",
        ratingStar: "4.05",
        delivery: 'Fast delivery',
        useless: 'Useless first',
        condition: 'New'
    },
    {
        image: "./images/product2.png",
        description: "Lee Pucker design. Leather botinki for handsome designers. Free shipping.",
        price: "13.95",
        additional: "1258 bids, 359 watchers $5.95 for shipping",
        ratingStar: "4.56",
        delivery: 'Express delivery',
        useless: 'Useless second',
        condition: 'New'
    },
    {
        image: "./images/product3.png",
        description: "Timesaving kitten to save months on development. Playful, cute, cheap!",
        price: "128.99",
        additional: "Wordwide shitting available Buyers protection possible!",
        ratingStar: "4.87",
        delivery: 'Fast delivery',
        useless: 'Useless second',
        condition: 'Old'
    },
    {
        image: "./images/product4.png",
        description: "Plastic useless plugs and tubes for high-fidelity prototyping. Fit & Eat!",
        price: "12.48",
        additional: "Wordwide shitting available Buyers protection possible!",
        ratingStar: "4.99",
        delivery: 'Fast delivery',
        useless: 'Useless first',
        condition: 'Old'
    },
    {
        image: "./images/product1.png",
        description: "Plastic useless plugs and tubes for high-fidelity prototyping. Fit & Eat!",
        price: "12.48",
        additional: "Wordwide shitting available Buyers protection possible!",
        ratingStar: "4.99",
        delivery: 'Express delivery',
        useless: 'Useless second',
        condition: 'New'
    },
    {
        image: "./images/product2.png",
        description: "Modern Wireless Keyboard and Mouse Combo. Sleek and stylish design.",
        price: "34.99",
        additional: "Connects seamlessly to all devices.",
        ratingStar: "4.25",
        delivery: 'Free shipping',
        useless: 'Useless first',
        condition: 'Old'
    },
];

const products = [
    {
        name: 'Sản phẩm 1',
        price: '$6,000',
        quantity: '1',
        description: 'Lorem ipsum dolor sit amet',
        image: '../images/product-table-1.png',
    },
    {
        name: 'Sản phẩm 2',
        price: '$5,000',
        quantity: '3',
        description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
        image: '../images/product-table-2.png',
    },
    {
        name: 'Sản phẩm 3',
        price: '$40,000',
        quantity: '6',
        description: 'Lorem ipsum dolor sit amet',
        image: '../images/product-table-3.png',
    },
];

const users = [
    {
        avatar: '../images/user1.png',
        name: 'Dianne Russell',
        email: 'nevaeh.simmons@example.com',
        birthday: '1989/04/06',
        numberPhone: '063-222-1125',
    },
    {
        avatar: '../images/user2.png',
        name: 'Leslie Alexander',
        email: 'curtis.weaver@example.com',
        birthday: '1976/09/12',
        numberPhone: '088-124-1555',
    },
    {
        avatar: '../images/user3.png',
        name: 'Wade Warren',
        email: 'debbie.baker@example.com',
        birthday: '1954/02/08',
        numberPhone: '063-137-3355',
    },
];

const listButton = [
    'worldwide shipping',
    'under $50',
    'kitten',
    'plastic plugs',
    'pucker shoes',
    'vintage typewriter'
];
const listBanner = [
    {
        image: './images/banner1.png',
        title: 'Clear & Usable user flows',
        description: 'Let’s boost yout marketplace'
    },
    {
        image: './images/banner2.png',
        title: 'Clear & Usable user flows',
        description: 'Let’s boost yout marketplace'
    },
    {
        image: './images/banner3.png',
        title: 'Clear & Usable user flows',
        description: 'Let’s boost yout marketplace'
    }
];

const categorysHeader = [
    {
        active: true,
        icon: './icons/ic-hanger.svg',
        title: 'Clothing & Shoes',
    },
    {
        active: false,
        icon: './icons/ic-cinema.svg',
        title: 'Entertainment',
    },
    {
        active: false,
        icon: './icons/ic-concert.svg',
        title: 'Music',
    },
    {
        active: false,
        icon: './icons/ic-fitness.svg',
        title: 'Sport & Lifestyle',
    },
    {
        active: false,
        icon: './icons/ic-pets.svg',
        title: 'Pets',
    },
    {
        active: false,
        icon: './icons/ic-restaraunt.svg',
        title: 'Kitchen Accessories',
    },
    {
        active: false,
        icon: './icons/ic-observation.svg',
        title: 'Travel Equipment',
    },
    {
        active: false,
        icon: './icons/ic-barley.svg',
        title: 'Growing & Garden',
    },
    {
        active: false,
        icon: './icons/ic-powerstation.svg',
        title: 'Electrical Tools',
    },
    {
        active: false,
        icon: './icons/ic-babysitter.svg',
        title: 'Mother Care',
    },
    {
        active: false,
        icon: './icons/ic-nuclear-station.svg',
        title: 'Toys & Entertainment',
    },
    {
        active: false,
        icon: './icons/ic-ship-wheel.svg',
        title: 'Vintage',
    },
]

const optionFilter = [
    {
        title: 'Collapsed filters',
        options: [
            {
                title: 'Brand New',
            },
            {
                title: 'Used',
            },
            {
                title: 'Refurbished',
            },
            {
                title: 'Open Box'
            },
            {
                title: 'Clearance'
            }
        ]
    },
    {
        title: 'Expanded Filters',
        options: [
            {
                title: 'Recommended',
            },
            {
                title: 'Recently Added',
            },
            {
                title: 'Expiring Soon',
            },
            {
                title: 'Most Rated'
            },
            {
                title: 'Price: Low → High'
            },
            {
                title: 'Price: High → Low'
            },
        ]
    },
    {
        title: 'Year of manufacturing',
        options: [
            {
                title: '1954',
            },
            {
                title: '1955',
            },
            {
                title: '1956',
            },
            {
                title: '1957',
            },
            {
                title: '1958',
            },
            {
                title: '1959',
            },
            {
                title: '1960',
            },
            {
                title: '1961',
            },
            {
                title: '1962-2020',
            },

        ]
    }
];

export { arrayData, dataDropdown, dataProductList, products, users, listButton, listBanner, categorysHeader, optionFilter };