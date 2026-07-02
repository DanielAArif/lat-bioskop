import {
    Users,
    Film,
    Ticket,
    Clock
} from "lucide-react";

function Dashboard() {
    // Data dummy sementara (Ganti "-" dengan state data dari API jika sudah siap)
    const cards = [
        {
            title: "Total Pengguna",
            total: "-",
            icon: <Users size={20} />
        },
        {
            title: "Total Film",
            total: "-",
            icon: <Film size={20} />
        },
        {
            title: "Total Booking",
            total: "-",
            icon: <Ticket size={20} />
        },
        {
            title: "Booking Tertunda",
            total: "-",
            icon: <Clock size={20} />
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-2">
            {/* Header Judul Utama */}
            <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    Ringkasan Dashboard
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Memantau statistik pengguna, film, dan transaksi aktif.
                </p>
            </div>

            {/* Grid Layout Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="bg-white rounded border border-gray-100 shadow-sm p-5 flex justify-between items-start transition-all hover:border-gray-200"
                    >
                        <div className="space-y-2">
                            {/* Judul Card: Teks Kecil Kapital */}
                            <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                {card.title}
                            </h2>
                            {/* Angka Total */}
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                {card.total}
                            </h1>
                        </div>

                        {/* Wadah Ikon: Abu-abu Netral Lembut (Bukan Biru) */}
                        <div className="text-gray-400 p-2 bg-gray-50 rounded-sm border border-gray-100/50 mt-0.5">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;