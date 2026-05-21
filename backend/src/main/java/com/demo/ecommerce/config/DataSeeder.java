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

    private static String img(String id) {
        return "https://images.unsplash.com/photo-" + id
                + "?w=600&h=800&fit=crop&crop=entropy&auto=format&q=80";
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() >= 200) return;
        seedAll();
    }

    /** Public so AdminController can call it after clearing the DB. */
    public void seedAll() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        Category electronics = cat("Electronics", "Smartphones, laptops, TVs, audio and gadgets");
        Category clothing    = cat("Clothing",     "Fashion and apparel for men, women and kids");
        Category books       = cat("Books",        "Fiction, non-fiction, tech and self-help");
        Category home        = cat("Home & Kitchen","Appliances, decor, bedding and essentials");
        Category sports      = cat("Sports",       "Fitness gear, sportswear and outdoor equipment");

        /* ================================================================
         *  ELECTRONICS — 40 products
         * ================================================================ */
        productRepository.saveAll(List.of(
            // ── Smartphones ──
            p("Apple iPhone 15 Pro Max",         "6.7-inch Super Retina XDR, A17 Pro chip, 48 MP camera with 5x optical zoom, Titanium design.",               159900, img("1592750475338-74b7b21085ab"), electronics, null, "Natural Titanium,Blue Titanium,White Titanium,Black Titanium"),
            p("Apple iPhone 15",                 "6.1-inch Super Retina XDR, A16 Bionic, 48 MP dual camera, Dynamic Island.",                                    79900, img("1510557880182-3d4d3cba35a5"), electronics, null, "Black,Blue,Green,Yellow,Pink"),
            p("Samsung Galaxy S24 Ultra",        "6.8-inch QHD+ AMOLED, Snapdragon 8 Gen 3, 200 MP camera, built-in S Pen.",                                   129999, img("1610945265064-0e34e5519bbf"), electronics, null, "Titanium Gray,Titanium Black,Titanium Violet"),
            p("Samsung Galaxy S24",              "6.2-inch FHD+ AMOLED, Snapdragon 8 Gen 3, 50 MP triple camera, Galaxy AI.",                                    74999, img("1511707171634-5f897ff02aa9"), electronics, null, "Onyx Black,Marble Gray,Cobalt Violet,Amber Yellow"),
            p("Samsung Galaxy A55 5G",           "6.6-inch Super AMOLED, Exynos 1480, 50 MP OIS camera, IP67 water resistance.",                                 39999, img("1574944985070-8f3ebc6b79d2"), electronics, null, "Awesome Iceblue,Awesome Navy,Awesome Lilac"),
            p("Google Pixel 8 Pro",              "6.7-inch LTPO OLED, Tensor G3, 50 MP triple camera with Magic Eraser and Best Take.",                         106999, img("1598532163257-ae3c6b2524b6"), electronics, null, "Obsidian,Porcelain,Bay"),
            p("OnePlus 12",                      "6.82-inch 2K LTPO AMOLED, Snapdragon 8 Gen 3, Hasselblad camera, 100 W SUPERVOOC.",                           64999, img("1607936854279-55e8a4c64888"), electronics, null, "Silky Black,Flowy Emerald"),
            p("Xiaomi 14",                       "6.36-inch 1.5K LTPO AMOLED, Snapdragon 8 Gen 3, Leica optics, 90 W HyperCharge.",                             69999, img("1611532736597-de2d4265fba3"), electronics, null, "Black,White,Jade Green"),
            p("Redmi Note 13 Pro+",              "6.67-inch 1.5K curved AMOLED, Dimensity 7200, 200 MP OIS camera, 120 W charging.",                            31999, img("1565849904461-04a58ad377e0"), electronics, null, "Midnight Black,Lavender Purple,Coral Purple"),
            p("Nothing Phone 2",                 "6.7-inch LTPO OLED, Snapdragon 8+ Gen 1, Glyph interface LED, clean Nothing OS.",                              44999, img("1605236453806-6ff36851218e"), electronics, null, "Dark Grey,White"),
            p("Realme GT 6",                     "6.78-inch 1.5K LTPO AMOLED, Snapdragon 8s Gen 3, 50 MP Sony LYT-808 sensor.",                                 33999, img("1512054502232-10a0a035d672"), electronics, null, "Razor Green,Fluid Silver"),
            p("Vivo X100 Pro",                   "6.78-inch 2K LTPO AMOLED, Dimensity 9300, ZEISS optics, 100 W FlashCharge.",                                   89999, img("1592899677977-9c10ca588bbd"), electronics, null, "Asteroid Black,Stardust Blue"),
            // ── Laptops ──
            p("MacBook Air M3 15\"",             "15.3-inch Liquid Retina, Apple M3 chip, 18-hour battery, MagSafe, fanless design.",                            134900, img("1496181133206-80ce9b88a853"), electronics, null, "Midnight,Starlight,Space Gray,Silver"),
            p("MacBook Pro 14\" M3 Pro",         "14.2-inch Liquid Retina XDR, M3 Pro chip, 12-core CPU, ProMotion 120 Hz.",                                    199900, img("1484788984921-03950022c9ef"), electronics, null, "Space Black,Silver"),
            p("Dell XPS 15",                     "15.6-inch 3.5K OLED touch, Intel Core i9-13900H, 32 GB RAM, 1 TB SSD.",                                       159990, img("1593642632559-0c6d3fc62b89"), electronics, null, "Platinum Silver,Graphite"),
            p("HP Spectre x360 14",              "14-inch 2.8K OLED touch, Intel Core Ultra 7, 360-degree hinge, 16 GB RAM.",                                   139990, img("1525547719571-a2d4ac8945e2"), electronics, null, "Nightfall Black,Nocturne Blue"),
            p("Lenovo ThinkPad X1 Carbon Gen 11","14-inch 2.8K OLED, Intel Core i7-1365U, 32 GB RAM, fingerprint reader, MIL-STD tested.",                      154990, img("1498050108023-c5249f4df085"), electronics, null, "Black"),
            p("ASUS ROG Strix G16 Gaming",       "16-inch 240 Hz QHD, Intel Core i9, NVIDIA RTX 4070, 16 GB RAM, per-key RGB.",                                 129990, img("1603302576837-37561b2e2302"), electronics, null, "Eclipse Gray"),
            p("Acer Nitro V Gaming Laptop",      "15.6-inch FHD 144 Hz, Intel Core i5-13420H, RTX 4050, 16 GB RAM.",                                            79990, img("1588872657578-7efd1f1555ed"), electronics, null, "Obsidian Black"),
            p("HP Pavilion 15",                  "15.6-inch FHD IPS, Intel Core i5-1335U, 16 GB RAM, 512 GB SSD, thin and light.",                               64990, img("1519389950473-47ba0277781c"), electronics, null, "Natural Silver,Fog Blue"),
            p("Lenovo IdeaPad Slim 5",           "14-inch 2.8K OLED, AMD Ryzen 7 7730U, 16 GB RAM, 512 GB SSD, all-metal build.",                               59990, img("1611186871348-b1ce696e52c9"), electronics, null, "Cloud Grey,Abyss Blue"),
            // ── TVs ──
            p("Samsung 55\" Crystal 4K UHD TV",  "Crystal Processor 4K, HDR10+, Smart Hub, AirSlim design, Alexa built-in.",                                     42990, img("1593784991095-a205069470b6"), electronics, null, "Black"),
            p("LG 55\" OLED evo C3",             "Self-lit OLED pixels, α9 Gen6 AI processor, Dolby Vision IQ, webOS 23.",                                      129990, img("1574375927938-d5a98e8ffe85"), electronics, null, "Black"),
            p("Sony Bravia 55\" 4K Google TV",   "X1 4K HDR processor, Triluminos Pro, ATMOS sound, Google TV built-in.",                                        79990, img("1461151304267-38535e780c79"), electronics, null, "Black"),
            p("Samsung 43\" Crystal 4K TV",      "Crystal Processor 4K, PurColor, Motion Xcelerator, Samsung TV Plus.",                                           32990, img("1593305841991-05c297ba4575"), electronics, null, "Black"),
            p("Mi TV 5A 43\"",                   "Vivid Picture Engine, 20 W speakers, PatchWall with IMDb integration.",                                         24999, img("1509281373149-e957c6296406"), electronics, null, "Black"),
            // ── Audio ──
            p("Sony WH-1000XM5",                 "Industry-leading noise cancellation, 30-hour battery, LDAC Hi-Res Audio, multipoint.",                         29990, img("1505740420928-5e560c06d30e"), electronics, null, "Black,Silver,Midnight Blue"),
            p("Apple AirPods Pro 2",             "H2 chip, adaptive transparency, personalized spatial audio, MagSafe case.",                                    24900, img("1590658268037-6bf12165a8df"), electronics, null, "White"),
            p("Bose QuietComfort Ultra",         "Immersive spatial audio, CustomTune EQ, 24-hour battery, multipoint Bluetooth.",                               34990, img("1546435770-a3e426bf472b"), electronics, null, "Black,White Smoke,Lunar Blue"),
            p("JBL Tune 770NC",                  "Adaptive noise cancelling, JBL Pure Bass, 44-hour battery, foldable design.",                                    5999, img("1505236858219-8359eb29e329"), electronics, null, "Black,Blue,Purple"),
            p("Marshall Major IV",               "80+ hours battery, wireless charging, iconic design, custom-tuned drivers.",                                    12999, img("1609692814858-f7cd2f0afa4f"), electronics, null, "Black,Brown"),
            p("boAt Rockerz 550",                "50 mm drivers, 20-hour playback, dual EQ modes, padded ear cushions.",                                           1799, img("1545127398-14699f92334b"), electronics, null, "Black,Blue,Red,Green"),
            p("JBL Flip 6",                      "IP67 waterproof Bluetooth speaker, 12-hour battery, PartyBoost pairing.",                                        9999, img("1608043152269-423dbba4e7e1"), electronics, null, "Black,Blue,Red,Teal,Squad"),
            // ── Wearables & Cameras ──
            p("Apple Watch Series 9",            "Always-On Retina, S9 SiP, double-tap gesture, blood oxygen, crash detection.",                                 41900, img("1579586337278-3befd40fd17a"), electronics, null, "Midnight,Starlight,Pink,Red,Silver"),
            p("Samsung Galaxy Watch 6 Classic",  "1.47-inch Super AMOLED, rotating bezel, BioActive sensor, Wear OS.",                                           34999, img("1575311373937-040b8e1fd5b6"), electronics, null, "Silver,Black"),
            p("GoPro HERO 12 Black",             "5.3K60 video, HyperSmooth 6.0, HDR photo, Max Lens Mod 2.0, waterproof 10 m.",                                 44990, img("1598965402089-897ce52e8355"), electronics, null, "Black"),
            p("Canon EOS R50",                   "24.2 MP APS-C mirrorless, 4K video, eye-tracking AF, compact and lightweight.",                                 69990, img("1516035069371-29a1b244cc32"), electronics, null, "Black,White"),
            p("Sony Alpha A7 IV",                "33 MP full-frame mirrorless, 4K 60 fps, 759-point AF, 10 fps burst shooting.",                                 249990, img("1502920917128-1aa500764cbd"), electronics, null, "Black"),
            p("Kindle Paperwhite 2024",          "6.8-inch glare-free display, adjustable warm light, 16 GB, waterproof, USB-C.",                                 14999, img("1491841573634-28140fc7ced7"), electronics, null, "Black,Denim,Agave"),
            p("Apple AirTag 4-Pack",             "Precision Finding with UWB, water-resistant, replaceable battery, Find My network.",                            12900, img("1523275335684-37898b6baf30"), electronics, null, "Silver")
        ));

        /* ================================================================
         *  CLOTHING — 40 products
         * ================================================================ */
        productRepository.saveAll(List.of(
            // ── Men's T-Shirts ──
            p("Nike Dri-FIT Training Tee",       "Sweat-wicking Dri-FIT fabric, relaxed fit, crew neck, breathable mesh panels.",                                  2499, img("1521572163474-6864f9cf17ab"), clothing, "S,M,L,XL,XXL", "Black,White,Navy,Grey"),
            p("Adidas Originals Trefoil Tee",    "100% cotton jersey, ribbed crew neck, large trefoil logo print.",                                                1999, img("1576566588028-4147f3842f27"), clothing, "S,M,L,XL,XXL", "White,Black,Green,Red"),
            p("Puma Essential Logo Tee",          "Soft cotton fabric, regular fit, iconic PUMA cat logo on chest.",                                                 1499, img("1583743814966-8936f5b7be1a"), clothing, "S,M,L,XL,XXL", "Black,White,Peacoat,Red"),
            p("H&M Regular Fit Cotton Tee",      "Premium cotton, pre-washed for softness, ribbed crew neck, versatile everyday wear.",                              799, img("1618354691373-d851c5c3a990"), clothing, "XS,S,M,L,XL,XXL", "White,Black,Grey,Navy,Olive"),
            p("Uniqlo Supima Cotton Crew Tee",   "100% Supima cotton, smooth texture, durable and pill-resistant, slim fit.",                                       1290, img("1562157873-818bc0726f68"), clothing, "XS,S,M,L,XL,XXL", "White,Black,Grey,Beige,Blue"),
            // ── Men's Shirts ──
            p("Ralph Lauren Classic Oxford",     "Button-down collar, signature Polo pony, 100% cotton, washed for softness.",                                     5999, img("1602810316498-ab67cf68c8e1"), clothing, "S,M,L,XL,XXL", "White,Light Blue,Pink,Stripe"),
            p("Levi's Classic Western Shirt",    "Pearl snap buttons, pointed yoke, cotton denim, relaxed fit.",                                                    3999, img("1594938298603-c8148c4dae35"), clothing, "S,M,L,XL,XXL", "Light Wash,Medium Wash,Black"),
            p("Van Heusen Slim Fit Formal",      "Wrinkle-free cotton blend, spread collar, French cuffs, business ready.",                                         2499, img("1563630423918-b58f07336ac9"), clothing, "38,39,40,42,44,46", "White,Light Blue,Pink,Lavender"),
            p("Peter England Check Shirt",       "100% cotton, button-down collar, regular fit, smart casual check pattern.",                                       1799, img("1589310243389-96a5483213a8"), clothing, "38,39,40,42,44", "Blue Check,Red Check,Green Check"),
            p("Allen Solly Linen Blend Shirt",   "Linen-cotton blend, mandarin collar, relaxed summer fit, lightweight.",                                           2299, img("1588850561407-ed78c282e89b"), clothing, "S,M,L,XL,XXL", "White,Beige,Sky Blue,Sage"),
            // ── Jeans & Pants ──
            p("Levi's 501 Original Jeans",       "The original straight fit since 1873, button fly, 100% cotton denim.",                                            4999, img("1542272604-787c3835535d"), clothing, "28,30,32,34,36,38", "Indigo,Stonewash,Black,Light Wash"),
            p("Levi's 512 Slim Taper Jeans",     "Slim through thigh and tapered leg, stretch denim for comfort.",                                                  3999, img("1473966968600-fa801b869a1a"), clothing, "28,30,32,34,36,38", "Dark Indigo,Black,Grey,Vintage"),
            p("Wrangler Bootcut Jeans",          "Classic 5-pocket styling, bootcut leg, authentic western heritage denim.",                                         2799, img("1542272604-787c3835535d"), clothing, "28,30,32,34,36", "Dark Wash,Medium Wash,Rinse"),
            p("Gap Slim Fit Khaki Chinos",       "Stretch cotton twill, slim fit, flat front, wrinkle-resistant finish.",                                            2999, img("1473966968600-fa801b869a1a"), clothing, "28,30,32,34,36,38", "Khaki,Olive,Navy,Black,Stone"),
            p("Cargo Jogger Pants",              "Multi-pocket ripstop fabric, elastic waist with drawstring, tapered leg.",                                         2199, img("1517445312882-bc9910d016b7"), clothing, "S,M,L,XL,XXL", "Olive,Black,Grey,Khaki"),
            // ── Jackets ──
            p("Levi's Trucker Denim Jacket",     "Classic Type III trucker jacket, 100% cotton denim, button front, chest pockets.",                                 4999, img("1576871337622-98d48d1cf531"), clothing, "S,M,L,XL,XXL", "Indigo,Black,Light Wash"),
            p("Zara Faux Leather Biker Jacket",  "Notched lapels, asymmetric zip, snap-tab collar, quilted lining.",                                                5999, img("1551028719-00167b16eac5"), clothing, "S,M,L,XL,XXL", "Black,Dark Brown,Burgundy"),
            p("North Face Puffer Jacket",        "700-fill goose down, water-resistant DWR finish, packable design.",                                               12999, img("1611312449412-6cefac5dc3e4"), clothing, "S,M,L,XL,XXL", "Black,Navy,Olive,Burgundy"),
            p("Adidas Tiro Track Jacket",        "Moisture-wicking AEROREADY, slim fit, iconic 3-stripes, full zip.",                                               3499, img("1591047139829-d91aecb6caea"), clothing, "S,M,L,XL,XXL", "Black,Navy,Red,Royal Blue"),
            // ── Women's ──
            p("Zara Floral Midi Dress",          "Lightweight chiffon, floral print, adjustable straps, A-line silhouette.",                                        2999, img("1585487000160-6ebcfceb0d03"), clothing, "XS,S,M,L,XL", "Floral Blue,Floral Pink,Floral Yellow"),
            p("H&M Ribbed Knit Bodycon",         "Soft ribbed jersey, figure-hugging fit, round neck, midi length.",                                                1799, img("1515886657613-9f3515b0c78f"), clothing, "XS,S,M,L,XL", "Black,White,Burgundy,Camel"),
            p("Fabindia Cotton Kurti Set",       "Hand-block printed cotton kurti with palazzo, comfortable ethnic wear.",                                           1999, img("1583391733956-3750e0ff4e8b"), clothing, "XS,S,M,L,XL,XXL", "Teal,Coral,Indigo,Marigold"),
            p("FabAlley Wrap Jumpsuit",          "Crepe fabric, wrap front, wide-leg, belted waist, dressy occasion wear.",                                          2499, img("1551803091-e20673f15770"), clothing, "XS,S,M,L,XL", "Black,Navy,Wine,Emerald"),
            // ── Shoes ──
            p("Nike Air Max 270",                "Max Air unit for cushioning, mesh upper, rubber outsole, lifestyle sneaker.",                                      12999, img("1542291026-7eec264c27ff"), clothing, "6,7,8,9,10,11,12", "Black/White,White/Red,Triple Black,Volt"),
            p("Adidas Ultraboost 22",            "Boost midsole, Primeknit upper, Continental rubber outsole, running shoe.",                                       14999, img("1595950653106-6c9ebd614d3a"), clothing, "6,7,8,9,10,11,12", "Core Black,Cloud White,Solar Red"),
            p("Puma RS-X Reinvention",           "Running System tech, bulky silhouette, mesh and leather upper, retro style.",                                      8999, img("1608231387042-66d1773070a5"), clothing, "6,7,8,9,10,11", "White,Black,Grey,Multi"),
            p("Converse Chuck Taylor All Star",  "Canvas upper, vulcanized rubber sole, All Star ankle patch, timeless classic.",                                    3999, img("1525966222134-fcfa99b8ae77"), clothing, "5,6,7,8,9,10,11,12", "Black,White,Red,Navy,Optical White"),
            p("Clarks Desert Boot",              "Genuine suede, crepe rubber sole, lace-up closure, iconic silhouette since 1950.",                                  7999, img("1543163521-1bf539c55dd2"), clothing, "6,7,8,9,10,11", "Sand Suede,Beeswax,Dark Brown"),
            p("Woodland Trekking Boots",         "Genuine leather, waterproof lining, Vibram sole, ankle support.",                                                  5499, img("1490481651871-ab68de25d43d"), clothing, "6,7,8,9,10,11", "Camel,Dark Brown,Olive"),
            // ── Accessories ──
            p("Ray-Ban Aviator Classic",         "Gold metal frame, crystal green G-15 lenses, iconic teardrop shape.",                                              7990, img("1572635196184-84e35138cf62"), clothing, "Free Size", "Gold/Green,Gold/Brown,Black/Green"),
            p("Fossil Grant Chronograph Watch",  "Genuine leather strap, Roman numeral dial, 44 mm case, water-resistant.",                                         12995, img("1524592094714-0f0654e20314"), clothing, "Free Size", "Brown/Blue,Black/Gold,Tan/Cream"),
            p("Tommy Hilfiger Leather Belt",     "Full-grain leather, signature flag buckle, stitched edges, 35 mm width.",                                          2499, img("1622434641406-a158123450f9"), clothing, "30,32,34,36,38,40", "Brown,Black,Tan"),
            p("Nike Heritage Backpack",          "Polyester fabric, padded shoulder straps, front zip pocket, 25 L capacity.",                                       2999, img("1624378439575-d8705ad7ae80"), clothing, "Free Size", "Black,Navy,Grey,Olive"),
            // ── Premium ──
            p("Polo Ralph Lauren Cable Knit Sweater","100% cotton cable knit, crew neck, ribbed trim, signature pony.",                                             8999, img("1620012253295-c15cc3e65df4"), clothing, "S,M,L,XL,XXL", "Navy,Grey,Burgundy,Green"),
            p("Hugo Boss Slim Fit Suit",         "Virgin wool blend, notch lapels, two-button closure, flat-front trousers.",                                       39999, img("1507679799987-c73779587ccf"), clothing, "36,38,40,42,44,46,48", "Navy,Charcoal,Black"),
            p("Columbia Outdoor Fleece Jacket",  "MTR fleece, full zip, zippered hand pockets, drawcord hem.",                                                       4999, img("1457369804613-52c61a468e7d"), clothing, "S,M,L,XL,XXL", "Black,Charcoal,Navy,Olive"),
            p("Under Armour Tech T-Shirt 2.0",  "UA Tech fabric, anti-odor technology, loose fit, quick-dry.",                                                      1999, img("1506629082955-511b1aa562c8"), clothing, "S,M,L,XL,XXL,3XL", "Black,White,Red,Royal,Grey"),
            p("Pepe Jeans Slim Fit Joggers",     "French terry cotton, slim tapered leg, elastic waist with drawstring.",                                            1999, img("1552374196-c4e7ffc6e126"), clothing, "S,M,L,XL,XXL", "Black,Grey,Navy,Olive"),
            p("Marks & Spencer Pure Linen Shirt","100% linen, regular fit, button-down collar, chest pocket.",                                                       2999, img("1604695573706-53170668f6a6"), clothing, "S,M,L,XL,XXL", "White,Sky Blue,Beige,Sage Green")
        ));

        /* ================================================================
         *  BOOKS — 40 products
         * ================================================================ */
        productRepository.saveAll(List.of(
            // ── Fiction & Literature ──
            p("Atomic Habits",                   "James Clear's guide to building good habits and breaking bad ones with 1% daily improvements.",                    399, img("1592496431122-2349e0fbc666"), books, null, null),
            p("The Alchemist",                   "Paulo Coelho's magical story of Santiago's journey to find treasure and follow your heart.",                        299, img("1544947950-fa07a98d237f"), books, null, null),
            p("1984",                            "George Orwell's chilling dystopian masterpiece about surveillance, propaganda and Big Brother.",                    249, img("1524578271613-d550eacf6090"), books, null, null),
            p("The Great Gatsby",                "F. Scott Fitzgerald's iconic novel of the Jazz Age, wealth and the American Dream.",                                199, img("1512820790803-83ca734da794"), books, null, null),
            p("To Kill a Mockingbird",           "Harper Lee's Pulitzer Prize-winning novel exploring racial injustice through a child's eyes.",                      299, img("1495446815901-a7297e633e8d"), books, null, null),
            p("Dune",                            "Frank Herbert's epic science fiction saga of politics, religion and ecology on planet Arrakis.",                    449, img("1531346878377-a5be20888e57"), books, null, null),
            p("Harry Potter Complete Box Set",   "The magical 7-book series by J.K. Rowling in a collector's box set with bonus content.",                           2999, img("1589998059171-988d887df646"), books, null, null),
            p("The Lord of the Rings",           "Tolkien's masterwork — an epic adventure of hobbits, elves and the One Ring. Three-volume set.",                   1499, img("1621351183012-e2f9972dd9bf"), books, null, null),
            p("Sapiens",                         "Yuval Noah Harari's brilliant history of humankind from apes to modern civilisation.",                              549, img("1497633762265-9d179a990aa6"), books, null, null),
            p("Ikigai",                          "The Japanese secret to a long, happy and purposeful life by Hector Garcia and Francesc Miralles.",                  349, img("1544716278-ca5e3f4abd8c"), books, null, null),
            // ── Self-Help & Business ──
            p("Rich Dad Poor Dad",               "Robert Kiyosaki on financial education, building wealth and the cashflow quadrant.",                                349, img("1553729459-efe14ef6055d"), books, null, null),
            p("The Psychology of Money",         "Morgan Housel on how people think about money and the timeless lessons of wealth.",                                 449, img("1621264448270-9ef00e88a935"), books, null, null),
            p("Deep Work",                       "Cal Newport's rules for focused success in a world full of distraction and shallow tasks.",                         499, img("1506880018603-83d5b814b5a6"), books, null, null),
            p("Think and Grow Rich",             "Napoleon Hill's classic on the power of thought, persistence and burning desire.",                                  299, img("1526243741027-444d633d7365"), books, null, null),
            p("The 7 Habits of Highly Effective People","Stephen Covey's framework for personal and professional effectiveness.",                                    499, img("1481627834876-b7833e8f5570"), books, null, null),
            p("Zero to One",                     "Peter Thiel on creating something new, escaping competition and building the future.",                              499, img("1497633762265-9d179a990aa6"), books, null, null),
            p("The Lean Startup",                "Eric Ries on validated learning, rapid experimentation and building a sustainable business.",                       499, img("1455390582262-044cdead277a"), books, null, null),
            p("Thinking, Fast and Slow",         "Daniel Kahneman's exploration of two systems that drive how we think and decide.",                                  599, img("1512820790803-83ca734da794"), books, null, null),
            p("The 48 Laws of Power",            "Robert Greene's controversial guide to power, strategy and human nature.",                                          599, img("1612969308146-066d55f37ccb"), books, null, null),
            p("How to Win Friends & Influence People","Dale Carnegie's timeless principles for building relationships and leadership.",                               349, img("1506880018603-83d5b814b5a6"), books, null, null),
            // ── Tech & Programming ──
            p("Clean Code",                      "Robert C. Martin's handbook of agile software craftsmanship and writing maintainable code.",                        899, img("1515879218367-8466d910aaa4"), books, null, null),
            p("The Pragmatic Programmer",        "Andrew Hunt and David Thomas on becoming a better developer and writing better software.",                          999, img("1537432376769-00f5c2f4c8d2"), books, null, null),
            p("Designing Data-Intensive Apps",   "Martin Kleppmann's guide to building reliable, scalable and maintainable systems.",                                1299, img("1558021212-51b6ecfa0db9"), books, null, null),
            p("System Design Interview Vol. 1",  "Alex Xu's step-by-step framework for acing system design questions at top tech companies.",                        1199, img("1516259762381-22954d7d3ad2"), books, null, null),
            p("System Design Interview Vol. 2",  "Advanced topics: proximity service, nearby friends, Google Maps, distributed email.",                              1299, img("1516259762381-22954d7d3ad2"), books, null, null),
            p("JavaScript: The Good Parts",      "Douglas Crockford on the elegant core subset of JavaScript and avoiding its traps.",                                799, img("1592609931095-54a2168ae893"), books, null, null),
            p("Cracking the Coding Interview",   "Gayle McDowell's 189 programming questions and solutions for tech interviews.",                                     999, img("1515879218367-8466d910aaa4"), books, null, null),
            p("Introduction to Algorithms (CLRS)","The definitive textbook on algorithms by Cormen, Leiserson, Rivest and Stein.",                                   3499, img("1537432376769-00f5c2f4c8d2"), books, null, null),
            p("Head First Design Patterns",      "A brain-friendly guide to design patterns using Java with visual learning techniques.",                             899, img("1558021212-51b6ecfa0db9"), books, null, null),
            p("Python Crash Course",             "Eric Matthes' hands-on, project-based introduction to Python programming.",                                         699, img("1592609931095-54a2168ae893"), books, null, null),
            // ── Biography & Non-fiction ──
            p("Steve Jobs by Walter Isaacson",   "The definitive biography of Apple's visionary co-founder based on 40+ interviews.",                                 649, img("1531988042231-d39a9cc12a9a"), books, null, null),
            p("Elon Musk by Walter Isaacson",    "The intimate biography of the most daring entrepreneur of our time.",                                               799, img("1532012197267-da84d127e765"), books, null, null),
            p("Shoe Dog by Phil Knight",         "The Nike co-founder's candid memoir of building a global brand from scratch.",                                      499, img("1544947950-fa07a98d237f"), books, null, null),
            p("Educated by Tara Westover",       "A memoir of a woman who grows up in a survivalist family and earns a PhD from Cambridge.",                          449, img("1507842217343-583bb7270b66"), books, null, null),
            p("Becoming by Michelle Obama",      "The former First Lady's deeply personal memoir of her roots, achievements and hopes.",                              599, img("1512820790803-83ca734da794"), books, null, null),
            p("The Art of War",                  "Sun Tzu's 2500-year-old guide to strategy, leadership and competitive advantage.",                                  199, img("1509266272358-7701da638078"), books, null, null),
            p("Meditations by Marcus Aurelius",  "The Roman Emperor's private Stoic reflections on duty, virtue and resilience.",                                     249, img("1481627834876-b7833e8f5570"), books, null, null),
            p("Man's Search for Meaning",        "Viktor Frankl's account of surviving the Holocaust and finding purpose in suffering.",                               299, img("1553729459-efe14ef6055d"), books, null, null),
            p("Factfulness",                     "Hans Rosling on ten instincts that distort our perspective and why the world is better than we think.",              449, img("1621264448270-9ef00e88a935"), books, null, null),
            p("The Subtle Art of Not Giving a F*ck","Mark Manson's counterintuitive approach to living a good life with honest values.",                              399, img("1544716278-ca5e3f4abd8c"), books, null, null)
        ));

        /* ================================================================
         *  HOME & KITCHEN — 40 products
         * ================================================================ */
        productRepository.saveAll(List.of(
            // ── Kitchen Appliances ──
            p("Instant Pot Duo 7-in-1",          "Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker and warmer in one.",                       7999, img("1556909114-f6e7ad7d3136"), home, null, "Black,Silver"),
            p("Philips Air Fryer XXL",           "Rapid Air technology, 2.65 kg capacity, digital touchscreen, 90% less fat.",                                       9999, img("1585515320310-259814833e62"), home, null, "Black,White"),
            p("KitchenAid Stand Mixer",          "5-quart stainless steel bowl, 10-speed, tilt-head design, planetary mixing action.",                              29999, img("1585399000684-d2f72660f092"), home, null, "Empire Red,Onyx Black,White,Silver"),
            p("Dyson V15 Detect Vacuum",         "Laser dust detection, HEPA filtration, 60-min runtime, LCD shows particle count.",                                54900, img("1558618666-fcd25c85cd64"), home, null, "Nickel/Yellow"),
            p("Philips Hand Blender 650W",       "ProMix technology, dishwasher-safe attachments, speed control, whisk included.",                                    2999, img("1570222094114-d054a817e56b"), home, null, "Black,White"),
            p("Prestige Mixer Grinder 750W",     "750 W motor, 3 stainless steel jars including chutney jar, 5-speed control.",                                      3499, img("1585771724684-38269d6639fd"), home, null, "White/Red,White/Grey"),
            p("Kent RO Water Purifier",          "8 L storage, RO+UV+UF purification, TDS controller, wall-mountable.",                                            12999, img("1556909212-d5b604d0c90d"), home, null, "White/Blue"),
            p("Samsung 28L Convection Microwave","Convection, grill and solo mode, ceramic enamel cavity, slim fry technology.",                                      8999, img("1584568694244-14fbdf83bd30"), home, null, "Black,Silver"),
            p("Borosil Electric Kettle 1.7L",    "Stainless steel interior, auto shut-off, cool-touch handle, 360° swivel base.",                                    1299, img("1544787219-7f47ccb76574"), home, null, "Black,White,Steel"),
            p("Hawkins Contura Pressure Cooker",  "Hard anodised aluminium, cool-touch handles, inner lid, 5-litre capacity.",                                        2299, img("1604382354936-07c5d9983bd3"), home, null, "Black"),
            // ── Cookware & Dining ──
            p("Non-Stick Cookware Set 5pc",      "Hard anodised aluminium, PFOA-free coating, induction compatible, cool-grip handles.",                              4999, img("1567538096630-e0c55bd6374c"), home, null, "Black"),
            p("18-Piece Ceramic Dinner Set",     "Microwave and dishwasher safe, chip-resistant porcelain, elegant design.",                                          3999, img("1595854341625-f33ee10dbf94"), home, null, "White,Ivory,Stone Grey"),
            p("Organic Bamboo Cutting Board",    "Extra-large with juice groove, antimicrobial surface, sustainable bamboo.",                                         1199, img("1556909212-d5b604d0c90d"), home, null, "Natural"),
            p("Glass Storage Jar Set 12-pc",     "Airtight borosilicate glass jars with bamboo lids, stackable design.",                                             1899, img("1556742049-0cfed4f6a45d"), home, null, "Clear"),
            p("Wooden Spice Rack",               "Wall-mounted bamboo organiser with 12 labelled glass jars, easy installation.",                                      999, img("1556909172-54557c7e4fb7"), home, null, "Natural Bamboo"),
            // ── Home Decor ──
            p("Wooden Coffee Table",             "Solid sheesham wood with storage shelf, natural finish, mid-century modern design.",                                7999, img("1555041469-a586c61ea9bc"), home, null, "Natural Teak,Walnut"),
            p("Arc Floor Lamp",                  "Adjustable brightness, brushed steel arch, warm white LED, dimmer switch.",                                         3499, img("1507473885765-e6ed057f782c"), home, null, "Silver,Matte Black,Brass"),
            p("Floating Wall Shelf Set",         "Set of 3 MDF shelves with invisible brackets, 10 kg load capacity each.",                                          1499, img("1513475382585-d06e58bcb0e0"), home, null, "White,Walnut,Oak"),
            p("Indoor Plant Pot Collection",     "Set of 5 ceramic pots with bamboo drain trays, multiple sizes for houseplants.",                                    1799, img("1485955900006-10f4d324d411"), home, null, "White,Terracotta,Sage"),
            p("Luxury Scented Candle Set",       "Set of 6 hand-poured soy wax candles in vanilla, lavender and cedarwood.",                                          999, img("1602928321679-560bb453f190"), home, null, "Ivory,Blush,Sage"),
            p("Macramé Wall Hanging",            "Handwoven cotton macramé, bohemian style, wooden dowel, 90 cm wide.",                                              1499, img("1524758631624-e2822e304c36"), home, null, "Natural,Ivory"),
            // ── Bedding & Bath ──
            p("Premium Cotton Bedsheet Set",     "400 TC Egyptian cotton king-size bedsheet with 2 pillow covers, sateen weave.",                                     2499, img("1631049307264-da0ec9d70304"), home, null, "White,Ivory,Soft Grey,Sky Blue,Dusty Pink"),
            p("Goose Down Duvet Insert",         "700-fill white goose down, baffle-box construction, 300 TC cotton shell.",                                         5999, img("1631049307264-da0ec9d70304"), home, null, "White"),
            p("Memory Foam Pillow Pair",         "Cooling gel-infused memory foam, hypoallergenic cover, cervical support contour.",                                  1999, img("1631049307264-da0ec9d70304"), home, null, "White"),
            p("Luxury Bath Towel Set 6pc",       "Zero-twist Egyptian cotton, 600 GSM, includes bath, hand and face towels.",                                        2999, img("1631049307264-da0ec9d70304"), home, null, "White,Grey,Navy,Teal"),
            // ── Smart Home ──
            p("Smart LED Bulb Pack (4)",         "16 million colours, voice control, Wi-Fi, 10 W, 1000 lumens, works with Alexa.",                                   2499, img("1532635248-cdd3d399f56c"), home, null, "White"),
            p("Robot Vacuum Cleaner",            "LiDAR mapping, 2700 Pa suction, auto-empty dock, works on carpet and hardwood.",                                   19999, img("1558618666-fcd25c85cd64"), home, null, "Black,White"),
            p("Smart Doorbell Camera",           "1080p HD video, two-way audio, night vision, motion detection, cloud storage.",                                     4999, img("1558002038-1055907df827"), home, null, "Black,Silver"),
            p("Echo Dot 5th Gen",                "Improved audio, Alexa voice assistant, smart home hub, eero Wi-Fi mesh.",                                           4499, img("1543512214-318c7553f230"), home, null, "Charcoal,Glacier White,Deep Sea Blue"),
            // ── Storage ──
            p("Foldable Wardrobe Organiser",     "6-shelf hanging organiser, reinforced shelves, breathable fabric, 30 x 30 x 128 cm.",                               799, img("1556742111-a301076d9d18"), home, null, "Grey,Beige"),
            p("Under-Bed Storage Box Set",       "Set of 2 boxes with lids, clear window, handles, moisture-proof fabric.",                                            999, img("1556742212-5b321f3c261b"), home, null, "Grey,White"),
            p("Stackable Shoe Rack 5-Tier",      "Steel frame, non-woven fabric shelves, holds 15 pairs, easy assembly.",                                             1499, img("1595341888016-a392ef81b7de"), home, null, "Black,Grey"),
            // ── Kitchen Tools ──
            p("Japanese Chef Knife Set 5pc",     "High-carbon stainless steel, pakkawood handles, magnetic knife block included.",                                    3999, img("1556909172-54557c7e4fb7"), home, null, "Natural/Silver"),
            p("Cast Iron Skillet 10-inch",       "Pre-seasoned cast iron, heat retention, oven-safe to 500°F, pour spouts.",                                         2499, img("1567538096630-e0c55bd6374c"), home, null, "Black"),
            p("French Press Coffee Maker",       "Borosilicate glass carafe, stainless steel plunger, 4-cup capacity, heat-resistant.",                               1299, img("1570222094114-d054a817e56b"), home, null, "Black,Copper,Silver"),
            p("Stainless Steel Water Bottle 1L", "Double-wall vacuum insulation, 24-hr cold / 12-hr hot, leak-proof lid.",                                            899, img("1602143407151-7111542de6e8"), home, null, "Silver,Black,Rose Gold"),
            p("Silicone Baking Mat Set",         "Non-stick, heat-resistant to 480°F, FDA-approved, set of 3 sizes.",                                                  699, img("1567538096630-e0c55bd6374c"), home, null, "Red,Grey"),
            p("Digital Kitchen Scale",           "Stainless steel platform, 0.1 g precision, tare function, LCD display, 5 kg capacity.",                              899, img("1556909114-f6e7ad7d3136"), home, null, "Silver,Black"),
            p("Bamboo Dish Drying Rack",         "Natural bamboo, foldable design, utensil holder, drip tray included.",                                              1799, img("1556909172-54557c7e4fb7"), home, null, "Natural"),
            p("Insulated Lunch Box Set",         "Stainless steel containers, leak-proof, carry bag, keeps food warm 5 hours.",                                       1499, img("1544787219-7f47ccb76574"), home, null, "Blue,Pink,Green,Grey")
        ));

        /* ================================================================
         *  SPORTS & FITNESS — 40 products
         * ================================================================ */
        productRepository.saveAll(List.of(
            // ── Gym Equipment ──
            p("Adjustable Dumbbell Set 40kg",    "Quick-adjust dial system, replaces 15 sets of weights, compact design.",                                           12999, img("1571019614242-c5c5dee9f50b"), sports, null, "Black"),
            p("Doorframe Pull-Up Bar",           "No screws needed, fits doors 60-100 cm, holds up to 120 kg, foam grips.",                                          1299, img("1597347316205-36f6c451902a"), sports, null, "Black,Silver"),
            p("Kettlebell 16kg Cast Iron",       "Single-piece cast iron, flat base for stability, powder-coat finish.",                                              2499, img("1517838277536-f5f99be501cd"), sports, null, "Black"),
            p("Ab Roller Pro Wheel",             "Wide non-slip wheel, dual mode, elbow mat and knee pad included.",                                                   699, img("1534438327276-14e5300c3a48"), sports, null, "Black/Blue,Black/Red"),
            p("Punching Bag 4ft Heavy",          "Heavy-duty canvas, 30 kg filled, chain and ceiling swivel included.",                                               4999, img("1583454110551-21f2fa2afe61"), sports, null, "Black,Red"),
            p("Flat Weight Bench",               "Heavy-gauge steel, 300 kg capacity, non-slip feet, compact foldable design.",                                       5999, img("1571019613454-1cb2f99b2d8b"), sports, null, "Black"),
            p("Resistance Bands Set 5pc",        "Loop bands from 10-50 lbs, natural latex, carry bag, ideal for rehab.",                                              799, img("1598289431512-b97b0917affc"), sports, null, "Multicolour"),
            p("Jump Rope Speed Cable",           "Adjustable steel cable, 360° ball bearing, foam handles, for boxing and HIIT.",                                      499, img("1606902965551-dce093cda6e7"), sports, null, "Black,Blue,Red"),
            // ── Yoga & Flexibility ──
            p("Liforme Yoga Mat",                "6 mm thick, natural rubber, alignment markers, non-slip, 185 x 68 cm.",                                            4999, img("1575052814086-f385e2e2ad1b"), sports, null, "Purple,Black,Blue,Dusty Pink"),
            p("EVA Foam Roller 60cm",            "High-density EVA foam, 60 × 15 cm, for muscle recovery and myofascial release.",                                     899, img("1518611012118-696072aa579a"), sports, null, "Black,Blue,Orange"),
            p("Yoga Block Set (2 Blocks)",       "High-density EVA foam, bevelled edges, non-slip surface, 23 × 15 × 10 cm.",                                         599, img("1575052814086-f385e2e2ad1b"), sports, null, "Black,Purple,Blue"),
            p("Meditation Cushion Zafu",         "Buckwheat hull filling, organic cotton cover, carry handle, 36 cm diameter.",                                       1499, img("1575052814086-f385e2e2ad1b"), sports, null, "Grey,Blue,Purple,Sage"),
            // ── Running & Shoes ──
            p("Asics Gel-Nimbus Running Shoes",  "FlyteFoam midsole, GEL cushioning, breathable mesh upper, road running.",                                          11999, img("1461896836934-ffe607ba8211"), sports, "6,7,8,9,10,11", "Black/White,Blue/Orange,Grey/Lime"),
            p("Nike Pegasus 40",                 "Zoom Air units, React foam, engineered mesh, daily training shoe.",                                                 9999, img("1542291026-7eec264c27ff"), sports, "6,7,8,9,10,11,12", "Black/White,White/Red,Grey,Volt"),
            p("New Balance Fresh Foam 1080v13",  "Fresh Foam X midsole, Hypoknit upper, ultra-cushioned, marathon ready.",                                           14999, img("1595950653106-6c9ebd614d3a"), sports, "6,7,8,9,10,11", "Black,White/Blue,Grey/Orange"),
            p("Under Armour HOVR Sonic 6",       "UA HOVR cushioning, Bluetooth connectivity, breathable mesh, neutral runner.",                                      8999, img("1608231387042-66d1773070a5"), sports, "6,7,8,9,10,11", "Black,White,Blue"),
            // ── Outdoor & Team Sports ──
            p("SG Cricket Bat English Willow",   "Grade 3 English willow, full-size, full cane handle, triple-spring grip.",                                          3499, img("1531415074968-036ba1b575da"), sports, null, "Natural"),
            p("Nivia Storm Football Size 5",     "32-panel machine-stitched PVC, FIFA basic approved, grass and turf.",                                                 899, img("1517649763962-0c623066013b"), sports, null, "Black/White"),
            p("Spalding NBA Official Basketball","Composite leather, indoor/outdoor, official size 7, deep channel design.",                                           2499, img("1546519638-68e109498ffc"), sports, null, "Orange"),
            p("Wilson Pro Staff Tennis Racket",  "Graphite frame, 16 × 19 string pattern, 315 g, intermediate-advanced.",                                             3999, img("1599058917212-d750089bc07e"), sports, null, "Red/Black,Blue/Black"),
            p("Yonex Badminton Set",             "2 Nanoray carbon rackets, 3 nylon shuttlecocks, full-size carry bag.",                                               1799, img("1626224583764-f87db24ac4ea"), sports, null, "Black/Red,Blue/Gold"),
            // ── Nutrition & Recovery ──
            p("ON Gold Standard Whey 2kg",       "24 g protein per scoop, 5.5 g BCAAs, double rich chocolate flavour, low sugar.",                                    4999, img("1593095948071-474c5cc2989d"), sports, null, "Double Rich Chocolate,Vanilla,Strawberry"),
            p("MuscleBlaze BCAA Pro 400g",       "7 g BCAAs per serving, electrolytes, watermelon flavour, intra-workout.",                                           1299, img("1593095948071-474c5cc2989d"), sports, null, "Watermelon,Tangy Orange,Fruit Splash"),
            p("Electrolyte Hydration Tabs 20pc","Effervescent tablets, zero sugar, sodium, potassium, magnesium, vitamin C.",                                          399, img("1593095948071-474c5cc2989d"), sports, null, "Lemon-Lime,Berry,Orange"),
            // ── Accessories ──
            p("Hydro Flask 32oz Bottle",         "TempShield insulation, 18/8 stainless steel, 24-hr cold / 12-hr hot.",                                             2799, img("1602143407151-7111542de6e8"), sports, null, "Black,Pacific,Watermelon,Cobalt,Olive"),
            p("Harbinger Gym Gloves",            "Full-finger protection, anti-slip silicone grip, wrist wrap support.",                                                999, img("1622279457486-62dcc4a431d6"), sports, "S,M,L,XL", "Black,Grey"),
            p("Knee Support Sleeve Pair",        "Compression neoprene, anatomical fit, pain relief, open patella design.",                                             799, img("1571019613454-1cb2f99b2d8b"), sports, "S,M,L,XL", "Black,Blue"),
            p("Nivia MTB Cycling Helmet",        "18 vents, ABS shell, EPS liner, adjustable fit system, reflective decals.",                                         1999, img("1571902943202-507ec2618e8f"), sports, "S,M,L", "Matte Black,White,Red,Blue"),
            p("Speedo Swimming Goggles",         "Anti-fog UV protection lenses, adjustable split strap, hydrodynamic fit.",                                            899, img("1560090995-01632a28895b"), sports, null, "Black,Blue,Clear"),
            p("Sports Wrist Bands Pair",         "Terry cotton, moisture-wicking, elastic, 8 cm width, logo embroidered.",                                              299, img("1534438327276-14e5300c3a48"), sports, "Free Size", "White,Black,Red,Blue"),
            // ── Equipment ──
            p("Lifefitness Treadmill T3",        "Compact folding, 12 programs, 16 kph max, heart rate monitor, LCD display.",                                       49999, img("1576678927484-cc907957088c"), sports, null, "Black/Silver"),
            p("Assault Air Bike",                "Fan resistance, unlimited intensity, heavy-duty steel frame, LCD console.",                                         39999, img("1574680178050-55c6a6a96e0a"), sports, null, "Black"),
            p("TRX Suspension Trainer Pro",      "Commercial-grade nylon straps, steel carabiners, door anchor, carry bag.",                                          9999, img("1598289431512-b97b0917affc"), sports, null, "Black/Yellow"),
            p("Rogue Echo Bumper Plates Set",    "Virgin rubber, steel hub insert, low bounce, sold as a pair. 20 kg each.",                                         12999, img("1571019614242-c5c5dee9f50b"), sports, null, "Black"),
            p("Power Tower Dip Station",         "Multi-grip pull-up bar, dip handles, VKR, push-up grips, 150 kg capacity.",                                         8999, img("1581009146145-b5ef050c2e1e"), sports, null, "Black/Red"),
            p("Adjustable Skipping Rope Pro",    "Weighted handles, ball-bearing swivel, adjustable length, for CrossFit.",                                             699, img("1606902965551-dce093cda6e7"), sports, null, "Black,Red"),
            p("Premium Gym Bag 40L",             "Separate shoe compartment, wet pocket, padded shoulder strap, durable nylon.",                                       1999, img("1584992236310-6edddc08acff"), sports, null, "Black,Grey,Navy"),
            p("Compression Athletic Socks 3-Pack","Moisture-wicking, arch support, cushioned sole, anti-blister, crew length.",                                         599, img("1534438327276-14e5300c3a48"), sports, "S,M,L", "Black,White,Grey"),
            p("Sports Sunglasses Polarised",     "Polycarbonate lenses, UV400 protection, non-slip nose pads, wraparound fit.",                                       1499, img("1572635196184-84e35138cf62"), sports, "Free Size", "Black,Blue,Red")
        ));

        System.out.println("Seeded: 5 categories, " + productRepository.count() + " products");
    }

    private Category cat(String name, String desc) {
        return categoryRepository.save(Category.builder().name(name).description(desc).build());
    }

    private Product p(String name, String desc, int price, String imgUrl,
                      Category cat, String sizes, String colors) {
        return Product.builder()
                .name(name)
                .description(desc)
                .price(new BigDecimal(price))
                .stock(10)
                .imageUrl(imgUrl)
                .category(cat)
                .sizes(sizes)
                .colors(colors)
                .build();
    }
}
