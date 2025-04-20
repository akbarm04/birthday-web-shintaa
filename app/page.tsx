"use client";

import { useState, useEffect, useRef } from "react";
import {
  Cake,
  Star,
  Music,
  Search,
  Instagram,
  Twitter,
  Youtube,
  TwitterIcon as TikTok,
  Pause,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Calculate age
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge("2014-04-20");

  // Show confetti when page loads
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize audio element
  useEffect(() => {
    // Buat elemen audio secara langsung di DOM
    const audioElement = document.createElement("audio");
    audioElement.src = "/birthday-song.mp3";
    audioElement.preload = "auto";

    console.log("Audio element dibuat dengan src:", audioElement.src);

    audioRef.current = audioElement;

    // Tambahkan event listeners
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        console.log("Audio selesai diputar");
      });

      audioRef.current.addEventListener("error", (e) => {
        console.error("Error audio:", e);
        setIsPlaying(false);
        alert("Gagal memutar lagu. Silakan coba lagi nanti.");
      });

      // Coba load audio untuk memastikan file ada
      audioRef.current.load();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
        audioRef.current.removeEventListener("error", () => {
          setIsPlaying(false);
        });
      }
    };
  }, []);

  // Toggle play/pause
  const togglePlayback = () => {
    if (!audioRef.current) {
      console.error("Audio element tidak ditemukan");
      return;
    }

    console.log("File audio path:", audioRef.current.src);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Audio dijeda");
    } else {
      // Putar audio dengan penanganan error yang lebih baik
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio berhasil diputar");
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error memutar audio:", error);
          alert("Gagal memutar lagu. Error: " + error.message);
        });
    }
  };

  // JKT48 member data
  const members = [
    {
      id: 1,
      name: "Angelina Christy",
      nickname: "Christy",
      team: "K",
      generation: 7,
      birthdate: "5 Desember 2005",
      zodiac: "Sagitarius",
      jikoshokai: "Peduli dan berbaik hati, siapakah dia? Christy~",
      image: "/member1.jpg",
    },
    {
      id: 2,
      name: "Shania Gracia",
      nickname: "Gracia",
      team: "J",
      generation: 3,
      birthdate: "31 Agustus 1999",
      zodiac: "Virgo",
      jikoshokai: "Semanis coklat, selembut sutra. Halo, aku Shani",
      image: "/member2.jpeg",
    },
    {
      id: 3,
      name: "Gita Sekar Andarini",
      nickname: "Gita",
      team: "T",
      generation: 6,
      birthdate: "30 September 2001",
      zodiac: "Libra",
      jikoshokai: "Diam bukan berarti tidak memperhatikanmu, aku Gita!",
      image: "/member3.jpeg",
    },
    {
      id: 4,
      name: "Fiony Alveria Tantri",
      nickname: "Fiony",
      team: "K",
      generation: 8,
      birthdate: "4 Februari 2002",
      zodiac: "Aquarius",
      jikoshokai: "Seperti simfoni yang menenangkan hati, Halo aku Fiony!",
      image: "/member4.jpg",
    },
    {
      id: 5,
      name: "Indah Cahya Nabilla",
      nickname: "Indah",
      team: "T",
      generation: 9,
      birthdate: "20 Maret 2001",
      zodiac: "Pisces",
      jikoshokai:
        "Tak banyak berbicara bercerita lewat tulisan, Hai aku Indah!",
      image: "/member5.jpg",
    },
    {
      id: 6,
      name: "Anindya Ramadhani Purnomo",
      nickname: "Anin",
      team: "J",
      generation: 11,
      birthdate: "18 Oktober 2005",
      zodiac: "Libra",
      jikoshokai: "Si mungil hadir, semanis mangga, Hai, aku Anindya!",
      image: "/member6.jpg",
    },
  ];

  // Filter states
  const [activeGeneration, setActiveGeneration] = useState<number | null>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesGeneration =
      activeGeneration === null || member.generation === activeGeneration;
    // const matchesTeam = activeTeam === null || member.team === activeTeam;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.nickname.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGeneration && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 font-sans">
      {showConfetti && <Confetti />}

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-300 mr-2" />
            <span className="text-xl font-bold">JKT48 Fan Page</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="birthday" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-pink-100">
            <TabsTrigger
              value="birthday"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Ulang Tahun
            </TabsTrigger>
            <TabsTrigger
              value="jikoshokai"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Member JKT48
            </TabsTrigger>
          </TabsList>

          <TabsContent value="birthday">
            <Card className="border-none shadow-lg overflow-hidden">
              {/* Hero Section */}
              <div className="relative h-auto min-h-[400px] md:h-96 bg-gradient-to-r from-pink-400 to-purple-400 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-12 md:py-0 text-white z-10">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Selamat Ulang Tahun Ke-{age}
                  </h1>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-yellow-300">
                    Shinta Adelia
                  </h2>
                  <p className="text-base md:text-lg mb-4 md:mb-6">
                    20 April 2014
                  </p>
                  <p className="text-base md:text-lg mb-6 md:mb-8">
                    Semoga panjang umur, sehat selalu, dan semua cita-citamu
                    tercapai!
                  </p>
                  <Button
                    className={`${
                      isPlaying
                        ? "bg-pink-100 text-pink-600"
                        : "bg-white text-pink-500"
                    } hover:bg-pink-100 border-none w-full md:w-auto transition-all duration-300 ${
                      isPlaying ? "animate-pulse" : ""
                    }`}
                    onClick={togglePlayback}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" /> Berhenti
                      </>
                    ) : (
                      <>
                        <Music className="mr-2 h-4 w-4" /> Putar Lagu
                      </>
                    )}
                  </Button>
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{
                    backgroundImage: `url('/background.png?height=600&width=800')`,
                  }}
                ></div>
                <div className="hidden md:block md:w-1/2 relative md:h-auto">
                  <img
                    src="/galeri1.png"
                    alt="Birthday Girl"
                    className="absolute bottom-0 right-0 h-full object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Birthday Message */}
              <CardContent className="px-8 py-12 text-center bg-white">
                <h2 className="text-3xl font-bold text-pink-500 mb-6">
                  Pesan Spesial
                </h2>
                <div className="max-w-3xl mx-auto bg-pink-50 p-8 rounded-lg border-2 border-pink-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Selamat ulang tahun, Shintaaa! 🎂✨,
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Nggak kerasa ya sekarang udah 11 tahun, perasaan kayak masih
                    kecil banget 😄 Mas doain semoga Shinta makin pinter, makin
                    rajin belajar, dan bisa dapetin ranking 1 di kelas,
                    AAMIIN... 🏆📚{" "}
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Semoga Shinta juga selalu sehat, panjang umur, dan diberi
                    banyak kebahagiaan setiap harinya. Dan juga, semoga suatu
                    hari nanti bisa jadi member JKT48 kayak yang Shinta pengenn!
                    💃✨
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Seperti JKT48 yang selalu bersinar di atas panggung, semoga
                    kamu juga selalu bersinar dalam setiap langkahmu. Teruslah
                    bermimpi dan berusaha, kamu pasti bisa meraih semua
                    impianmu!
                  </p>
                  <p className="text-xl font-bold text-pink-500 mt-6">
                    "Impian, Harapan, dan Masa Depan yang Cerah Menunggumu!"
                  </p>
                </div>
              </CardContent>

              {/* Gallery */}
              <div className="px-8 py-12 bg-gradient-to-r from-pink-50 to-purple-50">
                <h2 className="text-3xl font-bold text-center text-pink-500 mb-8">
                  Galeri Shinta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <GalleryCard
                    imageUrl="/galeri1.png"
                    title="JKT48 Theater Performance"
                    description="Penampilan spektakuler JKT48 di theater mereka yang legendaris."
                  />

                  <GalleryCard
                    imageUrl="/galeri2.png"
                    title="Handshake Event"
                    description="Momen spesial bertemu dengan idolamu di acara handshake."
                  />

                  <GalleryCard
                    imageUrl="/galeri3.png"
                    title="JKT48 Single Terbaru"
                    description="Formasi terbaru JKT48 dengan single yang memikat hati."
                  />
                </div>
              </div>

              {/* Countdown */}
              <CardContent className="px-8 py-12 text-center bg-white">
                <h2 className="text-3xl font-bold text-pink-500 mb-8">
                  Menuju Ulang Tahun Berikutnya
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <CountdownBox value="365" label="Hari" color="bg-pink-500" />
                  <CountdownBox value="0" label="Jam" color="bg-purple-500" />
                  <CountdownBox value="0" label="Menit" color="bg-pink-400" />
                  <CountdownBox value="0" label="Detik" color="bg-purple-400" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jikoshokai" className="bg-white">
            <Card className="border-none shadow-lg overflow-hidden bg-white">
              <CardContent className="p-8 bg-white">
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-pink-500 mb-4">
                    Member JKT48
                  </h1>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Dibawah ini merupakan beberapa Oshi Member JKT48 Shintaa.
                  </p>
                </div>

                {/* Filter dan Search */}
                <div className="mb-8 bg-pink-50 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-pink-500 mb-4 md:mb-0">
                      Filter Member
                    </h2>
                    <div className="relative w-full md:w-64">
                      <Input
                        type="text"
                        placeholder="Cari member..."
                        className="w-full border-pink-200 focus:ring-pink-300 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        Generasi:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[null, 3, 6, 7, 8, 9, 11].map((gen) => (
                          <Button
                            key={gen === null ? "all" : gen}
                            variant={
                              activeGeneration === gen ? "default" : "outline"
                            }
                            className={`px-3 py-1 h-8 text-xs ${
                              activeGeneration === gen
                                ? "bg-pink-500 hover:bg-pink-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveGeneration(gen)}
                          >
                            {gen === null ? "Semua" : `Gen ${gen}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Tidak ada member yang ditemukan. Coba filter yang lain.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">JKT48 Fan Page</h3>
              <p className="text-sm opacity-75">
                Dibuat dengan ❤️ untuk Shinta Adelia
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-200">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-200">
                <TikTok className="h-5 w-5" />
              </a>
            </div>
          </div>
          <Separator className="my-6 bg-pink-400" />
          <div className="text-center text-sm opacity-75">
            <p>
              © 2025 JKT48 Fan Page. Ini adalah website penggemar tidak resmi.
            </p>
            <p>
              JKT48 adalah merek dagang terdaftar dari JKT48 Operation Team.
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden audio element for better browser compatibility */}
      <audio
        id="birthdaySong"
        src="/birthday-song.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
    </div>
  );
}

