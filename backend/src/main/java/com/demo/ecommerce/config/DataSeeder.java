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

        // ── Electronics (22 products, images 1-22) ───────────────────────────
        productRepository.saveAll(List.of(
            p("iPhone 15 Pro",                 "Apple iPhone 15 Pro with A17 Bionic chip, 48 MP triple camera system and titanium frame.",                         119999, 10, "/products/1.jpg",   electronics, null,           "Black Titanium,White Titanium,Blue Titanium,Natural Titanium"),
            p("Samsung Galaxy S24 Ultra",       "200 MP camera, Snapdragon 8 Gen 3, built-in S Pen for pro-level performance.",                                    134999, 10, "/products/2.jpg",   electronics, null,           "Titanium Gray,Titanium Black,Titanium Violet,Titanium Yellow"),
            p("Sony WH-1000XM5 Headphones",    "Industry-leading noise cancellation with 30-hour battery life.",                                                   29999,  10, "/products/3.jpg",   electronics, null,           "Black,Silver,Midnight Blue"),
            p("MacBook Air M3",                 "Apple M3 chip, 13.6-inch Liquid Retina display, 18-hour battery.",                                                119900, 10, "/products/4.jpg",   electronics, null,           "Midnight,Starlight,Space Gray,Sky Blue"),
            p("iPad Pro 12.9\"",               "M2 chip, Liquid Retina XDR display, perfect for creative professionals.",                                         109900, 10, "/products/5.jpg",   electronics, null,           "Space Gray,Silver"),
            p("Apple Watch Series 9",           "Advanced health sensors, Always-On Retina display, crash detection.",                                              41900,  10, "/products/6.jpg",   electronics, null,           "Midnight,Starlight,Pink,Red,Silver"),
            p("Google Pixel 9 Pro",             "Google's flagship with Magic Eraser, 50 MP wide and 48 MP ultrawide cameras.",                                    109999, 10, "/products/7.jpg",   electronics, null,           "Obsidian,Porcelain,Wintergreen,Rose Quartz"),
            p("OnePlus 12",                     "Hasselblad camera, 100 W SUPERVOOC fast charging, Snapdragon 8 Gen 3.",                                           64999,  10, "/products/8.jpg",   electronics, null,           "Silky Black,Flowy Emerald"),
            p("Dell XPS 15 Laptop",             "Intel Core i9, 32 GB RAM, 1 TB SSD, 4K OLED touch display.",                                                     189999, 10, "/products/9.jpg",   electronics, null,           "Platinum Silver,Frost White"),
            p("LG OLED C3 55\" TV",            "Evo OLED panel, Dolby Vision, 120 Hz refresh rate, Google TV.",                                                   149999, 10, "/products/10.jpg",  electronics, null,           "Black"),
            p("Sony PlayStation 5",             "Next-gen gaming with DualSense haptic feedback and lightning-fast SSD.",                                           54990,  10, "/products/11.jpg",  electronics, null,           "White"),
            p("Nintendo Switch OLED",           "7-inch OLED screen, enhanced audio, play at home or on the go.",                                                  29999,  10, "/products/12.jpg",  electronics, null,           "White,Neon Blue & Red"),
            p("GoPro Hero 12 Black",            "5.3 K video, HyperSmooth 6.0 stabilisation, waterproof to 10 m.",                                                39990,  10, "/products/13.jpg",  electronics, null,           "Black"),
            p("Canon EOS R50 Camera",           "24.2 MP APS-C sensor, 4K video, ideal for content creators.",                                                     69990,  10, "/products/14.jpg",  electronics, null,           "Black,White"),
            p("Bose QuietComfort 45",           "World-class noise cancellation with crisp, clear audio.",                                                          24900,  10, "/products/15.jpg",  electronics, null,           "Black,White Smoke,Eclipse Gray"),
            p("JBL Flip 6 Speaker",             "Portable waterproof Bluetooth speaker, 12-hour playtime.",                                                         9999,  10, "/products/16.jpg",  electronics, null,           "Black,Blue,Red,Teal,Squad"),
            p("Kindle Paperwhite 2024",         "6.8-inch glare-free display, 3-month battery, waterproof design.",                                                13999,  10, "/products/17.jpg",  electronics, null,           "Black,Denim,Agave"),
            p("Xiaomi Mi Band 8",               "1.62-inch AMOLED display, 16-day battery, 150+ workout modes.",                                                    3999,  10, "/products/18.jpg",  electronics, null,           "Black,Orange,Blue,Pink"),
            p("Logitech MX Master 3S Mouse",    "8K DPI sensor, ergonomic design, works on any surface.",                                                           8995,  10, "/products/19.jpg",  electronics, null,           "Graphite,Pale Gray,Rose"),
            p("Samsung 65\" QLED 4K TV",       "Quantum Dot technology, 100% color volume, Motion Xcelerator.",                                                   129999, 10, "/products/20.jpg",  electronics, null,           "Black"),
            p("Asus ROG Gaming Laptop",         "RTX 4070, AMD Ryzen 9, 16 GB RAM, 144 Hz display.",                                                              159999, 10, "/products/21.jpg",  electronics, null,           "Eclipse Gray"),
            p("Sony Alpha A7 IV",               "33 MP full-frame mirrorless camera, 4K 60 fps video, 10 fps burst.",                                             269990, 10, "/products/22.jpg",  electronics, null,           "Black")
        ));

        // ── Clothing (22 products, images 23-44) ────────────────────────────
        productRepository.saveAll(List.of(
            p("Nike Air Max 270",               "Men's lifestyle shoe with Max Air unit for all-day comfort.",                                                       12999, 10, "/products/23.jpg",  clothing, "6,7,8,9,10,11,12",     "Black/White,White/Red,Triple Black,Volt"),
            p("Levi's 512 Slim Taper Jeans",   "Slim fit jeans that taper below the knee, authentic stretch denim.",                                                3999,  10, "/products/24.jpg",  clothing, "28,30,32,34,36,38",     "Indigo,Black,Stone Wash,Grey"),
            p("Premium Oversized Hoodie",       "400 gsm cotton fleece, dropped shoulders, kangaroo pocket.",                                                        1999,  10, "/products/25.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Ash Grey,Black,Cream,Olive,Navy"),
            p("Adidas Tiro Track Jacket",       "Moisture-wicking fabric with iconic 3-stripes and full zip.",                                                       3499,  10, "/products/26.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Red,Royal Blue"),
            p("Classic Polo Shirt",             "Premium pique cotton polo with embroidered logo, slim fit.",                                                         2499,  10, "/products/27.jpg",  clothing, "XS,S,M,L,XL,XXL",      "White,Navy,Black,Red,Bottle Green"),
            p("Formal Blazer",                  "Structured single-breasted blazer in premium wool blend.",                                                           5999,  10, "/products/28.jpg",  clothing, "36,38,40,42,44,46",     "Navy,Charcoal,Black,Mid Grey"),
            p("Floral Summer Dress",            "Lightweight chiffon midi dress with floral print and adjustable straps.",                                            1799,  10, "/products/29.jpg",  clothing, "XS,S,M,L,XL",          "Floral Blue,Floral Pink,Floral Yellow"),
            p("Puma Running Shorts",            "Ultralight dryCELL fabric with reflective details for night runs.",                                                  1299,  10, "/products/30.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Red,Grey"),
            p("Under Armour Tech T-Shirt",      "Anti-odor technology, ultra-soft fabric, loose fit.",                                                                1499,  10, "/products/31.jpg",  clothing, "XS,S,M,L,XL,XXL,3XL",  "White,Black,Graphite,Red,Royal"),
            p("Woodland Trekking Boots",        "Genuine leather with waterproof lining and grip sole.",                                                              4999,  10, "/products/32.jpg",  clothing, "6,7,8,9,10,11",         "Camel,Dark Brown,Olive"),
            p("Reebok Classic Sneakers",        "Timeless leather upper with EVA midsole for cushioning.",                                                            5999,  10, "/products/33.jpg",  clothing, "6,7,8,9,10,11,12",     "White,Black,Grey"),
            p("Chinos Slim Fit",                "Stretch cotton chinos with tapered leg and flat front.",                                                             2499,  10, "/products/34.jpg",  clothing, "28,30,32,34,36,38",     "Khaki,Olive,Navy,Black,Stone"),
            p("Oxford Formal Shirt",            "100% premium cotton, button-down collar, slim fit.",                                                                 1999,  10, "/products/35.jpg",  clothing, "S,M,L,XL,XXL",          "White,Light Blue,Pink,Lavender"),
            p("Ethnic Kurti Set",               "Cotton printed kurti with palazzo, comfortable and stylish.",                                                         1599,  10, "/products/36.jpg",  clothing, "XS,S,M,L,XL,XXL,3XL",  "Teal,Coral,Indigo,Marigold"),
            p("Handloom Kurta",                 "Pure cotton handloom kurta with natural dye prints.",                                                                 1899,  10, "/products/37.jpg",  clothing, "S,M,L,XL,XXL",          "White,Beige,Indigo,Rust"),
            p("Snapback Cap",                   "100% cotton twill, adjustable snap closure, embroidered logo.",                                                        799,  10, "/products/38.jpg",  clothing, "Free Size",             "Black,White,Navy,Olive,Red"),
            p("Leather Bomber Jacket",          "Genuine lamb leather with ribbed cuffs and waistband.",                                                              8999,  10, "/products/39.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Black,Dark Brown,Tan"),
            p("Raw Denim Jacket",               "Selvedge denim jacket with copper rivets and button front.",                                                          3499,  10, "/products/40.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Indigo,Black,Light Wash"),
            p("Cargo Pants",                    "Multi-pocket cargo trousers in ripstop nylon fabric.",                                                               2199,  10, "/products/41.jpg",  clothing, "28,30,32,34,36,38",     "Khaki,Olive,Black,Grey"),
            p("Chelsea Ankle Boots",            "Genuine suede Chelsea boots with elastic side panels.",                                                               5499,  10, "/products/42.jpg",  clothing, "6,7,8,9,10,11",         "Black Suede,Tan Suede,Grey Suede"),
            p("Compression Leggings",           "High-waist 4-way stretch leggings with moisture control.",                                                            1499,  10, "/products/43.jpg",  clothing, "XS,S,M,L,XL,XXL",      "Black,Navy,Burgundy,Slate Blue"),
            p("Linen Shirt",                    "Breathable linen shirt, relaxed fit, perfect for summer.",                                                            1899,  10, "/products/44.jpg",  clothing, "XS,S,M,L,XL,XXL",      "White,Sky Blue,Beige,Sage Green")
        ));

        // ── Books (22 products, images 45-66) ───────────────────────────────
        productRepository.saveAll(List.of(
            p("Atomic Habits",                  "James Clear's definitive guide to building good habits and breaking bad ones.",                                        399, 10, "/products/45.jpg",  books, null, null),
            p("The Alchemist",                  "Paulo Coelho's mystical story of Santiago's journey to find treasure.",                                               299, 10, "/products/46.jpg",  books, null, null),
            p("Clean Code",                     "Robert C. Martin's handbook of agile software craftsmanship.",                                                         899, 10, "/products/47.jpg",  books, null, null),
            p("Rich Dad Poor Dad",              "Robert Kiyosaki on financial education and building wealth.",                                                           349, 10, "/products/48.jpg",  books, null, null),
            p("The Psychology of Money",        "Morgan Housel on how people think about money and investing.",                                                          449, 10, "/products/49.jpg",  books, null, null),
            p("Deep Work",                      "Cal Newport's rules for focused success in a distracted world.",                                                        499, 10, "/products/50.jpg",  books, null, null),
            p("Sapiens",                        "Yuval Noah Harari's brief history of humankind from apes to civilisation.",                                             549, 10, "/products/51.jpg",  books, null, null),
            p("1984",                           "George Orwell's chilling dystopian masterpiece about Big Brother.",                                                     249, 10, "/products/52.jpg",  books, null, null),
            p("The Great Gatsby",               "F. Scott Fitzgerald's iconic novel of the Jazz Age and the American Dream.",                                            199, 10, "/products/53.jpg",  books, null, null),
            p("Harry Potter Box Set (7 Books)", "The complete magical series by J.K. Rowling in a collector's box set.",                                               2499, 10, "/products/54.jpg",  books, null, null),
            p("The Pragmatic Programmer",       "Andrew Hunt & David Thomas on becoming a better software developer.",                                                   999, 10, "/products/55.jpg",  books, null, null),
            p("Designing Data-Intensive Apps",  "Martin Kleppmann's bible on building reliable, scalable systems.",                                                     1299, 10, "/products/56.jpg",  books, null, null),
            p("Zero to One",                    "Peter Thiel on how startups can create new monopolies.",                                                               499, 10, "/products/57.jpg",  books, null, null),
            p("Think and Grow Rich",            "Napoleon Hill's classic on the power of thought and perseverance.",                                                    299, 10, "/products/58.jpg",  books, null, null),
            p("Ikigai",                         "The Japanese secret to a long and happy life by Hector Garcia.",                                                       349, 10, "/products/59.jpg",  books, null, null),
            p("The 48 Laws of Power",           "Robert Greene's guide to power, strategy and seduction.",                                                              599, 10, "/products/60.jpg",  books, null, null),
            p("System Design Interview Vol. 1", "Alex Xu's guide to cracking system design questions at FAANG.",                                                       1199, 10, "/products/61.jpg",  books, null, null),
            p("JavaScript: The Good Parts",     "Douglas Crockford on the elegant subset of JavaScript.",                                                               799, 10, "/products/62.jpg",  books, null, null),
            p("The Lean Startup",               "Eric Ries on how today's entrepreneurs use continuous innovation.",                                                    499, 10, "/products/63.jpg",  books, null, null),
            p("Dune",                           "Frank Herbert's epic science fiction saga of politics and religion.",                                                   449, 10, "/products/64.jpg",  books, null, null),
            p("Steve Jobs Biography",           "Walter Isaacson's definitive biography of Apple's visionary co-founder.",                                              649, 10, "/products/65.jpg",  books, null, null),
            p("The Art of War",                 "Sun Tzu's 2500-year-old guide to strategy and leadership.",                                                            199, 10, "/products/66.jpg",  books, null, null)
        ));

        // ── Home & Kitchen (22 products, images 67-88) ──────────────────────
        productRepository.saveAll(List.of(
            p("Instant Pot Duo 7-in-1",         "Pressure cooker, slow cooker, rice cooker, steamer in one device.",                                                  7999, 10, "/products/67.jpg",  home, null, "Black,Silver"),
            p("Dyson V15 Detect Vacuum",        "Laser reveals microscopic dust, HEPA filtration, cordless design.",                                                  54900, 10, "/products/68.jpg",  home, null, "Nickel/Yellow"),
            p("Philips Air Fryer XXL",          "2.65 kg capacity, rapid air technology, 90% less fat.",                                                               9999, 10, "/products/69.jpg",  home, null, "Black,Grey"),
            p("Philips Hand Blender",           "650 W motor, ProMix technology, dishwasher-safe attachments.",                                                         2999, 10, "/products/70.jpg",  home, null, "Black,White"),
            p("Prestige Mixer Grinder",         "750 W motor, 3 jars including chutney jar, 5-speed control.",                                                          3499, 10, "/products/71.jpg",  home, null, "White,Red"),
            p("Non-Stick Cookware Set 5pc",     "Hard anodised aluminium, PFOA-free coating, induction compatible.",                                                    4999, 10, "/products/72.jpg",  home, null, "Black"),
            p("Premium Cotton Bedsheet Set",    "400 TC Egyptian cotton, king size with 2 pillow covers.",                                                              2499, 10, "/products/73.jpg",  home, null, "White,Ivory,Soft Grey,Sky Blue,Dusty Pink"),
            p("Wooden Coffee Table",            "Solid sheesham wood with storage shelf, natural finish.",                                                              7999, 10, "/products/74.jpg",  home, null, "Natural Teak,Walnut"),
            p("Arc Floor Lamp",                 "Adjustable brightness, brushed steel, warm white LED bulb.",                                                           3499, 10, "/products/75.jpg",  home, null, "Silver,Matte Black,Brass"),
            p("Floating Wall Shelf Set",        "Set of 3 MDF wall shelves, easy installation, load capacity 10 kg.",                                                   1499, 10, "/products/76.jpg",  home, null, "White,Walnut,Oak"),
            p("18-Piece Ceramic Dinner Set",    "Microwave and dishwasher safe, chip-resistant porcelain.",                                                             3999, 10, "/products/77.jpg",  home, null, "White,Ivory,Stone Grey"),
            p("Borosil Electric Kettle",        "1.7 L capacity, auto shutoff, stainless steel interior.",                                                              1299, 10, "/products/78.jpg",  home, null, "Black,White,Steel"),
            p("Kent RO Water Purifier",         "8 L storage, RO+UV+UF purification, TDS controller.",                                                                12999, 10, "/products/79.jpg",  home, null, "White/Blue"),
            p("Microwave Oven 28L",             "Convection mode, pre-set menu, child lock, tact control.",                                                             8999, 10, "/products/80.jpg",  home, null, "Black,Silver"),
            p("Hawkins Pressure Cooker 5L",     "Hard anodised aluminium, cool touch handles, inner lid.",                                                              2299, 10, "/products/81.jpg",  home, null, "Black"),
            p("Organic Bamboo Cutting Board",   "Extra-large with juice groove, antimicrobial surface.",                                                                1199, 10, "/products/82.jpg",  home, null, "Natural"),
            p("Glass Storage Jar Set (12pc)",   "Airtight borosilicate glass jars with bamboo lids.",                                                                   1899, 10, "/products/83.jpg",  home, null, "Clear"),
            p("Luxury Scented Candle Set",      "Set of 6 soy wax candles in vanilla, lavender and cedarwood.",                                                          999, 10, "/products/84.jpg",  home, null, "Ivory,Blush,Sage"),
            p("Indoor Plant Pot Collection",    "Set of 5 ceramic pots with bamboo trays, multiple sizes.",                                                             1799, 10, "/products/85.jpg",  home, null, "White,Terracotta,Sage"),
            p("Robot Vacuum Cleaner",           "Auto-mapping, 2700 Pa suction, works on carpet and hard floor.",                                                      19999, 10, "/products/86.jpg",  home, null, "Black,White"),
            p("Smart LED Bulb Pack (4)",        "16 million colours, voice control, 10 W, 1000 lumens.",                                                               2499, 10, "/products/87.jpg",  home, null, "White"),
            p("Wooden Spice Rack",              "Wall-mounted bamboo spice organiser with 12 labelled jars.",                                                             999, 10, "/products/88.jpg",  home, null, "Natural Bamboo")
        ));

        // ── Sports (22 products, images 89-110) ─────────────────────────────
        productRepository.saveAll(List.of(
            p("Liforme Yoga Mat",               "6 mm thick, natural rubber, alignment markers, non-slip surface.",                                                     1499, 10, "/products/89.jpg",  sports, null,               "Purple,Black,Warrior Blue,Dusty Pink"),
            p("Resistance Bands Set (5pc)",     "Loop bands from 10-50 lbs, ideal for home workout and rehab.",                                                          799, 10, "/products/90.jpg",  sports, null,               "Multicolour"),
            p("ON Whey Protein 2kg",            "24 g protein per scoop, low sugar, double rich chocolate flavour.",                                                    2999, 10, "/products/91.jpg",  sports, null,               "Double Rich Chocolate,Vanilla Ice Cream,Strawberry"),
            p("Adjustable Dumbbell Set 40kg",   "Quick-adjust dial system, replaces 15 sets of weights.",                                                              12999, 10, "/products/92.jpg",  sports, null,               "Black"),
            p("Doorframe Pull-Up Bar",          "No screws needed, fits doors 60-100 cm, holds up to 120 kg.",                                                          1299, 10, "/products/93.jpg",  sports, null,               "Black,Silver"),
            p("Jump Rope Speed Cable",          "Adjustable steel cable, 360 degree bearing, foam handles.",                                                              499, 10, "/products/94.jpg",  sports, null,               "Black,Blue,Red"),
            p("EVA Foam Roller",                "High-density foam, 60 cm x 15 cm, for muscle recovery.",                                                               899, 10, "/products/95.jpg",  sports, null,               "Black,Blue,Green"),
            p("Asics Gel-Nimbus Running Shoes", "FlyteFoam midsole, gel cushioning, breathable upper.",                                                                11999, 10, "/products/96.jpg",  sports, "6,7,8,9,10,11",  "Black/White,Blue/Orange,Grey/Lime"),
            p("SG Cricket Bat English Willow",  "Grade 3 English willow, full-size, with full cane handle.",                                                            3499, 10, "/products/97.jpg",  sports, null,               "Natural"),
            p("Nivia Storm Football Size 5",    "32-panel machine stitched PVC football, FIFA approved.",                                                                 899, 10, "/products/98.jpg",  sports, null,               "Black/White"),
            p("Spalding NBA Basketball",        "Composite leather, indoor/outdoor, official size 7.",                                                                   2499, 10, "/products/99.jpg",  sports, null,               "Orange"),
            p("Wilson Tennis Racket Pro",       "Graphite frame, 16x19 string pattern, beginner to intermediate.",                                                      3999, 10, "/products/100.jpg", sports, null,               "Red/Black,Blue/Black"),
            p("Li-Ning Badminton Set",          "2 carbon-graphite rackets + 3 nylon shuttlecocks + carry bag.",                                                         1799, 10, "/products/101.jpg", sports, null,               "Black/Red,Blue/Gold"),
            p("Nivia MTB Cycling Helmet",       "18 vents, ABS shell with EPS liner, adjustable fit system.",                                                            1999, 10, "/products/102.jpg", sports, "S,M,L",            "Matte Black,White,Red,Blue"),
            p("Speedo Swimming Goggles",        "Anti-fog UV protection lenses, adjustable strap.",                                                                       899, 10, "/products/103.jpg", sports, null,               "Black,Blue,Clear"),
            p("Hydro Flask 32oz Water Bottle",  "TempShield insulation, 18/8 stainless steel, 24-hr cold.",                                                             2799, 10, "/products/104.jpg", sports, null,               "Black,Pacific,Watermelon,Cobalt,Olive"),
            p("Harbinger Gym Gloves",           "Full-finger protection, anti-slip grip, wrist support.",                                                                  999, 10, "/products/105.jpg", sports, "S,M,L,XL",         "Black,Grey"),
            p("Knee Support Sleeve Pair",       "Compression neoprene sleeve, pain relief, fits all sizes.",                                                              799, 10, "/products/106.jpg", sports, "S,M,L,XL",         "Black,Blue"),
            p("Lifefitness Treadmill T3",       "Compact folding treadmill, 12 workout programs, 16 kph max.",                                                          49999, 10, "/products/107.jpg", sports, null,               "Black/Silver"),
            p("Ab Roller Pro Wheel",            "Wide non-slip wheel with elbow mat and knee pad included.",                                                               699, 10, "/products/108.jpg", sports, null,               "Black/Blue,Black/Red"),
            p("Punching Bag 4ft",               "Heavy-duty canvas bag, 30 kg filled, with chain and swivel.",                                                           4999, 10, "/products/109.jpg", sports, null,               "Black,Red"),
            p("Kettlebell 16kg Cast Iron",      "Single piece cast iron, flat base, powder coat finish.",                                                                 2499, 10, "/products/110.jpg", sports, null,               "Black")
        ));

        System.out.println("Seeded: 5 categories, 110 products with local images and stock=10");
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
