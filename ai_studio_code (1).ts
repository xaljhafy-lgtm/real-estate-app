import { Currency, ValuationStatus } from '../types';

export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  SAR: 3.75,
  YER: 1950, // سعر صرف الريال اليمني المتداول في عدن
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$ USD',
  SAR: 'ر.س',
  YER: 'ر.ي',
};

export function convertPrice(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  const inUSD = amount / EXCHANGE_RATES[from];
  return inUSD * EXCHANGE_RATES[to];
}

export function formatPrice(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('en-US').format(rounded);
  return `${formatted} ${CURRENCY_SYMBOLS[currency]}`;
}

export function getValuationBadge(status: ValuationStatus): {
  label: string;
  bgSoft: string;
  text: string;
  description: string;
} {
  switch (status) {
    case 'excellent_deal':
      return {
        label: 'سعر لقطة استثنائي (أقل من السوق)',
        bgSoft: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        text: 'text-emerald-700',
        description: 'السعر أقل بـ 10-20% عن متوسط صفقات الحي المماثلة',
      };
    case 'fair_market_price':
      return {
        label: 'سعر عادل ومطابق للسوق',
        bgSoft: 'bg-blue-50 text-blue-700 border-blue-200',
        text: 'text-blue-700',
        description: 'السعر يتطابق تماماً مع تقييم الحي ومستوى التشطيب والخدمات',
      };
    case 'slightly_above_market':
      return {
        label: 'سعر تفاوضي',
        bgSoft: 'bg-amber-50 text-amber-800 border-amber-200',
        text: 'text-amber-800',
        description: 'السعر أعلى قليلاً من المتوسط مع إمكانية تفاوض جيدة مع البائع',
      };
    case 'premium_luxury':
      return {
        label: 'عقار فاخر وتشطيب VIP',
        bgSoft: 'bg-purple-50 text-purple-700 border-purple-200',
        text: 'text-purple-700',
        description: 'مواصفات وإطلالة استثنائية وتشطيبات مستوردة من الدرجة الأولى',
      };
  }
}

export function generateWhatsAppLink(
  phone: string,
  propertyTitle: string,
  propertyId: string,
  price: string,
  purpose: string
): string {
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (!cleanPhone || cleanPhone === '967770123456') {
    cleanPhone = '967780254954';
  }
  const msg = encodeURIComponent(
    `أهلاً بك، أنا مهتم بمعاينة العقار والاستفسار عنه 🏢\n\n📌 *${propertyTitle}*\n🆔 رقم المرجع: #${propertyId}\n💰 السعر: ${price} (${purpose === 'sale' ? 'للبيع' : 'للإيجار'})\n\nأرجو التكرم بتحديد موعد لمعاينة العقار ومناقشة تفاصيل الصفقة. شكراً لك!`
  );
  return `https://wa.me/${cleanPhone}?text=${msg}`;
}