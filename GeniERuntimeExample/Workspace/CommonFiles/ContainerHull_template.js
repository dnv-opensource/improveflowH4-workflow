//
// Container Vessel
//
//
//Define parameters
//
AP=#AP#;
FP =#FP#;
MaxBreadth=20m;
BilgeRad=3m;
HeightTopDeck=26m;
//
GenieRules.Tolerances.useTolerantModelling = true;
//
// Material, thicknesses and beam section
Steel = Material(2e8,7850,2.1e11,0.3,0,0);
Th01 = Thickness(0.02);
Steel.setDefault();
Th01.setDefault();
//
// Critical positions
BossRad = 0.6;
LBP = FP - AP;
XPosAftPar = FP*0.3;
XPosFwdPar = FP*0.35;
XPosAftBT = FP*0.09;
XPosAftST = FP*0.0233;
XPosFwdST = FP*0.87;
XPosFwdBT = FP*0.80;
FMostXvalue = FP + MaxBreadth*0.681818;
FMostBulb = FP*1.07;
AMostXvalue = AP - LBP*0.123;
XPosBoss = AP-LBP*0.0225;
ZPosCenterBoss = HeightTopDeck*0.285;
ZPosTopBoss = HeightTopDeck*0.305;
ZPosTopBulbFP = HeightTopDeck*0.45;
ZPosStartBow = HeightTopDeck*0.5;
XPosStartBow = FP + MaxBreadth*0.034091;
XPosClStern = AP-FP*0.0225;
ZPosClStern = HeightTopDeck*0.475;
ZPosAMostxvalue = HeightTopDeck*0.66;
XPosaft4 = AMostXvalue/2;
XPosClfwdTransom = XPosaft4;
XPosClBow = FP + MaxBreadth*0.310045;
ZPosClfwdTransom = ZPosClStern -(ZPosClStern-ZPosAMostxvalue)*(XPosClStern-XPosClfwdTransom)/(XPosClStern-AMostXvalue);
ZPosClBow = HeightTopDeck -(HeightTopDeck-ZPosStartBow)*(FMostXvalue-XPosClBow)/(FMostXvalue-XPosStartBow);
//
// Positions for station
XPosStAft1 = XPosAftST;
XPosStAft2 = XPosaft4;
XPosStAft3 = XPosClStern;
XPosStAft4 = XPosAftBT;
XPosStAft5 = AP-(FP*0.00163);
XPosStAft6 = FP*0.05665;
XPosStAft7 = FP*0.1938;
XPosStAft8 = FP*0.1419;

XPosStFwd1 = XPosFwdST;
XPosStFwd2 = XPosFwdBT;
XPosStFwd3 = FP*1.033333;
XPosStFwd4 = FP*0.633;
XPosStFwd5 = FP*0.7165;
XPosStFwd6 = FP*0.935;
XPosStFwd7 = FP*0.5267;
//
// Vertical posistions for Waterlines
ZPosWl1 = HeightTopDeck*0.39;
ZPosWl2 = HeightTopDeck*0.8342;
ZPosWl3 = ZPosCenterBoss;
ZPosWl4 = ZPosClStern;

ZPosWlF1 = HeightTopDeck*0.25;
ZPosWlF2 =  ZPosTopBulbFP;
ZPosWlF3 = ZPosClBow;

//
// Limits of par. portions
//
// Aft and for part of par midship at Centre line
AParCl = Point(XPosAftPar,0,0);
FParCl = Point(XPosFwdPar,0,0);
//
// Maindeck at par midship
AParTD = Point(XPosAftPar,MaxBreadth,HeightTopDeck);
FParTD = Point(XPosFwdPar,MaxBreadth,HeightTopDeck);
//
// Aft part of par midship at Bottom Tang
AParBT = Point(XPosAftPar,(MaxBreadth - BilgeRad),0);
//
// Aft part of par midship at Side Tang
AParST = Point(XPosAftPar,MaxBreadth,BilgeRad);
//
// Fwd part of par midship at Bottom Tang
FParBT = Point(XPosFwdPar,(MaxBreadth - BilgeRad),0);
//
// Fwd part of par midship at Side Tang
FParST = Point(XPosFwdPar,MaxBreadth,BilgeRad);
//
// Critical Points
//
// Points in Transom
TransomPt1 = Point(AMostXvalue,MaxBreadth*0.46023,ZPosWl2);
TransomPt2 = Point(AMostXvalue,MaxBreadth*0.1632,HeightTopDeck*0.6873);

//
// Center of bilge
CenterBilge = Point(XPosAftPar,(MaxBreadth - BilgeRad),BilgeRad);
//
// Points on BottomTang
FwdPntBT = Point(XPosFwdBT,0,0);
AftPntBT = Point(XPosAftBT,0,0);
BTaft1 = Point(XPosStAft7,MaxBreadth*0.5396,0);
BTaft2 = Point(XPosStAft8,MaxBreadth*0.282738,0);

