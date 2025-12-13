import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Explore.module.css";
import Header from "@/components/Header";
import fallImg from "@/assets/fall.jpg";
import hundruImg from "@/assets/fallsH.jpg";
import parkImg from "@/assets/park.jpg";
import lingamImg from "@/assets/lingam.jpg";
import natImg from "@/assets/nat.jpg";

/* ----------------------------- Types ----------------------------- */
type Category = "Waterfall" | "Temple" | "Park" | "Heritage";
type Attraction = {
    id: string;
    name: string;
    location: string;
    category: Category;
    image: string;
    blurb: string;
    rating: number; // 0–5
    tags: string[];
};

/* -------------------------- Mocked Data -------------------------- */
const MOCK_DATA: Attraction[] = [
    {
        id: "dassam",
        name: "Dassam Falls",
        location: "Near Ranchi",
        category: "Waterfall",
        image: fallImg,
        blurb: "A stunning 144-ft waterfall on the Kanchi River. Best right after monsoon.",
        rating: 4.6,
        tags: ["family", "photography", "nature", "waterfall"],
    },
    {
        id: "hundru",
        name: "Hundru Falls",
        location: "Ranchi",
        category: "Waterfall",
        image: hundruImg,
        blurb: "One of the highest waterfalls in Jharkhand with dramatic gorge views.",
        rating: 4.5,
        tags: ["adventure", "trek", "monsoon", "waterfall"],
    },
    {
        id: "betla",
        name: "Betla National Park",
        location: "Palamu",
        category: "Park",
        image: parkImg,
        blurb: "Wildlife sanctuary with sal forests; safaris and watchtowers.",
        rating: 4.3,
        tags: ["wildlife", "safari", "family", "park"],
    },
    {
        id: "baidyanath",
        name: "Baidyanath Jyotirlinga",
        location: "Deoghar",
        category: "Temple",
        image: lingamImg,
        blurb: "Prominent Jyotirlinga shrine; vibrant during Shravan Mela.",
        rating: 4.7,
        tags: ["pilgrimage", "culture", "heritage", "temple"],
    },
    {
        id: "netarhat",
        name: "Netarhat",
        location: "Latehar",
        category: "Heritage",
        image: natImg,
        blurb: "Queen of Chotanagpur—sunrise/sunset points and pine forests.",
        rating: 4.4,
        tags: ["hills", "sunset", "weekend", "heritage"],
    },
];

/* ---------------------------- Helpers ---------------------------- */
const normalize = (s: string) =>
    s.toLowerCase().normalize("NFKD").replace(/\p{Diacritic}/gu, "");

const SYNONYMS: Record<string, Category> = {
    waterfall: "Waterfall",
    waterfalls: "Waterfall",
    falls: "Waterfall",
    temple: "Temple",
    temples: "Temple",
    park: "Park",
    "national park": "Park",
    wildlife: "Park",
    heritage: "Heritage",
    hills: "Heritage",
    hill: "Heritage",
};

function scoreAttraction(a: Attraction, qTokens: string[]): number {
    if (qTokens.length === 0) return 1; // neutral score when no query
    const hayName = normalize(a.name);
    const hayLoc = normalize(a.location);
    const hayBlurb = normalize(a.blurb);
    const hayTags = a.tags.map(normalize);

    let score = 0;
    for (const t of qTokens) {
        if (!t) continue;
        if (hayName.includes(t)) score += 5;
        if (hayLoc.includes(t)) score += 3;
        if (hayBlurb.includes(t)) score += 2;
        if (hayTags.some((tag) => tag.includes(t))) score += 2;

        // category by synonym
        const cat = SYNONYMS[t];
        if (cat && a.category === cat) score += 4;
    }
    return score;
}

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

/* --------------------------- Highlight UI ------------------------ */
const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
    const q = normalize(query).trim();
    if (!q) return <>{text}</>;
    const parts = text.split(new RegExp(`(${query})`, "ig"));
    return (
        <>
            {parts.map((p, i) =>
                normalize(p) === q ? (
                    <mark key={i} className={styles.highlight}>
                        {p}
                    </mark>
                ) : (
                    <React.Fragment key={i}>{p}</React.Fragment>
                ),
            )}
        </>
    );
};

