import {
    Users,
    Film,
    Ticket,
    Clock
} from "lucide-react";

function Dashboard() {

    const cards = [
        {
            title: "Total Users",
            total: "-",
            icon: <Users size={40} />
        },
        {
            title: "Total Movies",
            total: "-",
            icon: <Film size={40} />
        },
        {
            title: "Total Bookings",
            total: "-",
            icon: <Ticket size={40} />
        },
        {
            title: "Pending Booking",
            total: "-",
            icon: <Clock size={40} />
        }
    ];

    return (
        <div>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard Admin
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {
                    cards.map((card) => (

                        <div
                            key={card.title}
                            className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
                        >

                            <div>

                                <h2 className="text-gray-500">
                                    {card.title}
                                </h2>

                                <h1 className="text-4xl font-bold mt-2">
                                    {card.total}
                                </h1>

                            </div>

                            <div className="text-blue-600">

                                {card.icon}

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default Dashboard;