BTfwd1 = Point(XPosStFwd1,0,0);
BTfwd2 = Point(XPosStFwd4,MaxBreadth*0.460452,0);
BTfwd3 = Point(XPosStFwd5,MaxBreadth*0.238874,0);
BTfwd4 = Point(XPosStFwd6,0,0);
BTfwd5 = Point(XPosStFwd7,MaxBreadth*0.6912,0);
//
// Points in Side tang
FwdPntST = Point(XPosFwdST,MaxBreadth,HeightTopDeck);
AftPntST = Point(XPosAftST,MaxBreadth,HeightTopDeck);
STaft1 = point(LBP*0.213, MaxBreadth,ZPosWl1);
STaft2 = point(FP*0.2354, MaxBreadth,ZPosWl3);
STaft3 = point(XPosStAft4, MaxBreadth,ZPosWl2);
STaft4 = point(XPosStAft7, MaxBreadth,ZPosWl4);
STaft5 = point(XPosStAft6, MaxBreadth,HeightTopDeck*0.920267);
STaft6 = point(XPosStAft8, MaxBreadth,HeightTopDeck*0.674082);
STfwd1 = Point(XPosStFwd7,MaxBreadth,ZPosWlF1);
STfwd2 = point(XPosStFwd4, MaxBreadth,ZPosTopBulbFP);
STfwd3 = Point(XPosFwdBT,MaxBreadth*0.9919,HeightTopDeck*0.85);
STfwd4 = point(XPosStFwd5, MaxBreadth,HeightTopDeck*0.648742);
STfwd5 = point(FP*0.742503, MaxBreadth,ZPosWlF3);
//
// Points Cl
AftMostPoint = Point(AMostXvalue,0,HeightTopDeck);
FwdMostPoint = Point(FMostXvalue,0,HeightTopDeck);
FwdClBulb = Point(FMostBulb,0,ZPosWlF1);
FwdClatFP = Point(FP,0,ZPosTopBulbFP);
TransomClPoint = Point(AMostXvalue,0,ZPosAMostxvalue);
CenterBoss = Point(AP-(FP*0.0225),0,ZPosCenterBoss);

ClAft1 = Point(XPosStAft5, 0,HeightTopDeck*0.1);
ClAft2 = Point(AP-(FP*0.015),0,ZPosWl1);
ClAft3 = Point(XPosStAft1,0,HeightTopDeck*0.02553);
ClAft4 = Point(XPosStAft6,0,HeightTopDeck*0.003333);
ClStern = Point(XPosClStern,0,ZPosClStern);
ClfwdTransom = Point(XPosClfwdTransom,0, ZPosClfwdTransom);
ClFwd1 = Point(FP*1.0438, 0,HeightTopDeck*0.336667);
ClFwd2 = Point(FP*1.0189, 0,HeightTopDeck*0.358333);
ClFwd3 = Point(XPosStFwd3, 0,HeightTopDeck*0.0416);
ClFwd4 = Point(FP,0,0);
ClFwd5 = Point(FP*1.003333,0,HeightTopDeck*0.409);
ClFwd6 = Point(XPosStartBow,0,ZPosStartBow);
ClFwd7 = Point(XPosStFwd1,0,0);
ClFwd8 = Point(XPosStFwd3,0,HeightTopDeck*0.343333);
ClFwd9 = Point(FP*1.058075,0,HeightTopDeck*0.320683);
ClFwd10 = Point(XPosClBow,0,ZPosClBow);
//
// Point on Main Deck 
MainDeck1 = Point(XPosStAft2,MaxBreadth*0.909,HeightTopDeck);
MainDeck3 = Point(XPosStAft3,MaxBreadth*0.9786,HeightTopDeck);
//MainDeck2 = Point(FP,MaxBreadth*0.75,HeightTopDeck);
MainDeck4 = Point(XPosStAft5,MaxBreadth*0.9945,HeightTopDeck);
TransomDeckPoint = Point(AMostXvalue,MaxBreadth*0.682,HeightTopDeck);
MainDeck5 = Point(XPosStFwd6,MaxBreadth*0.979084,HeightTopDeck);

MainDeck6 = FwdMostPoint.copyRotate(FwdClatFP,Vector3d(0,0,1),30*1);
MainDeck2 = FwdMostPoint.copyRotate(FwdClatFP,Vector3d(0,0,1),30*2);

//
// Point on WL Fwd
PointWLFwd1 = Point(FP*0.946287,MaxBreadth*0.284605,ZPosWlF1);
PointWLFwd2 = Point(FP,MaxBreadth*0.2,ZPosWlF1);
PointWLFwd3 = Point(XPosStFwd3,MaxBreadth*0.2,ZPosWlF1);
PointWLFwd4 = Point(FP*0.9,MaxBreadth*0.4318,ZPosWlF1);  
PointWLFwd5 = Point(FP*0.972036,MaxBreadth*0.225529,ZPosWlF1);

PointWLFwd6 = ClFwd10.copyRotate(FwdClatFP,Vector3d(0,0,1),30*1);
PointWLFwd7 = ClFwd10.copyRotate(FwdClatFP,Vector3d(0,0,1),30*2);
          
//
// Point on Stations Aft 

