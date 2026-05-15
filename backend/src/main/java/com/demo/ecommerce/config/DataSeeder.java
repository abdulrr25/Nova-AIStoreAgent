package com.demo.ecommerce.config;

import com.demo.ecommerce.model.Category;
import com.demo.ecommerce.model.Product;
import com.demo.ecommerce.repository.CategoryRepository;
import com.demo.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    // Portrait-crop Unsplash helper — enforces 3:4 ratio, high quality
    private static String img(String photoId) {
        return "https://images.unsplash.com/photo-" + photoId
                + "?w=600&h=800&fit=crop&crop=entropy&auto=format&q=80";
    }

    @Override
    public void run(String... args) {
        // Re-seed whenever products are fewer than 100
        if (productRepository.count() >= 100) return;
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        // ── Categories ───────────────────────────────────────────────────────
        Category electronics = save("Electronics",   "Gadgets and devices");
        Category clothing    = save("Clothing",       "Fashion and apparel");
        Category books       = save("Books",          "Books and literature");
        Category home        = save("Home & Kitchen", "Home essentials");
        Category sports      = save("Sports",         "Sports and fitness");

        // ── Electronics (22 products) ────────────────────────────────────────
        productRepository.saveAll(List.of(
            p("iPhone 15 Pro",                 "Apple iPhone 15 Pro with A17 Bionic chip, 48 MP triple camera system and titanium frame.",                         119999, 20, img("1695048133142-1a20484bce71"), electronics, null,           "Black Titanium,White Titanium,Blue Titanium,Natural Titanium"),
            p("Samsung Galaxy S24 Ultra",       "200 MP camera, Snapdragon 8 Gen 3, built-in S Pen for pro-level performance.",                                    134999, 15, img("1610945265064-0e34e5519bbf"), electronics, null,           "Titanium Gray,Titanium Black,Titanium Violet,Titanium Yellow"),
            p("Sony WH-1000XM5 Headphones",    "Industry-leading noise cancellation with 30-hour battery life.",                                                   29999,  30, img("1505740420928-5e560c06d30e"), electronics, null,           "Black,Silver,Midnight Blue"),
            p("MacBook Air M3",                 "Apple M3 chip, 13.6-inch Liquid Retina display, 18-hour battery.",                                                119900, 12, img("1496181133206-80ce9b88a853"), electronics, null,           "Midnight,Starlight,Space Gray,Sky Blue"),
            p("iPad Pro 12.9\"",               "M2 chip, Liquid Retina XDR display, perfect for creative professionals.",                                         109900, 18, img("1544244015-0df4cec337a0"), electronics, null,           "Space Gray,Silver"),
            p("Apple Watch Series 9",           "Advanced health sensors, Always-On Retina display, crash detection.",                                              41900,  25, img("1579586337278-3befd40fd17a"), electronics, null,           "Midnight,Starlight,Pink,Red,Silver"),
            p("Google Pixel 9 Pro",             "Google's flagship with Magic Eraser, 50 MP wide and 48 MP ultrawide cameras.",                                    109999, 14, img("1598327105854-0d9e8eadab53"), electronics, null,           "Obsidian,Porcelain,Wintergreen,Rose Quartz"),
            p("OnePlus 12",                     "Hasselblad camera, 100 W SUPERVOOC fast charging, Snapdragon 8 Gen 3.",                                           64999,  22, img("1607936854279-55e8a4c64888"), electronics, null,           "Silky Black,Flowy Emerald"),
            p("Dell XPS 15 Laptop",             "Intel Core i9, 32 GB RAM, 1 TB SSD, 4K OLED touch display.",                                                     189999,  8, img("1593642632559-0c6d3fc62b89"), electronics, null,           "Platinum Silver,Frost White"),
            p("LG OLED C3 55\" TV",            "Evo OLED panel, Dolby Vision, 120 Hz refresh rate, Google TV.",                                                   149999, 10, img("1593784991095-a205069470b6"), electronics, null,           "Black"),
            p("Sony PlayStation 5",             "Next-gen gaming with DualSense haptic feedback and lightning-fast SSD.",                                           54990,  20, img("1606813907291-d87ae6573796"), electronics, null,           "White"),
            p("Nintendo Switch OLED",           "7-inch OLED screen, enhanced audio, play at home or on the go.",                                                  29999,  35, img("1578303512547-95c0459fa8c0"), electronics, null,           "White,Neon Blue & Red"),
            p("GoPro Hero 12 Black",            "5.3 K video, HyperSmooth 6.0 stabilisation, waterproof to 10 m.",                                                39990,  18, img("1526170375885-4d8ecf77b99f"), electronics, null,           "Black"),
            p("Canon EOS R50 Camera",           "24.2 MP APS-C sensor, 4K video, ideal for content creators.",                                                     69990,  11, img("1516035069371-29a1b244cc32"), electronics, null,           "Black,White"),
            p("Bose QuietComfort 45",           "World-class noise cancellation with crisp, clear audio.",                                                          24900,  28, img("1545127398-14699f92334b"), electronics, null,           "Black,White Smoke,Eclipse Gray"),
            p("JBL Flip 6 Speaker",             "Portable waterproof Bluetooth speaker, 12-hour playtime.",                                                         9999,  45, img("1608043152269-423dbba4e7e1"), electronics, null,           "Black,Blue,Red,Teal,Squad"),
            p("Kindle Paperwhite 2024",         "6.8-inch glare-free display, 3-month battery, waterproof design.",                                                13999,  40, img("1491841573634-28140fc7ced7"), electronics, null,           "Black,Denim,Agave"),
            p("Xiaomi Mi Band 8",               "1.62-inch AMOLED display, 16-day battery, 150+ workout modes.",                                                    3999,  60, img("1575311373937-040b8e1fd5b6"), electronics, null,           "Black,Orange,Blue,Pink"),
            p("Logitech MX Master 3S Mouse",    "8K DPI sensor, ergonomic design, works on any surface.",                                                           8995,  32, img("1527864550417-7fd91fc51a46"), electronics, null,           "Graphite,Pale Gray,Rose"),
            p("Samsung 65\" QLED 4K TV",       "Quantum Dot technology, 100% color volume, Motion Xcelerator.",                                                   129999,  7, img("1574375927938-d5a98e8ffe85"), electronics, null,           "Black"),
            p("Asus ROG Gaming Laptop",         "RTX 4070, AMD Ryzen 9, 16 GB RAM, 144 Hz display.",                                                              159999,  9, img("1603302576837-37561b2e2302"), electronics, null,           "Eclipse Gray"),
            p("Sony Alpha A7 IV",               "33 MP full-frame mirrorless camera, 4K 60 fps video, 10 fps burst.",                                             269990,  6, img("1471341971476-ae15ff5dd4ea"), electronics, null,           "Black")
        ));

        // ── Clothing (22 products) ───────────────────────────────────────────
        productRepository.saveAll(List.of(
            p("Nike Air Max 270",               "Men's lifestyle shoe with Max Air unit for all-day comfort.",                                                       12999, 50, img("1542291026-7eec264c27ff"), clothing, "6,7,8,9,10,11,12",     "Black/White,White/Red,Triple Black,Volt"),
            p("Levi's 512 Slim Taper Jeans",   "Slim fit jeans that taper below the knee, authentic stretch denim.",                                                3999,  40, img("1542272604-787c3835535d"), clothing, "28,30,32,34,36,38",     "Indigo,Black,Stone Wash,Grey"),
            p("Premium Oversized Hoodie",       "400 gsm cotton fleece, dropped shoulders, kangaroo pocket.",                                                        1999,  60, img("1556821840-3a63f15732ce"), clothing, "XS,S,M,L,XL,XXL",      "Ash Grey,Black,Cream,Olive,Navy"),
            p("Adidas Tiro Track Jacket",       "Moisture-wicking fabric with iconic 3-stripes and full zip.",                                                       3499,  35, img("1591047139829-d91aecb6caea"), clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Red,Royal Blue"),
            p("Classic Polo Shirt",             "Premium pique cotton polo with embroidered logo, slim fit.",                                                         2499,  55, img("1562157873-818bc0726f68"), clothing, "XS,S,M,L,XL,XXL",      "White,Navy,Black,Red,Bottle Green"),
            p("Formal Blazer",                  "Structured single-breasted blazer in premium wool blend.",                                                           5999,  25, img("1507679799987-c73779587ccf"), clothing, "36,38,40,42,44,46",     "Navy,Charcoal,Black,Mid Grey"),
            p("Floral Summer Dress",            "Lightweight chiffon midi dress with floral print and adjustable straps.",                                            1799,  45, img("1585487000160-6ebcfceb0d03"), clothing, "XS,S,M,L,XL",          "Floral Blue,Floral Pink,Floral Yellow"),
            p("Puma Running Shorts",            "Ultralight dryCELL fabric with reflective details for night runs.",                                                  1299,  70, img("1506629082955-511b1aa562c8"), clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Red,Grey"),
            p("Under Armour Tech T-Shirt",      "Anti-odor technology, ultra-soft fabric, loose fit.",                                                                1499,  80, img("1521572163474-6864f9cf17ab"), clothing, "XS,S,M,L,XL,XXL,3XL",  "White,Black,Graphite,Red,Royal"),
            p("Woodland Trekking Boots",        "Genuine leather with waterproof lining and grip sole.",                                                              4999,  30, img("1490481651871-ab68de25d43d"), clothing, "6,7,8,9,10,11",         "Camel,Dark Brown,Olive"),
            p("Reebok Classic Sneakers",        "Timeless leather upper with EVA midsole for cushioning.",                                                            5999,  38, img("1608231387042-66d1773070a5"), clothing, "6,7,8,9,10,11,12",     "White,Black,Grey"),
            p("Chinos Slim Fit",                "Stretch cotton chinos with tapered leg and flat front.",                                                             2499,  42, img("1473966968600-fa801b869a1a"), clothing, "28,30,32,34,36,38",     "Khaki,Olive,Navy,Black,Stone"),
            p("Oxford Formal Shirt",            "100% premium cotton, button-down collar, slim fit.",                                                                 1999,  50, img("1602810316498-ab67cf68c8e1"), clothing, "S,M,L,XL,XXL",          "White,Light Blue,Pink,Lavender"),
            p("Ethnic Kurti Set",               "Cotton printed kurti with palazzo, comfortable and stylish.",                                                         1599,  55, img("1583391733956-3750e0ff4e8b"), clothing, "XS,S,M,L,XL,XXL,3XL",  "Teal,Coral,Indigo,Marigold"),
            p("Handloom Kurta",                 "Pure cotton handloom kurta with natural dye prints.",                                                                 1899,  40, img("1609748340878-e3ac5f3f4d5f"), clothing, "S,M,L,XL,XXL",          "White,Beige,Indigo,Rust"),
            p("Snapback Cap",                   "100% cotton twill, adjustable snap closure, embroidered logo.",                                                        799,  90, img("1588850561407-ed78c282e89b"), clothing, "Free Size",             "Black,White,Navy,Olive,Red"),
            p("Leather Bomber Jacket",          "Genuine lamb leather with ribbed cuffs and waistband.",                                                              8999,  20, img("1551028719-00167b16eac5"), clothing, "XS,S,M,L,XL,XXL",      "Black,Dark Brown,Tan"),
            p("Raw Denim Jacket",               "Selvedge denim jacket with copper rivets and button front.",                                                          3499,  30, img("1576871337622-98d48d1cf531"), clothing, "XS,S,M,L,XL,XXL",      "Indigo,Black,Light Wash"),
            p("Cargo Pants",                    "Multi-pocket cargo trousers in ripstop nylon fabric.",                                                               2199,  45, img("1517445312882-bc9910d016b7"), clothing, "28,30,32,34,36,38",     "Khaki,Olive,Black,Grey"),
            p("Chelsea Ankle Boots",            "Genuine suede Chelsea boots with elastic side panels.",                                                               5499,  22, img("1543163521-1bf539c55dd2"), clothing, "6,7,8,9,10,11",         "Black Suede,Tan Suede,Grey Suede"),
            p("Compression Leggings",           "High-waist 4-way stretch leggings with moisture control.",                                                            1499,  65, img("1527432537166-8ee52db3e07a"), clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Burgundy,Slate Blue"),
            p("Linen Shirt",                    "Breathable linen shirt, relaxed fit, perfect for summer.",                                                            1899,  48, img("1563630423918-b58f07336ac9"), clothing, "XS,S,M,L,XL,XXL",      "White,Sky Blue,Beige,Sage Green")
        ));

        // ── Books (22 products) ──────────────────────────────────────────────
        productRepository.saveAll(List.of(
            p("Atomic Habits",                  "James Clear's definitive guide to building good habits and breaking bad ones.",                                        399, 100, img("1592496431122-2349e0fbc666"), books, null, null),
            p("The Alchemist",                  "Paulo Coelho's mystical story of Santiago's journey to find treasure.",                                               299,  80, img("1544947950-fa07a98d237f"), books, null, null),
            p("Clean Code",                     "Robert C. Martin's handbook of agile software craftsmanship.",                                                         899,  45, img("1515879218367-8466d910aaa4"), books, null, null),
            p("Rich Dad Poor Dad",              "Robert Kiyosaki on financial education and building wealth.",                                                           349,  90, img("1553729459-efe14ef6055d"), books, null, null),
            p("The Psychology of Money",        "Morgan Housel on how people think about money and investing.",                                                          449,  75, img("1621264448270-9ef00e88a935"), books, null, null),
            p("Deep Work",                      "Cal Newport's rules for focused success in a distracted world.",                                                        499,  60, img("1506880018603-83d5b814b5a6"), books, null, null),
            p("Sapiens",                        "Yuval Noah Harari's brief history of humankind from apes to civilisation.",                                             549,  70, img("1481627834876-b7833e8f5570"), books, null, null),
            p("1984",                           "George Orwell's chilling dystopian masterpiece about Big Brother.",                                                     249,  85, img("1509021436665-8f07dbf5bf1d"), books, null, null),
            p("The Great Gatsby",               "F. Scott Fitzgerald's iconic novel of the Jazz Age and the American Dream.",                                            199,  70, img("1495640388908-05fa85288e61"), books, null, null),
            p("Harry Potter Box Set (7 Books)", "The complete magical series by J.K. Rowling in a collector's box set.",                                               2499,  30, img("1589998059171-988d887df646"), books, null, null),
            p("The Pragmatic Programmer",       "Andrew Hunt & David Thomas on becoming a better software developer.",                                                   999,  40, img("1537432376769-00f5c2f4c8d2"), books, null, null),
            p("Designing Data-Intensive Apps",  "Martin Kleppmann's bible on building reliable, scalable systems.",                                                     1299,  35, img("1558021212-51b6ecfa0db9"), books, null, null),
            p("Zero to One",                    "Peter Thiel on how startups can create new monopolies.",                                                               499,  55, img("1497633762265-9d179a990aa6"), books, null, null),
            p("Think and Grow Rich",            "Napoleon Hill's classic on the power of thought and perseverance.",                                                    299,  65, img("1519682337058-a94d519bcd9e"), books, null, null),
            p("Ikigai",                         "The Japanese secret to a long and happy life by Hector Garcia.",                                                       349,  80, img("1544716278-ca5e3f4abd8c"), books, null, null),
            p("The 48 Laws of Power",           "Robert Greene's guide to power, strategy and seduction.",                                                              599,  50, img("1612969308146-066d55f37ccb"), books, null, null),
            p("System Design Interview Vol. 1", "Alex Xu's guide to cracking system design questions at FAANG.",                                                       1199,  38, img("1516259762381-22954d7d3ad2"), books, null, null),
            p("JavaScript: The Good Parts",     "Douglas Crockford on the elegant subset of JavaScript.",                                                               799,  42, img("1592609931095-54a2168ae893"), books, null, null),
            p("The Lean Startup",               "Eric Ries on how today's entrepreneurs use continuous innovation.",                                                    499,  58, img("1455390582262-044cdead277a"), books, null, null),
            p("Dune",                           "Frank Herbert's epic science fiction saga of politics and religion.",                                                   449,  60, img("1531346878377-a5be20888e57"), books, null, null),
            p("Steve Jobs Biography",           "Walter Isaacson's definitive biography of Apple's visionary co-founder.",                                              649,  45, img("1467803738586-46b7eb7b16a9"), books, null, null),
            p("The Art of War",                 "Sun Tzu's 2500-year-old guide to strategy and leadership.",                                                            199,  95, img("1524995997946-a1bd659b37b3"), books, null, null)
        ));

        // ── Home & Kitchen (22 products) ─────────────────────────────────────
        productRepository.saveAll(List.of(
            p("Instant Pot Duo 7-in-1",         "Pressure cooker, slow cooker, rice cooker, steamer in one device.",                                                  7999,  25, img("1556909114-f6e7ad7d3136"), home, null, "Black,Silver"),
            p("Dyson V15 Detect Vacuum",        "Laser reveals microscopic dust, HEPA filtration, cordless design.",                                                  54900,  12, img("1558618666-fcd25c85cd64"), home, null, "Nickel/Yellow"),
            p("Philips Air Fryer XXL",          "2.65 kg capacity, rapid air technology, 90% less fat.",                                                               9999,  20, img("1585515320310-259814833e62"), home, null, "Black,Grey"),
            p("Philips Hand Blender",           "650 W motor, ProMix technology, dishwasher-safe attachments.",                                                         2999,  35, img("1570222094114-d054a817e56b"), home, null, "Black,White"),
            p("Prestige Mixer Grinder",         "750 W motor, 3 jars including chutney jar, 5-speed control.",                                                          3499,  28, img("1585771724684-38269d6639fd"), home, null, "White,Red"),
            p("Non-Stick Cookware Set 5pc",     "Hard anodised aluminium, PFOA-free coating, induction compatible.",                                                    4999,  22, img("1567538096630-e0c55bd6374c"), home, null, "Black"),
            p("Premium Cotton Bedsheet Set",    "400 TC Egyptian cotton, king size with 2 pillow covers.",                                                              2499,  40, img("1631049307264-da0ec9d70304"), home, null, "White,Ivory,Soft Grey,Sky Blue,Dusty Pink"),
            p("Wooden Coffee Table",            "Solid sheesham wood with storage shelf, natural finish.",                                                              7999,  15, img("1555041469-a586c61ea9bc"), home, null, "Natural Teak,Walnut"),
            p("Arc Floor Lamp",                 "Adjustable brightness, brushed steel, warm white LED bulb.",                                                           3499,  18, img("1507473885765-e6ed057f782c"), home, null, "Silver,Matte Black,Brass"),
            p("Floating Wall Shelf Set",        "Set of 3 MDF wall shelves, easy installation, load capacity 10 kg.",                                                   1499,  50, img("1558618047-f4e90e8cef30"), home, null, "White,Walnut,Oak"),
            p("18-Piece Ceramic Dinner Set",    "Microwave and dishwasher safe, chip-resistant porcelain.",                                                             3999,  20, img("1595854341625-f33ee10dbf94"), home, null, "White,Ivory,Stone Grey"),
            p("Borosil Electric Kettle",        "1.7 L capacity, auto shutoff, stainless steel interior.",                                                              1299,  45, img("1544787219-7f47ccb76574"), home, null, "Black,White,Steel"),
            p("Kent RO Water Purifier",         "8 L storage, RO+UV+UF purification, TDS controller.",                                                                12999,  16, img("1585771724684-38269d6639fd"), home, null, "White/Blue"),
            p("Microwave Oven 28L",             "Convection mode, pre-set menu, child lock, tact control.",                                                             8999,  14, img("1584568694244-14fbdf83bd30"), home, null, "Black,Silver"),
            p("Hawkins Pressure Cooker 5L",     "Hard anodised aluminium, cool touch handles, inner lid.",                                                              2299,  32, img("1604382354936-07c5d9983bd3"), home, null, "Black"),
            p("Organic Bamboo Cutting Board",   "Extra-large with juice groove, antimicrobial surface.",                                                                1199,  55, img("1556909212-d5b604d0c90d"), home, null, "Natural"),
            p("Glass Storage Jar Set (12pc)",   "Airtight borosilicate glass jars with bamboo lids.",                                                                   1899,  38, img("1544785349-c4e4776a6b76"), home, null, "Clear"),
            p("Luxury Scented Candle Set",      "Set of 6 soy wax candles in vanilla, lavender and cedarwood.",                                                          999,  60, img("1602928321679-560bb453f190"), home, null, "Ivory,Blush,Sage"),
            p("Indoor Plant Pot Collection",    "Set of 5 ceramic pots with bamboo trays, multiple sizes.",                                                             1799,  42, img("1485955900006-10f4d324d411"), home, null, "White,Terracotta,Sage"),
            p("Robot Vacuum Cleaner",           "Auto-mapping, 2700 Pa suction, works on carpet and hard floor.",                                                      19999,  10, img("1625751363006-5b07c56b018e"), home, null, "Black,White"),
            p("Smart LED Bulb Pack (4)",        "16 million colours, voice control, 10 W, 1000 lumens.",                                                               2499,  48, img("1532635248-cdd3d399f56c"), home, null, "White"),
            p("Wooden Spice Rack",              "Wall-mounted bamboo spice organiser with 12 labelled jars.",                                                             999,  65, img("1556909172-54557c7e4fb7"), home, null, "Natural Bamboo")
        ));

        // ── Sports (22 products) ─────────────────────────────────────────────
        productRepository.saveAll(List.of(
            p("Liforme Yoga Mat",               "6 mm thick, natural rubber, alignment markers, non-slip surface.",                                                     1499, 70, img("1601925228010-8534e5b2e657"), sports, null,               "Purple,Black,Warrior Blue,Dusty Pink"),
            p("Resistance Bands Set (5pc)",     "Loop bands from 10–50 lbs, ideal for home workout and rehab.",                                                          799, 90, img("1598289431512-b97b0917affc"), sports, null,               "Multicolour"),
            p("ON Whey Protein 2kg",            "24 g protein per scoop, low sugar, double rich chocolate flavour.",                                                    2999, 35, img("1593095948071-474c5cc2989d"), sports, null,               "Double Rich Chocolate,Vanilla Ice Cream,Strawberry"),
            p("Adjustable Dumbbell Set 40kg",   "Quick-adjust dial system, replaces 15 sets of weights.",                                                              12999, 18, img("1571019614242-c5c5dee9f50b"), sports, null,               "Black"),
            p("Doorframe Pull-Up Bar",          "No screws needed, fits doors 60–100 cm, holds up to 120 kg.",                                                          1299, 55, img("1517963879433-6ad2a04b9d9a"), sports, null,               "Black,Silver"),
            p("Jump Rope Speed Cable",          "Adjustable steel cable, 360° bearing, foam handles.",                                                                    499, 100, img("1606902965551-dce093cda6e7"), sports, null,               "Black,Blue,Red"),
            p("EVA Foam Roller",                "High-density foam, 60 cm × 15 cm, for muscle recovery.",                                                               899, 65, img("1518611012118-696072aa579a"), sports, null,               "Black,Blue,Green"),
            p("Asics Gel-Nimbus Running Shoes", "FlyteFoam midsole, gel cushioning, breathable upper.",                                                                11999, 40, img("1539185185060-ef6acf0c2fc6"), sports, "6,7,8,9,10,11",  "Black/White,Blue/Orange,Grey/Lime"),
            p("SG Cricket Bat English Willow",  "Grade 3 English willow, full-size, with full cane handle.",                                                            3499, 25, img("1531415074968-036ba1b575da"), sports, null,               "Natural"),
            p("Nivia Storm Football Size 5",    "32-panel machine stitched PVC football, FIFA approved.",                                                                 899, 50, img("1517649763962-0c623066013b"), sports, null,               "Black/White"),
            p("Spalding NBA Basketball",        "Composite leather, indoor/outdoor, official size 7.",                                                                   2499, 30, img("1546519638-68e109498ffc"), sports, null,               "Orange"),
            p("Wilson Tennis Racket Pro",       "Graphite frame, 16×19 string pattern, beginner to intermediate.",                                                      3999, 22, img("1595435934819-5704aece9c82"), sports, null,               "Red/Black,Blue/Black"),
            p("Li-Ning Badminton Set",          "2 carbon-graphite rackets + 3 nylon shuttlecocks + carry bag.",                                                         1799, 38, img("1626224583764-f87db24ac4ea"), sports, null,               "Black/Red,Blue/Gold"),
            p("Nivia MTB Cycling Helmet",       "18 vents, ABS shell with EPS liner, adjustable fit system.",                                                            1999, 28, img("1571902943202-507ec2618e8f"), sports, "S,M,L",            "Matte Black,White,Red,Blue"),
            p("Speedo Swimming Goggles",        "Anti-fog UV protection lenses, adjustable strap.",                                                                       899, 60, img("1560090995-01632a28895b"), sports, null,               "Black,Blue,Clear"),
            p("Hydro Flask 32oz Water Bottle",  "TempShield insulation, 18/8 stainless steel, 24-hr cold.",                                                             2799, 75, img("1602143407151-7111542de6e8"), sports, null,               "Black,Pacific,Watermelon,Cobalt,Olive"),
            p("Harbinger Gym Gloves",           "Full-finger protection, anti-slip grip, wrist support.",                                                                  999, 55, img("1583454086892-eedc76d54b72"), sports, "S,M,L,XL",         "Black,Grey"),
            p("Knee Support Sleeve Pair",       "Compression neoprene sleeve, pain relief, fits all sizes.",                                                              799, 80, img("1571019613454-1cb2f99b2d8b"), sports, "S,M,L,XL",         "Black,Blue"),
            p("Lifefitness Treadmill T3",       "Compact folding treadmill, 12 workout programs, 16 kph max.",                                                          49999,  8, img("1571019613414-1a21a7e73ba5"), sports, null,               "Black/Silver"),
            p("Ab Roller Pro Wheel",            "Wide non-slip wheel with elbow mat and knee pad included.",                                                               699, 90, img("1534438327276-14e5300c3a48"), sports, null,               "Black/Blue,Black/Red"),
            p("Punching Bag 4ft",               "Heavy-duty canvas bag, 30 kg filled, with chain and swivel.",                                                           4999, 16, img("1583454110551-21f2fa2afe61"), sports, null,               "Black,Red"),
            p("Kettlebell 16kg Cast Iron",      "Single piece cast iron, flat base, powder coat finish.",                                                                 2499, 30, img("1517344800994-80b23d030e39"), sports, null,               "Black")
        ));

        System.out.println("✅ Seeded: 5 categories, 110 products with sizes & colours");
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private Category save(String name, String desc) {
        return categoryRepository.save(Category.builder().name(name).description(desc).build());
    }

    private Product p(String name, String desc, int price, int stock,
                      String imgUrl, Category cat,
                      String sizes, String colors) {
        return Product.builder()
                .name(name)
                .description(desc)
                .price(new BigDecimal(price))
                .stock(stock)
                .imageUrl(imgUrl)
                .category(cat)
                .sizes(sizes)
                .colors(colors)
                .build();
    }
}
