import { ServiceItem, SectorItem, FaqItem, WhyChooseItem, StepItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'crawling-insects',
    slug: 'crawling-insects',
    title: 'مكافحة الحشرات الزاحفة',
    titleEn: 'Crawling Insects Control',
    shortDesc: 'وصف متكامل لحلول مكافحة الحشرات الزاحفة المختلفة في المنازل والمنشآت لحماية المساحات المعيشية والتجارية.',
    shortDescEn: 'Comprehensive control solutions for various crawling pests in residential and commercial premises.',
    fullDesc: 'نقدم خدمات متخصصة للتعامل مع مشكلات الحشرات الزاحفة في المنشآت السكنية والتجارية والصناعية، من خلال خطط تطبيق محددة تراعي طبيعة المكان ومعايير السلامة العامة.',
    fullDescEn: 'Specialized management programs addressing crawling pests across residential, commercial, and industrial facilities with careful safety protocols.',
    iconName: 'ShieldAlert',
    problems: [
      'انتشار الحشرات الزاحفة في الزوايا والشقوق والمطابخ',
      'تلوث الأسطح والأدوات المنزلية والمكتبية',
      'خطر نقل البكتيريا ومسببات الأمراض في بيئة العمل أو المنزل',
      'صعوبة السيطرة بالوسائل التقليدية'
    ],
    problemsEn: [
      'Pest intrusion in cracks, crevices, and food prep areas',
      'Surface contamination of household or workplace tools',
      'Risk of bacterial transmission in living or working environments',
      'Difficulty controlling infestations using standard methods'
    ],
    places: [
      'المنازل والفيلات والشقق السكنية',
      'المطاعم والمطابخ والكافيهات',
      'المكاتب والشركات والمباني الإدارية',
      'المخازن ومستودعات التخزين'
    ],
    placesEn: [
      'Homes, villas, and residential apartments',
      'Restaurants, kitchens, and cafes',
      'Corporate offices and administrative buildings',
      'Warehouses and storage facilities'
    ],
    features: [
      'استخدام مبيدات معتمدة مخصصة لصحة البيئة',
      'تحديد بؤر التكاثر ومسارات الدخول بدقة',
      'إرشادات وقائية لتفادي تكرار المشكلة'
    ],
    featuresEn: [
      'Application of approved public health pest management products',
      'Accurate identification of nesting spots and entry points',
      'Preventive guidelines to minimize recurring risks'
    ],
    steps: [
      'معاينة المكان وتحديد نوع المشكلة والمسارات',
      'تطبيق خطة المكافحة المناسبة بحسب طبيعة المنشأة',
      'تقديم تقرير وتوصيات للحفاظ على نظافة المكان',
      'المتابعة الدورية حسب الاتفاق'
    ],
    stepsEn: [
      'Inspection to identify pest species and entry routes',
      'Targeted treatment application based on facility type',
      'Clear maintenance recommendations and sanitation advice',
      'Scheduled follow-up according to plan'
    ],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'flying-insects',
    slug: 'flying-insects',
    title: 'مكافحة الحشرات الطائرة',
    titleEn: 'Flying Insects Control',
    shortDesc: 'مكافحة الذباب والبعوض وغيرها من الحشرات الطائرة في المساحات المغلقة والمفتوحة لبيئة صحية ومريحة.',
    shortDescEn: 'Targeted control of flies, mosquitoes, and other flying insects in indoor and outdoor settings.',
    fullDesc: 'حلول عملية للحد من تواجد الحشرات الطائرة المزعجة والناقلة للأمراض في المنازل والمطاعم والحدائق والمنشآت السياحية من خلال برامج متوازنة.',
    fullDescEn: 'Effective solutions to mitigate flying pests and nuisance insects across dining venues, resorts, residential gardens, and business facilities.',
    iconName: 'Wind',
    problems: [
      'إزعاج دائم لرواد المنشآت والمنازل',
      'نقل الميكروبات إلى الأطعمة والمشروبات',
      'تأثير سلبي على تقييم المطاعم والفنادق',
      'موسمية التكاثر في الأماكن الرطبة والمفتوحة'
    ],
    problemsEn: [
      'Constant nuisance to occupants, guests, and customers',
      'Microbial transmission onto foodstuffs and open dining areas',
      'Negative impact on customer satisfaction in hotels and cafes',
      'Seasonal surges around water reservoirs and green lawns'
    ],
    places: [
      'الحدائق والمساحات المفتوحة بالفيلات والقرى السياحية',
      'صُمم خصيصاً للمطاعم والكافيهات ومناطق تقديم الطعام',
      'المصانع الغذائية ومناطق الاستلام',
      'المدارس والنوادي الرياضية'
    ],
    placesEn: [
      'Gardens, patios, and open grounds in resorts and villas',
      'Food preparation zones and outdoor dining cafes',
      'Food packaging areas and warehouse loading docks',
      'Schools and athletic leisure clubs'
    ],
    features: [
      'تقنيات رش ومصائد ضوئية مناسبة',
      'معالجة مصادر التكاثر وتجمعات المياه',
      'أمان بيئي يلائم أماكن تواجد الأفراد'
    ],
    featuresEn: [
      'Balanced misting technologies and insect light trap consulting',
      'Addressing breeding sources and moisture pockets',
      'Safety considerations adapted to occupied spaces'
    ],
    steps: [
      'فحص المداخل والفتحات ومصادر التكاثر الخارجية',
      'تطبيق الرذاذ أو التدخل المناسب للأماكن المفتوحة والمغلقة',
      'توصيات بتركيب السلك والمصائد الوقائية',
      'جدولة مواعيد المتابعة أثناء الفترات النشطة'
    ],
    stepsEn: [
      'Surveying entryways, windows, and external breeding sources',
      'Applying tailored misting or localized treatments',
      'Preventive suggestions for insect screens and barrier management',
      'Scheduled reviews during seasonal peak periods'
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'rodents-control',
    slug: 'rodents-control',
    title: 'مكافحة القوارض',
    titleEn: 'Rodents Control',
    shortDesc: 'حلول للحد من مشكلات القوارض وحماية المنشآت من التلف والأضرار الصحية والتشغيلية.',
    shortDescEn: 'Reliable rodent management to safeguard premises against property damage and health hazards.',
    fullDesc: 'برامج منظمة للسيطرة على الفئران والجرذان وحماية الكابلات والمخزون والمنشآت من الأضرار الجسيمة والمخاطر الصحية المرتبطة بالقوارض.',
    fullDescEn: 'Systematic rodent control protecting technical infrastructure, electrical wiring, and inventory while preventing cross-contamination risks.',
    iconName: 'AlertTriangle',
    problems: [
      'قرض الأسلاك الكهربائية وخطر الحرائق وتلف المعدات',
      'إتلاف البضائع المخزونة والمنتجات الغذائية',
      'نقل أمراض خطيرة على الصحة العامة',
      'التسلل عبر شبكات الصرف والأسقف المعلقة'
    ],
    problemsEn: [
      'Chewing wires causing short circuits and equipment hazards',
      'Destruction of stored goods, packaging, and raw materials',
      'Severe public health transmission concerns',
      'Infiltration via sewage lines, sub-flooring, and drop ceilings'
    ],
    places: [
      'المخازن والمستودعات ومراكز التوزيع',
      'المصانع والورش والمنشآت الهندسية',
      'المستشفيات والمنشآت الصحية',
      'المنازل والفيلات والمزارع'
    ],
    placesEn: [
      'Distribution hubs, warehouses, and storage depots',
      'Manufacturing plants and technical utility rooms',
      'Healthcare facilities and hospital utility tunnels',
      'Residential compounds, farmsteads, and villas'
    ],
    features: [
      'محطات طعوم آمنة ومغلقة لحماية الأطفال والحيوانات الأليفة',
      'سد الفتحات وتحديد مسارات القوارض الرئيسية',
      'برامج مراقبة مستمرة مع توثيق الفحص'
    ],
    featuresEn: [
      'Tamper-resistant bait stations ensuring occupant safety',
      'Exclusion advice to seal penetrations and entry pathways',
      'Periodic tracking with inspection logging'
    ],
    steps: [
      'مسح المنشأة وتحديد آثار الحركة والفتحات',
      'توزيع المحطات والمصائد في النقاط الاستراتيجية',
      'إحكام إغلاق الثغرات والمنافذ الضعيفة',
      'متابعة دورية لإعادة التعبئة والتقييم'
    ],
    stepsEn: [
      'Inspection of activity signs, rub marks, and perimeter gaps',
      'Strategic deployment of tamper-resistant stations',
      'Physical exclusion guidance on structural breaches',
      'Scheduled replenishment and efficiency checks'
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cockroaches-control',
    slug: 'cockroaches-control',
    title: 'مكافحة الصراصير',
    titleEn: 'Cockroach Management',
    shortDesc: 'خدمات متخصصة للتعامل مع مشكلات الصراصير بكفاءة ونظافة تناسب بيئات تحضير الطعام والمنازل.',
    shortDescEn: 'Specialized cockroach eradication and monitoring tailored for culinary venues and domestic kitchens.',
    fullDesc: 'حلول دقيقة لمكافحة مختلف فصائل الصراصير (الألمانية، الأمريكية، والشرقية) باستخدام تقنيات الجل والمبيدات بدون روائح نفاذة ومناسبة للمطابخ والمطاعم.',
    fullDescEn: 'Targeted strategies against German, American, and Oriental cockroaches using specialized gel baits and odorless treatments suitable for sensitive food zones.',
    iconName: 'Zap',
    problems: [
      'التكاثر السريع في الأجهزة والمطابخ والحرارة العالية',
      'تلويث الأواني والأغذية بمفرزات وروائح كريهة',
      'الحساسية والربو الناجم عن مخلفات الصراصير',
      'مقاومة المواد المنزلية الشائعة'
    ],
    problemsEn: [
      'Rapid proliferation inside appliances, motor compartments, and warmth',
      'Food and cookware contamination with unpleasant odors',
      'Respiratory irritation and allergen dispersion',
      'High resistance against conventional retail sprays'
    ],
    places: [
      'مطابخ المنازل والفيلات',
      'مطاعم الوجبات السريعة والكافيهات والمطابخ المركزية',
      'غرف الفنادق ومصارف المياه',
      'مستشفيات ومراكز الرعاية'
    ],
    placesEn: [
      'Residential kitchen cabinets and pantries',
      'Commercial restaurants, catering facilities, and bakeries',
      'Hotel guest quarters and drainage lines',
      'Healthcare facilities and care wards'
    ],
    features: [
      'تطبيق طعوم جل متخصصة بدون الحاجة لإخلاء المكان',
      'استهداف مخابئ التكاثر الدقيقة داخل الشقوق',
      'معاملات آمنة للمطابخ والأجهزة الحساسة'
    ],
    featuresEn: [
      'Targeted non-disruptive gel baits requiring no pantry evacuation',
      'Deep treatment of micro-crevices and harborage zones',
      'Food-safe compliance around sensitive machinery'
    ],
    steps: [
      'تحديد نوع الصراصير (صغير/كبير) ونقاط التكاثر',
      'حقن الجل المتخصص في الأماكن الخفية والأجهزة',
      'معالجة فتحات الصرف والمصادر الرطبة',
      'تعليمات نظافة وقائية ومتابعة دورية'
    ],
    stepsEn: [
      'Species classification and harbor mapping',
      'Precision gel micro-injection into hidden hinges and crevices',
      'Drain line sanitation and perimeter barrier treatment',
      'Sanitation maintenance guidance and scheduled re-check'
    ],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ants-control',
    slug: 'ants-control',
    title: 'مكافحة النمل',
    titleEn: 'Ant Management',
    shortDesc: 'حلول مناسبة لمشكلات النمل داخل وحول المنشآت للحد من انتشاره في الأطعمة والممرات.',
    shortDescEn: 'Targeted solutions for interior and exterior ant infestations to safeguard pantries and perimeters.',
    fullDesc: 'طرق مدروسة للتعامل مع مستعمرات النمل المختلفة (النمل الأسود، النمل الأبيض، نمل السكر) باستهداف الملكة والمستعمرة الأساسية لمنع عودتها.',
    fullDescEn: 'Scientific management targeting ant colonies, queens, and foraging trails to halt recurrent infestations around foundations and cupboards.',
    iconName: 'Activity',
    problems: [
      'انتشار طوابير النمل على أسطح المطبخ والأطعمة',
      'تلف العزل وأسفل البلاط والأسطح الخشبية',
      'إزعاج مستمر في المكاتب والمنازل',
      'ظهور متكرر بعد الرش السطحي'
    ],
    problemsEn: [
      'Persistent ant trails traversing food preparation countertops',
      'Undermining tile grout and woodwork insulation',
      'Continuous daily disturbance for households and workspaces',
      'Prompt re-emergence following basic surface aerosol spraying'
    ],
    places: [
      'المنازل والحدائق المحيطة',
      'المخابز ومصانع الحلويات والمطاعم',
      'المكاتب والشركات',
      'المنشآت التعليمية والطبية'
    ],
    placesEn: [
      'Residential homes and landscaped patio borders',
      'Bakeries, sweet shops, and pastry production units',
      'Office suites and corporate workstations',
      'Educational institutions and clinics'
    ],
    features: [
      'طعوم خاصة ينقلها النمل للمستعمرة للقضاء على البؤرة',
      'معالجة الحزام الخارجي لمنع التسلل من الحديقة',
      'آمن على الأطفال والحيوانات الأليفة مع الاستخدام الصحيح'
    ],
    featuresEn: [
      'Systemic baiting carried by workers directly to the queen',
      'Exterior barrier treatments shielding foundation perimeters',
      'Safe for households when deployed by trained professionals'
    ],
    steps: [
      'تتبع مسارات النمل ومصادر الجذب والفتحات',
      'وضع الطعوم المخصصة في مسار النمل دون تنفيره',
      'معالجة الفواصل الخارجية وعزل الثغرات',
      'فحص النتيجة وتقديم إرشادات حفظ الأطعمة'
    ],
    stepsEn: [
      'Tracking worker trails to pinpoint ingress seams',
      'Deploying non-repellent foraging bait matrices',
      'Treating external perimeter thresholds and junctions',
      'Outcome evaluation and pantry storage advisory'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'flies-mosquitoes',
    slug: 'flies-mosquitoes',
    title: 'مكافحة الذباب والبعوض',
    titleEn: 'Flies & Mosquitoes Control',
    shortDesc: 'برامج متقدمة للمنازل والمنشآت والأماكن المفتوحة للحد من لدغات البعوض والذباب المزعج.',
    shortDescEn: 'Integrated outdoor and indoor programs diminishing mosquito bites and fly swarms.',
    fullDesc: 'برامج مصممة لمكافحة الحشرات الطائرة في الأماكن المفتوحة والحدائق وتجمعات المياه وحول حمامات السباحة، لتوفير بيئة نظيفة ومريحة.',
    fullDescEn: 'Tailored outdoor fogging, larvicide management, and indoor fly-trap strategies keeping pool areas, gardens, and dining patios peaceful and hygienic.',
    iconName: 'Compass',
    problems: [
      'لدغات البعوض المؤلمة والمسببة للحكة والحساسية',
      'حرمان العائلات والنزلاء من الاستمتاع بالحدائق والتراسات',
      'خطر نقل الفيروسات والأمراض الموسمية',
      'تجمع الذباب حول القمامة والمداخل'
    ],
    problemsEn: [
      'Painful mosquito bites triggering irritation and allergic rashes',
      'Restricting families and guests from enjoying gardens and patios',
      'Public health vector risks and seasonal pathogen transmission',
      'Fly aggregation near waste collection points and entrance vestibules'
    ],
    places: [
      'فيلات وقرى سياحية ومنتجعات',
      'مطاعم ذات جلسات خارجية (Outdoor)',
      'النوادي والملاعب الرياضية',
      'مزارع ومساحات خضراء'
    ],
    placesEn: [
      'Villas, coastal holiday villages, and luxury resorts',
      'Al-fresco dining terraces and open-air cafes',
      'Country clubs and recreational grounds',
      'Private farms and landscaped estates'
    ],
    features: [
      'تقنيات الرذاذ المتناهي الصغر (ULV) أو الضباب الحراري حسب الحاجة',
      'معالجة يرقات البعوض في مصادر المياه الراكدة',
      'حلول وقائية تقلل انجذاب الحشرات'
    ],
    featuresEn: [
      'Ultra-Low Volume (ULV) misting or thermal fogging as appropriate',
      'Larvicidal treatment of stagnant standing water reservoirs',
      'Preventive environmental recommendations minimizing attractants'
    ],
    steps: [
      'معاينة الحدائق وتجمعات المياه والأشجار المحيطة',
      'تحديد أفضل توقيت للتطبيق (الصباح الباكر أو الغروب)',
      'تنفيذ جلسة المكافحة بالأجهزة المخصصة',
      'جدولة المتابعات الدورية خلال فصل الصيف'
    ],
    stepsEn: [
      'Inspecting vegetation, drainage ditches, and outdoor perimeter zones',
      'Determining optimal application windows (dawn or dusk)',
      'Executing specialized misting or localized treatments',
      'Scheduling recurring visits during peak seasonal cycles'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'stored-product-pests',
    slug: 'stored-product-pests',
    title: 'مكافحة آفات المخازن',
    titleEn: 'Stored Product Pest Control',
    shortDesc: 'برامج متخصصة للمخازن والمستودعات والمنشآت التي تحتاج إلى حماية مستمرة للمنتجات والمواد الأولية.',
    shortDescEn: 'Dedicated protection for warehouses and distribution facilities guarding inventory and raw goods.',
    fullDesc: 'حماية شاملة للمخازن من آفات الحبوب والمواد الجافة (سوس، خنافس، فراشات التخزين) مع الحفاظ على مطابقة المعايير الصناعية ومنع الخسائر الاقتصادية.',
    fullDescEn: 'Rigorous protection of dry goods, grain, packaging materials, and warehouse inventories against beetles, weevils, and moths in compliance with commercial standards.',
    iconName: 'Package',
    problems: [
      'تلف الحبوب والمواد الخام والمنتجات الغذائية المخزنة',
      'خسائر مادية جسيمة ورفض شحنات البضائع',
      'انتشار سريع بين الأرفف ومساحات التخزين الكبيرة',
      'مخالفة معايير الجودة والسلامة المهنية'
    ],
    problemsEn: [
      'Damage to grains, raw materials, and finished consumer inventory',
      'Substantial commercial losses and client consignment rejections',
      'Rapid cross-contamination across large pallet racking bays',
      'Non-compliance risks with commercial storage quality audits'
    ],
    places: [
      'المخازن والمستودعات المركزية',
      'مصانع الأغذية والأعلاف ومطاحن الدقيق',
      'مراكز الشحن واللوجستيات',
      'الجمعيات الاستهلاكية وسلاسل السوبرماركت'
    ],
    placesEn: [
      'Central logistics warehouses and dry commodity depots',
      'Food manufacturing plants, grain mills, and feed facilities',
      'Logistics freight centers and cargo terminals',
      'Hypermarkets and regional distribution centers'
    ],
    features: [
      'فخاخ مراقبة فرمونية للرصد المبكر',
      'معاملات موجهة بدون الإضرار بالبضائع السليمة',
      'تقارير دورية تدعم ملفات التدقيق والجودة'
    ],
    featuresEn: [
      'Pheromone detection monitoring for prompt early alert',
      'Targeted non-destructive treatments protecting compliant goods',
      'Detailed audit-ready service records and trend reports'
    ],
    steps: [
      'فحص المخزون والحرارة والرطوبة ونقاط الاستلام',
      'تثبيت محطات الفرمونات لمراقبة الكثافة العددية',
      'تطبيق خطة التدخل الموضعي أو الشامل',
      'مراجعة شروط التخزين وتوصيات التهوية'
    ],
    stepsEn: [
      'Audit of pallet spacing, humidity, temperatures, and receiving docks',
      'Installing pheromone monitoring traps for population trends',
      'Executing targeted sanitation and treatment protocols',
      'Advisory on air circulation, pallet rotation, and storage hygiene'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'preventive-programs',
    slug: 'preventive-programs',
    title: 'برامج المكافحة الوقائية',
    titleEn: 'Preventive Pest Management',
    shortDesc: 'خطط وقائية مدروسة تهدف إلى تقليل احتمالية ظهور الآفات وحماية المنشأة قبل حدوث المشكلة.',
    shortDescEn: 'Proactive strategic programs designed to minimize pest risk before infestations emerge.',
    fullDesc: 'فلسفة إدارة الآفات المتكاملة (IPM) القائمة على الوقاية أولاً: غلق المنافذ، توفير المعايير الصحية، واستخدام الحواجز الواقية لحماية مستدامة.',
    fullDescEn: 'Integrated Pest Management (IPM) focusing on proactive barriers, exclusion, sanitation guidance, and early detection rather than reactive measures.',
    iconName: 'ShieldCheck',
    problems: [
      'تكلفة التعامل مع الإصابات المتأخرة والطارئة',
      'توقف العمل أو تشويه سمعة المنشأة في حال ظهور مفاجئ',
      'الاستخدام المفرط للمبيدات عند تأخر العلاج',
      'ثغرات هيكلية غير ملحوظة تسمح بالدخول'
    ],
    problemsEn: [
      'Higher expenses associated with reactive emergency interventions',
      'Business disruption and reputation damage from sudden pest sightings',
      'Need for heavier intervention when issues are left neglected',
      'Unnoticed architectural gaps facilitating ingress'
    ],
    places: [
      'الفنادق والمنتجعات السياحية',
      'المستشفيات والمراكز الطبية',
      'المنشآت التعليمية والجامعات',
      'المباني الإدارية والمقرات الرئيسية'
    ],
    placesEn: [
      'Hotels and premium tourist destinations',
      'Hospitals and clinical healthcare facilities',
      'Universities, schools, and daycare centers',
      'Corporate headquarters and commercial towers'
    ],
    features: [
      'تقييم شامل لنقاط الضعف والمنافذ في المبنى',
      'تطبيق حواجز وقائية بيئية وكيميائية مدروسة',
      'استشارات لتحسين إجراءات النظافة وإدارة النفايات'
    ],
    featuresEn: [
      'Comprehensive vulnerability assessment of building envelopes',
      'Implementation of defensive barrier systems',
      'Actionable recommendations on facility sanitation and waste management'
    ],
    steps: [
      'إجراء مسح وقائي شامل لجميع المرافق',
      'وضع خطة الحماية والتحصين المخصصة للمنشأة',
      'تطبيق الحواجز والمصائد الوقائية',
      'تحديث خطة الوقاية بشكل موسمي ومستمر'
    ],
    stepsEn: [
      'Comprehensive facility audit surveying structural vulnerabilities',
      'Formulating customized protection and fortification plans',
      'Installing preventive monitoring devices and barriers',
      'Seasonal updates maintaining year-round defense'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'routine-monitoring',
    slug: 'routine-monitoring',
    title: 'برامج المكافحة الدورية',
    titleEn: 'Routine Monitoring & Periodic Programs',
    shortDesc: 'زيارات وبرامج متابعة منتظمة وفق جداول زمنية تناسب طبيعة المنشأة وتضمن استقرار بيئة العمل.',
    shortDescEn: 'Scheduled recurring visits and systematic follow-ups tailored to ensure long-term stability.',
    fullDesc: 'عقود وزيارات دورية (أسبوعية، شهرية، أو ربع سنوية) مع تقديم تقارير تفصيلية لكل زيارة لضمان بقاء المنشأة خالية من الآفات ومطابقة للمعايير.',
    fullDescEn: 'Flexible recurring service contracts (weekly, monthly, quarterly) featuring detailed visit logs to maintain continuous hygiene compliance.',
    iconName: 'Clock',
    problems: [
      'تكرار ظهور الآفات في حال انقطاع المتابعة',
      'تراكم المشكلات دون ملاحظتها من قبل إدارة المنشأة',
      'صعوبة تلبية متطلبات هيئات التفتيش والرقابة',
      'الحاجة لمسؤولية مستمرة وفريق متخصص'
    ],
    problemsEn: [
      'Re-infestation recurrences when regular monitoring lapses',
      'Latent issues developing unnoticed by everyday staff',
      'Difficulty meeting sanitary audit regulations and checks',
      'The need for dedicated professional oversight'
    ],
    places: [
      'سلاسل المطاعم والكافيهات',
      'المستشفيات والعيادات والمعامل',
      'المصانع والمناطق اللوجستية',
      'الفيلات والمجمعات السكنية الكبرى'
    ],
    placesEn: [
      'Restaurant chains and food processing hubs',
      'Hospitals, medical labs, and diagnostic clinics',
      'Factories and supply chain logistics parks',
      'Villas and large residential gated communities'
    ],
    features: [
      'مواعيد زيارات محددة مسبقاً بالتنسيق مع العميل',
      'سجل متابعة وتقارير دورية لكل زيارة',
      'استجابة سريعة لأي طارئ بين الزيارات المجدولة'
    ],
    featuresEn: [
      'Pre-scheduled service appointments coordinated with your team',
      'Detailed logbooks and service activity documentation',
      'Prompt response for unexpected queries between regular visits'
    ],
    steps: [
      'الاتفاق على الجدول الزمني المناسب لنشاط المنشأة',
      'تنفيذ الزيارات الدورية والفحص الدقيق للمحطات',
      'تجديد المواد والطعوم وإجراء التدخلات الوقائية',
      'تسليم تقرير الزيارة ومراجعة النتائج مع المسؤول'
    ],
    stepsEn: [
      'Contract agreement aligning with operational rhythm',
      'Conducting scheduled walkthrough inspections and station audits',
      'Replenishing defensive materials and conducting targeted actions',
      'Submitting service reports and reviewing findings with site managers'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const SECTORS_DATA: SectorItem[] = [
  {
    id: 'residential',
    icon: 'Home',
    name: 'المنازل والفيلات',
    nameEn: 'Homes & Villas',
    description: 'حماية هادئة وآمنة للمنازل والفيلات والشقق من الحشرات والقوارض بما يحفظ راحة وصحة أفراد العائلة.',
    descriptionEn: 'Safe, discreet protection for apartments, villas, and family residences ensuring home hygiene.',
    examples: ['فيلات سكنية', 'شقق دوبلكس', 'شاليهات', 'حدائق خاصة'],
    examplesEn: ['Private villas', 'Apartments', 'Vacation homes', 'Private gardens']
  },
  {
    id: 'corporate',
    icon: 'Building2',
    name: 'الشركات والمكاتب',
    nameEn: 'Offices & Corporate',
    description: 'بيئة عمل نقية وصحية تعزز إنتاجية الموظفين وتترك انطباعاً راقياً لدى عملاء وشركاء شركتك.',
    descriptionEn: 'Spotless work environments enhancing employee well-being and projecting corporate professionalism.',
    examples: ['أبراج ومكاتب إدارية', 'مقرات بنوك', 'مساحات عمل مشتركة', 'غرف اجتماعات'],
    examplesEn: ['Office towers', 'Bank branches', 'Co-working spaces', 'Boardrooms']
  },
  {
    id: 'restaurants',
    icon: 'Utensils',
    name: 'المطاعم والكافيهات',
    nameEn: 'Restaurants & Cafes',
    description: 'برامج دقيقة تراعي أعلى اشتراطات سلامة الغذاء ونظافة المطابخ ومناطق تقديم الطعام للزبائن.',
    descriptionEn: 'Rigorous programs upholding food safety guidelines, dining room hygiene, and kitchen sanitation.',
    examples: ['مطاعم راقية', 'مطابخ سحابية', 'سلاسل كافيهات', 'صالات طعام'],
    examplesEn: ['Fine dining', 'Cloud kitchens', 'Coffeehouse chains', 'Food courts']
  },
  {
    id: 'hotels',
    icon: 'Hotel',
    name: 'الفنادق والقرى السياحية',
    nameEn: 'Hotels & Resorts',
    description: 'خدمات متكاملة تحمي سمعة المنشأة الفندقية وتوفر تجربة إقامة استثنائية وخالية من الإزعاج للنزلاء.',
    descriptionEn: 'Discreet solutions protecting hospitality reputation and ensuring comfortable guest stays.',
    examples: ['فنادق ومنتجعات', 'قرى ساحلية', 'شقق فندقية', 'مرافق ترفيهية'],
    examplesEn: ['Hotels & resorts', 'Coastal villages', 'Serviced suites', 'Recreational facilities']
  },
  {
    id: 'education',
    icon: 'GraduationCap',
    name: 'المدارس والحضانات',
    nameEn: 'Schools & Nurseries',
    description: 'اهتمام فائق بسلامة الأطفال والطلاب باستخدام حلول ملائمة وآمنة للمرافق التعليمية وأماكن اللعب.',
    descriptionEn: 'Utmost care for child and student safety using tested solutions suited for educational premises.',
    examples: ['مدارس دولية وخاصة', 'حضانات أطفال', 'مراكز تدريب', 'ملاعب تعليمية'],
    examplesEn: ['Schools & campuses', 'Early child daycares', 'Training centers', 'Play areas']
  },
  {
    id: 'healthcare',
    icon: 'Hospital',
    name: 'المستشفيات والعيادات',
    nameEn: 'Hospitals & Clinics',
    description: 'أعلى معايير التعقيم ومكافحة الآفات للمنشآت الصحية لحماية المرضى والأجهزة الطبية الحساسة.',
    descriptionEn: 'Highest sanitation standards for medical facilities protecting patients and sensitive devices.',
    examples: ['مستشفيات عامة وخاصة', 'عيادات تخصصية', 'معامل تحاليل', 'مراكز أشعة'],
    examplesEn: ['General & private hospitals', 'Specialized clinics', 'Diagnostic labs', 'Radiology centers']
  },
  {
    id: 'industrial',
    icon: 'Factory',
    name: 'المصانع والمنشآت الإنتاجية',
    nameEn: 'Factories & Plants',
    description: 'حلول صناعية تتوافق مع متطلبات خطوط الإنتاج والشهادات ومعايير الجودة المعتمدة.',
    descriptionEn: 'Industrial-grade protocols complying with production line safety and quality audit standards.',
    examples: ['مصانع أغذية وأدوية', 'منشآت تعبئة وتغليف', 'ورش تجميع', 'خطوط إنتاج'],
    examplesEn: ['Food & pharma plants', 'Packaging facilities', 'Assembly units', 'Industrial workshops']
  },
  {
    id: 'warehouses',
    icon: 'Boxes',
    name: 'المخازن والمستودعات',
    nameEn: 'Warehouses & Logistics',
    description: 'حماية البضائع والمواد الخام ومراكز التخزين من أضرار القوارض والآفات وتلف المخزون.',
    descriptionEn: 'Protection of stored goods, bulk raw commodities, and depots against rodent and pest damage.',
    examples: ['مستودعات مركزية', 'مخازن مبردة وجافة', 'موانئ ومحطات شحن', 'مراكز فرز'],
    examplesEn: ['Central distribution depots', 'Dry & cold storage', 'Cargo logistics hubs', 'Fulfillment centers']
  },
  {
    id: 'commercial',
    icon: 'ShoppingBag',
    name: 'المحلات والمنشآت التجارية',
    nameEn: 'Retail & Commercial',
    description: 'حماية المتاجر ومراكز التسوق لعرض المنتجات في بيئة جذابة ونظيفة تريح المتسوقين.',
    descriptionEn: 'Safeguarding retail stores and shopping centers to present merchandise in pristine environments.',
    examples: ['مراكز تسوق ومولات', 'معارض تجارية', 'سوبرماركت وهايبرماركت', 'محلات بيع تجزئة'],
    examplesEn: ['Shopping malls', 'Commercial showrooms', 'Supermarkets', 'Retail outlets']
  },
];

export const WHY_CLASSIC_ITEMS: WhyChooseItem[] = [
  {
    id: 'customized',
    title: 'حلول مصممة حسب احتياجات كل منشأة',
    titleEn: 'Tailored Solutions for Every Facility',
    description: 'دراسة طبيعة كل مكان واحتياجاته الخاصة وتصميم برنامج مكافحة يلائم النشاط والمساحة بدقة.',
    descriptionEn: 'Careful assessment of facility dynamics to customize an intervention plan fitting your operational requirements.',
    iconName: 'Settings',
  },
  {
    id: 'quality-safety',
    title: 'اهتمام بالجودة والسلامة',
    titleEn: 'Strict Quality & Safety Standards',
    description: 'تطبيق مواد معتمدة لصحة البيئة وفق معايير السلامة المهنية لحماية المتواجدين.',
    descriptionEn: 'Deploying approved public health products adhering to occupational and environmental safety protocols.',
    iconName: 'Shield',
  },
  {
    id: 'multi-sector',
    title: 'خدمة للأفراد والقطاعات المختلفة',
    titleEn: 'Serving Homes & Diverse Industries',
    description: 'خبرة عملية تلبي متطلبات المنازل السكنية إلى أكبر المنشآت التجارية والصناعية.',
    descriptionEn: 'Versatile capability addressing domestic residential spaces up to complex corporate industrial operations.',
    iconName: 'Users',
  },
  {
    id: 'integrated-programs',
    title: 'برامج مكافحة وقائية وعلاجية',
    titleEn: 'Preventive & Remedial Programs',
    description: 'الدمج بين القضاء السريع على المشاكل القائمة وبناء خطط دفاعية تمنع عودتها مجدداً.',
    descriptionEn: 'Combining targeted treatment of active issues with structured preventive barriers to avoid recurrence.',
    iconName: 'Layers',
  },
  {
    id: 'post-service-followup',
    title: 'متابعة ما بعد الخدمة',
    titleEn: 'Dedicated Post-Service Follow-up',
    description: 'عدم الاكتفاء بالزيارة الأولى، بل تقديم استشارات ومتابعة مستمرة لتقييم النتائج بدقة.',
    descriptionEn: 'Continuous post-treatment communication, evaluation, and monitoring to ensure sustained results.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'punctuality',
    title: 'الالتزام بالمواعيد',
    titleEn: 'Punctuality & Reliability',
    description: 'احترام جدول العميل ومواعيد الزيارات المتفق عليها لتفادي تعطيل سير العمل أو راحة البيت.',
    descriptionEn: 'Strict adherence to scheduled appointments to prevent workplace disruption or domestic inconvenience.',
    iconName: 'CalendarCheck',
  },
  {
    id: 'easy-communication',
    title: 'تواصل سريع وسهل',
    titleEn: 'Fast & Seamless Communication',
    description: 'قنوات اتصال فورية ومباشرة عبر الهاتف وWhatsApp للرد السريع على استفساراتكم.',
    descriptionEn: 'Direct, responsive channels via phone and WhatsApp ensuring quick answers and swift assistance.',
    iconName: 'MessageSquare',
  },
  {
    id: 'customer-experience',
    title: 'اهتمام بتجربة العميل',
    titleEn: 'Customer Experience Focus',
    description: 'فريق مهني يتعامل بلباقة واحترافية ويحرص على نظافة المكان بعد إتمام العمل.',
    descriptionEn: 'Professional, courteous personnel dedicated to maintaining site tidiness and total client comfort.',
    iconName: 'HeartHandshake',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'تواصل معنا',
    titleEn: 'Contact Us',
    description: 'تواصل عبر الهاتف أو WhatsApp أو أرسل طلب عرض سعر لتسجيل بياناتك واحتياجك.',
    descriptionEn: 'Reach out via phone, WhatsApp, or our online quote form with your basic inquiry details.',
  },
  {
    number: '02',
    title: 'تحديد احتياجاتك',
    titleEn: 'Identify Your Needs',
    description: 'فهم طبيعة المنشأة، نوع المشكلة التي تواجهها، والمساحة لتحديد أفضل طريقة للتعامل.',
    descriptionEn: 'Evaluating your facility type, the scope of observed pest activity, and spatial specifications.',
  },
  {
    number: '03',
    title: 'اختيار خطة المكافحة المناسبة',
    titleEn: 'Select Treatment Plan',
    description: 'اقتراح الحل المناسب سواء كانت جلسة علاجية محددة أو برنامج مكافحة دوري ووقائي.',
    descriptionEn: 'Recommending an optimal treatment route—whether a targeted intervention or recurring periodic program.',
  },
  {
    number: '04',
    title: 'التنفيذ والمتابعة',
    titleEn: 'Execution & Follow-up',
    description: 'تنفيذ الخدمة باحترافية وتزويدك بالنصائح الوقائية ومتابعة النتيجة حسب الاتفاق.',
    descriptionEn: 'Professional application with clear preventive guidance, backed by scheduled post-service checks.',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'ما أنواع الآفات التي يمكن مكافحتها؟',
    questionEn: 'What types of pests do you manage?',
    answer: 'نقدم حلولاً لمكافحة مختلف آفات الصحة العامة، بما في ذلك الحشرات الزاحفة (مثل الصراصير والنمل)، الحشرات الطائرة (كالذباب والبعوض)، القوارض (الفئران والجرذان)، وآفات المواد المخزونة، وفق برامج مدروسة تناسب كل حالة.',
    answerEn: 'We provide management solutions for major public health pests, including crawling insects (cockroaches, ants), flying insects (flies, mosquitoes), rodents (mice, rats), and stored product pests through customized programs.',
  },
  {
    id: 'faq-2',
    question: 'هل تقدمون خدمات للمنازل؟',
    questionEn: 'Do you offer residential services for homes and villas?',
    answer: 'نعم، نقدم خدمات متخصصة للشقق والفيلات والمنازل، مع مراعاة اختيار وسائل آمنة ومناسبة للبيئة المنزلية وتواجد أفراد الأسرة.',
    answerEn: 'Yes, we provide dedicated services for apartments, villas, and residences, utilizing methods carefully suited for household environments and family safety.',
  },
  {
    id: 'faq-3',
    question: 'هل تقدمون خدمات للشركات والمنشآت؟',
    questionEn: 'Do you provide services for commercial companies and facilities?',
    answer: 'نعم، نوفر حلولاً مصممة لمختلف المنشآت والأنشطة التجارية بما يشمل الشركات، المطاعم، الفنادق، المصانع، المخازن، والمراكز الطبية مع مرونة في جداول العمل.',
    answerEn: 'Yes, we tailor solutions for diverse commercial enterprises including corporate offices, restaurants, hotels, manufacturing facilities, warehouses, and medical centers with flexible operational scheduling.',
  },
  {
    id: 'faq-4',
    question: 'هل توجد برامج مكافحة دورية؟',
    questionEn: 'Are periodic or routine maintenance programs available?',
    answer: 'نعم، نوفر برامج متابعة دورية بزيارات مجدولة (شهرية أو حسب حاجة المنشأة) للحفاظ على مستويات وقاية مستمرة وتقليل فرص ظهور الآفات مجدداً.',
    answerEn: 'Yes, we offer routine maintenance programs with scheduled periodic visits (monthly or facility-specific) to maintain steady prevention and avoid recurring issues.',
  },
  {
    id: 'faq-5',
    question: 'كيف يتم تحديد الخدمة المناسبة؟',
    questionEn: 'How is the suitable service determined?',
    answer: 'يتم تحديد الخدمة بناءً على معلومات المكان، نوع الآفة الملاحظة، درجة الانتشار، وطبيعة النشاط (سكني، تجاري، غذائي)، لاقتراح أفضل خطة عمل.',
    answerEn: 'The appropriate service is determined based on facility details, observed pest activity, severity, and the operational environment (residential, commercial, food service) to establish an optimal plan.',
  },
  {
    id: 'faq-6',
    question: 'كيف يمكن طلب الخدمة؟',
    questionEn: 'How can I request a service?',
    answer: 'يمكنك طلب الخدمة بسهولة من خلال الاتصال الهاتفي المباشر، إرسال رسالة عبر WhatsApp، أو ملء نموذج طلب الخدمة أو عرض السعر المتاح على الموقع.',
    answerEn: 'You can easily request service by calling our direct phone line, messaging us via WhatsApp, or submitting the service/quote request form on our website.',
  },
  {
    id: 'faq-7',
    question: 'هل يمكن الحصول على عرض سعر؟',
    questionEn: 'Can I obtain a price quote for my property?',
    answer: 'نعم، يسعدنا تزويدك بعرض سعر بعد مشاركة تفاصيل المنشأة ونوع الخدمة المطلوبة إما عبر النموذج المخصص أو بالتواصل المباشر مع فريقنا.',
    answerEn: 'Yes, we are pleased to provide you with an accurate quote upon receiving details about your property and required services via our quote form or direct contact.',
  },
  {
    id: 'faq-8',
    question: 'ما المعلومات المطلوبة قبل تحديد الخدمة؟',
    questionEn: 'What details are needed before scheduling service?',
    answer: 'تساعدنا معرفة نوع المنشأة (شقة، مطعم، مخزن)، المساحة التقريبية، المشكلة الملحوظة وموقعها، والمدينة أو المنطقة في تقديم التوصية الأنسب بسرعة.',
    answerEn: 'Helpful details include your property type (apartment, restaurant, warehouse), approximate area, observed pest signs and locations, and your city/district for a prompt recommendation.',
  },
];