//PointStationAftb1 = Point(XPosStAft1,MaxBreadth*0.1429,HeightTopDeck*0.0272);
PointStationAftb2 = Point(XPosStAft1,MaxBreadth*0.2023,HeightTopDeck*0.0795);
PointStationAftb3 = Point(XPosStAft1,MaxBreadth*0.4291,ZPosWl3);
PointStationAftb4 = Point(XPosStAft1,MaxBreadth*0.514,ZPosWl1);
PointStationAftb5 = Point(XPosStAft1,MaxBreadth*0.6136,ZPosWl4);
PointStationAftb6 = Point(XPosStAft1,MaxBreadth*0.8864,HeightTopDeck*0.6844);
PointStationAftb7 = Point(XPosStAft1,MaxBreadth*0.9772,ZPosWl2);
PointStationAftb8 = Point(XPosStAft2,MaxBreadth*0.764,ZPosWl2);
PointStationAftb9 = Point(XPosStAft3,MaxBreadth*0.88863,ZPosWl2);
PointStationAftb10 = Point(XPosStAft4,MaxBreadth*0.7943,ZPosWl3);
PointStationAftb11 = Point(XPosStAft4,MaxBreadth*0.9004,ZPosWl1);
PointStationAftb12 = Point(XPosStAft4,MaxBreadth*0.9463,ZPosWl4);
PointStationAftb13 = Point(XPosStAft2,MaxBreadth*0.3639,HeightTopDeck*0.614);
PointStationAftb14 = Point(XPosStAft3,MaxBreadth*0.397,HeightTopDeck*0.546);
PointStationAftb15 = Point(XPosStAft5,MaxBreadth*0.20909,ZPosWl3);
PointStationAftb16 = Point(XPosStAft5,MaxBreadth*0.19954,ZPosWl1);
PointStationAftb17 = Point(XPosStAft5,MaxBreadth*0.3409,ZPosWl4);
PointStationAftb18 = Point(XPosStAft5,MaxBreadth*0.93909,ZPosWl2);
PointStationAftb19 = Point(XPosStAft3,MaxBreadth*0.6477,HeightTopDeck*0.6533);
PointStationAftb20 = Point(XPosStAft5,MaxBreadth*0.7298,HeightTopDeck*0.6533);
PointStationAftb21 = Point(XPosStAft6,MaxBreadth*0.3628,HeightTopDeck*0.0909);
PointStationAftb22 = Point(XPosStAft6,MaxBreadth*0.1899,HeightTopDeck*0.0262);
PointStationAftb23 = Point(XPosStAft6,MaxBreadth*0.645864,ZPosWl3);
PointStationAftb24 = Point(XPosStAft6,MaxBreadth*0.7674,ZPosWl1);
PointStationAftb25 = Point(XPosStAft6,MaxBreadth*0.83527,ZPosWl4);
PointStationAftb26 = Point(XPosStAft6,MaxBreadth*0.9975,ZPosWl2);
PointStationAftb27 = Point(AP-(FP*0.01667),MaxBreadth*0.125,ZPosWl4);
PointStationAftb28 = Point(AP-(FP*0.00932),MaxBreadth*0.23734,ZPosWl4);
PointStationAftb29 = Point(XPosStAft4,MaxBreadth*0.29355,HeightTopDeck*0.039187);
PointStationAftb30 = Point(XPosStAft4,MaxBreadth*0.560091,HeightTopDeck*0.1382);
PointStationAftb31 = Point(XPosStAft7,MaxBreadth*0.760014,HeightTopDeck*0.039302);
PointStationAftb32 = Point(XPosStAft7,MaxBreadth*0.927273,HeightTopDeck*0.150682);
PointStationAftb33 = Point(XPosStAft7,MaxBreadth*0.984,ZPosWl3);
PointStationAftb34 = Point(XPosStAft7,MaxBreadth*0.9954,ZPosWl1);
PointStationAftb35 = Point(XPosStAft8,MaxBreadth*0.532575,HeightTopDeck*0.040566);
PointStationAftb36 = Point(XPosStAft8,MaxBreadth*0.759091,HeightTopDeck*0.138014);
PointStationAftb37 = Point(XPosStAft8,MaxBreadth*0.922791,ZPosWl3);
PointStationAftb38 = Point(XPosStAft8,MaxBreadth*0.981818,ZPosWl1);
PointStationAftb39 = Point(XPosStAft8,MaxBreadth*0.9954,ZPosWl4);