// Confetti Component
const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 10}px`,
            background: ["#FF69B4", "#FFD700", "#FF1493", "#FF6347", "#9370DB"][
              Math.floor(Math.random() * 5)
            ],
            animation: `confetti ${Math.random() * 3 + 2}s linear forwards`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Gallery Card Component
const GalleryCard = ({
  imageUrl,
  title,
  description,
}: {
  imageUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="h-64 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-pink-500 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Countdown Box Component
const CountdownBox = ({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) => {
  return (
    <div
      className={`w-24 h-24 ${color} rounded-lg flex flex-col items-center justify-center text-white`}
    >
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

// Member Card Component
interface Member {
  id: number;
  name: string;
  nickname: string;
  team?: string;
  generation: number;
  birthdate: string;
  zodiac: string;
  jikoshokai: string;
  image: string;
}

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <Card className="overflow-hidden border border-pink-100 hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="h-64 overflow-hidden bg-gradient-to-b from-pink-100 to-purple-100">
        <img
          src={member.image || `/member${member.id}.jpg`}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            // Fallback jika gambar tidak ditemukan
            const target = e.target as HTMLImageElement;
            target.src = `/placeholder.svg?height=500&width=400&text=${member.nickname}`;
          }}
        />
      </div>
      <CardContent className="p-6 bg-white">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-pink-500">{member.name}</h3>
            <p className="text-gray-600">{member.nickname}</p>
          </div>
          <Badge
            variant="outline"
            className="text-purple-600 bg-purple-100 border-purple-200"
          >
            Gen {member.generation}
          </Badge>
        </div>

        <div className="flex items-center mb-3 text-sm text-gray-600">
          <div className="mr-4 flex items-center">
            <Cake className="h-3 w-3 mr-1 text-pink-400" /> {member.birthdate}
          </div>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 text-purple-400" /> {member.zodiac}
          </div>
        </div>

        <div className="bg-pink-50 p-4 rounded-lg mt-4">
          <h4 className="text-sm font-bold text-pink-500 mb-2">Jikoshokai:</h4>
          <p className="text-gray-700 text-sm italic">"{member.jikoshokai}"</p>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="flex space-x-2">
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <TikTok className="h-4 w-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
