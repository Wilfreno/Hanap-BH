import { LodgingType } from "@/lib/types/lodging-detail-type";

export default function LodgingTypes(): {
  type: LodgingType;
  name: string;
  link: string;
  icon: string;
  description: string;
}[] {
  return [
    {
      type: "BOARDING_HOUSE",
      name: "Boarding House",
      link: "boarding-house",
      icon: "",
      description:
        "Traditional accommodations offering long-term lodging with furnished rooms, shared facilities, and a sense of community for residents seeking affordable housing options.",
    },
    {
      type: "APARTMENT",
      name: "Apartment",
      link: "apartment",
      icon: "",
      description:
        "Private residences available for short-term or long-term rental, providing self-contained living spaces with amenities such as kitchens and bathrooms for travelers or residents looking for a home-like environment.",
    },
    {
      type: "HOTEL",
      name: "Hotel",
      link: "hotel",
      icon: "",
      description:
        "Lavish establishments offering luxurious rooms, impeccable service, and a wide array of amenities such as fine dining restaurants, spas, and concierge services, providing guests with a pampered and indulgent experience.",
    },
    {
      type: "MOTEL",
      name: "Motel",
      link: "motel",
      icon: "",
      description:
        "Convenient stopovers situated along highways or main thoroughfares, offering cozy rooms with easy access for travelers on the go, perfect for restful nights during long journeys.",
    },
    {
      type: "B&B",
      name: "B & B",
      link: "b&b",
      icon: "",
      description:
        "Charming and intimate lodgings nestled within quaint homes or historic buildings, offering cozy rooms adorned with personal touches and homemade breakfasts served with warmth and hospitality, providing guests with a home away from home.",
    },
  ];
}