//
// Point on Stations Fwd 
PointStationFwd1 = Point(FP,MaxBreadth*0.171273,HeightTopDeck*0.093167);
PointStationFwd2 = Point(FP,MaxBreadth*0.211364,HeightTopDeck*0.193667);
PointStationFwd3 = Point(FP,MaxBreadth*0.0146,HeightTopDeck*0.409);
PointStationFwd4 = Point(XPosStFwd1,MaxBreadth*0.528377,ZPosWlF1);
PointStationFwd5 = Point(XPosStFwd1,MaxBreadth*0.654798,ZPosWlF2);
PointStationFwd6 = Point(XPosStFwd2,MaxBreadth*0.75,ZPosWlF1);
PointStationFwd7 = Point(XPosStFwd2,MaxBreadth*0.882,ZPosWlF2);
PointStationFwd8 = Point(XPosStFwd3,MaxBreadth*0.07671,HeightTopDeck*0.076688);
PointStationFwd9 = Point(XPosStFwd3,MaxBreadth*0.136563,HeightTopDeck*0.127265);
PointStationFwd10 = Point(XPosStFwd3,MaxBreadth*0.18299,HeightTopDeck*0.18486);
PointStationFwd11 = Point(XPosStFwd4,MaxBreadth*0.701191,HeightTopDeck*0.01307);
PointStationFwd12 = Point(XPosStFwd4,MaxBreadth*0.902932,HeightTopDeck*0.107247);
PointStationFwd13 = Point(XPosStFwd4,MaxBreadth*0.984519,ZPosWlF1);
PointStationFwd14 = Point(XPosStFwd5,MaxBreadth*0.564942,HeightTopDeck*0.040929);
PointStationFwd15 = Point(XPosStFwd5,MaxBreadth*0.915589,ZPosWlF1);
PointStationFwd16 = Point(XPosStFwd5,MaxBreadth*0.988377,ZPosWlF2);
PointStationFwd17 = Point(XPosStFwd2,MaxBreadth*0.41457,HeightTopDeck*0.06314);
PointStationFwd18 = Point(XPosStFwd1,MaxBreadth*0.305075,HeightTopDeck*0.076854);
PointStationFwd19 = Point(XPosStFwd6,MaxBreadth*0.168597,HeightTopDeck*0.06116);
PointStationFwd20 = Point(XPosStFwd6,MaxBreadth*0.317682,ZPosWlF1);
PointStationFwd21 = Point(XPosStFwd6,MaxBreadth*0.351001,ZPosWlF2);
PointStationFwd22 = Point(XPosStFwd6,MaxBreadth*0.7,ZPosWlF3);
PointStationFwd23 = Point(XPosStFwd1,MaxBreadth*0.886364,ZPosWlF3);
PointStationFwd24 = Point(XPosStFwd7,MaxBreadth*0.909091,HeightTopDeck*0.042747);
PointStationFwd25 = Point(XPosStFwd2,MaxBreadth*0.976968,ZPosWlF3);


//
//  Curves
//
// Aft portion of Par ship
Curve1 = GuideArcElliptic(CenterBilge, AParBT, AParST, true);

Curve31 = PolyCurve(Array(AParCl, AParBT));
Curve31.modifyCurveType(1, ggStraight);
Curve31.rebuild();

Curve32 = PolyCurve(Array(AParST, AParTD));
Curve32.modifyCurveType(1, ggStraight);
Curve32.rebuild();

//
// Fwd portion of Par ship
//
Curve2 = Curve1.copyTranslate(Vector3d((XPosFwdPar-XPosAftPar),0 m,0 m));

Curve33 = PolyCurve(Array(FParCl, FParBT));
Curve33.modifyCurveType(1, ggStraight);
Curve33.rebuild();

Curve34 = PolyCurve(Array(FParST, FParTD));
Curve34.modifyCurveType(1, ggStraight);
Curve34.rebuild();

