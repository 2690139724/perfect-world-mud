const FIRST_NAMES = [
  '陆', '林', '萧', '叶', '苏', '顾', '沈', '陈', '周', '赵',
  '刘', '王', '李', '张', '杨', '黄', '吴', '徐', '孙', '马',
  '朱', '胡', '郭', '何', '罗', '高', '郑', '梁', '谢', '宋',
  '唐', '韩', '冯', '董', '程', '曹', '袁', '邓', '许', '傅',
  '沈', '曾', '彭', '吕', '苏', '卢', '蒋', '蔡', '丁', '魏',
  '薛', '叶', '阎', '余', '潘', '杜', '戴', '夏', '钟', '汪',
  '田', '任', '姜', '范', '方', '石', '姚', '谭', '廖', '邹',
  '熊', '金', '陆', '郝', '孔', '白', '崔', '康', '毛', '邱',
];

const SECOND_NAMES = [
  '风', '云', '雪', '月', '霜', '雨', '雷', '电', '天', '地',
  '玄', '黄', '宇', '宙', '洪', '荒', '仙', '神', '魔', '鬼',
  '龙', '虎', '豹', '狼', '鹰', '鹏', '鹤', '鹿', '猿', '熊',
  '山', '水', '河', '海', '江', '湖', '川', '谷', '峰', '岭',
  '炎', '冰', '寒', '暖', '光', '暗', '明', '清', '静', '动',
  '飞', '翔', '游', '行', '走', '跑', '跳', '跃', '升', '降',
  '阳', '阴', '柔', '刚', '猛', '烈', '温', '柔', '雅', '俗',
  '真', '假', '虚', '实', '幻', '梦', '醒', '醉', '痴', '迷',
];

const THIRD_NAMES = [
  '尘', '烟', '雾', '露', '霜', '雪', '冰', '火', '风', '云',
  '雷', '电', '雨', '虹', '霞', '光', '影', '色', '香', '味',
  '声', '形', '态', '质', '量', '数', '理', '化', '生', '死',
  '存', '亡', '兴', '衰', '盛', '败', '成', '毁', '立', '破',
  '开', '合', '聚', '散', '分', '离', '合', '并', '交', '错',
  '缠', '绕', '结', '解', '松', '紧', '密', '疏', '远', '近',
  '高', '低', '深', '浅', '广', '狭', '长', '短', '大', '小',
  '多', '少', '强', '弱', '优', '劣', '胜', '败', '赢', '输',
];

const FORBIDDEN_NAMES = new Set([
  '石昊', '石毅', '石中天', '柳神', '火灵儿', '云曦', '清漪', '月神',
  '叶凡', '庞博', '姬紫月', '黑皇', '无始大帝', '狠人大帝', '段德',
  '楚风', '林诺依', '妖妖', '黄牛', '大黑', '圣师', '武疯子',
  '王林', '李慕婉', '柳眉', '藤化元', '青霖', '司徒南', '云雀子',
  '韩立', '南宫婉', '厉飞雨', '曲魂', '墨居仁', '陈巧倩', '董萱儿',
]);

export function generateRandomName(): string {
  let name: string;
  do {
    const len = Math.random() > 0.7 ? 2 : 3;
    if (len === 2) {
      name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] +
             SECOND_NAMES[Math.floor(Math.random() * SECOND_NAMES.length)];
    } else {
      name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] +
             SECOND_NAMES[Math.floor(Math.random() * SECOND_NAMES.length)] +
             THIRD_NAMES[Math.floor(Math.random() * THIRD_NAMES.length)];
    }
  } while (FORBIDDEN_NAMES.has(name));
  return name;
}

export function generateRandomNames(count: number): string[] {
  const names: string[] = [];
  const used = new Set<string>();
  for (let i = 0; i < count; i++) {
    let name = generateRandomName();
    while (used.has(name)) {
      name = generateRandomName();
    }
    used.add(name);
    names.push(name);
  }
  return names;
}