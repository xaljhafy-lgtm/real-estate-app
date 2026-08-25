export type Currency = 'USD' | 'SAR' | 'YER';

export type PropertyType =
  | 'apartment'
  | 'villa'
  | 'building'
  | 'land'
  | 'commercial'
  | 'chalet';

export type ListingPurpose = 'sale' | 'rent';

export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'rented';

export type ValuationStatus =
  | 'excellent_deal'
  | 'fair_market_price'
  | 'slightly_above_market'
  | 'premium_luxury';

export interface RoomTourHotspot {
  id: string;
  targetRoomId: string;
  label: string;
  yaw: number;
  pitch: number;
}

export interface TourRoom {
  id: string;
  name: string;
  type: 'majlis' | 'living' | 'master_bedroom' | 'bedroom' | 'kitchen' | 'balcony' | 'bathroom' | 'exterior';
  panoramaUrl: string;
  previewUrl: string;
  dimensions?: string;
  features?: string[];
  hotspots?: RoomTourHotspot[];
}

export interface VirtualTourData {
  tourTitle: string;
  coverPanorama: string;
  rooms: TourRoom[];
}

export interface NearbyAmenity {
  type: 'mosque' | 'beach' | 'school' | 'hospital' | 'market' | 'mall' | 'airport' | 'park';
  name: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  district: string;
  neighborhood: string;
  addressDetails?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  currency: Currency;
  purpose: ListingPurpose;
  status: PropertyStatus;
  propertyType: PropertyType;
  area: number;
  bedrooms: number;
  bathrooms: number;
  livingRooms?: number;
  floorNumber?: number;
  furnishedStatus?: 'fully_furnished' | 'semi_furnished' | 'unfurnished';
  starsRating: number;
  valuationStatus: ValuationStatus;
  marketEstimatedAvgPrice: number;
  valuationNotes?: string;
  features: string[];
  deedStatus: string;
  images: string[];
  has3DTour: boolean;
  virtualTour3D?: VirtualTourData;
  nearbyAmenities: NearbyAmenity[];
  brokerName: string;
  brokerPhone: string;
  brokerWhatsapp: string;
  createdAt: string;
  viewsCount: number;
  featured?: boolean;
}

export interface InquiryLead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientPhone: string;
  inquiryType: 'visit_request' | 'price_offer' | 'deal_closing' | 'question';
  message: string;
  preferredDate?: string;
  offerPrice?: number;
  status: 'new' | 'contacted' | 'visited' | 'closed';
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  district: string;
  propertyType: PropertyType | 'all';
  purpose: ListingPurpose | 'all';
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  minStars: number;
  only3DTour: boolean;
  onlySeaView: boolean;
  onlySolar: boolean;
  sortBy: 'latest' | 'price_asc' | 'price_desc' | 'rating_desc' | 'area_desc';
}