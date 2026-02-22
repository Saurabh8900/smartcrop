import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateCommunityPosts, generatePlatformStats } from "@/lib/faker-data";
import {
    Users,
    MessageSquare,
    ThumbsUp,
    Eye,
    CheckCircle,
    BadgeCheck,
    Tag,
    Search,
    PlusCircle,
} from "lucide-react";

function AuthorTypeBadge({ type }) {
    if (type === "Agricultural Expert" || type === "KVK Officer") {
        return (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-semibold">
                <BadgeCheck className="w-2.5 h-2.5" />
                {type}
            </span>
        );
    }
    return (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            {type}
        </span>
    );
}

const categoryFilters = [
    { label: "All Posts", active: true },
    { label: "Pest & Disease", active: false },
    { label: "Market Prices", active: false },
    { label: "Irrigation", active: false },
    { label: "Success Stories", active: false },
    { label: "Government Schemes", active: false },
];

export default function CommunityPage() {
    const posts = generateCommunityPosts();
    const stats = generatePlatformStats();

    const answered = posts.filter((p) => p.isAnswered).length;
    const experts = posts.filter((p) =>
        ["Agricultural Expert", "KVK Officer"].includes(p.authorType)
    ).length;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-green-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Farmer Community</h1>
                    </div>
                    <p className="text-gray-500">
                        Connect with {(stats.farmers / 1000).toFixed(0)}K+ farmers. Ask questions, share
                        knowledge, and learn from agricultural experts.
                    </p>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                        { value: `${(stats.farmers / 1000).toFixed(0)}K+`, label: "Members", icon: "👥" },
                        { value: posts.length, label: "Active Discussions", icon: "💬" },
                        { value: answered, label: "Answered", icon: "✅" },
                        { value: experts, label: "Expert Replies", icon: "🎓" },
                    ].map(({ value, label, icon }) => (
                        <div key={label} className="bg-white rounded-2xl border border-green-100 p-4 text-center shadow-sm">
                            <div className="text-2xl mb-1">{icon}</div>
                            <div className="text-xl font-bold text-green-700">{value}</div>
                            <div className="text-xs text-gray-500">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main feed */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* Search + Ask */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-xl text-sm focus:outline-none focus:border-green-400 bg-white"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap">
                                <PlusCircle className="w-4 h-4" />
                                Ask Question
                            </button>
                        </div>

                        {/* Category filters */}
                        <div className="flex gap-2 flex-wrap">
                            {categoryFilters.map(({ label, active }) => (
                                <span
                                    key={label}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${active
                                            ? "bg-green-600 text-white"
                                            : "bg-white border border-green-200 text-gray-600 hover:bg-green-50"
                                        }`}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>

                        {/* Posts */}
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm card-hover cursor-pointer hover:border-green-300 transition-colors"
                            >
                                {/* Author line */}
                                <div className="flex items-center gap-2.5 mb-3">
                                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                                        {post.author[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-gray-800 text-sm">{post.author}</span>
                                            <AuthorTypeBadge type={post.authorType} />
                                            {post.isVerified && (
                                                <span className="text-[10px] text-green-600 flex items-center gap-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                            <span>{post.authorState}</span>
                                            <span>·</span>
                                            <span>{post.timeAgo}</span>
                                        </div>
                                    </div>
                                    {post.isAnswered && (
                                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded-full font-semibold">
                                            ✓ Answered
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{post.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{post.body}</p>

                                {/* Tags */}
                                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                                    <Tag className="w-3 h-3 text-gray-400" />
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Engagement */}
                                <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-50 pt-3">
                                    <div className="flex items-center gap-1 hover:text-green-600 cursor-pointer transition-colors">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                        <span>{post.upvotes} upvotes</span>
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>{post.comments} comments</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>{post.views} views</span>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                                        ❤️ <span>{post.likes}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">

                        {/* Ask a quick question */}
                        <div className="bg-green-700 text-white rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-2">Have a Question?</h3>
                            <p className="text-green-200 text-sm mb-4">
                                Get answers from our community of farmers and agricultural experts within hours.
                            </p>
                            <textarea
                                placeholder="Describe your farming issue..."
                                rows={3}
                                className="w-full bg-green-600/50 border border-green-500 rounded-xl p-3 text-sm text-white placeholder-green-300 focus:outline-none focus:border-green-300 resize-none mb-3"
                            />
                            <button className="w-full py-2.5 bg-yellow-400 text-green-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
                                Post Question
                            </button>
                        </div>

                        {/* Top contributors */}
                        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Top Contributors</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Dr. A. Sharma", role: "KVK Officer", posts: 142, emoji: "🎓" },
                                    { name: "Ramesh Patel", role: "Small Farmer", posts: 89, emoji: "👨‍🌾" },
                                    { name: "Sunita Devi", role: "Marginal Farmer", posts: 76, emoji: "👩‍🌾" },
                                    { name: "M. Singh", role: "Agri Expert", posts: 65, emoji: "🔬" },
                                    { name: "K. Yadav", role: "Small Farmer", posts: 54, emoji: "👨‍🌾" },
                                ].map(({ name, role, posts, emoji }, i) => (
                                    <div key={name} className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-600">
                                            {i + 1}
                                        </div>
                                        <span className="text-xl">{emoji}</span>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-800">{name}</div>
                                            <div className="text-[10px] text-gray-400">{role}</div>
                                        </div>
                                        <div className="text-xs font-medium text-green-600">{posts} posts</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trending topics */}
                        <div className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
                            <div className="space-y-2">
                                {[
                                    { tag: "#WheatPrices", count: 245 },
                                    { tag: "#RabiSeason2026", count: 189 },
                                    { tag: "#WaterConservation", count: 156 },
                                    { tag: "#PMKisanScheme", count: 134 },
                                    { tag: "#OrganicFarming", count: 98 },
                                    { tag: "#FallArmyworm", count: 87 },
                                ].map(({ tag, count }) => (
                                    <div
                                        key={tag}
                                        className="flex items-center justify-between py-1.5 cursor-pointer hover:text-green-600 transition-colors"
                                    >
                                        <span className="text-sm text-green-700 font-medium">{tag}</span>
                                        <span className="text-xs text-gray-400">{count} posts</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Helpline */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                            <div className="text-2xl mb-2">📞</div>
                            <h3 className="font-semibold text-amber-900 mb-1">Kisan Helpline</h3>
                            <p className="text-xs text-amber-700 mb-3">
                                Speak to an agricultural expert directly in your language.
                            </p>
                            <a
                                href="tel:18001801551"
                                className="block text-center py-2 bg-amber-400 text-amber-900 font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors"
                            >
                                1800-180-1551 (Free)
                            </a>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