/* ------------------------------ Page ----------------------------- */
export default function Explore() {
    const q = useQuery();
    const navigate = useNavigate();

    // from hero
    const initialQuery = q.get("q") ?? "";
    const initialDate = q.get("date") ?? "";
    const initialGuests = q.get("guests") ?? "1";

    const [search, setSearch] = useState(initialQuery);
    const [category, setCategory] = useState<string>("all");
    const [sort, setSort] = useState<"relevance" | "rating">("relevance");

    // keep URL in sync when these change via form submit
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("q", search);
        if (initialDate) params.set("date", initialDate);
        if (initialGuests) params.set("guests", initialGuests);
        if (category !== "all") params.set("cat", category);
        if (sort !== "relevance") params.set("sort", sort);
        navigate(`/explore?${params.toString()}`);
    };

    // read optional cat/sort from URL on first mount
    useEffect(() => {
        const cat = q.get("cat");
        const srt = q.get("sort");
        if (cat) setCategory(cat);
        if (srt === "rating") setSort("rating");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = useMemo(() => {
        const qStr = normalize(search.trim());
        const qTokens = qStr.split(/\s+/).filter(Boolean);

        let rows = MOCK_DATA.filter((a) => {
            const matchesCategory = category === "all" || a.category === category;

            // token scoring for relevance
            const s = scoreAttraction(a, qTokens);
            // direct empty query = include
            const include = qTokens.length === 0 ? true : s > 0;

            // also allow plain substring when users type full names/locations
            const plain =
                !qStr ||
                normalize(a.name).includes(qStr) ||
                normalize(a.location).includes(qStr) ||
                normalize(a.blurb).includes(qStr) ||
                a.tags.map(normalize).some((t) => t.includes(qStr));

            return matchesCategory && (include || plain);
        });

        if (sort === "rating") {
            rows = [...rows].sort((a, b) => b.rating - a.rating);
        } else {
            // relevance: compute scores and sort by it, fallback to rating
            const withScore = rows
                .map((a) => ({ a, s: scoreAttraction(a, qTokens) }))
                .sort((x, y) => (y.s - x.s) || (y.a.rating - x.a.rating))
                .map(({ a }) => a);
            rows = withScore;
        }
        return rows;
    }, [search, category, sort]);

    return (
        <div>
            <Header />
            <div className={styles.page}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <h1>Explore Jharkhand</h1>

                        <p className={styles.sub}>
                            {initialDate && <span className={styles.chip}>📅 {initialDate}</span>}
                            {initialGuests && <span className={styles.chip}>👥 {initialGuests} guest(s)</span>}
                            {initialQuery && <span className={styles.chip}>🔎 “{initialQuery}”</span>}
                            {category !== "all" && <span className={styles.chip}>🧭 {category}</span>}
                            <span className={`${styles.chip} ${styles.pill} ${styles.count}`}>
                                {filtered.length} place{filtered.length === 1 ? "" : "s"}
                            </span>
                        </p>

                        <form onSubmit={onSubmit} className={styles.controls}>
                            <input
                                className={styles.input}
                                placeholder="Search destinations, waterfalls, parks…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={styles.select}
                            >
                                <option value="all">All categories</option>
                                <option value="Waterfall">Waterfalls</option>
                                <option value="Temple">Temples</option>
                                <option value="Park">National Parks</option>
                                <option value="Heritage">Heritage & Hills</option>
                            </select>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as "relevance" | "rating")}
                                className={styles.select}
                            >
                                <option value="relevance">Sort: Relevance</option>
                                <option value="rating">Sort: Rating</option>
                            </select>

                            <button className={styles.button} type="submit">Search</button>
                        </form>
                    </header>

                    <main>
                        {filtered.length === 0 ? (
                            <div className={styles.empty}>
                                No places found. Try a different keyword or category
                                (tip: try “falls”, “waterfall”, “temple”, “park”, “hills”…).
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {filtered.map((a) => (
                                    <article key={a.id} className={styles.card}>
                                        <div className={styles.imageWrap}>
                                            <img
                                                src={a.image}
                                                alt={a.name}
                                                className={styles.image}
                                            />
                                            <span className={styles.badge}>{a.category}</span>
                                        </div>

                                        <div className={styles.cardBody}>
                                            <h3 className={styles.title}>
                                                <Highlight text={a.name} query={search} />
                                            </h3>
                                            <p className={styles.meta}>
                                                📍 <Highlight text={a.location} query={search} />
                                            </p>
                                            <p className={styles.blurb}>
                                                <Highlight text={a.blurb} query={search} />
                                            </p>
                                            <div className={styles.footerRow}>
                                                <span className={styles.rating}>⭐ {a.rating.toFixed(1)}</span>
                                                <button className={styles.secondary}>View details</button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