//
// Bottom tangency
Curve3 = PolyCurve();
Curve3.clear();
Curve3.addPoint(AftPntBT, ggSpline);
Curve3.addPoint(BTaft2, ggSpline);
Curve3.addPoint(BTaft1, ggSpline);
Curve3.addPoint(AParBT, ggStraight);
Curve3.addPoint(FParBT, ggSpline);
Curve3.addPoint(BTfwd5, ggSpline);
Curve3.addPoint(BTfwd2, ggSpline);
Curve3.addPoint(BTfwd3, ggSpline);
Curve3.addPoint(FwdPntBT, ggSpline);
Curve3.rebuild();
//
// Side tangency
Curve4 = PolyCurve();
Curve4.clear();
Curve4.addPoint(AftPntST, ggSpline);
Curve4.addPoint(STaft5, ggSpline);
Curve4.addPoint(STaft3, ggSpline);
Curve4.addPoint(STaft6, ggSpline);
Curve4.addPoint(STaft4, ggSpline);
Curve4.addPoint(STaft1, ggSpline);
Curve4.addPoint(STaft2, ggSpline);
Curve4.addPoint(AParST, ggStraight);
Curve4.addPoint(FParST, ggSpline);
Curve4.addPoint(STfwd1, ggSpline);
Curve4.addPoint(STfwd2, ggSpline);
Curve4.addPoint(STfwd4, ggSpline);
Curve4.addPoint(STfwd5, ggSpline);
Curve4.addPoint(STfwd3, ggSpline);
Curve4.addPoint(FwdPntST, ggSpline);
Curve4.rebuild();
//
// Centre line aft and above bossing
Curve5 = PolyCurve();
Curve5.clear();
Curve5.addPoint(TransomClPoint, ggStraight);
Curve5.addPoint(ClStern, ggSpline);
Curve5.addPoint(ClAft2, ggSpline);
Curve5.addPoint(CenterBoss, ggSpline);
Curve5.endDeriv(Vector3d(0,0,-1.));
Curve5.rebuild();
//
// Center line , above  bulb
Curve54 = PolyCurve();
Curve54.clear();
Curve54.startDeriv(Vector3d(0,0,1.));
Curve54.addPoint(FwdClBulb, ggSpline);
Curve54.addPoint(ClFwd9, ggSpline);
Curve54.addPoint(ClFwd1, ggSpline);
Curve54.addPoint(ClFwd8, ggSpline);
Curve54.addPoint(ClFwd2, ggSpline);
Curve54.addPoint(ClFwd5, ggSpline);
Curve54.addPoint(FwdClatFP, ggSpline);
//Curve54.endDeriv(Vector3d(-0.001,0,1));
Curve54.rebuild();
//
// Center line , fwd bossing incl. lower bulb
Curve52 = PolyCurve();
Curve52.clear();
Curve52.startDeriv(Vector3d(0,0,-1.));
Curve52.addPoint(CenterBoss, ggSpline);
Curve52.addPoint(ClAft1, ggSpline);
Curve52.addPoint(ClAft3, ggSpline);
Curve52.addPoint(ClAft4, ggSpline);
Curve52.addPoint(AftPntBT, ggStraight);
Curve52.addPoint(FwdPntBT, ggStraight);
Curve52.addPoint(ClFwd4, ggSpline);
Curve52.addPoint(ClFwd3, ggSpline);
Curve52.addPoint(FwdClBulb, ggSpline);
Curve52.endDeriv(Vector3d(0,0,1));
Curve52.rebuild();
//
// Centre line, in bow
Curve53 = PolyCurve();
Curve53.clear();
Curve53.startDeriv(Vector3d(0,0,1));
Curve53.addPoint(FwdClatFP, ggSpline);
Curve53.addPoint(ClFwd6, ggStraight);
Curve53.addPoint(FwdMostPoint, ggSpline);
Curve53.rebuild();
//
// CL in bow rotated twice to create bow shape
Curve43 = Curve53.copyRotate(FwdClatFP,Vector3d(0,0,1),30*1);
Curve44 = Curve53.copyRotate(FwdClatFP,Vector3d(0,0,1),30*2);
//
// Top Deck
Curve6 = PolyCurve();
Curve6.clear();
Curve6.addPoint(TransomDeckPoint, ggSpline);
Curve6.addPoint(MainDeck1, ggSpline);
Curve6.addPoint(MainDeck4, ggSpline);
Curve6.addPoint(AftPntST, ggStraight);
Curve6.addPoint(FwdPntST, ggSpline);
Curve6.addPoint(MainDeck5, ggSpline);
Curve6.addPoint(MainDeck2, ggSpline);
Curve6.addPoint(MainDeck6, ggSpline);
Curve6.addPoint(FwdMostPoint, ggSpline);
Curve6.endDeriv(Vector3d(0,-1 m,0));
Curve6.rebuild();
//
// Transom at shell
Curve7 = PolyCurve();
Curve7.clear();
Curve7.startDeriv(Vector3d(0,1 m,0));
Curve7.addPoint(TransomClPoint, ggSpline);
Curve7.addPoint(TransomPt2, ggSpline);
Curve7.addPoint(TransomPt1, ggSpline);
Curve7.addPoint(TransomDeckPoint, ggSpline);
Curve7.rebuild();
//
// Transom at Top Deck
Curve8 = PolyCurve();
Curve8.clear();
Curve8.addPoint(AftMostPoint, ggSpline);
Curve8.addPoint(TransomDeckPoint, ggSpline);
Curve8.rebuild();
//
// Transom at Centre line
Curve9 = PolyCurve();
Curve9.clear();
Curve9.addPoint(TransomClPoint, ggSpline);
Curve9.addPoint(AftMostPoint, ggSpline);
Curve9.rebuild();

//
// WL aftbody 
Curve11 = PolyCurve();
Curve11.clear();
Curve11.addPoint(ClAft2, ggSpline);
Curve11.addPoint(PointStationAftb16, ggSpline);
Curve11.addPoint(PointStationAftb4, ggSpline);
Curve11.addPoint(PointStationAftb24, ggSpline);
Curve11.addPoint(PointStationAftb11, ggSpline);
Curve11.addPoint(PointStationAftb38, ggSpline);
Curve11.addPoint(PointStationAftb34, ggSpline);
Curve11.addPoint(STaft1, ggSpline);
Curve11.endDeriv(Vector3d(1 m,0,0));
Curve11.rebuild();

Curve19 = PolyCurve();
Curve19.clear();
Curve19.addPoint(TransomPt1, ggSpline);
Curve19.addPoint(PointStationAftb8, ggSpline);
Curve19.addPoint(PointStationAftb9, ggSpline);
Curve19.addPoint(PointStationAftb18, ggSpline);
Curve19.addPoint(PointStationAftb7, ggSpline);
Curve19.addPoint(PointStationAftb26, ggSpline);
Curve19.addPoint(STaft3, ggSpline);
Curve19.endDeriv(Vector3d(1 m,0,0));
Curve19.rebuild();

Curve20 = PolyCurve();
Curve20.clear();
Curve20.addPoint(CenterBoss, ggSpline);
Curve20.addPoint(PointStationAftb15, ggSpline);
Curve20.addPoint(PointStationAftb3, ggSpline);
Curve20.addPoint(PointStationAftb23, ggSpline);
Curve20.addPoint(PointStationAftb10, ggSpline);
Curve20.addPoint(PointStationAftb37, ggSpline);
Curve20.addPoint(PointStationAftb33, ggSpline);
Curve20.addPoint(STaft2, ggSpline);
Curve20.endDeriv(Vector3d(1 m,0,0));
Curve20.rebuild();

