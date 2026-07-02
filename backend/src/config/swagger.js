import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "LAT BIOSKOP API",
            version: "1.0.0",
            description: "REST API Sistem Pemesanan Tiket Bioskop"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id_user: {
                            type: "string",
                            example: "U001"
                        },
                        nama: {
                            type: "string",
                            example: "Daniel"
                        },
                        email: {
                            type: "string",
                            example: "daniel@gmail.com"
                        },
                        nomor_telepon: {
                            type: "string",
                            example: "08123456789"
                        },
                        role: {
                            type: "string",
                            enum: ["admin", "customer"],
                            example: "customer"
                        }
                    }
                },

                RegisterRequest: {
                    type: "object",
                    required: [
                        "nama",
                        "email",
                        "password",
                        "nomor_telepon"
                    ],
                    properties: {
                        nama: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        },
                        nomor_telepon: {
                            type: "string"
                        }
                    }
                },

                LoginRequest: {
                    type: "object",
                    required: [
                        "email",
                        "password"
                    ],
                    properties: {
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }
                    }
                },

                UpdateUserRequest: {
                    type: "object",
                    required: [
                        "nama",
                        "email",
                        "nomor_telepon",
                        "role"
                    ],
                    properties: {
                        nama: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        nomor_telepon: {
                            type: "string"
                        },
                        role: {
                            type: "string",
                            enum: ["admin", "customer"]
                        }
                    }
                },

                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true
                        },
                        message: {
                            type: "string",
                            example: "Berhasil"
                        },
                        data: {
                            type: "object"
                        }
                    }
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false
                        },
                        message: {
                            type: "string",
                            example: "Terjadi kesalahan"
                        }
                    }
                },

                Movie: {
                    type: "object",
                    properties: {
                        id_movie: {
                            type: "string",
                            example: "M001"
                        },
                        judul: {
                            type: "string",
                            example: "Avengers: Endgame"
                        },
                        genre: {
                            type: "string",
                            example: "Action"
                        },
                        durasi: {
                            type: "integer",
                            example: 180
                        },
                        rating_usia: {
                            type: "string",
                            example: "13+"
                        },
                        jadwal_tayang: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-01 19:00:00"
                        },
                        harga_tiket: {
                            type: "number",
                            example: 50000
                        }
                    }
                },

                CreateMovieRequest: {
                    type: "object",
                    required: [
                        "judul",
                        "genre",
                        "durasi",
                        "rating_usia",
                        "jadwal_tayang",
                        "harga_tiket"
                    ],
                    properties: {
                        judul: {
                            type: "string",
                            example: "Avengers: Endgame"
                        },
                        genre: {
                            type: "string",
                            example: "Action"
                        },
                        durasi: {
                            type: "integer",
                            example: 180
                        },
                        rating_usia: {
                            type: "string",
                            example: "13+"
                        },
                        jadwal_tayang: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-01 19:00:00"
                        },
                        harga_tiket: {
                            type: "number",
                            example: 50000
                        }
                    }
                },

                UpdateMovieRequest: {
                    type: "object",
                    required: [
                        "judul",
                        "genre",
                        "durasi",
                        "rating_usia",
                        "jadwal_tayang",
                        "harga_tiket"
                    ],
                    properties: {
                        judul: {
                            type: "string",
                            example: "Avengers: Endgame"
                        },
                        genre: {
                            type: "string",
                            example: "Action"
                        },
                        durasi: {
                            type: "integer",
                            example: 180
                        },
                        rating_usia: {
                            type: "string",
                            example: "13+"
                        },
                        jadwal_tayang: {
                            type: "string",
                            format: "date-time",
                            example: "2026-07-01 19:00:00"
                        },
                        harga_tiket: {
                            type: "number",
                            example: 50000
                        }
                    }
                },

                Booking: {
                    type: "object",
                    properties: {
                        id_booking: {
                            type: "string",
                            example: "B001"
                        },
                        id_user: {
                            type: "string",
                            example: "U001"
                        },
                        id_movie: {
                            type: "string",
                            example: "M001"
                        },
                        jumlah_tiket: {
                            type: "integer",
                            example: 2
                        },
                        tanggal_booking: {
                            type: "string",
                            format: "date-time"
                        },
                        total_harga: {
                            type: "number",
                            example: 100000
                        },
                        status_booking: {
                            type: "string",
                            enum: [
                                "pending",
                                "sukses",
                                "dibatalkan"
                            ]
                        }
                    }
                },

                CreateBookingRequest: {
                    type: "object",
                    required: [
                        "id_movie",
                        "jumlah_tiket"
                    ],
                    properties: {
                        id_movie: {
                            type: "string",
                            example: "M001"
                        },
                        jumlah_tiket: {
                            type: "integer",
                            example: 2
                        }
                    }
                },

                UpdateBookingRequest: {
                    type: "object",
                    required: [
                        "status_booking"
                    ],
                    properties: {
                        status_booking: {
                            type: "string",
                            enum: [
                                "pending",
                                "sukses",
                                "dibatalkan"
                            ]
                        }
                    }
                },
            }
        }
    },

    apis: [
        "./src/routes/*.js"
    ]
};



const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;