<%@  Language=jScript%>
<%
Response.ContentType = "text/xml"
Response.Codepage = 65001
Response.Charset = "utf-8"
/*
var regXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
var xmlFile='RegisteredSymbols.xml'
var regMap=Server.MapPath(xmlFile)
regXML.load(regMap)
var regSymbols=regXML.documentElement.childNodes
*/
var VizSat=[]
//---[Norad#,Name,Country,Location,lat,lng,altitudeKM ]
//  VizSat[]=[,"","","",,,]
    VizSat[0]=["Norad(21423):SL-14 R/B (81.87,108.6) Elev=645.9 km"] //"Russia","Artic Ocean",81.87,108.6,645.9]
    VizSat[1]=["Norad(29507):CZ-4B R/B (81.14,128.26) Elev=605.3 km"] // China (":Artic Ocean",81.14,128.26,605.3]
    VizSat[2]=["Norad(23343):SL-16 R/B (81.71,172.16) Elev=647.9 km"] // Russia (":Artic Ocean",81.71,172.16,647.9]
    VizSat[3]=["Norad(18958):COSMOS 1933 (80,-157.28) Elev=572.9 km"] // Russia (":Artic Ocean",80,-157.28,572.9]
    VizSat[4]=["Norad(16111):SL-3 R/B (82.37,-124.32) Elev=448.5 km"] // Russia (":Artic Ocean",82.37,-124.32,448.5]
    VizSat[5]=["Norad(12465):SL-3 R/B (75.84,-148.19) Elev=548.1 km"] // Russia (":Artic Ocean",75.84,-148.19,548.1]
    VizSat[6]=["Norad(19120):SL-16 R/B (56.45,63.85) Elev=851.1 km"] // Russia (":Russia",56.45,63.85,851.1]
    VizSat[7]=["Norad(21422):COSMOS 2151 (63.83,94.6) Elev=612.4 km"] // Russia (":Russia",63.83,94.6,612.4]
    VizSat[8]=["Norad(39271):FALCON 9 R/B (66.72,116.44) Elev=699 km"] // Russia () Elev= km"] // Russia",66.72,116.44,699]
    VizSat[9]=["Norad(20625):SL-16 R/B (62.8,133.74) Elev=857.1 km"] // Russia () Elev= km"] // Russia",62.8,133.74,857.1]
    VizSat[10]=["Norad(12389):SL-8 R/B (55.23,144.47) Elev=135.9 km"] // Russia () Elev= km"] // Russia",55.23,144.47,135.9]
    VizSat[11]=["Norad(28353):SL-16 R/B (62.41,158.91) Elev=855.6 km"] // Russia () Elev= km"] // Russia",62.41,158.91,855.6]
    VizSat[12]=["Norad(27424):AQUA (66.5,169.35) Elev=709.7 km"] // Russia",66.5,169.35,709.7]
    VizSat[13]=["Norad(27601):H-2A R/B (50.61,154.92) Elev=751.4 km"] // Japan () Elev= km"] // Russia",50.61,154.92,751.4]
    VizSat[14]=["Norad(25723):SL-8 R/B (45.3,154.21) Elev=456.6 km"] // Russia () Elev= km"] // North Pacific",45.3,154.21,456.6]
    VizSat[15]=["Norad(15945):SL-14 R/B (53.16,178.72) Elev=637.3 km"] // Russia () Elev= km"] // Bering Sea",53.16,178.72,637.3]
    VizSat[16]=["Norad(21397):OKEAN-3 (52.59,-168.96) Elev=613 km"] // Russia () Elev= km"] // Bering Sea",52.59,-168.96,613]
    VizSat[17]=["Norad(27386):ENVISAT (41.97,132.98) Elev=773.5 km"] // European Space Agency () Elev= km"] // Sea Of Japan",41.97,132.98,773.5]
    VizSat[18]=["Norad(28059):CZ-4B R/B (37.72,106.05) Elev=703 km"] // China () Elev= km"] // China",37.72,106.05,703]
    VizSat[19]=["Norad(16882):SL-14 R/B (29.27,84.78) Elev=636.3 km"] // Russia () Elev= km"] // Tibet",29.27,84.78,636.3]
    VizSat[20]=["Norad(40460):1998-067GD (18.36,82.46) Elev=357.6 km"] // India",18.36,82.46,357.6]
    VizSat[21]=["Norad(31598):COSMO-SKYMED 1 (32.07,66.97) Elev=629.7 km"] // Italy () Elev= km"] // Afganastan",32.07,66.97,629.7]
    VizSat[22]=["Norad(27597):MIDORI II (ADEOS-II) (21.77,57.64) Elev=808.9 km"] // Japan () Elev= km"] // Oman",21.77,57.64,808.9]
    VizSat[23]=["Norad(22286):COSMOS 2228 (10.49,54.49) Elev=616.9 km"] // Russia () Elev= km"] // Arabian Sea",10.49,54.49,616.9]
    VizSat[24]=["Norad(40454):FLOCK-1B FX (4.95,68.12) Elev=355.2 km"] // Arabian Sea",4.95,68.12,355.2]
    VizSat[25]=["Norad(25732):CZ-4B R/B (-4.12,55.05) Elev=814.5 km"] // China () Elev= km"] // Arabian Sea",-4.12,55.05,814.5]
    VizSat[26]=["Norad(28773):SUZAKU (ASTRO-EII) (-7.2,71.6) Elev=530.3 km"] // Japan () Elev= km"] // Indian Ocean",-7.2,71.6,530.3]
    VizSat[27]=["Norad(40740):1998-067GS (-29.12,70.7) Elev=408.4 km"] // Indian Ocean",-29.12,70.7,408.4]
    VizSat[28]=["Norad(37820):TIANGONG 1 (-35.01,51.61) Elev=378.8 km"] // China () Elev= km"] // Indian Ocean",-35.01,51.61,378.8]
    VizSat[29]=["Norad(40727):1998-067GK (-20.34,79.78) Elev=408.5 km"] // Indian Ocean",-20.34,79.78,408.5]
    VizSat[30]=["Norad(40739):1998-067GR (-15.87,83.81) Elev=408.8 km"] // Indian Ocean",-15.87,83.81,408.8]
    VizSat[31]=["Norad(40726):1998-067GJ (-9.46,89.21) Elev=409 km"] // Indian Ocean",-9.46,89.21,409]
    VizSat[32]=["Norad(11267):SL-14 R/B (-3.51,89.66) Elev=600.7 km"] // Russia () Elev= km"] // Indian Ocean",-3.51,89.66,600.7]
    VizSat[33]=["Norad(10114):SL-3 R/B (-2.68,89.81) Elev=519.9 km"] // Russia () Elev= km"] // Indian Ocean",-2.68,89.81,519.9]
    VizSat[34]=["Norad(40729):1998-067GM (-2.84,94.52) Elev=408.9 km"] // Indian Ocean",-2.84,94.52,408.9]
    VizSat[35]=["Norad(40738):1998-067GQ (1.71,98.1) Elev=408 km"] // Sumatra",1.71,98.1,408]
    VizSat[36]=["Norad(40728):1998-067GL (4.3,100.15) Elev=408.6 km"] // Malasysia",4.3,100.15,408.6]
    VizSat[37]=["Norad(40724):FLOCK 1E-GG (8.54,103.57) Elev=405.1 km"] // Gulf of Thailand",8.54,103.57,405.1]
    VizSat[38]=["Norad(20262):SL-14 R/B (8.78,111.05) Elev=1943.3 km"] // Russia () Elev= km"] // South China Sea",8.78,111.05,1943.3]
    VizSat[39]=["Norad(29228):RESURS-DK 1 (-11.39,104.74) Elev=572.1 km"] // Russia () Elev= km"] // Christmas Island",-11.39,104.74,572.1]
    VizSat[40]=["Norad(21938):SL-8 R/B (-12.2,113) Elev=980 km"] // Russia () Elev= km"] // Indian Ocean",-12.2,113,980]
    VizSat[41]=["Norad(5560):ASTEX 1 (-20.77,99.77) Elev=751.6 km"] // Indian Ocean",-20.77,99.77,751.6]
    VizSat[42]=["Norad(16908):AJISAI (EGS) (-18.52,120.16) Elev=1488.3 km"] // Japan () Elev= km"] // Western Australia",-18.52,120.16,1488.3]
    VizSat[43]=["Norad(5118):SL-3 R/B (-28.16,127.58) Elev=521.4 km"] // Russia () Elev= km"] // Western Australia",-28.16,127.58,521.4]
    VizSat[44]=["Norad(12585):METEOR PRIRODA (-34.65,44.28) Elev=518.2 km"] // Russia () Elev= km"] // Southern Ocean",-34.65,44.28,518.2]
    VizSat[45]=["Norad(21876):SL-8 R/B (-38.39,43.04) Elev=1005.5 km"] // Russia () Elev= km"] // Southern Ocean",-38.39,43.04,1005.5]
    VizSat[46]=["Norad(40741):1998-067GT (-48.85,32.07) Elev=406.9 km"] // Southern Ocean",-48.85,32.07,406.9]
    VizSat[47]=["Norad(733):THOR AGENA D R/B (-52.53,50.23) Elev=767 km"] // Southern Ocean",-52.53,50.23,767]
    VizSat[48]=["Norad(17590):SL-16 R/B (-54.52,67.37) Elev=844.8 km"] // Russia () Elev= km"] // Southern Ocean",-54.52,67.37,844.8]
    VizSat[49]=["Norad(29252):GENESIS 1 (-61.69,74.13) Elev=512.6 km"] // Southern Ocean",-61.69,74.13,512.6]
    VizSat[50]=["Norad(14819):COSMOS 1544 (-54.52,88.98) Elev=516.1 km"] // Russia () Elev= km"] // Southern Ocean",-54.52,88.98,516.1]
    VizSat[51]=["Norad(19046):SL-3 R/B (-59.75,106.6) Elev=6,588.8 km"] // Russia () Elev= km"] // Southern Ocean",-59.75,106.6,588.8]
    VizSat[52]=["Norad(28738):CZ-2D R/B (-51.6,95.78) Elev=553 km"] // China () Elev= km"] // Southern Ocean",-51.6,95.78,553]
    VizSat[53]=["Norad(3669):ISIS 1 (-46.01,96.55) Elev=1766.6 km"] // Canada () Elev= km"] // Southern Ocean",-46.01,96.55,1766.6]
    VizSat[54]=["Norad(19650):SL-16 R/B (-42.99,-58.97) Elev=837.9 km"] // Russia () Elev= km"] // South Atlantic",-42.99,-58.97,837.9]
    VizSat[55]=["Norad(21088):SL-8 R/B (-47.28,-55.9) Elev=977.7 km"] // Russia () Elev= km"] // South Atlantic",-47.28,-55.9,977.7]
    VizSat[56]=["Norad(40457):1998-067GA (-48.34,-44.92) Elev=258.9 km"] // South Atlantic",-48.34,-44.92,258.9]
    VizSat[57]=["Norad(25407):SL-16 R/B (-55.17,-44.22) Elev=841.6 km"] // Russia () Elev= km"] // South Atlantic",-55.17,-44.22,841.6]
    VizSat[58]=["Norad(40423):OBJECT FP (-50.36,-30.86) Elev=305.3 km"] // South Atlantic",-50.36,-30.86,305.3]
    VizSat[59]=["Norad(40736):1998-067GN (-50.13,-11.71) Elev=405.4 km"] // Southern Ocean",-50.13,-11.71,405.4]
    VizSat[60]=["Norad(4327):SERT 2 (-43.18,10.31) Elev=1045.5 km"] // Southern Ocean",-43.18,10.31,1045.5]
    VizSat[61]=["Norad(20666):SL-6 R/B(2) (-59.82,-79.27) Elev=674.8 km"] // Russia () Elev= km"] // Drake Passage",-59.82,-79.27,674.8]
    VizSat[62]=["Norad(20465):COSMOS 2058 (-68.27,-82.52) Elev=573 km"] // Russia () Elev= km"] // South Pacific",-68.27,-82.52,573]
    VizSat[63]=["Norad(19573):COSMOS 1975 (-65.51,-125.63) Elev=564.2 km"] // Russia () Elev= km"] // South Pacific",-65.51,-125.63,564.2]
    VizSat[64]=["Norad(21819):INTERCOSMOS 25 (-55.23,-92.9) Elev=2677 km"] // Russia () Elev= km"] // South Pacific",-55.23,-92.9,2677]
    VizSat[65]=["Norad(14699):COSMOS 1536 (-78.25,-118.82 Elev.569.4  km"] // Russia () Elev= km"] // Antartica",-78.25,-118.82,569.4]
    VizSat[66]=["Norad(22830):ARIANE 40 R/B (-76.36,-77.36) Elev=800.3 km"] // France () Elev= km"] // Antartica",-76.36,-77.36,800.3]
    VizSat[67]=["Norad(22626):COSMOS 2242 (-81.02,-43.14) Elev=625.4 km"] // Russia () Elev= km"] // Antartica",-81.02,-43.14,625.4]
    VizSat[68]=["Norad(25861):SL-16 R/B (-81.63,-42.83) Elev=645.7 km"] // Russia () Elev= km"] // Antartica",-81.63,-42.83,645.7]
    VizSat[69]=["Norad(23561):ARIANE 40+ R/B (-81.19,-32.46) Elev=777.5 km"] // France () Elev= km"] // Antartica",-81.19,-32.46,777.5]
    VizSat[70]=["Norad(11849):SL-3 R/B (-74.75,-26.93) Elev=383.7 km"] // Russia () Elev= km"] // Antartica",-74.75,-26.93,383.7]
    VizSat[71]=["Norad(28931):ALOS (DAICHI) (-81.82,36.81) Elev=692.9 km"] // Japan () Elev= km"] // Antartica",-81.82,36.81,692.9]
    VizSat[72]=["Norad(14208):SL-3 R/B (-80.7,39.87) Elev=536.5 km"] // Russia () Elev= km"] // Antartica",-80.7,39.87,536.5]
    VizSat[73]=["Norad(28480):CZ-2C R/B (-66.34,172.16) Elev=877.8 km"] // China () Elev= km"] // ",-66.34,172.16,877.8]
    VizSat[74]=["Norad(24883):ORBVIEW 2 (SEASTAR) (-38.85,169.6) Elev=787.6 km"] // New Zealand",-38.85,169.6,787.6]
    VizSat[75]=["Norad(2802):SL-8 R/B (-36.51,173.43) Elev=728.1 km"] // Russia () Elev= km"] // New Zealand",-36.51,173.43,728.1]
    VizSat[76]=["Norad(25994):TERRA (25.2,146.51) Elev=710.7 km"] // Pacific Ocean",25.2,146.51,710.7]
    VizSat[77]=["Norad(20511):SL-14 R/B (33.46,161.9) Elev=632.8 km"] // Russia () Elev= km"] // Pacific Ocean",33.46,161.9,632.8]
    VizSat[78]=["Norad(23405):SL-16 R/B (26.94,170.01) Elev=845.5 km"] // Russia () Elev= km"] // Pacific Ocean",26.94,170.01,845.5]
    VizSat[79]=["Norad(694):ATLAS CENTAUR 2 (12.87,166.86) Elev=468 km"] // Pacific Ocean",12.87,166.86,468]
    VizSat[80]=["Norad(8063):DELTA 1 R/B (18.58,174.3 Elev .814.9 km"] // Pacific Ocean",18.58,174.3,814.9]
    VizSat[81]=["Norad(22566):SL-16 R/B (18.48,-176.99) Elev=848.6 km"] // Russia () Elev= km"] // Pacific Ocean",18.48,-176.99,848.6]
    VizSat[82]=["Norad(31789):GENESIS 2 (40.11,-163.88) Elev=553.1 km"] // Pacific Ocean",40.11,-163.88,553.1]
    VizSat[83]=["Norad(20775):SL-8 R/B (31.23,-164.46) Elev=529.3 km"] // Russia () Elev= km"] // Pacific Ocean",31.23,-164.46,529.3]
    VizSat[84]=["Norad(25400):SL-16 R/B (18.89,-155.59) Elev=809.7 km"] // Russia () Elev= km"] // Pacific Ocean",18.89,-155.59,809.7]
    VizSat[85]=["Norad(28939):AKARI (ASTRO-F) (33.26,-149.65) Elev=535.5 km"] // Japan () Elev= km"] // Pacific Ocean",33.26,-149.65,535.5]
    VizSat[86]=["Norad(40743):1998-067GV (44.61,-134.81) Elev=405.6 km"] // Pacific Ocean",44.61,-134.81,405.6]
    VizSat[87]=["Norad(17567):SL-14 R/B (29.43,-121.37) Elev=619.6 km"] // Russia () Elev= km"] // California",29.43,-121.37,619.6]
    VizSat[88]=["Norad(40713):2015-031A (33.58,-113.65) Elev=407.9 km"] // Arizona",33.58,-113.65,407.9]
    VizSat[89]=["Norad(16792):SL-14 R/B (21.71,-116.52) Elev=633.5 km"] // Russia () Elev= km"] // Baja Califonia",21.71,-116.52,633.5]
    VizSat[90]=["Norad(23088):SL-16 R/B (17.22,-129.22) Elev=851.5 km"] // Russia () Elev= km"] // Pacific Ocean",17.22,-129.22,851.5]
    VizSat[91]=["Norad(40452):FLOCK-1B FV (14.54,-115.78) Elev=367.8 km"] // Pacific Ocean",14.54,-115.78,367.8]
    VizSat[92]=["Norad(27422):IDEFIX & ARIANE 42P R/B (37.53,-96.43 Elev.791.9  km"] // France () Elev= km"] // Kansas",37.53,-96.43,791.9]
    VizSat[93]=["Norad(12904):SL-3 R/B (-2.04,-117.81) Elev=577 km"] // Russia () Elev= km"] // Pacific Ocean",-2.04,-117.81,577]
    VizSat[94]=["Norad(13403):SL-3 R/B (14.84,-124.94) Elev=557.8 km"] // Russia () Elev= km"] // Pacific Ocean",14.84,-124.94,557.8]
    VizSat[95]=["Norad(5730):SL-8 R/B (8.72,-97.6) Elev=396.5 km"] // Russia () Elev= km"] // Pacific Ocean",8.72,-97.6,396.5]
    VizSat[96]=["Norad(20323):DELTA 1 R/B (12.96,-88.76) Elev=696.3 km"] // Nicaragua",12.96,-88.76,696.3]
    VizSat[97]=["Norad(40314):SPINSAT (-3.5,-91.43) Elev=388.3 km"] // Pacific Ocean",-3.5,-91.43,388.3]
    VizSat[98]=["Norad(40459):1998-067GC (-11.48,-110.83) Elev=340.1 km"] // Pacific Ocean",-11.48,-110.83,340.1]
    VizSat[99]=[] // Pacific Ocean",-11.48,-110.83,340.1]
    VizSat[100]=["Norad(40427):FLOCK-1B FQ (-22.28,-101.11) Elev=344.4 km"] // Pacific Ocean",-22.28,-101.11,344.4]
    VizSat[101]=["Norad(3597):OAO 2 (-22.35,-99.02) Elev=743.6 km"] // Pacific Ocean",-22.35,-99.02,743.6]
    VizSat[102]=["Norad(19210):COSMOS 1953 (-14.26,-91.49) Elev=564.1 km"] // Russia () Elev= km"] // Pacific Ocean",-14.26,-91.49,564.1]
    VizSat[103]=["Norad(20261):INTERCOSMOS 24 (-35.13,-115.26) Elev=945.7 km"] // Russia () Elev= km"] // South Pacific Ocean",-35.13,-115.26,945.7]
    VizSat[104]=["Norad(14372):COSMOS 1500 (-16.19,-131.13) Elev=518.5 km"] // Russia () Elev= km"] // South Pacific Ocean",-16.19,-131.13,518.5]
    VizSat[105]=["Norad(24298):SL-16 R/B (-52,-143.9) Elev=849.9 km"] // Russia () Elev= km"] // South Pacific Ocean",-52,-143.9,849.9]
    VizSat[106]=["Norad(28222):CZ-2C R/B (-27.74,-146.81) Elev=555.3 km"] // China () Elev= km"] // South Pacific Ocean",-27.74,-146.81,555.3]
    VizSat[107]=["Norad(19257):SL-8 R/B (-39.86,-147.63) Elev=769.2 km"] // Russia () Elev= km"] // South Pacific Ocean",-39.86,-147.63,769.2]
    VizSat[108]=["Norad(27432):CZ-4B R/B (-6.07,-146.7) Elev=873.6 km"] // China () Elev= km"] // South Pacific Ocean",-6.07,-146.7,873.6]
    VizSat[109]=["Norad(21574):ERS-1 (-13.33,-160.54) Elev=791.8 km"] // European Space Agency () Elev= km"] // South Pacific Ocean",-13.33,-160.54,791.8]
    VizSat[110]=["Norad(17295):COSMOS 1812 (-13.02,-155.96) Elev=537.9 km"] // Russia () Elev= km"] // South Pacific Ocean",-13.02,-155.96,537.9]
    VizSat[111]=["Norad(31792):COSMOS 2428 (-23.65,-176.85) Elev=865 km"] // Russia () Elev= km"] // South Pacific Ocean",-23.65,-176.85,865]
    VizSat[112]=["Norad(40456):1998-067FZ (-38.12,-74.73) Elev=356.3 km"] // Argetina",-38.12,-74.73,356.3]
    VizSat[113]=["Norad(28361):GPS BIIR-12 (53.44,-122.59) Elev=20301.2 km"] // British Columbia",53.44,-122.59,20301.2]
    VizSat[114]=["Norad(40294):GPS BIIF-8 (20.63,-122.45) Elev=20182.6 km"] // East Pacific",20.63,-122.45,20182.6]
    VizSat[115]=["Norad(20959):GPS BIIA-10 (-1.43,-101.56) Elev=20487.7 km"] // East Pacific",-1.43,-101.56,20487.7]
    VizSat[116]=["Norad(27663):GPS BIIR-8 (25.28,-85.03) Elev=19978.4 km"] // Florida",25.28,-85.03,19978.4]
    VizSat[117]=["Norad(40534):GPS BIIF-9 (44.31,-64.26) Elev=20185.6 km"] // Nova Scotia",44.31,-64.26,20185.6]
    VizSat[118]=["Norad(39166):GPS BIIF-4 (-26.76,-67.56) Elev=20144.3 km"] // Chili",-26.76,-67.56,20144.3]
    VizSat[119]=["Norad(26605):GPS BIIR-6 (-16.29,-31.06) Elev=20044.1 km"] // West Atlantic",-16.29,-31.06,20194.71]
    VizSat[120]=["Norad(28129):GPS BIIR-10 ( 50.77,-40.7) Elev=20000+ km"] // So. Georgia IS",  50.77,-40.7
    VizSat[121]=["Norad(26690):GPS BIIR-7 (-46.87,17.77) Elev=19853.3 km"] // Southern Ocean",-46.87,17.77,19853.3]
    VizSat[122]=["Norad(27704):GPS BIIR-9 (-10.39,3.83) Elev=20189.4 km"] // South Atlantic",-10.39,3.83,20189.4]
    VizSat[123]=["Norad(38833):GPS BIIF-3 (-34.35,40.89) Elev=20266.5 km"] // Indian Ocean",-34.35,40.89,20266.5]
    VizSat[124]=["Norad(26360):GPS BIIR-4 (-9.92,60.77) Elev=20174.2 km"] // Indian Ocean",-9.92,60.77,20174.2]
    VizSat[125]=["Norad(32260):GPS BIIRM-4 (-47.05,77.04) Elev=20189.6 km"] // Southern Ocean",-47.05,77.04,20189.6]
    VizSat[126]=["Norad(24876):GPS BIIR-2 (-33.33,112.81) Elev=20310 km"] // Perth, Australia",-33.33,112.81,20310]
    VizSat[127]=["Norad(28874):GPS BIIRM-1 (-4.74,138.77) Elev=20062.5 km"] // Papau",-4.74,138.77,20062.5]
    VizSat[128]=["Norad(32711):GPS BIIRM-6 (-3.23,-167.84) Elev=20386.8 km"] // Central Pacific",-3.23,-167.84,20386.8]
    VizSat[129]=["Norad(40105):GPS BIIF-7 (42.44,172.7) Elev=20199 km"] // North Pacific",42.44,172.7,20199]
    VizSat[130]=["Norad(39741):GPS BIIF-6 (47.01,144.44) Elev=20194.7 km"] // N. Japan",47.01,144.44,20194.7]
    VizSat[131]=["Norad(23953):GPS BIIA-26 (50.35,134.62) Elev=19812 km"] // S.E. Russia",50.35,134.62,19812]
    VizSat[132]=["Norad(28474):GPS BIIR-13 (53.51,110.74) Elev=20487.7 km"] // So. Russia",53.51,110.74,20487.7]
    VizSat[133]=["Norad(40730):2015-033A (54.93,39) Elev=20463.3 km"] // So. West Russia",54.93,39,20463.3]
    VizSat[134]=["Norad(32384):GPS BIIRM-5 (48.14,5.42) Elev=20194.6 km"] // France",48.14,5.42,20194.6]
    VizSat[135]=["Norad(36585):GPS BIIF-1 (39.07,39.92) Elev=20181.1 km"] // Turkey",39.07,39.92,20181.1]
    VizSat[136]=["Norad(29601):GPS BIIRM-3  (14.78,65.87) Elev=20271 km"] // Arabian Sea",14.78,65.87,20271]
    VizSat[137]=["Norad(39533):GPS BIIF-5 (-27.49,175.47) Elev=20223.4 km"] // ",-27.49,175.47,20223.4]
    VizSat[138]=["Norad(37753):GPS BIIF-2 (-28.91,-144.12) Elev=20304.2 km"] // Southern Ocean",-28.91,-144.12,20304.2]
    VizSat[139]=["Norad(25933):GPS BIIR-3 (-40.79,-143.73) Elev=20552.8 km"] // Southern Ocean",-40.79,-143.73,20552.8]
    VizSat[140]=["Norad(22877):GPS BIIA-23 (-44.65,-122.14) Elev=20491 km"] // Southern Ocean",-44.65,-122.14,20491]
    VizSat[141]=["Norad(28190):GPS BIIR-11 (-50.43,-97.63) Elev=20264.1 km"] // Southern Ocean",-50.43,-97.63,20264.1]
    VizSat[142]=["Norad(26407):GPS BIIR-5 (-56.01,154.38) Elev=19666.1 km"] // ",-56.01,154.38,19666.1]
    VizSat[143]=["Norad(29486):GPS BIIRM-2 (41.4,-22.1) Elev=20000+ km"]



var symbolXML = Server.CreateObject("Msxml2.DOMDocument.6.0");
var xmlFile='Symbols.xml'
var symbolMap=Server.MapPath(xmlFile)
symbolXML.load(symbolMap)
var mySymbols=symbolXML.documentElement.childNodes

    var num=0
for(var k=0;k<mySymbols.length;k++)
{
    var mySymbol=mySymbols.item(k)
  var myComment=mySymbol.getAttribute("comment")
  for(var j=0;j<VizSat.length;j++)
  {
     var satComment=VizSat[j]
      if(satComment.indexOf(myComment)!=-1)
      {
        mySymbol.setAttribute("comment",satComment)

        num++
        console.log(num)
        break 
      }
  }



}
 symbolXML.save(symbolMap)
 //regXML.save(regMap)


Response.Write("OK")
%>