Curve22 = PolyCurve();
Curve22.clear();
Curve22.addPoint(ClStern, ggSpline);
Curve22.addPoint(PointStationAftb27, ggSpline);
Curve22.addPoint(PointStationAftb28, ggSpline);
Curve22.addPoint(PointStationAftb17, ggSpline);
Curve22.addPoint(PointStationAftb5, ggSpline);
Curve22.addPoint(PointStationAftb25, ggSpline);
Curve22.addPoint(PointStationAftb12, ggSpline);
Curve22.addPoint(PointStationAftb39, ggSpline);
Curve22.addPoint(STaft4, ggSpline);
Curve22.endDeriv(Vector3d(1 m,0,0));
Curve22.rebuild();


//
// WL forebody
Curve14 = PolyCurve();
Curve14.clear();
Curve14.startDeriv(Vector3d(1 m,0,0));
Curve14.addPoint(STfwd1, ggSpline);
Curve14.addPoint(PointStationFwd13, ggSpline);
Curve14.addPoint(PointStationFwd15, ggSpline);
Curve14.addPoint(PointStationFwd6, ggSpline);
Curve14.addPoint(PointStationFwd4, ggSpline);
Curve14.addPoint(PointWLFwd4, ggSpline);
Curve14.addPoint(PointStationFwd20, ggSpline);
Curve14.addPoint(PointWLFwd1, ggSpline);
Curve14.addPoint(PointWLFwd5, ggSpline);
Curve14.addPoint(PointWLFwd2, ggStraight);
Curve14.addPoint(PointWLFwd3, ggSpline);
Curve14.addPoint(FwdClBulb, ggSpline);
Curve14.endDeriv(Vector3d(0,-1 m,0));
Curve14.rebuild();

Curve111 = PolyCurve();
Curve111.clear();
Curve111.startDeriv(Vector3d(1 m,0,0));
Curve111.addPoint(STfwd2, ggSpline);
Curve111.addPoint(PointStationFwd16, ggSpline);
Curve111.addPoint(PointStationFwd7, ggSpline);
Curve111.addPoint(PointStationFwd5, ggSpline);
Curve111.addPoint(PointStationFwd21, ggSpline);
Curve111.addPoint(FwdClatFP, ggSpline);
Curve111.rebuild();

Curve112 = PolyCurve();
Curve112.clear();
Curve112.startDeriv(Vector3d(1 m,0,0));
Curve112.addPoint(STfwd5, ggSpline);
Curve112.addPoint(PointStationFwd25, ggSpline);
Curve112.addPoint(PointStationFwd23, ggSpline);
Curve112.addPoint(PointStationFwd22, ggSpline);
Curve112.addPoint(PointWLFwd7, ggSpline);
Curve112.addPoint(PointWLFwd6, ggSpline);
Curve112.addPoint(ClFwd10, ggSpline);
Curve112.endDeriv(Vector3d(0,-1,0));
Curve112.rebuild();

//
// Stations in forbody
Curve15 = PolyCurve();
Curve15.clear();
Curve15.startDeriv(Vector3d(0,1,0));
Curve15.addPoint(FwdPntBT, ggSpline);
Curve15.addPoint(PointStationFwd17, ggSpline);
Curve15.addPoint(PointStationFwd6, ggSpline);
Curve15.addPoint(PointStationFwd7, ggSpline);
Curve15.addPoint(PointStationFwd25, ggSpline);
Curve15.addPoint(STfwd3, ggSpline);
Curve15.endDeriv(Vector3d(0,0,1));
Curve15.rebuild();

Curve27 = PolyCurve();
Curve27.clear();
Curve27.startDeriv(Vector3d(0,1,0));
Curve27.addPoint(ClFwd7, ggSpline);
Curve27.addPoint(PointStationFwd18, ggSpline);
Curve27.addPoint(PointStationFwd4, ggSpline);
Curve27.addPoint(PointStationFwd5, ggSpline);
Curve27.addPoint(PointStationFwd23, ggSpline);
Curve27.addPoint(FwdPntST, ggSpline);
Curve27.endDeriv(Vector3d(0,0,1));
Curve27.rebuild();

Curve29 = PolyCurve();
Curve29.clear();
Curve29.startDeriv(Vector3d(0,1,0));
Curve29.addPoint(BTfwd2, ggSpline);
Curve29.addPoint(PointStationFwd11, ggSpline);
Curve29.addPoint(PointStationFwd12, ggSpline);
Curve29.addPoint(PointStationFwd13, ggSpline);
Curve29.addPoint(STfwd2, ggSpline);
Curve29.endDeriv(Vector3d(0,0,1));
Curve29.rebuild();

Curve40 = PolyCurve();
Curve40.clear();
Curve40.startDeriv(Vector3d(0,1,0));
Curve40.addPoint(BTfwd3, ggSpline);
Curve40.addPoint(PointStationFwd14, ggSpline);
Curve40.addPoint(PointStationFwd15, ggSpline);
Curve40.addPoint(PointStationFwd16, ggSpline);
Curve40.addPoint(STfwd4, ggSpline);
Curve40.endDeriv(Vector3d(0,0,1));
Curve40.rebuild();

Curve41 = PolyCurve();
Curve41.clear();
Curve41.startDeriv(Vector3d(0,1,0));
Curve41.addPoint(BTfwd4, ggSpline);
Curve41.addPoint(PointStationFwd19, ggSpline);
Curve41.addPoint(PointStationFwd20, ggSpline);
Curve41.addPoint(PointStationFwd21, ggSpline);
Curve41.addPoint(PointStationFwd22, ggSpline);
Curve41.addPoint(MainDeck5, ggSpline);
Curve41.rebuild();

