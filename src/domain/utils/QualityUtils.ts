export type ItemQuality = '凡品' | '良品' | '珍品' | '极品' | '仙品' | '神品';

export const QualityConfig: Record<ItemQuality, { stars: number; color: string; bgColor: string }> = {
  '凡品': { stars: 1, color: '#999999', bgColor: 'rgba(153, 153, 153, 0.1)' },
  '良品': { stars: 2, color: '#4CAF50', bgColor: 'rgba(76, 175, 80, 0.1)' },
  '珍品': { stars: 3, color: '#2196F3', bgColor: 'rgba(33, 150, 243, 0.1)' },
  '极品': { stars: 4, color: '#9C27B0', bgColor: 'rgba(156, 39, 176, 0.1)' },
  '仙品': { stars: 5, color: '#FFC107', bgColor: 'rgba(255, 193, 7, 0.1)' },
  '神品': { stars: 6, color: '#E91E63', bgColor: 'rgba(233, 30, 99, 0.1)' },
};

export function getQualityStars(quality: ItemQuality): string {
  const config = QualityConfig[quality];
  return '★'.repeat(config.stars) + '☆'.repeat(6 - config.stars);
}

export function getQualityColor(quality: ItemQuality): string {
  return QualityConfig[quality].color;
}

export function getQualityBgColor(quality: ItemQuality): string {
  return QualityConfig[quality].bgColor;
}

export function getQualityStyle(quality: ItemQuality): { color: string; backgroundColor: string } {
  const config = QualityConfig[quality];
  return { color: config.color, backgroundColor: config.bgColor };
}