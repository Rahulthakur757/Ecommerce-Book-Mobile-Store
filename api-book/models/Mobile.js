const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const mobileSchema = new Schema({
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    launchDate: { type: Date },
    availability: { type: String, enum: ['InStock', 'OutofStock', 'PreOrder','Upcoming'] },
    ram: { type: String, default: '8GB', enum: ['3GB','4GB', '6GB', '8GB', '12GB'] },
    storage: { type: String,default: '64GB', enum: ['32GB', '64GB', '128GB', '256GB', '512GB'] },
    expandable: { type: Boolean, default: true, enum: [true, false] },
    bodyMaterial: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    display: { type: String, default:'punchhole', enum: ['HD','Punchhole','IPSLCD', 'FoldableDisplay','AMOLED','CurvedDisplay', 'SuperAMOLED'] },
    screenSize: { type: String, default: '4.7 inch - 5 inch', enum:['4 inch - 4.7 inch','4.7 inch - 5 inch','5 inch - 5.5 inch','5.5 inch - 6 inch','6 inch - 6.5 inch']},
    refreshRate: { type: Number, default: 90, enum: [90,120, 144] },
    rearCamera: { type: String, default: '13MP', enum:['13MP','16MP','32MP','48MP','64MP','108MP']  },
    frontCamera: { type: String, default: '5MP', enum:['5MP','13MP','16MP','32MP'] },
    cpuCore: { type: String, default: 'QuadCore', enum: ['DualCore','QuadCore','OctaCore','DecaCore']},
    batterySize: { type: String, default:'4000mAh', enum:['4000mAH','4700mAH','5000mAH','5500mAH','6000mAH','6800mAH','7000mAh'] },
    chargingType: { type: Boolean, default: false, enum: [true, false] },
    connectivity: { type: String, default:'5G', enum:['3G','4G','5G','WirelessCharging','NFC','VoLTE','USBConnectivity','WiFi'] },
    os: { type: String,  default: 'Android12', enum: ['Android12','Android13','Android14','Android15','iOS']  },
    features: {type: String, default: 'FingerPrint', enum:['FaceUnlock','FingerPrint','GPS','WaterProof','UFS4Storage','FMRadio', 'IndisplayFingerprint', 'MemoryCardSupport', 'MusicPlayer',]},
    ipRating: { type: String, default:'IP64', enum:['IP55', 'IP56', 'IP64', 'IP66', 'IP67','IP68','IP69',] },
    status: { type: String, default: 'Active', enum: ['Active', 'Disable']},
    image: { type: String, required: true },
    updatedAt: Date,
    createdAt: Date
});
mobileSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Mobiles', mobileSchema);