Curve42 = PolyCurve();
Curve42.clear();
Curve42.startDeriv(Vector3d(0,1,0));
Curve42.addPoint(BTfwd5, ggSpline);
Curve42.addPoint(PointStationFwd24, ggSpline);
Curve42.addPoint(STfwd1, ggSpline);
Curve42.endDeriv(Vector3d(0,0,1));
Curve42.rebuild();

// at FP, lower
Curve12 = PolyCurve();
Curve12.clear();
Curve12.startDeriv(Vector3d(0,1,0));
Curve12.addPoint(ClFwd4, ggSpline);
Curve12.addPoint(PointStationFwd1, ggSpline);
Curve12.addPoint(PointStationFwd2, ggSpline);
Curve12.addPoint(PointWLFwd2, ggSpline);
Curve12.addPoint(PointStationFwd3, ggSpline);
Curve12.addPoint(FwdClatFP, ggSpline);
Curve12.rebuild();

//
// station in bulb
Curve28 = PolyCurve();
Curve28.clear();
Curve28.startDeriv(Vector3d(0,1,0));
Curve28.addPoint(ClFwd3, ggSpline);
Curve28.addPoint(PointStationFwd8, ggSpline);
Curve28.addPoint(PointStationFwd9, ggSpline);
Curve28.addPoint(PointStationFwd10, ggSpline);
Curve28.addPoint(PointWLFwd3, ggSpline);
Curve28.addPoint(ClFwd8, ggSpline);
Curve28.endDeriv(Vector3d(0,-1,0));
Curve28.rebuild();

//
// Station in aftbody
Curve16 = PolyCurve();
Curve16.clear();
Curve16.StartDeriv(Vector3d(0,1.,0));
Curve16.addPoint(ClAft3, ggSpline);
Curve16.addPoint(PointStationAftb2, ggSpline);
Curve16.addPoint(PointStationAftb3, ggSpline);
Curve16.addPoint(PointStationAftb4, ggSpline);
Curve16.addPoint(PointStationAftb5, ggSpline);
Curve16.addPoint(PointStationAftb6, ggSpline);
Curve16.addPoint(PointStationAftb7, ggSpline);
Curve16.addPoint(AftPntST, ggSpline);
Curve16.endDeriv(Vector3d(0,0,1.));
Curve16.rebuild();

Curve17 = PolyCurve();
Curve17.clear();
Curve17.startDeriv(Vector3d(0,1.,0.01));
Curve17.addPoint(ClStern, ggSpline);
Curve17.addPoint(PointStationAftb14, ggSpline);
Curve17.addPoint(PointStationAftb19, ggSpline);
Curve17.addPoint(PointStationAftb9, ggSpline);
Curve17.addPoint(MainDeck3, ggSpline);
Curve17.rebuild();

Curve18 = PolyCurve();
Curve18.clear();
Curve18.startDeriv(Vector3d(0,1.,0));
Curve18.addPoint(ClfwdTransom, ggSpline);
Curve18.addPoint(PointStationAftb13, ggSpline);
Curve18.addPoint(PointStationAftb8, ggSpline);
Curve18.addPoint(MainDeck1, ggSpline);
Curve18.rebuild();

Curve21 = PolyCurve();
Curve21.clear();
Curve21.startDeriv(Vector3d(0,1.,0));
Curve21.addPoint(AftPntBT, ggSpline);
Curve21.addPoint(PointStationAftb29, ggSpline);
Curve21.addPoint(PointStationAftb30, ggSpline);
Curve21.addPoint(PointStationAftb10, ggSpline);
Curve21.addPoint(PointStationAftb11, ggSpline);
Curve21.addPoint(PointStationAftb12, ggSpline);
Curve21.addPoint(STaft3, ggSpline);
Curve21.rebuild();

Curve23 = PolyCurve();
Curve23.clear();
Curve23.startDeriv(Vector3d(0,1.,0));
Curve23.addPoint(ClAft1, ggSpline);
Curve23.addPoint(PointStationAftb15, ggSpline);
Curve23.addPoint(PointStationAftb16, ggSpline);
Curve23.addPoint(PointStationAftb17, ggSpline);
Curve23.addPoint(PointStationAftb20, ggSpline);
Curve23.addPoint(PointStationAftb18, ggSpline);
Curve23.addPoint(MainDeck4, ggSpline);
Curve23.rebuild();

Curve24 = PolyCurve();
Curve24.clear();
Curve24.startDeriv(Vector3d(0,1.,0));
Curve24.addPoint(ClAft4, ggSpline);
Curve24.addPoint(PointStationAftb22, ggSpline);
Curve24.addPoint(PointStationAftb21, ggSpline);
Curve24.addPoint(PointStationAftb23, ggSpline);
Curve24.addPoint(PointStationAftb24, ggSpline);
Curve24.addPoint(PointStationAftb25, ggSpline);
Curve24.addPoint(PointStationAftb26, ggSpline);
Curve24.addPoint(STaft5, ggSpline);
Curve24.endDeriv(Vector3d(0,0,1.));
Curve24.rebuild();

