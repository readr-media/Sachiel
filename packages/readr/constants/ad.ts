import type { AdsenseUnits } from '~/types/ad'

import { CATEGORY_SLUGS } from './constant'

const {
  breakingnews,
  education,
  politics,
  humanrights,
  environment,
  omt,
  data,
  note,
  covid19,
  culture,
  international,
  traffic,
} = CATEGORY_SLUGS

const ADSENSE_UNITS: AdsenseUnits = {
  // page key: 首頁, hp
  home: {
    MB_HD: {
      adUnit: 'READr_m_hp_300x250_HD',
      adSlot: '1436907699',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_hp_300x250_FT',
      adSlot: '6497662681',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_hp_970x250_HD',
      adSlot: '8684008170',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_hp_970x250_FT',
      adSlot: '7865433293',
      adSize: [970, 250],
    },
  },

  // page key: 標籤, tag
  tag: {
    MB_HD: {
      adUnit: 'READr_m_tag_300x250_HD',
      adSlot: '5279090953',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_tag_300x250_FT',
      adSlot: '3582865905',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_tag_970x250_HD',
      adSlot: '5470662642',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_tag_970x250_FT',
      adSlot: '8643620890',
      adSize: [970, 250],
    },
  },

  // page key: 作者, author
  author: {
    MB_HD: {
      adUnit: 'READr_m_author_300x250_HD',
      adSlot: '6743134296',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_author_300x250_FT',
      adSlot: '6017457559',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_author_970x250_HD',
      adSlot: '4918330007',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_author_970x250_FT',
      adSlot: '7864644278',
      adSize: [970, 250],
    },
  },

  // page key: 時事, breakingnews
  [breakingnews]: {
    MB_HD: {
      adUnit: 'READr_m_breakingnews_300x250_HD',
      adSlot: '6904856795',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_breakingnews_300x250_FT',
      adSlot: '2555328495',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_breakingnews_300x250_AT1',
      adSlot: '4250773297',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_breakingnews_300x250_AT2',
      adSlot: '2734511646',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_breakingnews_300x250_E1',
      adSlot: '8174223355',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_breakingnews_970x250_HD',
      adSlot: '4605162366',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_breakingnews_970x250_FT',
      adSlot: '5068977047',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_breakingnews_640x390_AT1',
      adSlot: '5032537777',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_breakingnews_640x390_AT2',
      adSlot: '2842268952',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_breakingnews_640x390_E1',
      adSlot: '2266456402',
      adSize: [640, 390],
    },
  },

  // page key: 教育, education
  [education]: {
    MB_HD: {
      adUnit: 'READr_m_education_300x250_HD',
      adSlot: '3784649683',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_education_300x250_FT',
      adSlot: '6303001817',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_education_300x250_AT1',
      adSlot: '8325749679',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_education_300x250_AT2',
      adSlot: '7594804704',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_education_300x250_E1',
      adSlot: '1079429440',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_education_970x250_HD ',
      adSlot: '8680918995',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_education_970x250_FT',
      adSlot: '3045448931',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_education_640x390_AT1',
      adSlot: '3719456107',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_education_640x390_AT2',
      adSlot: '8348649029',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_education_640x390_E1',
      adSlot: '9730013455',
      adSize: [640, 390],
    },
  },

  // page key: 政治, politics
  [politics]: {
    MB_HD: {
      adUnit: 'READr_m_politics_300x250_HD',
      adSlot: '8932254339',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_politics_300x250_FT',
      adSlot: '1050675130',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_politics_300x250_AT1',
      adSlot: '1613001664',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_politics_300x250_AT2',
      adSlot: '3463988007',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_politics_300x250_E1',
      adSlot: '1122881221',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_politics_970x250_HD',
      adSlot: '2948148534',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_politics_970x250_FT',
      adSlot: '9419285598',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_politics_640x390_AT1',
      adSlot: '5566573013',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_politics_640x390_AT2',
      adSlot: '5404853118',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_politics_640x390_E1',
      adSlot: '5946998340',
      adSize: [640, 390],
    },
  },

  // page key: 人權, humanrights
  [humanrights]: {
    MB_HD: {
      adUnit: 'READr_m_humanrights_300x250_HD',
      adSlot: '1158486344',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_humanrights_300x250_FT',
      adSlot: '5208631742',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_humanrights_300x250_AT1',
      adSlot: '5943909168',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_humanrights_300x250_AT2',
      adSlot: '6482184960',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_humanrights_300x250_E1',
      adSlot: '7261694415',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_humanrights_970x250_HD',
      adSlot: '9745808409',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_humanrights_970x250_FT',
      adSlot: '9088113100',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_humanrights_640x390_AT1 ',
      adSlot: '6516692605',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_humanrights_640x390_AT2',
      adSlot: '1465608106',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_humanrights_640x390_E1',
      adSlot: '9694671662',
      adSize: [640, 390],
    },
  },

  // page key: 環境, environment
  [environment]: {
    MB_HD: {
      adUnit: 'READr_m_environment_300x250_HD',
      adSlot: '6090468571',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_environment_300x250_FT',
      adSlot: '8357539260',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_environment_300x250_AT1',
      adSlot: '6980878415',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_environment_300x250_AT2',
      adSlot: '1229858289',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_environment_300x250_E1 ',
      adSlot: '8422786742',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_environment_970x250_HD',
      adSlot: '3017528778',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_environment_970x250_FT',
      adSlot: '5480040587',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_environment_640x390_AT1',
      adSlot: '6696973239',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_environment_640x390_AT2',
      adSlot: '1274036414',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_environment_640x390_E1',
      adSlot: '1074725869',
      adSize: [640, 390],
    },
  },

  // page key: 新鮮事, omt
  [omt]: {
    MB_HD: {
      adUnit: 'READr_m_omt_300x250_HD',
      adSlot: '8845404678',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_omt_300x250_FT',
      adSlot: '5731375924',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_omt_300x250_AT1',
      adSlot: '5911339326',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_omt_300x250_AT2',
      adSlot: '9646252970',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_omt_300x250_E1',
      adSlot: '4351679797',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_omt_970x250_HD',
      adSlot: '4069658513',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_omt_970x250_FT',
      adSlot: '2331133064',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_omt_640x390_AT1',
      adSlot: '5383891567',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_omt_640x390_AT2',
      adSlot: '5021709736',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_omt_640x390_E1',
      adSlot: '1085236678',
      adSize: [640, 390],
    },
  },

  // page key: 資料專欄, omt
  [data]: {
    MB_HD: {
      adUnit: 'READr_m_data_300x250_HD',
      adSlot: '9838141899',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_data_300x250_FT',
      adSlot: '1792130917',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_data_300x250_AT1',
      adSlot: '1972094311',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_data_300x250_AT2',
      adSlot: '1931414484',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_data_300x250_E1',
      adSlot: '7756518437',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_data_970x250_HD',
      adSlot: '7482289918',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_data_970x250_FT',
      adSlot: '3181180307',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_data_640x390_AT1',
      adSlot: '2757728224',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_data_640x390_AT2',
      adSlot: '9470159003',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_data_640x390_E1',
      adSlot: '2196235845',
      adSize: [640, 390],
    },
  },

  // page key: 新聞幕後, note
  [note]: {
    MB_HD: {
      adUnit: 'READr_m_note_300x250_HD',
      adSlot: '9964983024',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_note_300x250_FT',
      adSlot: '2606519131',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_note_300x250_AT1',
      adSlot: '9415470065',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_note_300x250_AT2',
      adSlot: '6729596979',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_note_300x250_E1',
      adSlot: '5070645340',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_note_970x250_HD',
      adSlot: '7886712075',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_note_970x250_FT',
      adSlot: '6928853620',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_note_640x390_AT1',
      adSlot: '9131564887',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_note_640x390_AT2',
      adSlot: '4830138041',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_note_640x390_E1',
      adSlot: '7267501645',
      adSize: [640, 390],
    },
  },

  // page key: COVID-19, covid19
  [covid19]: {
    MB_HD: {
      adUnit: 'READr_m_covid19_300x250_HD',
      adSlot: '4585815215',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_covid19_300x250_FT',
      adSlot: '4798348457',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_covid19_300x250_AT1',
      adSlot: '1536980040',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_covid19_300x250_AT2',
      adSlot: '5416515307',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_covid19_300x250_E1',
      adSlot: '7740260465',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_covid19_970x250_HD',
      adSlot: '3878086825',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_covid19_970x250_FT',
      adSlot: '9606987857',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_covid19_640x390_AT1',
      adSlot: '6505401541',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_covid19_640x390_AT2',
      adSlot: '9890893031',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_covid19_640x390_E1',
      adSlot: '3930891860',
      adSize: [640, 390],
    },
  },

  // page key: 文化, culture
  [culture]: {
    MB_HD: {
      adUnit: 'READr_m_culture_300x250_HD',
      adSlot: '6219241338',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_culture_300x250_FT',
      adSlot: '8980355792',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_culture_300x250_AT1',
      adSlot: '5284653365',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_culture_300x250_AT2',
      adSlot: '4103433633',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_culture_300x250_E1',
      adSlot: '7927962727',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_culture_970x250_HD',
      adSlot: '6273467250',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_culture_970x250_FT',
      adSlot: '1947989684',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_culture_640x390_AT1',
      adSlot: '2385875908',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_culture_640x390_AT2',
      adSlot: '9890893031',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_culture_640x390_E1',
      adSlot: '3325484681',
      adSize: [640, 390],
    },
  },

  // page key: 國際, international
  [international]: {
    MB_HD: {
      adUnit: 'READr_m_international_300x250_HD',
      adSlot: '3272733547',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_international_300x250_FT',
      adSlot: '6469742526',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_international_300x250_AT1',
      adSlot: '7719245017',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_international_300x250_AT2',
      adSlot: '3679610422',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_international_300x250_E1',
      adSlot: '6427178795',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_international_970x250_HD',
      adSlot: '7290718225',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_international_970x250_FT',
      adSlot: '1728497833',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_international_640x390_AT1',
      adSlot: '1072794231',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_international_640x390_AT2',
      adSlot: '9985481559',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_international_640x390_E1',
      adSlot: '4449766617',
      adSize: [640, 390],
    },
  },

  // page key: 交通, traffic
  [traffic]: {
    MB_HD: {
      adUnit: 'READr_m_traffic_300x250_HD',
      adSlot: '2279996326',
      adSize: [300, 250],
    },
    MB_FT: {
      adUnit: 'READr_m_traffic_300x250_FT',
      adSlot: '8788784106',
      adSize: [300, 250],
    },
    MB_AT1: {
      adUnit: 'READr_m_traffic_300x250_AT1',
      adSlot: '7048009798',
      adSize: [300, 250],
    },
    MB_AT2: {
      adUnit: 'READr_m_traffic_300x250_AT2',
      adSlot: '7751034608',
      adSize: [300, 250],
    },
    MB_E1: {
      adUnit: 'READr_m_traffic_300x250_E1',
      adSlot: '6192155322',
      adSize: [300, 250],
    },
    PC_HD: {
      adUnit: 'READr_pc_traffic_970x250_HD',
      adSlot: '4664554889',
      adSize: [970, 250],
    },
    PC_FT: {
      adUnit: 'READr_pc_traffic_970x250_FT',
      adSlot: '8321826348',
      adSize: [970, 250],
    },
    PC_AT1: {
      adUnit: 'READr_pc_traffic_640x390_AT1',
      adSlot: '4538494005',
      adSize: [640, 390],
    },
    PC_AT2: {
      adUnit: 'READr_pc_traffic_640x390_AT2',
      adSlot: '7073158008',
      adSize: [640, 390],
    },
    PC_E1: {
      adUnit: 'READr_pc_traffic_640x390_E1',
      adSlot: '1823603275',
      adSize: [640, 390],
    },
  },
}

export { ADSENSE_UNITS }
