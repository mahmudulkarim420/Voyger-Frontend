import { BrandPillars } from "@/components/shared/BrandPillars";
import { PageHero } from "@/components/shared/PageHero";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";

const stores = [
  {
    name: "Wari Voyage Flagship Outlet",
    address: "2, 6/A, Nawab St, Wari ( Rankin Street ), Dhaka-1203",
    phone: "01805002461",
    open: "10:30 AM - 9:30 PM",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.8223611843324!2d90.4132!3d23.718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b850d53457e3%3A0x7d06e98797f1f3e9!2sWari%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1718023456789!5m2!1sen!2sbd",
  },
  {
    name: "VOYAGE Mirpur Display Center",
    address: "Shah Smrity Market, Dhaka, Bangladesh",
    phone: "01805002462",
    open: "10:30 AM - 9:30 PM",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.328233215!2d90.354!3d23.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6a7c3ef%3A0x4b6a0b5b0b5b0b5b!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1718023456790!5m2!1sen!2sbd",
  },
];

export default function FindStorePage() {
  return (
    <div className="bg-[#FCFAF6] min-h-screen">
      <PageHero
        title="Find Store"
        image="/images/panjabi-web-cover-2-pc.jpg.jpeg"
        imageAlt="Find Store Voyage"
      />

      {/* Visit Our Store Heading */}
      <section className="pt-24 pb-12">
        <div className="container-standard text-center mb-4">
          <span className="text-[#B37068] text-sm font-bold tracking-[0.2em] uppercase">
            Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2F2923] tracking-tight mt-2 italic">
            Visit Our Store
          </h2>
        </div>
      </section>

      {/* Store Grid Content */}
      <section className="pb-20">
        <div className="container-standard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {stores.map((store, index) => (
              <div key={index} className="flex flex-col gap-8 group">
                {/* Map Container */}
                <div className="w-full aspect-video md:aspect-[16/10] border border-gray-100 p-2 bg-white shadow-xl rounded-sm transition-transform duration-500 overflow-hidden group-hover:scale-[1.02]">
                  <iframe
                    src={store.mapUrl}
                    className="w-full h-full grayscale-[0.5] contrast-[1.1] brightness-[1.1] hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Store Details */}
                <div className="flex flex-col gap-5 px-2">
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-[#2F2923] border-b border-[#B37068]/20 pb-4">
                    {store.name}
                  </h3>
                  <div className="space-y-4 text-gray-700 font-light text-lg">
                    <div className="flex items-start gap-4">
                      <FiMapPin className="text-[#B37068] mt-1.5 flex-shrink-0" />
                      <p>{store.address}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <FiPhone className="text-[#B37068] flex-shrink-0" />
                      <p>{store.phone}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <FiClock className="text-[#B37068] flex-shrink-0" />
                      <p>
                        <span className="font-medium text-[#2F2923]">Open:</span> {store.open}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center bg-[#2F2923] text-white px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-[#B37068] transition-all duration-500"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandPillars description="Experience the craftsmanship and culture that defines every Voyage piece." />
    </div>
  );
}