Curve25 = PolyCurve();
Curve25.clear();
Curve25.startDeriv(Vector3d(0,1.,0));
Curve25.addPoint(BTaft1, ggSpline);
Curve25.addPoint(PointStationAftb31, ggSpline);
Curve25.addPoint(PointStationAftb32, ggSpline);
Curve25.addPoint(PointStationAftb33, ggSpline);
Curve25.addPoint(PointStationAftb34, ggSpline);
Curve25.addPoint(STaft4, ggSpline);
Curve25.endDeriv(Vector3d(0,0,1.));
Curve25.rebuild();

Curve26 = PolyCurve();
Curve26.clear();
Curve26.startDeriv(Vector3d(0,1.,0));
Curve26.addPoint(BTaft2, ggSpline);
Curve26.addPoint(PointStationAftb35, ggSpline);
Curve26.addPoint(PointStationAftb36, ggSpline);
Curve26.addPoint(PointStationAftb37, ggSpline);
Curve26.addPoint(PointStationAftb38, ggSpline);
Curve26.addPoint(PointStationAftb39, ggSpline);
Curve26.addPoint(STaft6, ggSpline);
Curve26.endDeriv(Vector3d(0,0,1.));
Curve26.rebuild();



//
// Patches and Plates Aftbody
Pl1 = InterpolateCurveNet(Array(Curve7, Curve8), Array(Curve9, TransomDeckPoint));
Pl2 = InterpolateCurveNet(Array(Curve7, Curve18, Curve17), Array(Curve5, Curve19, GuideSpline(Array(TransomDeckPoint, MainDeck1, MainDeck3), 3)));
Pl3 = InterpolateCurveNet(Array(Curve52, Curve20), Array(Curve16, Curve23, CenterBoss));
Pl4 = InterpolateCurveNet(Array(Curve5, Curve23, Curve16), Array(Curve20, Curve11, Curve22));
Pl5 = InterpolateCurveNet(Array(Curve17, Curve23, Curve16), Array(Curve22, Curve19, GuideSpline(Array(MainDeck3, MainDeck4, AftPntST), 3)));
Pl6 = InterpolateCurveNet(Array(Curve16, Curve24, Curve21), Array(Curve52, Curve20));
Pl7 = InterpolateCurveNet(Array(Curve16, Curve24, Curve21), Array(Curve20, Curve11, Curve22));
Pl8 = InterpolateCurveNet(Array(Curve16, Curve24, Curve21), Array(Curve22, Curve4));
Pl9 = InterpolateCurveNet(Array(Curve21, Curve26, Curve25, Curve1), Array(Curve3, Curve4));
//
// Flat plates in bottom and side, + bilge
Pl13 = InterpolateCurveNet(Array(Curve1, Curve2), Array(Curve3, Curve4));
Pl14 = InterpolateCurveNet(Array(Curve52, Curve3), Array(Curve31, AftPntBT));
Pl15 = InterpolateCurveNet(Array(Curve4, Curve6), Array(Curve32, AftPntST));
Pl16 = InterpolateCurveNet(Array(Curve32, Curve34), Array(Curve4, Curve6));
Pl17 = InterpolateCurveNet(Array(Curve31, Curve33), Array(Curve52, Curve3));
Pl18 = InterpolateCurveNet(Array(Curve4, Curve6), Array(Curve34, FwdPntST));
Pl19 = InterpolateCurveNet(Array(Curve52, Curve3), Array(Curve33, FwdPntBT));
//
// Patches and Plates Forebody 
Pl20 = InterpolateCurveNet(Array(Curve2, Curve42, Curve29, Curve40, Curve15), Array(Curve3, Curve4));
Pl21 = InterpolateCurveNet(Array(Curve15, Curve27), Array(Curve52, Curve14, Curve111));
Pl22 = InterpolateCurveNet(Array(Curve112, Curve4), Array(Curve15, Curve27));
Pl23 = InterpolateCurveNet(Array(Curve111, Curve112), Array(Curve15, Curve27));
Pl24 = InterpolateCurveNet(Array(Curve27, Curve41, Curve44), Array(Curve111, Curve112, Curve6));
Pl25 = InterpolateCurveNet(Array(Curve52, Curve14, Curve111), Array(Curve27, Curve41, Curve12));

Pl26 = InterpolateCurveNet(Array(Curve12, Curve28,FwdClBulb), Array(Curve52, Curve14, Curve54));
Pl27 = InterpolateCurveNet(Array(Curve44, Curve43, Curve53), Array(Curve6, Curve112));

PointCurve111End1 = Curve111.end2;
Pl28 = InterpolateCurveNet(Array(Curve44, Curve53), Array(PointCurve111End1, Curve112));

Pl27.flipNormal();
Pl18.flipNormal();
Pl19.flipNormal();
Pl22.flipNormal();
Pl23.flipNormal();
Pl25.flipNormal();

Analysis1 = Analysis(true);
Analysis1.add(MeshActivity());
Analysis1.add(LoadResultsActivity());
Analysis1.setActive();
Analysis1.step(1).step(1).execute();
Analysis1.step(1).step(2).execute();
SimplifyTopology();
Analysis1.step(1).step(4).execute();
Analysis1.step(2).execute();
FemExporter = ExportMeshFem();
FemExporter.DoExport("T1.FEM");