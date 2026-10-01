'use strict';
/* All business facts and economics are invented for this demonstration. USD nominal. */
(function(root){
const BASE={company:'Empresas Katort, S.A. de C.V.',owner:'Javier Ortiz',founded:2020,area:100,ownedHa:60,leasedHa:40,region:'Caborca, Sonora · ubicación ficticia',currency:'USD',reportDate:'2026-10-01',cutoff:'2025-12-31',debtOriginal:2600000,rate:.05,term:10,paidYears:4,startYear:2022,taxRate:.30,openingCash:314100};
const periods={2025:{yield:8,price:4,exportShare:80,localPrice:1.4,reject:5,variablePerKg:2,fixed:420000,depreciation:180000,capex:80000,deltaWC:50000,dividends:50000,openingDebt:1820000,openingCash:314100},2026:{yield:8.2,price:4.08,exportShare:81,localPrice:1.428,reject:5,variablePerKg:2.06,fixed:432600,depreciation:185000,capex:100000,deltaWC:30000,dividends:0,openingDebt:1560000,openingCash:360000}};
function calculate(year=2025,changes={}){
const p={...periods[year],...changes};const grossKg=BASE.area*p.yield*1000,exportKg=grossKg*p.exportShare/100,localKg=grossKg*(100-p.exportShare-p.reject)/100,rejectKg=grossKg*p.reject/100;
const exportRevenue=exportKg*p.price,localRevenue=localKg*p.localPrice,revenue=exportRevenue+localRevenue,variable=grossKg*p.variablePerKg,opex=variable+p.fixed,ebitda=revenue-opex,ebit=ebitda-p.depreciation;
const principal=BASE.debtOriginal/BASE.term,interest=p.openingDebt*BASE.rate,service=principal+interest,ebt=ebit-interest,tax=Math.max(ebt,0)*BASE.taxRate,netIncome=ebt-tax;
const cfads=ebitda-tax-p.capex-p.deltaWC,afterDebt=cfads-service,closingCash=p.openingCash+afterDebt-p.dividends;
const netOperatingCash=ebitda-tax-p.deltaWC-interest;
return {...p,year,grossKg,exportKg,localKg,rejectKg,exportRevenue,localRevenue,revenue,variable,opex,ebitda,ebit,principal,interest,service,ebt,tax,netIncome,cfads,afterDebt,closingCash,netOperatingCash,closingDebt:p.openingDebt-principal,margin:ebitda/revenue,dscr:cfads/service,blendedPrice:revenue/(exportKg+localKg),ebitdaBreakEvenPrice:(opex-localRevenue)/exportKg};
}
function debtSchedule(){let balance=BASE.debtOriginal;return Array.from({length:10},(_,i)=>{const opening=balance,principal=260000,interest=opening*BASE.rate;balance-=principal;return {year:2022+i,number:i+1,opening,principal,interest,payment:principal+interest,closing:balance,paid:i<4};});}
const assets=[
{name:'Terreno agrícola · 60 ha propias',kind:'Propio',gross:900000,depreciation:0,net:900000},
{name:'Plantación y establecimiento · 100 ha',kind:'Propio',gross:1000000,depreciation:280000,net:720000},
{name:'Riego y bombeo',kind:'Propio',gross:600000,depreciation:180000,net:420000},
{name:'Maquinaria y equipo agrícola',kind:'Propio',gross:500000,depreciation:200000,net:300000},
{name:'Empaque y cámara fría',kind:'Propio',gross:800000,depreciation:150000,net:650000},
{name:'Vehículos',kind:'Propio',gross:200000,depreciation:80000,net:120000}
];
const rentals=[{name:'Tierra agrícola · 40 ha',annual:80000,treatment:'Incluido en costos fijos; sin valor de propiedad en el balance.'},{name:'Transporte refrigerado contratado',annual:160000,treatment:'Incluido en costos variables; no se registra como activo propio.'}];
const balance={cash:360000,receivables:320000,inventory:180000,prepaids:40000,fixedNet:3110000,otherAssets:90000,payables:210000,accrued:90000,currentDebt:260000,longDebt:1300000,capital:1600000,retained:640000};
const variableCosts=[['Mano de obra',640000],['Insumos y nutrición',240000],['Agua y energía',120000],['Cosecha, selección y empaque',360000],['Flete refrigerado',160000],['Otros costos de campo',80000]];
const fixedCosts=[['Renta de 40 ha',80000],['Administración',140000],['Seguros',40000],['Mantenimiento operativo',100000],['Calidad y certificación',60000]];
const weights=[.04,.08,.16,.18,.13,.08,.04,.02,.04,.07,.10,.06];const costWeights=[.09,.09,.10,.10,.09,.08,.07,.07,.07,.08,.08,.08];
function monthly(m){let cash=m.openingCash;return weights.map((w,i)=>{const sales=m.revenue*w,variable=m.variable*costWeights[i],fixed=m.fixed/12,capex=i===3?m.capex:0,wc=i===2?m.deltaWC:0,tax=i===11?m.tax:0,interest=i===11?m.interest:0,principal=i===11?m.principal:0,dividends=i===11?m.dividends:0;const movement=sales-variable-fixed-capex-wc-tax-interest-principal-dividends;cash+=movement;return {month:i,sales,variable,fixed,capex,wc,tax,interest,principal,dividends,movement,cash};});}
function projections(){return Array.from({length:6},(_,i)=>{const year=2026+i,openingDebt=1560000-i*260000;return calculate(2026,{yield:Math.min(8.2+i*.2,9),price:4.08*Math.pow(1.02,i),localPrice:1.428*Math.pow(1.02,i),exportShare:Math.min(81+i,85),variablePerKg:2.06*Math.pow(1.03,i),fixed:432600*Math.pow(1.03,i),depreciation:185000,capex:100000,deltaWC:30000,openingDebt,dividends:0,openingCash:0,year});}).map((m,i)=>({...m,year:2026+i}));}
const facts={permanentStaff:22,seasonalStaff:120,seasonalDays:110,annualWaterM3:800000,exportDestinations:[['EE.UU.',90],['Canadá',10]],buyers:[['Comprador A · ficticio',50],['Comprador B · ficticio',30],['Comprador C · ficticio',20]],paymentDays:45,ownPackhouse:true,certification:'GlobalG.A.P. y inocuidad: supuestos del caso; no se acredita certificación real.',landLease:'40 ha · renta anual de USD 80,000 · contrato hipotético hasta 2031'};
const MODEL={BASE,periods,calculate,debtSchedule,assets,rentals,balance,variableCosts,fixedCosts,monthly,projections,facts};root.KATORT=MODEL;if(typeof module!=='undefined')module.exports=MODEL;
})(typeof window!=='undefined'?window:globalThis);

